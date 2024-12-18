import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";

import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import "./globals.css";

const anonymousPro = Anonymous_Pro({
    subsets: ["cyrillic"],
    weight: ["400", "700"],
    display: "block",
    preload: true,
});

export const metadata: Metadata = {
    title: "SLOOON",
    description:
        "Ласкаво просимо на SLON – ваш ідеальний інтернет-магазин чаю! SLON - це онлайн платформа, яка пропонує великий вибір вишуканих чаїв з усього світу. Наш магазин спеціалізується на якісних сортах чаю, які привезені безпосередньо від кращих плантацій.",
    icons: {
        icon: "/favicon.ico",
    },
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <html lang="ua">
            <body className={cn("dark antialiased", anonymousPro.className)}>
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </body>
        </html>
    );
};

export default RootLayout;
