import React from "react";

const Footer = () => {
  return (
    <footer className=" text-white mt-5 py-6 px-4">
      {/* Top Section: Navigation Links */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Explore Section */}
        <div>
          <h4 className="font-bold text-lg mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Live Matches
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Upcoming Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Leaderboards
              </a>
            </li>
          </ul>
        </div>

        {/* My Account Section */}
        <div>
          <h4 className="font-bold text-lg mb-3">My Account</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-300">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Wallet
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Betting History
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h4 className="font-bold text-lg mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-300">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Connect Section */}
        <div>
          <h4 className="font-bold text-lg mb-3">Connect</h4>
          <ul className="flex gap-4">
            <li>
              <a href="#" className="hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
            </li>
            <li>
                <a href="#" className="hover:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Disclaimer */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-center">
        <p className="mb-2">
          © {new Date().getFullYear()} CryptoBetz. All rights reserved.
        </p>
        <p>
          Betting involves risks. Please play responsibly. Visit{" "}
          <a
            href="https://www.begambleaware.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            BeGambleAware.org
          </a>{" "}
          for more information.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
