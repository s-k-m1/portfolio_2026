import React, { Suspense, lazy } from "react";
import Base from "./components/Base.jsx";
import { Routes, Route } from "react-router-dom";

// Helper to handle potential named exports if you aren't using "export default"
const lazyImport = (importFn) => 
  lazy(() => importFn().then((module) => ({ default: module.default || Object.values(module)[0] })));

const Home = lazyImport(() => import("./pages/Home.jsx"));
const About = lazyImport(() => import("./pages/About.jsx"));
const Services = lazyImport(() => import("./pages/Services.jsx"));
const Contact = lazyImport(() => import("./pages/account/Contact.jsx"));
const ClientShare = lazyImport(() => import("./pages/ClientShare.jsx"));
const Projects = lazyImport(() => import("./pages/Projects.jsx"));

export default function App() {
  return (
    <Base>
      <Suspense
        fallback={
          <div className="text-center text-white py-20">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/clientShare" element={<ClientShare />} />
          <Route path="/projects" element={<Projects />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/register" element={<RegisterPage />} /> */}
        </Routes>
      </Suspense>
    </Base>
  );
}