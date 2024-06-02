'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";

const GoTopComp = () => {

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShow(window.scrollY >= 240);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const goTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(goTop);
      window.scrollTo(0, c - c / 24);
    }
  }

  return (
    isShow && <div className="fixed bottom-8 right-8 w-12 h-12 flex justify-center items-center rounded-full bg-stone-100 hover:bg-stone-200 cursor-pointer duration-300" onClick={goTop}>
      <Image
        src="/pic/goTop.png"
        width={20}
        height={20}
        alt="gotop"
      />
    </div>
  );
}

export default GoTopComp;