import NextLink from 'next/link';
import Image from 'next/image';
import { Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react';

const About = () => {


  const renderBasicTab = () => {
    return (
      <section className="flex flex-col">
        <div className="text-4xl ">I'm Yuki,</div>
        <span className="text-xl text-rose-500">a happy girl.</span>
        <div className="relative text-4xl mt-8 after:content-['pretty'] after:ml-1 after:text-red-500 after:text-sm after:absolute after:top-0">I like this picture:</div>
        <Image
          src="/pic/myFavPic.jpg"
          width={225}
          height={300}
          alt="myFavPic"
          className="mt-4"
        />
        <div className="text-4xl mt-8">my lovely cats:</div>
        <div className="mt-8">
          <Image
            src="/pic/lumi.jpg"
            width={280}
            height={373}
            alt="cat lumi"
          />
          <Image
            src="/pic/chese.jpg"
            width={320}
            height={426}
            alt="cat chese"
            className="origin-center rotate-90"
          />
        </div>
      </section>
    );
  };

  const renderCoderTab = () => {
    return (
      <section className="flex flex-col">
        <div className="mt-6">
          <span className="text-2xl mr-2">my github: </span>
          <a href="https://github.com/coderyy1" className="text-4xl text-blue-500 hover:text-my-color duration-500">
            coderyy1
          </a>
        </div>
        <div className="mt-6 flex">
          <span className="text-2xl mr-6">usually use:</span>
          <ul className="flex flex-col">
            <a href="https://react.dev/" className="w-max mb-4 text-4xl text-sky-400 hover:text-sky-600 duration-500" >React</a>
            <a href="https://vuejs.org/" className="w-max mb-4 text-4xl text-green-500 hover:text-green-800 duration-500" >Vue</a>
            <a href="https://www.typescriptlang.org/" className="w-max mb-4 text-4xl text-blue-500 hover:text-blue-800 duration-500" >Typescript</a>
            <a href="https://bun.sh/" className="w-max mb-4 text-4xl text-stone-600 hover:text-stone-800 duration-500 dark:text-gray-300 dark:hover:text-white" >Bun</a>
          </ul>
        </div>
      </section>
    );
  };

  return (
    <main className="flex flex-col items-center px-4 py-20">
      <NextLink href="/" className="fixed self-end px-8 py-2 mr-2 mb-8 text-lg border rounded-lg border-my-color bg-white dark:bg-my-color hover:bg-my-color-light dark:hover:scale-110 dark:hover:bg-my-color origin-center duration-500 z-10">Back</NextLink>
      <Tabs isFitted isLazy variant='unstyled' defaultIndex={0} className="w-1/2 mt-4">
        <TabList className="relative">
          <Tab _selected={{ color: 'white', bg: 'green.300' }}>basic</Tab>
          <Tab _selected={{ color: 'white', bg: 'green.300' }}>Coder</Tab>
          <div className="absolute h-px w-screen bg-stone-300 dark:bg-stone-500 translate-x-[-50%] left-[50%] bottom-0"/>
        </TabList>
        <TabPanels>
          <TabPanel>{renderBasicTab()}</TabPanel>
          <TabPanel>{renderCoderTab()}</TabPanel>
        </TabPanels>
      </Tabs>
    </main>
  );
};

export default About;