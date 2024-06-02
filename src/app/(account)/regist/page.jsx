import RegistForm from './registForm';

const RegistPage = () => {

  return (
    <main className="flex flex-col items-center mt-8">
      <div className="flex flex-col items-center w-1/2 p-8">
        <div className="text-2xl font-medium mb-8">Create a new account here</div>
        <RegistForm />
      </div>
    </main>
  );
};

export default RegistPage;