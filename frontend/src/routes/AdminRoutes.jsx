import { Routes, Route } from 'react-router-dom';
import Dashboard from '@pages/admin/Dashboard';
import ProfileList from '@pages/admin/Profile/ProfileList';
import ProfileForm from '@pages/admin/Profile/ProfileForm';
import ProjectList from '@pages/admin/Projects/ProjectList';
import ProjectForm from '@pages/admin/Projects/ProjectForm';
import SkillList from '@pages/admin/Skills/SkillList';
import SkillForm from '@pages/admin/Skills/SkillForm';
import ServiceList from '@pages/admin/Services/ServiceList';
import ServiceForm from '@pages/admin/Services/ServiceForm';
import ExperienceList from '@pages/admin/Experiences/ExperienceList';
import ExperienceForm from '@pages/admin/Experiences/ExperienceForm';
import EducationList from '@pages/admin/Educations/EducationList';
import EducationForm from '@pages/admin/Educations/EducationForm';
import CertificationList from '@pages/admin/Certifications/CertificationList';
import CertificationForm from '@pages/admin/Certifications/CertificationForm';
import ContactList from '@pages/admin/Contacts/ContactList';
import MediaList from '@pages/admin/Media/MediaList';
import SettingsPage from '@pages/admin/Settings/SettingsPage';
import NotFound from '@pages/public/NotFound';

const AdminRoutes = () => (
  <Routes>
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
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AdminRoutes;