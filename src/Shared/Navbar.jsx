// components/Navbar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const router = useRouter();

  const isLoggedIn = !!session;

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });

    // GSAP animations
    if (navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }

    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1,
          delay: 0.3,
          ease: "back.out(1.7)",
        }
      );
    }
  }, []);

  useEffect(() => {
    // Mobile menu animation
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(
          menuRef.current,
          { x: -300, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
        );
      } else {
        gsap.to(menuRef.current, {
          x: -300,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
        });
      }
    }
  }, [isMenuOpen]);

  const handleLoginRedirect = () => {
    router.push("/auth/login");
    setIsMenuOpen(false);
  };

  const handleRegisterRedirect = () => {
    router.push("/auth/register");
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

    if (!isDropdownOpen) {
      gsap.fromTo(
        ".dropdown-menu",
        { scaleY: 0, opacity: 0, transformOrigin: "top" },
        { scaleY: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  // User avatar with fallback
  const getUserAvatar = () => {
    if (session?.user?.image) {
      return (
        <img
          src={session.user.image}
          alt={session.user.name || "User"}
          className="w-10 h-10 rounded-full object-cover shadow-md"
        />
      );
    }

    // Default avatar with user's first letter
    const firstLetter = session?.user?.name?.charAt(0)?.toUpperCase() || "U";
    return (
      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
        {firstLetter}
      </div>
    );
  };

  // User info for mobile
  const getUserInfoMobile = () => {
    if (!session?.user) return null;

    return (
      <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-xl">
        {getUserAvatar()}
        <div>
          <p className="font-medium text-gray-900">
            {session.user.name || "User"}
          </p>
          <p className="text-sm text-gray-600">{session.user.email}</p>
          {session.user.bloodGroup && (
            <p className="text-xs text-red-600 mt-1">
              Blood Group: {session.user.bloodGroup}
            </p>
          )}
        </div>
      </div>
    );
  };

  // User info for desktop dropdown header
  const getUserInfoDesktop = () => {
    if (!session?.user) return null;

    return (
      <div className="p-4 border-b border-gray-100 bg-red-50">
        <p className="font-medium text-gray-900">
          {session.user.name || "User"}
        </p>
        <p className="text-sm text-gray-600 mt-1">{session.user.email}</p>
        {session.user.bloodGroup && (
          <p className="text-xs text-red-600 mt-1">
            Blood Group: {session.user.bloodGroup}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-gray-200"
        data-aos="fade-down"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div ref={logoRef} className="flex items-center space-x-2">
              <Link
                href="/"
                className="flex items-center space-x-2 text-xl font-bold text-red-600 hover:text-red-700 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  YB
                </div>
                <span className="hidden sm:block">Youth Blood</span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className="nav-link text-gray-700 hover:text-red-600 font-medium transition-all duration-300 hover:scale-105"
                data-aos="fade-down"
                data-aos-delay="100"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="nav-link text-gray-700 hover:text-red-600 font-medium transition-all duration-300 hover:scale-105"
                data-aos="fade-down"
                data-aos-delay="200"
              >
                About
              </Link>
              <Link
                href="/blood-request"
                className="nav-link text-gray-700 hover:text-red-600 font-medium transition-all duration-300 hover:scale-105"
                data-aos="fade-down"
                data-aos-delay="300"
              >
                Blood Request
              </Link>
              <Link
                href="/find-donor"
                className="nav-link text-gray-700 hover:text-red-600 font-medium transition-all duration-300 hover:scale-105"
                data-aos="fade-down"
                data-aos-delay="400"
              >
                Find Donor
              </Link>
              <Link
                href="/events"
                className="nav-link text-gray-700 hover:text-red-600 font-medium transition-all duration-300 hover:scale-105"
                data-aos="fade-down"
                data-aos-delay="500"
              >
                Events
              </Link>
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {!isLoggedIn ? (
                <div
                  className="flex space-x-3"
                  data-aos="fade-down"
                  data-aos-delay="600"
                >
                  <button
                    onClick={handleLoginRedirect}
                    className="px-6 py-2 border border-red-600 text-red-600 rounded-full font-medium hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleRegisterRedirect}
                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-3 bg-white rounded-full px-4 py-2 hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-red-300 shadow-sm"
                  >
                    {getUserAvatar()}
                    <span className="text-gray-700 font-medium hidden md:block">
                      {session.user?.name || "My Profile"}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="dropdown-menu absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                      {getUserInfoDesktop()}
                      <div className="p-2">
                        <Link
                          href="/dashboard"
                          className="dropdown-item flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/my-profile"
                          className="dropdown-item flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span>My Profile</span>
                        </Link>
                        <Link
                          href="/blood-request"
                          className="dropdown-item flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          <span>Blood Request</span>
                        </Link>
                        <Link
                          href="/donation-history"
                          className="dropdown-item flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                          <span>Donation History</span>
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden flex flex-col space-y-1 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <span
                className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            ref={menuRef}
            className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-4 mb-6">
                <Link
                  href="/"
                  className="mobile-nav-link text-lg text-gray-700 hover:text-red-600 font-medium py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300 border-l-4 border-transparent hover:border-red-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="mobile-nav-link text-lg text-gray-700 hover:text-red-600 font-medium py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300 border-l-4 border-transparent hover:border-red-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/blood-request"
                  className="mobile-nav-link text-lg text-gray-700 hover:text-red-600 font-medium py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300 border-l-4 border-transparent hover:border-red-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blood Request
                </Link>
                <Link
                  href="/find-donor"
                  className="mobile-nav-link text-lg text-gray-700 hover:text-red-600 font-medium py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300 border-l-4 border-transparent hover:border-red-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Find Donor
                </Link>
                <Link
                  href="/events"
                  className="mobile-nav-link text-lg text-gray-700 hover:text-red-600 font-medium py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300 border-l-4 border-transparent hover:border-red-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Events
                </Link>
              </div>

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-6">
                {!isLoggedIn ? (
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={handleLoginRedirect}
                      className="w-full py-3 border border-red-600 text-red-600 rounded-xl font-medium hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 text-lg"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleRegisterRedirect}
                      className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                    >
                      Register
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getUserInfoMobile()}
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/dashboard"
                        className="flex flex-col items-center justify-center p-4 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg
                          className="w-6 h-6 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        <span className="text-sm font-medium text-center">
                          Dashboard
                        </span>
                      </Link>
                      <Link
                        href="/my-profile"
                        className="flex flex-col items-center justify-center p-4 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg
                          className="w-6 h-6 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-center">
                          My Profile
                        </span>
                      </Link>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 text-red-600 border border-red-600 rounded-xl font-medium hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
