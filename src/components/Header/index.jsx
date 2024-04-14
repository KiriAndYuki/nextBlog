import Image from 'next/image';
import NextLink from 'next/link';

import ModeChanger from '../ModeChanger';

const Header = () => {

  return (
    <header className="sticky top-0 w-full border-b border-gray-200 dark:border-stone-500 bg-white/90 dark:bg-neutral-800 backdrop-blur transition-colors duration-500 z-[99999]">
      <div className="flex justify-between items-center h-16 py-2 px-8 text-xl">
        <NextLink href="/" className="flex items-center hover:opacity-85">
          <Image src="/pic/headerPic.jpg" width={48} height={48} alt="headerPIc" className="border border-gray-300 border-solid cursor-pointer" />
          <div className="ml-4 text-4xl text-rose-500">Yuki</div>
        </NextLink>
        <ModeChanger />
      </div>
    </header>
  );
};

export default Header;