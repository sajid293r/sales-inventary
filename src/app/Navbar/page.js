"use client";
import React, { useState, useEffect, useRef } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import {
  FiSearch,
  FiBell,
  FiMessageCircle,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Mail } from "lucide-react";
import Lig8 from "../image/Icons/Rectangle 230.png";
import Image from "next/image";

const Page = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [activePopover, setActivePopover] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  // Add effect to prevent back navigation after logout
  useEffect(() => {
    const preventBackNavigation = (event) => {
      if (!Cookies.get('token')) {
        window.history.forward();
      }
    };

    window.addEventListener('popstate', preventBackNavigation);
    return () => window.removeEventListener('popstate', preventBackNavigation);
  }, []);

  const popoverRefs = {
    notifications: useRef(null),
    messages: useRef(null),
    profile: useRef(null),
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.log(`Error attempting to enable fullscreen: ${e.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const togglePopover = (type) => {
    setActivePopover((prev) => (prev === type ? null : type));
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRefs.notifications.current &&
        !popoverRefs.notifications.current.contains(event.target) &&
        popoverRefs.messages.current &&
        !popoverRefs.messages.current.contains(event.target) &&
        popoverRefs.profile.current &&
        !popoverRefs.profile.current.contains(event.target)
      ) {
        setActivePopover(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [popoverRefs.notifications, popoverRefs.messages, popoverRefs.profile]);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserEmail(user.email);
    }
  }, []);

  const handleLogout = async () => {
    // Remove token from cookies
    Cookies.remove('token', { path: '/' });
    
    // Remove user data from localStorage
    localStorage.clear(); // Clear all localStorage data
    
    // Show success message
    toast.success('Logged out successfully');

    // Clear browser history
    const loginPageUrl = '/app/Login';
    
    // Replace the current state and clear history
    window.history.replaceState(null, '', loginPageUrl);
    
    // Add a new state to prevent going back
    window.history.pushState(null, '', loginPageUrl);
    
    // Force a hard navigation to login page
    window.location.href = loginPageUrl;
  };

  return (
    <nav className="bg-white shadow-sm w-full shadow-gray-600 px-4 py-2 flex items-center justify-between relative ">
      {/* Logo */}
      <div className="flex gap-6">
        <h1 className="text-xl font-bold">Sale Channel</h1>
        <Image 
          src={Lig8} 
          alt="Logo" 
          className="cursor-pointer" 
          onClick={toggleFullScreen}
        />
      </div>

      {/* Menu Button (Mobile Only) */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen((prev) => !prev)}>
          {menuOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button>
      </div>

      {/* Search bar (Desktop only) */}
      {showSearch && (
        <div className="hidden md:block absolute left-1/2 transform ml-72 -translate-x-1/2 w-1/2 max-w-md">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-2 py-2  border-b-2 border-gray-300 focus:border-blue-500 bg-transparent focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Icons */}
      <div
        className={`flex-col md:flex-row md:flex items-center gap-6 text-gray-600 text-xl absolute md:static bg-white md:bg-transparent top-full left-0 w-full md:w-auto transition-all duration-300 ease-in-out ${
          menuOpen ? "flex p-4 border-t" : "hidden md:flex"
        }`}
      >
        {/* Search Icon */}
        <FiSearch
          className="cursor-pointer hover:text-blue-500"
          title="Search"
          onClick={() => setShowSearch((prev) => !prev)}
        />

        {/* Notification Icon */}
        <div className="relative" ref={popoverRefs.notifications}>
          <FiBell
            className="cursor-pointer hover:text-blue-500"
            title="Notifications"
            onClick={() => togglePopover("notifications")}
          />
          {activePopover === "notifications" && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg p-4 z-10">
              <p className="text-sm">No new notifications</p>
            </div>
          )}
        </div>

        {/* Message Icon */}
        <div className="relative" ref={popoverRefs.messages}>
          <Mail
            className="cursor-pointer hover:text-blue-500"
            title="Messages"
            onClick={() => togglePopover("messages")}
          />
          {activePopover === "messages" && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg p-4 z-10">
              <p className="text-sm">No new messages</p>
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <div className="relative" ref={popoverRefs.profile}>
          <FiUser
            className="cursor-pointer hover:text-blue-500"
            title="Profile"
            onClick={() => togglePopover("profile")}
          />
          {activePopover === "profile" && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-4 z-10">
              <p className="text-sm mb-2">
                Signed in as <strong>{userEmail}</strong>
              </p>
              <button 
                onClick={handleLogout}
                className="text-blue-500 hover:underline text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Page;
