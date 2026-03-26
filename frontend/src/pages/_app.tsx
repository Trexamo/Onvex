import type { AppProps } from 'next/app';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { Sidebar } from '../components/layout/Sidebar';
import { HeaderSuperior } from '../components/layout/HeaderSuperior';
import CommunityButton from '../components/CommunityButton';
import '../styles/globals.css';
import { useEffect } from 'react';

const publicRoutes = ['/auth/login', '/auth/register', '/onboarding'];

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { user, loading, isOnboarded } = useAuth();
  const isPublicRoute = publicRoutes.includes(router.pathname);
  const showSidebar = !isPublicRoute && user && isOnboarded;
  const showCommunityButton = !isPublicRoute && user && isOnboarded;

  useEffect(() => {
    if (!loading) {
      if (!user && !isPublicRoute) {
        router.push('/auth/login');
      }
      if (user && !isOnboarded && router.pathname !== '/onboarding') {
        router.push('/onboarding');
      }
      if (user && isOnboarded && isPublicRoute) {
        router.push('/');
      }
    }
  }, [user, loading, isOnboarded, router, isPublicRoute]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="loader"></div>
      </div>
    );
  }

  if (!user) {
    return <Component {...pageProps} />;
  }

  if (!isOnboarded && router.pathname === '/onboarding') {
    return <Component {...pageProps} />;
  }

  return (
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
      {showCommunityButton && <CommunityButton />}
    </div>
  );
}

export default function App(props: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent {...props} />
      </AuthProvider>
    </ThemeProvider>
  );
}
