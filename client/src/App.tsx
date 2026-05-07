import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import {
  SidebarInset,
  SidebarProvider,
  Toaster,
} from '@databricks/appkit-ui/react';
import { AppSidebar } from '@/components/AppSidebar';
import { OverviewPage } from '@/pages/OverviewPage';
import { MarketsPage } from '@/pages/MarketsPage';
import { BrandsPage } from '@/pages/BrandsPage';
import { StoresPage } from '@/pages/StoresPage';
import { ChannelsPage } from '@/pages/ChannelsPage';
import { FinancialsPage } from '@/pages/FinancialsPage';
import { WorkflowsPage } from '@/pages/WorkflowsPage';
import { AlertsPage } from '@/pages/AlertsPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { DataExplorerPage } from '@/pages/DataExplorerPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { BrandingProvider } from '@/branding/BrandingProvider';

function Layout() {
  return (
    <BrandingProvider>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
    </BrandingProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <OverviewPage /> },
      { path: '/markets', element: <MarketsPage /> },
      { path: '/brands', element: <BrandsPage /> },
      { path: '/stores', element: <StoresPage /> },
      { path: '/channels', element: <ChannelsPage /> },
      { path: '/financials', element: <FinancialsPage /> },
      { path: '/workflows', element: <WorkflowsPage /> },
      { path: '/alerts', element: <AlertsPage /> },
      { path: '/reports', element: <ReportsPage /> },
      { path: '/data-explorer', element: <DataExplorerPage /> },
      { path: '/settings', element: <SettingsPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
