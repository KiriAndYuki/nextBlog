import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YukiPoc",
  description: "YUki's blog~",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
