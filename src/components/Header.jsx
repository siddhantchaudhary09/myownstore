"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="text-2xl font-semibold tracking-tight">
          <span className="text-white">My</span>
          <span className="text-yellow-400">App</span>
        </div>

        {/* Navigation */}
        <nav className="space-x-6">
          <a href="/" className="hover:text-yellow-300 transition duration-200">
            Home
          </a>
          <a
            href="/about"
            className="hover:text-yellow-300 transition duration-200"
          >
            About
          </a>
          <a
            href="/services"
            className="hover:text-yellow-300 transition duration-200"
          >
            Services
          </a>
          <a
            href="/contact"
            className="hover:text-yellow-300 transition duration-200"
          >
            Contact
          </a>
        </nav>

        {/* User Authentication */}
        <div className="flex items-center space-x-4">
          {!session ? (
            <Button
              onClick={() => signIn()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
            >
              Sign In
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="font-medium">{session.user.name}</span>
              <Button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
