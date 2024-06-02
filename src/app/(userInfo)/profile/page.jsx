'use server';
import { PrismaClient } from "@prisma/client";
import { myJWT } from '@/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ProfilePage = async ({ searchParams }) => {
  const { id } = searchParams;
  const prisma = new PrismaClient();
  const token = cookies().get('yuki_token').value || '';
  console.log('token:  ', token);
  
  const parse = myJWT(token, 'de');

  if (!parse) {
    redirect('/', 'replace');
  }

  const userInfo = await prisma.user.findUnique({
    where: {
      id: Number(id)
    },
    select: {
      id: true,
      account: true,
      nickName: true,
      profile: true,
    }
  });

  console.log('info:  ', userInfo);


  return (
    <div>
      my profile page!
    </div>
  );
};

export default ProfilePage;