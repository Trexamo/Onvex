import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { Sidebar } from '../components/layout/Sidebar';
import { HeaderSuperior } from '../components/layout/HeaderSuperior';
import '../styles/globals.css';
import { useEffect } from 'react';

const publicRoutes = ['/auth/login', '/auth/register', '/onboarding'];

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const isPublic = publicRoutes.includes(router.pathname);
  const showSidebar = user && user.role && !isPublic;

  useEffect(() => {
    if (!loading) {
      if (!user && !isPublic) {
        router.push('/auth/login');
      }
      if (user && !user.role && router.pathname !== '/onboarding') {
        router.push('/onboarding');
      }
      if (user && user.role && isPublic) {
        router.push('/');
      }
    }
  }, [user, loading, router, isPublic]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;

  if (!user || !user.role) {
    return <Component {...pageProps} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {showSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <HeaderSuperior />
        <main className="flex-1 p-6">
          <Component {...pageProps} />
        </main>
      </div>
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
