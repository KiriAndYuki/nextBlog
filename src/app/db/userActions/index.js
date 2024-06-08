'use server';

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import { aesCrypto, myJWT } from '@/utils';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// create user -> regist
export const createUser = async ({ account, password }) => {
  const pwd = aesCrypto(password, 'de') || '';
  const userInfo = {
    account,
    password: pwd,
  };

  const user = z.object({
    account: z.string(),
    password: z.string(),
  });

  const parse = user.safeParse(userInfo);
  if (!parse.success) {
    return {
      code: 0,
      msg: 'input info error!',
    };
  }

  const data = {
    ...parse.data, 
    nickName: `user${Math.floor(Math.random() * 100000)}`,
    profile: {
      create: {
        sex: 'M'
      },
    }
  };

  try {

    const user = await prisma.user.findUnique({
      where: {
        account: data.account
      }
    });

    if (user) {
      //account already created
      return {
        code: 0,
        msg: 'account already created!',
      }
    }

    await prisma.user.create({ data });

    revalidatePath('/regist');
    return {
      code: 1,
      msg: 'regist success!',
    };
  } catch (e) {
    console.log(e);
    return {
      code: 0,
      msg: 'DataBase error!',
    }
  }
};


// login
export const login = async ({ account, password }) => {

  const pwd = aesCrypto(password, 'de') || '';

  const data = {
    account,
    password: pwd
  };

  const loginData = z.object({
    account: z.string(),
    password: z.string(),
  });

  const parse = loginData.safeParse(data);
  if (!parse.success) {
    return {
      code: 0,
      msg: 'input info error!',
    };
  }

  const parseData = parse.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        account: parseData.account,
        password: parseData.password,
      }
    });

    if (!user) {
      // no such user
      return {
        code: 0,
        msg: 'account or password error!',
      };
    }


    // do some JWT here, generate a JWT, send to client (use 'data')
    // use cookies to check user login
    const userInfo = {
      userId: user.id,
      account: user.account,
      nickName: user.nickName,
    }
    const token = myJWT(userInfo, 'en');

    cookies().set({
      name: 'yuki_token',
      value: token,
    });
    revalidatePath('/');
    return {
      code: 1,
      msg: 'login success!',
      data: {
        token,
        ...userInfo,
      },
    };
  } catch (e) {
    console.log('err in login: ', e);
    return {
      code: 0,
      msg: 'DataBase error!'
    };
  }
};

// logout
export const logout = (token) => {
  const parse = myJWT(token, 'de');
  if (!parse) {
    return {
      code: 0,
      msg: 'logout error',
    };
  } else {
    cookies().delete('yuki_token');
    return {
      code: 1,
      msg: 'logout success',
    };
  }
};

// update profile or user
export const updateProfile = async ({ userId, type, value, token }) => {
  // JWT
  const parseJWT = myJWT(token, 'de');
  if (!parseJWT) {
    return {
      code: 0,
      msg: 'user token error',
    };
  }
  const valueZ = z.string();
  
  const parseParams = valueZ.safeParse(value);
  if (!parseParams.success) {
    return {
      code: 0,
      msg: 'info error!',
    };
  }

  const data = parseParams.data;

  if (type === 'nickName') {
    // nickName -> update user table
    try {
      const user = await prisma.user.update({
        where: {
          id: Number(userId),
        },
        data: {
          nickName: data,
        },
      });

      revalidatePath('/profile');

      return {
        code: 1,
        msg: 'profile updated!'
      };
    } catch (e) {
      console.log('err in update-user: ', e);
      return {
        code: 0,
        msg: 'DataBase error!'
      };
    }

  } else {
    // other type -> update profile table
    const updateData = {
      [type]: value,
    };

    console.log(updateData);  

    try {
      const user = await prisma.user.update({
        where: {
          id: Number(userId),
        },
        data: {
          profile: {
            update: updateData
          },
        }
      });

      revalidatePath('/profile');

      return {
        code: 1,
        msg: 'profile updated!'
      };
    } catch (e) {
      console.log('err in update-profile: ', e);
      return {
        code: 0,
        msg: 'DataBase error!'
      };
    }
  }
};