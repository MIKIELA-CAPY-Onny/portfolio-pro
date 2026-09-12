import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '@components/common/Loader';
import ProtectedRoute from './ProtectedRoute';

const PublicLayout = lazy(() => import('@layouts/PublicLayout'));
const AdminLayout = lazy(() => import('@layouts/AdminLayout'));
const Login = lazy(() => import('@pages/admin/Login'));

const Home = lazy(() => import('@pages/public/Home'));
const About = lazy(() => import('@pages/public/About'));
const Skills = lazy(() => import('@pages/public/Skills'));
const Projects = lazy(() => import('@pages/public/Projects'));
const ProjectDetails = lazy(() => import('@pages/public/ProjectDetails'));
const Services = lazy(() => import('@pages/public/Services'));
const Experiences = lazy(() => import('@pages/public/Experience'));
const Education = lazy(() => import('@pages/public/Education'));
const Certifications = lazy(() => import('@pages/public/Certifications'));
const Contact = lazy(() => import('@pages/public/Contact'));
const NotFound = lazy(() => import('@pages/public/NotFound'));

const Dashboard = lazy(() => import('@pages/admin/Dashboard'));
const ProfileList = lazy(() => import('@pages/admin/Profile/ProfileList'));
const ProfileForm = lazy(() => import('@pages/admin/Profile/ProfileForm'));
const ProjectList = lazy(() => import('@pages/admin/Projects/ProjectList'));
const ProjectForm = lazy(() => import('@pages/admin/Projects/ProjectForm'));
const SkillList = lazy(() => import('@pages/admin/Skills/SkillList'));
const SkillForm = lazy(() => import('@pages/admin/Skills/SkillForm'));
const ServiceList = lazy(() => import('@pages/admin/Services/ServiceList'));
const ServiceForm = lazy(() => import('@pages/admin/Services/ServiceForm'));
const ExperienceList = lazy(() => import('@pages/admin/Experiences/ExperienceList'));
const ExperienceForm = lazy(() => import('@pages/admin/Experiences/ExperienceForm'));
const EducationList = lazy(() => import('@pages/admin/Educations/EducationList'));
const EducationForm = lazy(() => import('@pages/admin/Educations/EducationForm'));
const CertificationList = lazy(() => import('@pages/admin/Certifications/CertificationList'));
const CertificationForm = lazy(() => import('@pages/admin/Certifications/CertificationForm'));
const ContactList = lazy(() => import('@pages/admin/Contacts/ContactList'));
const MediaList = lazy(() => import('@pages/admin/Media/MediaList'));
const SettingsPage = lazy(() => import('@pages/admin/Settings/SettingsPage'));

const PageLoader = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ backgroundColor: 'var(--bg-primary)' }}
  >
    <Loader size="lg" text="Chargement..." />
  </div>
);

const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicLayout />}>
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
      </Route>

      {/* Auth */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfileList />} />
        <Route path="profile/edit" element={<ProfileForm />} />
        <Route path="projects" element={<ProjectList />} />
        <Route path="projects/create" element={<ProjectForm />} />
        <Route path="projects/edit/:id" element={<ProjectForm />} />
        <Route path="skills" element={<SkillList />} />
        <Route path="skills/create" element={<SkillForm />} />
        <Route path="skills/edit/:id" element={<SkillForm />} />
        <Route path="services" element={<ServiceList />} />
        <Route path="services/create" element={<ServiceForm />} />
        <Route path="services/edit/:id" element={<ServiceForm />} />
        <Route path="experiences" element={<ExperienceList />} />
        <Route path="experiences/create" element={<ExperienceForm />} />
        <Route path="experiences/edit/:id" element={<ExperienceForm />} />
        <Route path="educations" element={<EducationList />} />
        <Route path="educations/create" element={<EducationForm />} />
        <Route path="educations/edit/:id" element={<EducationForm />} />
        <Route path="certifications" element={<CertificationList />} />
        <Route path="certifications/create" element={<CertificationForm />} />
        <Route path="certifications/edit/:id" element={<CertificationForm />} />
        <Route path="contacts" element={<ContactList />} />
        <Route path="media" element={<MediaList />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;