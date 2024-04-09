'use server'
import { List, ListItem } from '@chakra-ui/react';
import MyButton from '@/components/MyButton';
import { PrismaClient } from '@prisma/client';
import AddForm from './add-form';

const Page = async () => {

  // select data from database
  const prisma = new PrismaClient();
  const userList = await prisma.user.findMany() || [];

  return (
    <main className="flex flex-col items-center pt-24 h-svh">
      <div className="w-1/2 flex flex-col">
        <List spacing={3} className="mb-4 h-64 overflow-auto overscroll-x-none">
          {
            userList.map(user => (
              <ListItem key={user.id} className="w-full flex flex-col px-2 py-4 rounded-lg border border-my-color shadow-none hover:shadow-my-shadow duration-500">
                <div className="text-xl font-medium">{`userId:  ${user.id}`}</div>
                <div className="text-xl font-medium">{`name:  ${user.name}`}</div>
                <div className="text-xl font-medium">{`E-mail:  ${user.email}`}</div>
              </ListItem>
            ))
          }
        </List>
        <AddForm />
        <MyButton href="/" type='a'>Back</MyButton>
      </div>
    </main>
  );
};

export default Page;