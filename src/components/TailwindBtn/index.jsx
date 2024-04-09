'use client';

const TailwindBtn = ({ children, className, ...args }) => {
  
  return (
    <button className={`w-max bg-transparent hover:bg-my-color-light text-lg font-medium text-center text-my-color border border-my-color rounded py-2 px-4 text-lg duration-500 ${className?.toString()}`} {...args}>
      { children }
    </button>
  );
};

export default TailwindBtn;