
import { Electrolize} from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Electrolize({ subsets: ["latin"], weight:"400"});

export const metadata = {
  title: "Get me A Juice",
  description: "CrowdFunding platform for creators by Juice",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={inter.className} >
        <SessionWrapper>
          <div className="relative min-h-[94vh] w-full bg-slate-950 overflow-hidden">
          <Navbar />
            
            <div className="absolute bottom-0 left-[-20vw] right-0 top-[10%] h-[500px] w-[500px] rounded-full 
              bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] z-0">
            </div>
            <div className="absolute bottom-0 right-[-20vw] top-[10%] h-[500px] w-[500px] rounded-full 
              bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] z-0">
            </div>
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
