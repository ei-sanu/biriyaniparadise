import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
}

const Layout = ({ children, toggleTheme, currentTheme }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleTheme={toggleTheme} currentTheme={currentTheme} />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;