import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import Header from "@/components/Header";
import GoTopComp from "@/components/GoTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YukiPoc",
  description: "YUki's blog~",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`dark:text-white dark:dark:bg-neutral-800 ${inter.className}`}>
        <Providers>
          <Header/>
          {children}
          <GoTopComp />
        </Providers>
      </body>
    </html>
  );
}
