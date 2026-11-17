import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Navbar />
    <main id="main-content" tabIndex={-1} className="flex-1 pt-[68px]">{children}</main>
    <Footer />
  </div>
);

export default Layout;
