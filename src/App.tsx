import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Research from "./pages/Research";
import Talks from "./pages/Talks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const App = () => (
  <>
  <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/writing" element={<Blog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/research" element={<Research />} />
        <Route path="/talks" element={<Talks />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  </BrowserRouter>
  <Analytics />
  </>
);

export default App;
