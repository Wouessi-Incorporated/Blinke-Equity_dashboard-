import { ProtectedRoute } from "@/components/features/auth/ProtectedRoute";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Brinkly Dashboard
            </h1>
          </div>
          <nav className="mt-6">
            <div className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main
            </div>
            <a href="/dashboard" className="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Dashboard
            </a>
            <a href="/dashboard/employees" className="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Employees
            </a>
            <a href="/dashboard/shared-drive" className="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Shared Drive
            </a>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}