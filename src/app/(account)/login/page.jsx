
import NextLink from 'next/link';
import LoginForm from './loginForm';

const LoginPage = () => {

  return (
    <main className="flex flex-col items-center mt-16">
      <div className="flex flex-col items-center w-1/2 p-8 bg-teal-100 rounded-lg shadow-[0_0_15px_-2px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_-4px_rgba(0,0,0,0.5)] duration-700">
        <div className="text-2xl mb-8 text-black">Hi, Welcome</div>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;