import Link from "next/link";

const navigationItems = [
  { name: "Contact", href: "/contact", icon: "📧" },
  { name: "Code of Conduct", href: "/code-of-conduct", icon: "📋" },
  { name: "MeetUp", href: "https://www.meetup.com/dutch-powershell-user-group/", icon: "🎫" },
  { name: "About", href: "/about", icon: "ℹ️" },
  { name: "GitHub", href: "https://github.com/dupsug", icon: "🐙" },
];

const isExternal = (href: string) => href.startsWith("http");

export function TerminalHeader() {
  return (
    <header className="bg-gray-800/90 backdrop-blur border-b border-gray-700/50 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-12">
        <Link href="/" className="flex items-center gap-2 text-gray-300 font-mono text-sm hover:text-white transition-colors duration-200">
          <span className="text-blue-400">⚡</span>
          <span className="font-bold text-lg">Dutch PowerShell User Group</span>
        </Link>

        <nav className="flex items-center">
          {navigationItems.map((item) => {
            const external = isExternal(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group relative flex items-center gap-2 px-4 py-2 text-sm font-mono text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 border-r border-gray-700/30 last:border-r-0"
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
      </div>
    </header>
  );
}
