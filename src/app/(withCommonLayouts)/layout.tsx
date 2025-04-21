import AosInitializer from "@/component/Shared/animation/AosInitializer";
import Footer from "@/component/Shared/Footer";
import Navbar from "@/component/Shared/Navbar";
// import { Footer } from "antd/es/layout/layout";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <AosInitializer/>
      <Navbar />
      
      <main className="min-h-screen bg-[#E3E3E5] ">{children}</main>
      <Footer/>
    </>
  );
};

export default CommonLayout;