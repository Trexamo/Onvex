import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { Sidebar } from '../components/layout/Sidebar';
import { HeaderSuperior } from '../components/layout/HeaderSuperior';
import CommunityButton from '../components/CommunityButton';
import '../styles/globals.css';

const noSidebarRoutes = ['/login', '/register', '/chat'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showSidebar = !noSidebarRoutes.includes(router.pathname);
  const showCommunityButton = !noSidebarRoutes.includes(router.pathname);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          {showSidebar && <Sidebar />}
          <div className="flex-1 flex flex-col">
            <HeaderSuperior />
            <main className="flex-1 p-6 overflow-auto">
              <div className="max-w-7xl mx-auto w-full">
                <Component {...pageProps} />
              </div>
            </main>
          </div>
        </div>
        {showCommunityButton && <CommunityButton />}
      </AuthProvider>
    </ThemeProvider>
  );
}
