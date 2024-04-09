'use server';

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const prisma = new PrismaClient();

export async function createUser(userInfo) {
  const user = z.object({
    name: z.string(),
    email: z.string(),
  });

  const parse = user.safeParse(userInfo);
  if (!parse.success) {
    return {
      code: 0,
      msg: 'input info error!',
    };
  }

  const data = parse.data;

  try {
    await prisma.user.create({ data });

    revalidatePath('/userlist');
    return {
      code: 1,
      msg: 'add user success!',
    };
  } catch (e) {
    return {
      code: 0,
      msg: 'DataBase error!',
    }
  }
};