'use server';
import { PrismaClient } from "@prisma/client";
import { myJWT, keyValToArr } from '@/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from "@chakra-ui/react";
import UpdateModal from './updateModal';

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

  const infoList = keyValToArr(userInfo);

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="mb-6 text-2xl">Your Profile:</div>
      <UpdateModal infoList={infoList} userId={id} token={token} />
      <Button
        as="a"
        href={`/updatePwd?id=${id}`}
        colorScheme="teal"
        mt={5}
        width="66%"
      >
        update password
      </Button>
    </div>
  );
};

export default ProfilePage;