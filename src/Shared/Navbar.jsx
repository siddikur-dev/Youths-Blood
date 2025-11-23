// components/Navbar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });

    // Check login status
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
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

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setIsMenuOpen(false);

    // Login animation
    gsap.fromTo(
      ".user-avatar",
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" }
    );
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
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

  const smoothScroll = (e, href) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: element, offsetY: 80 },
          ease: "power2.inOut",
        });
      }
    } else {
      router.push(href);
    }
    setIsMenuOpen(false);
  };

  return (
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
              onClick={(e) => smoothScroll(e, "/")}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                BD
              </div>
              <span className="hidden sm:block">Youth Blood </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="nav-link text-gray-700 hover:text-red-600 font-medium transition-all duration-300 hover:scale-105"
              onClick={(e) => smoothScroll(e, "/")}
              data-aos="fade-down"
              data-aos-delay="100"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="nav-link text-gray-700 hover:text-red-600 font-medium transition-all duration-300 hover:scale-105"
              onClick={(e) => smoothScroll(e, "/about")}
              data-aos="fade-down"
              data-aos-delay="200"
            >
              About
            </Link>
            <Link
              href="/services"
              className="nav-link text-gray-700 hover:text-red-600 font-medium transition-all duration-300 hover:scale-105"
              onClick={(e) => smoothScroll(e, "/services")}
              data-aos="fade-down"
              data-aos-delay="300"
            >
              Services
            </Link>
            <Link
              href="/events"
              className="nav-link text-gray-700 hover:text-red-600 font-medium transition-all duration-300 hover:scale-105"
              onClick={(e) => smoothScroll(e, "/events")}
              data-aos="fade-down"
              data-aos-delay="400"
            >
              Events
            </Link>
            <Link
              href="/blog"
              className="nav-link text-gray-700 hover:text-red-600 font-medium transition-all duration-300 hover:scale-105"
              onClick={(e) => smoothScroll(e, "/blog")}
              data-aos="fade-down"
              data-aos-delay="500"
            >
              Blog
            </Link>
            <Link
              href="/pages"
              className="nav-link text-gray-700 hover:text-red-600 font-medium transition-all duration-300 hover:scale-105"
              onClick={(e) => smoothScroll(e, "/pages")}
              data-aos="fade-down"
              data-aos-delay="600"
            >
              Pages
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isLoggedIn ? (
              <div
                className="flex space-x-3"
                data-aos="fade-down"
                data-aos-delay="700"
              >
                <button
                  onClick={handleLogin}
                  className="px-6 py-2 border border-red-600 text-red-600 rounded-full font-medium hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Login
                </button>
                <button
                  onClick={handleLogin}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-red-300"
                >
                  <div className="user-avatar w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                    JD
                  </div>
                  <span className="text-gray-700 font-medium">John Doe</span>
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
                  <div className="dropdown-menu absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm text-gray-600">
                        john.doe@example.com
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/add-blood"
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
                        <span>Add Blood</span>
                      </Link>
                      <Link
                        href="/add-blog"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <span>Add Blog</span>
                      </Link>
                      <Link
                        href="/about"
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
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>About</span>
                      </Link>
                      <Link
                        href="/contact"
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
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Contact</span>
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
                onClick={(e) => smoothScroll(e, "/")}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="mobile-nav-link text-lg text-gray-700 hover:text-red-600 font-medium py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300 border-l-4 border-transparent hover:border-red-500"
                onClick={(e) => smoothScroll(e, "/about")}
              >
                About
              </Link>
              <Link
                href="/services"
                className="mobile-nav-link text-lg text-gray-700 hover:text-red-600 font-medium py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300 border-l-4 border-transparent hover:border-red-500"
                onClick={(e) => smoothScroll(e, "/services")}
              >
                Services
              </Link>
              <Link
                href="/events"
                className="mobile-nav-link text-lg text-gray-700 hover:text-red-600 font-medium py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300 border-l-4 border-transparent hover:border-red-500"
                onClick={(e) => smoothScroll(e, "/events")}
              >
                Events
              </Link>
              <Link
                href="/blog"
                className="mobile-nav-link text-lg text-gray-700 hover:text-red-600 font-medium py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300 border-l-4 border-transparent hover:border-red-500"
                onClick={(e) => smoothScroll(e, "/blog")}
              >
                Blog
              </Link>
              <Link
                href="/pages"
                className="mobile-nav-link text-lg text-gray-700 hover:text-red-600 font-medium py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300 border-l-4 border-transparent hover:border-red-500"
                onClick={(e) => smoothScroll(e, "/pages")}
              >
                Pages
              </Link>
            </div>

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-200 pt-6">
              {!isLoggedIn ? (
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleLogin}
                    className="w-full py-3 border border-red-600 text-red-600 rounded-xl font-medium hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 text-lg"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="user-avatar w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      JD
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">John Doe</p>
                      <p className="text-sm text-gray-600">
                        john.doe@example.com
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/add-blood"
                      className="flex flex-col items-center justify-center p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-300"
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
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-sm font-medium">Add Blood</span>
                    </Link>
                    <Link
                      href="/add-blog"
                      className="flex flex-col items-center justify-center p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-300"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <span className="text-sm font-medium">Add Blog</span>
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
  );
};

export default Navbar;
