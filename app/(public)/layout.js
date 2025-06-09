
import { Inter } from "next/font/google";
import "../globals.css";
import Header from '../ui/header';
import Footer from '../ui/footer';


const inter = Inter({ subsets: ["latin"] });

// Remove metadata from client component
// Create a separate metadata.ts file if needed
export async function generateMetadata() {
  return {
    title: "eSignTap: e signature for document",
    icons: {
      icon: '/meet.svg',
      shortcut: '/shortcut-icon.png',
      apple: '/apple-icon.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    },
  };
}
export default function PublicLayout({ children }) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}