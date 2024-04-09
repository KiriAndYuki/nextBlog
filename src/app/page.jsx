import MyButton from '@/components/MyButton';

export default function Home() {

  return (
    <main className="flex flex-col items-center px-4 py-8">
      <h1 className="text-center">
        <span className="text-center text-8xl font-semibold bg-gradient-to-br from-fuchsia-500 to-sky-500 bg-clip-text text-transparent">Welcome</span>
        <span className="ml-6 text-center text-5xl font-semibold text-pink-500">to</span>
        <br/>
        <span className="mt-2 text-center text-7xl font-semibold text-teal-400">My Blog</span>
      </h1>
      <MyButton type="a" href="/userlist">user list</MyButton>
    </main>
  );
};
