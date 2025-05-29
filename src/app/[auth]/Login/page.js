"use client";
import React, { useState, useEffect } from "react";
import Logo from "../../image/Logo.png";
import Layer2 from "../../image/Layer_2.png";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Prevent back navigation when not authenticated
  useEffect(() => {
    const preventBackNavigation = (event) => {
      const token = Cookies.get('token');
      if (!token) {
        window.history.forward();
      }
    };

    window.addEventListener('popstate', preventBackNavigation);
    
    // Clear any existing history when the login page loads
    if (!Cookies.get('token')) {
      window.history.pushState(null, '', window.location.href);
    }

    return () => window.removeEventListener('popstate', preventBackNavigation);
  }, []);

  // Check authentication status and handle redirection
  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('token');
      if (token) {
        const callbackUrl = searchParams.get('callbackUrl');
        // If there's a callback URL and it's not the root path, redirect to it
        if (callbackUrl && callbackUrl !== '/') {
          router.push(decodeURIComponent(callbackUrl));
        } else {
          router.push('/SaleChannel');
        }
      }
    };

    checkAuth();
  }, [router, searchParams]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store token in cookie with secure settings
      Cookies.set('token', data.token, { 
        expires: 1,
        path: '/',
        secure: true,
        sameSite: 'strict'
      });
      
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify({
        id: data.user.id,
        email: formData.email,
        name: data.user.name
      }));

      toast.success('Login successful!');
      
      // Handle redirection after successful login
      const callbackUrl = searchParams.get('callbackUrl');
      // If there's a callback URL and it's not the root path, redirect to it
      if (callbackUrl && callbackUrl !== '/') {
        router.push(decodeURIComponent(callbackUrl));
      } else {
        router.push("/SaleChannel");
      }
    } catch (err) {
      toast.error(err.message);
      // Clear any existing token and user data if login fails
      Cookies.remove('token', { path: '/' });
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-h-[50%] flex flex-col md:flex-row bg-white">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-10 text-center">
        <Image src={Logo} alt="Logo" width={300} className="mb-6" />
        <Image
          src={Layer2}
          alt="Illustration"
          className="mb-6"
          width={400}
          height={400}
        />
        <h2 className="text-xl font-semibold mb-1">
          Do More. Better. Faster with
        </h2>
        <h1 className="text-2xl font-bold text-black mb-4">eComsChannel</h1>
        <p className="text-sm text-gray-600 max-w-md">
          eComChannels is a complete all-in-one solution for marketplaces. It
          consolidates online marketplaces into a single integrated management
          platform. Launch your product confidently to multiple major
          marketplaces worldwide effortlessly and efficiently.
        </p>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 bg-blue-400 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-white text-xl font-semibold text-center">
            Welcome back to eComsChannel
          </h2>

          {/* Google Login */}
          <div className="flex justify-center items-center">
            <button className="px-2 gap-2 flex items-center justify-center bg-white text-black py-2 rounded-full shadow ">
              <FcGoogle size={20} />
              Log In with Google
            </button>
          </div>

          {/* Email and Password Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white text-sm">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border-b-1 border-white bg-transparent text-white focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border-b-1 border-white bg-transparent text-white focus:outline-none"
                required
              />
            </div>

            <div className="flex justify-between items-center text-white text-sm">
              <div>
                <input type="checkbox" className="mr-2" />
                Remember me
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2 px-6 rounded-full bg-[#7B76F1] text-white text-sm cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Loading..." : "LOG IN"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
