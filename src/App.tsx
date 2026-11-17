import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Writing from "./pages/Writing";
import WritingArticle from "./pages/WritingArticle";
import Research from "./pages/Research";
import Talks from "./pages/Talks";
import Awards from "./pages/Awards";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Leadership from "./pages/Leadership";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const App = () => (
  <>
  <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/:slug" element={<WritingArticle />} />
        <Route path="/blog" element={<Writing />} />
        <Route path="/research" element={<Research />} />
        <Route path="/talks" element={<Talks />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  </BrowserRouter>
  <Analytics />
  </>
);

export default App;
