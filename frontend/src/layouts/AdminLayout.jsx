import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@components/dashboard/Sidebar';
import Header from '@components/dashboard/Header';
import DashboardLayout from '@components/dashboard/DashboardLayout';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      }
      header={
        <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
      }
    >
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminLayout;