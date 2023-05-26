import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-gray-100`}>
        <div className='container mx-auto px-4 py-3 min-h-screen flex flex-col justify-start items-stretch'>
          <nav className='w-full flex flex-col md:flex-row justify-start items-center mt-4 mb-8 gap-1'>
            <div className='text-8xl font-bold mr-4'>My Notes</div>
            <div className="flex flex-row">
              <Link href='/'>
                <NavItem text='Home' />
              </Link>
              <Link href='/create'>
                <NavItem text='New note' />
              </Link>
            </div>
          </nav>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

function NavItem({ text }: any) {
  return (
    <div className='bg-black text-white text-lg font-bold mx-2 px-5 py-4 rounded-full hover:bg-gray-500 my-1'>{text}</div>
  );
}
