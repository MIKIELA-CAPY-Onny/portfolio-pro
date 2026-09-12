import { createBrowserRouter } from 'react-router-dom';

import PublicLayout from '@layouts/PublicLayout';
import AdminLayout from '@layouts/AdminLayout';
import ProtectedRoute from '@routes/ProtectedRoute';

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

import Login from '@pages/admin/Login';
import Dashboard from '@pages/admin/Dashboard';
import ProfileList from '@pages/admin/Profile/ProfileList';
import ProfileForm from '@pages/admin/Profile/ProfileForm';
import ProjectList from '@pages/admin/Projects/ProjectList';
import ProjectForm from '@pages/admin/Projects/ProjectForm';
import SkillList from '@pages/admin/Skills/SkillList';
import SkillForm from '@pages/admin/Skills/SkillForm';
import ServiceList from '@pages/admin/Services/ServiceList';
import ServiceForm from '@pages/admin/Services/ServiceForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'skills', element: <Skills /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:slug', element: <ProjectDetails /> },
      { path: 'services', element: <Services /> },
      { path: 'experiences', element: <Experiences /> },
      { path: 'education', element: <Education /> },
      { path: 'certifications', element: <Certifications /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'profile', element: <ProfileList /> },
      { path: 'profile/edit', element: <ProfileForm /> },
      { path: 'projects', element: <ProjectList /> },
      { path: 'projects/create', element: <ProjectForm /> },
      { path: 'projects/edit/:id', element: <ProjectForm /> },
      { path: 'skills', element: <SkillList /> },
      { path: 'skills/create', element: <SkillForm /> },
      { path: 'skills/edit/:id', element: <SkillForm /> },
      { path: 'services', element: <ServiceList /> },
      { path: 'services/create', element: <ServiceForm /> },
      { path: 'services/edit/:id', element: <ServiceForm /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);