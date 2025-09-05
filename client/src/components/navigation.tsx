import { Link, useLocation } from "wouter";
import { Home, Shirt, Folder } from "lucide-react";

const navigationItems = [
  { path: "/wardrobe", icon: Home, label: "Гардероб" },
  { path: "/builder", icon: Shirt, label: "Конструктор" },
  { path: "/outfits", icon: Folder, label: "Образы" },
];

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md glass-nav">
      <div className="flex justify-around py-3">
        {navigationItems.map((item) => {
          const isActive = location === item.path || (location === "/" && item.path === "/wardrobe");
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`nav-item flex flex-col items-center space-y-1 py-2 px-4 rounded-xl ${
                isActive ? "active text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-[#D9CBC2]/20"
              }`}
              data-testid={`nav-${item.path.slice(1)}`}
            >
              <item.icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
