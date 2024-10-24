import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/images/logo.svg";

const MainLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="flex min-h-screen flex-col justify-between bg-[#212726] px-5">
            <header className="flex items-center justify-center pt-8">
                <Link
                    href="/"
                    className="rounded-full border-[5px] border-[#9dc16e] px-8 py-3 shadow-[0px_4px_0px_0px_#394e1f]">
                    <Image
                        src={logo}
                        alt="SLON"
                        width="115"
                        height="31"
                        priority
                    />
                </Link>
            </header>
            <main className="flex flex-col items-center justify-center gap-y-10">
                {children}
            </main>
            <footer className="py-8">
                <nav>
                    <ul className="flex items-center justify-between text-3xl font-bold text-[#e6ddb9] flex-wrap gap-6">
                        <li className="transition-[color] hover:text-[#c8b241]">
                            <Link href="https://www.instagram.com/">Insta</Link>
                        </li>
                        <li className="transition-[color] hover:text-[#c8b241]">
                            <Link href="https://www.instagram.com/">
                                098 715 60 40 (ТЕЛЕГРАМ)
                            </Link>
                        </li>
                        <li className="transition-[color] hover:text-[#c8b241]">
                            <Link href="mailto:slooon@gmail.com">
                                SLOOON@GMAIL.COM
                            </Link>
                        </li>
                        <li className="transition-[color] hover:text-[#c8b241]">
                            <Link href="/">ПРО НАС</Link>
                        </li>
                    </ul>
                </nav>
            </footer>
        </div>
    );
};

export default MainLayout;
