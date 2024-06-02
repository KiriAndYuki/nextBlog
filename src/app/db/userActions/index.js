'use server';

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import { aesCrypto, myJWT } from '@/utils';
import { cookies } from 'next/headers'

const prisma = new PrismaClient();

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

// lout

export const logout = (token) => {
  const {
    err,
  } = myJWT(token, 'de');
  if (err) {
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