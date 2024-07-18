import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/registerModal";
import ToasterProvider from "./providers/toasterProvider";
import LoginModal from "./components/modals/loginModal";
import RentModal from "./components/modals/rentModal";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <RentModal />
          <LoginModal />
          <RegisterModal/> 
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}
        </body>
    </html>
  );
}
