'use client'

import Link from "next/link";
import { useState } from "react";
import { useTextSize } from "./text-size-provider";

const navigationItems = [
  { name: "Contact", href: "/contact", icon: "📧" },
  { name: "Code of Conduct", href: "/code-of-conduct", icon: "📋" },
  { name: "About", href: "/about", icon: "ℹ️" },
  { name: "MeetUp", href: "https://www.meetup.com/dutch-powershell-user-group/", icon: "🎫" },
  { name: "GitHub", href: "https://github.com/dupsug", icon: "🐙" }
];

const isExternal = (href: string) => href.startsWith("http");

export function TerminalHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTextSizeMenuOpen, setIsTextSizeMenuOpen] = useState(false);
  const { textSize, setTextSize } = useTextSize();

  return (
    <header className="bg-gray-800/90 backdrop-blur border-b border-gray-700/50 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-12">
        <Link href="/" className="flex items-center gap-2 text-gray-300 font-mono text-sm hover:text-white transition-colors duration-200">
          <span className="text-blue-400">⚡</span>
          <span className="font-bold text-lg">Dutch PowerShell User Group</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          {navigationItems.map((item) => {
            const external = isExternal(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group relative flex items-center gap-2 px-3 py-2 text-sm font-mono text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 border-r border-gray-700/30 last:border-r-0"
                aria-label={external ? `${item.name} (opens in new tab)` : item.name}
              >
                <span className="text-xs opacity-70">{item.icon}</span>
                <span className="font-semibold">
                  {item.name}
                  {external && (
                    <>
                      <span aria-hidden className="ml-1 opacity-70">↗</span>
                      <span className="sr-only">(opens in new tab)</span>
                    </>
                  )}
                </span>
                <span className="opacity-0 group-hover:opacity-50 hover:opacity-100 text-xs ml-1 cursor-pointer transition-opacity">×</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="text-lg">{isMobileMenuOpen ? "×" : "≡"}</span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur border-b border-gray-700/50">
          <nav className="px-4 py-2">
            {/* Text Size Selector */}
            <div className="mb-2 pb-2 border-b border-gray-700/20">
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="text-sm opacity-70">📏</span>
                <span className="text-sm font-mono text-gray-300">Text Size:</span>
              </div>
              <div className="flex gap-1 px-3">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setTextSize(size)}
                    className={`px-2 py-1 text-xs font-mono capitalize transition-colors duration-200 ${
                      textSize === size
                        ? 'text-blue-400 bg-gray-700/50'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                    aria-label={`Set text size to ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Items */}
            {navigationItems.map((item) => {
              const external = isExternal(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-sm font-mono text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 border-b border-gray-700/20 last:border-b-0"
                  aria-label={external ? `${item.name} (opens in new tab)` : item.name}
                >
                  <span className="text-sm opacity-70">{item.icon}</span>
                  <span className="font-semibold flex-1">
                    {item.name}
                    {external && (
                      <>
                        <span aria-hidden className="ml-1 opacity-70">↗</span>
                        <span className="sr-only">(opens in new tab)</span>
                      </>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
