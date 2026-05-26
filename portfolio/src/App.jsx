import React, { Suspense, lazy } from "react";
import Base from "./components/Base.jsx";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const Contact = lazy(() =>
  import("./pages/account/Contact.jsx")
);

const ClientShare = lazy(() =>
  import("./pages/ClientShare.jsx")
);

const Projects = lazy(() =>
  import("./pages/Projects.jsx")
);

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
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/clientShare"
            element={<ClientShare />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />
        </Routes>
      </Suspense>
    </Base>
  );
}