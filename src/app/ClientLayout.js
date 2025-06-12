"use client";
import { usePathname } from 'next/navigation';
import Navbar from "./Navbar/page";
import Slidebar from "./Slidebar/page";
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';

const toastOptions = {
  success: {
    duration: 3000,
    style: {
      background: '#10B981',
      color: 'white',
      padding: '16px',
      borderRadius: '10px',
      fontSize: '14px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
  },
  error: {
    duration: 4000,
    style: {
      background: '#EF4444',
      color: 'white',
      padding: '16px',
      borderRadius: '10px',
      fontSize: '14px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
  },
};

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const isAuthPage = pathname?.includes('/Login') || pathname?.includes('/Register');

  // Initialize user state from localStorage if available
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      dispatch(setUser(JSON.parse(userData)));
    }
  }, [dispatch]);

  // If it's an auth page, only render children
  if (isAuthPage) {
    return (
      <>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName="react-hot-toast"
          toastOptions={toastOptions}
        />
        {children}
      </>
    );
  }

  // For non-auth pages, render the full layout
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName="react-hot-toast"
        toastOptions={toastOptions}
      />
      
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 ">
        <Navbar />
      </div>

      <div className="flex pt-16"> {/* Add padding top to account for fixed navbar */}
        {/* Sidebar */}
        <div className="fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32">
          <Slidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 ml-16 md:ml-20 lg:ml-24 xl:ml-28 ">
          <div className="max-w-screen-3xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 