import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { UserProvider } from "@/contexts/UserProvider";
import { PostsProvider } from "@/contexts/PostsProvider";
import { DrawerProvider } from "@/contexts/DrawerProvider";
import { DialogProvider } from "@/contexts/DialogProvider";
import { SnackbarProvider } from "@/contexts/SnackbarProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Tasks",
  description: "An application for managing and sharing daily tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <SnackbarProvider>
          <UserProvider>
            <PostsProvider>
              <DrawerProvider>
                <DialogProvider>
                  <div className="flex flex-col h-screen">{children}</div>
                </DialogProvider>
              </DrawerProvider>
            </PostsProvider>
          </UserProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
