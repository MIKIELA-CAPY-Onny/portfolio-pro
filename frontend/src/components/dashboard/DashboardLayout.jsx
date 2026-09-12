const DashboardLayout = ({ sidebar, header, children }) => {
  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        {sidebar}
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="lg:hidden">
          {sidebar}
        </div>
        {header}

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;