'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@chakra-ui/react';
import Image from 'next/image';

const THEME_MAP = {
  dark: true,
  light: false,
};

const ModeChanger = () => {
  let theme;
  const [isDark, setIsDark] = useState(THEME_MAP[theme]);

  useEffect(() => {
    if (typeof window !== undefined) {
      theme = window.localStorage.getItem('theme') || 'light';
      setIsDark(THEME_MAP[theme]);
      const htmlEl = document.getElementsByTagName('html')[0];
      htmlEl.setAttribute('class', theme || 'light');
    }
  }, [isDark]);

  const toggleChange = (e) => {
    const isChose = e.target.checked;
    localStorage.setItem('theme', isChose ? 'dark' : 'light');
    setIsDark(isChose);
  };

  const renderIcon = () => {
    return (
      <Image
        src={`/icon/${isDark ? 'dark' : 'light'}Mod.svg`}
        width={28}
        height={28}
        alt="mode icon"
      />
    );
  };

  return (
    <div className="flex items-center">
      <span className="text-md mr-2">{renderIcon()}</span>
      <Switch size="md" colorScheme="green" isChecked={isDark} onChange={toggleChange} />
    </div>
  );
};

export default ModeChanger;