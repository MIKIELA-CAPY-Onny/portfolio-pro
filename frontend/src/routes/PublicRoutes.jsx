import { Routes, Route } from 'react-router-dom';
import Home from '@pages/public/Home';
import About from '@pages/public/About';
import Skills from '@pages/public/Skills';
import Projects from '@pages/public/Projects';
import ProjectDetails from '@pages/public/ProjectDetails';
import Services from '@pages/public/Services';
import Experiences from '@pages/public/Experiences';
import Education from '@pages/public/Education';
import Certifications from '@pages/public/Certifications';
import Contact from '@pages/public/Contact';
import NotFound from '@pages/public/NotFound';

const PublicRoutes = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="skills" element={<Skills />} />
    <Route path="projects" element={<Projects />} />
    <Route path="projects/:slug" element={<ProjectDetails />} />
    <Route path="services" element={<Services />} />
    <Route path="experiences" element={<Experiences />} />
    <Route path="education" element={<Education />} />
    <Route path="certifications" element={<Certifications />} />
    <Route path="contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default PublicRoutes;