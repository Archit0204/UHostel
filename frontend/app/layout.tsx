import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

// export const metadata: Metadata = {
//     title: "UHostel Management",
//     description: "Uhostel is an all-in-one hostel management platform designed for students. Easily apply for leave, pay fees and fines, view payment history, and raise complaints – all from one user-friendly website. Stay organized and in control of your hostel-related tasks with Uhostel.",
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const title = "UHostel Management";
    const description =
        "Uhostel is an all-in-one hostel management platform designed for students. Easily apply for leave, pay fees and fines, view payment history, and raise complaints – all from one user-friendly website. Stay organized and in control of your hostel-related tasks with Uhostel.";

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased box-border`}
            >
                <head>
                    <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
                    <title>{title}</title>
                    <meta name="title" content={title} />
                    <meta name="description" content={description} />
                </head>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
