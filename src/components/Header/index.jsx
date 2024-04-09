import Image from 'next/image';
import NextLink from 'next/link';

const Header = () => {

  return (
    <header className="sticky top-0 w-full border-b border-gray-200 bg-white/90 backdrop-blur transition-colors duration-500">
      <div className="flex justify-between items-center h-16 py-2 px-8 text-xl">
        <NextLink href="/">
          <Image src="/pic/headerPic.jpg" width={48} height={48} alt="headerPIc" className="border border-gray-300 border-solid cursor-pointer" />
        </NextLink>
      </div>
    </header>
  );
};

export default Header;