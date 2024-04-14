import NextLink from 'next/link';

export default function Home() {

  return (
    <main className="flex flex-col items-center px-4 py-20">
      <h1 className="text-center">
        <span className="text-center text-8xl font-semibold bg-gradient-to-br from-fuchsia-500 to-sky-500 bg-clip-text text-transparent">Welcome</span>
        <span className="ml-6 text-center text-5xl font-semibold text-pink-500">to</span>
        <br/>
        <span className="mt-2 text-center text-7xl font-semibold text-teal-400">My Blog</span>
      </h1>
      <div className="mt-6 flex justify-between items-center">
        <NextLink href="/blogs" className="flex items-center text-white text-lg font-medium py-2 px-4 bg-my-color hover:bg-emerald-500 duration-500 rounded-lg">Blogs</NextLink>
        <NextLink href="/about" className="group flex items-center ml-8 text-lg dark:text-black font-medium py-2 px-4 bg-gray-100 hover:bg-gray-200 duration-500 rounded-lg">
          About me
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" data-v-a5e898ee="" className="relative ml-1 group-hover:translate-x-1 transition-all ease-in-out duration-500"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" data-v-a5e898ee=""></path></svg>
          </NextLink>
      </div>
    </main>
  );
};
