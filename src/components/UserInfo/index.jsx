'use client';
import { useEffect, useState, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import Image from 'next/image';

import { logout } from '@/app/db/userActions';
import { responseToast, dbErrorToast } from '@/utils';


const UserInfo = () => {
  let userInfo;

  const router = useRouter();
  
  const toastRef = useRef();
  const toast = useToast();
  const errId = 'logoutErr';

  const [hasLogin, setHasLogin] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      userInfo = JSON.parse(window.localStorage.getItem('userInfo') || `{}`);
      setHasLogin(userInfo?.userId ? true : false);
    }
  });

  const afterLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('yuki_token');
    setHasLogin(false);
    router.replace('/');
  };

  const logOut = async () => {
    try {
      const res = await logout();
      responseToast(res, toastRef, toast, errId, afterLogout);
    } catch (e) {
      dbErrorToast(e, toast);
    }
  };

  const renderUserInfo = () => {
    return (
      <div className="group relative p-1 border border-stone-300 rounded-full">
        <Image
          className="cursor-pointer"
          src="/icon/userAvat.png"
          width={32}
          height={32}
          alt="user avat"
        />
        <ul className="absolute left-[-1.2rem] bottom-[-7rem] flex-col items-center p-2 gap-y-1 bg-white dark:bg-black border border-stone-300 rounded-lg z-[9999] flex invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-500">
          <li className="cursor-pointer">
            <NextLink href="/profile" className="hover:text-teal-400 duration-300">profile</NextLink>
          </li>
          <li className="cursor-pointer">
            <NextLink href="/myOrders" className="hover:text-teal-400 duration-300">orders</NextLink>
          </li>
          <li className="cursor-pointer hover:text-teal-400 duration-300" onClick={logOut}>
            logout
          </li>
          <div className="absolute top-[-0.4rem] w-4 h-4 border-l border-t border-stone-300 rotate-45 bg-white dark:bg-black" />
        </ul>
      </div>
    );
  };

  return (
    <div>
      {
        hasLogin ? renderUserInfo() : <NextLink href="/login" className="cursor-pointer">login</NextLink>
      }
    </div>
  )
};

export default UserInfo;