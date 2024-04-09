'use client';

import NextLink from 'next/link';

const MyButton = ({ href = '/', type = 'button', children, onClick }) => {

  const classTag = 'w-max bg-transparent hover:bg-my-color-light text-lg font-medium text-center text-my-color border border-my-color rounded mt-8 py-2 px-4 text-lg duration-500';

  return (
    type === 'button' ? <button onClick={onClick || null} className={classTag}>{children}</button> : <NextLink href={href} className={classTag}>{children}</NextLink>
  );
};

export default MyButton;