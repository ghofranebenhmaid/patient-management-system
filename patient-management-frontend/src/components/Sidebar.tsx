"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { authService } from "@/lib/auth";
import { useUser } from "@/contexts/UserContext";
import { useRouter, usePathname } from "next/navigation";
import {
  Users,
  Calendar,
  LayoutDashboard,
  LogOut,
  Settings,
  Activity,
  FileText,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & stats"
  },
  {
    name: "Patients",
    href: "/patients",
    icon: Users,
    description: "Manage patients"
  },
  {
    name: "Appointments",
    href: "/appointments",
    icon: Calendar,
    description: "Schedule & bookings"
  },
  {
    name: "Medical Records",
    href: "/records",
    icon: FileText,
    description: "Patient files"
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: Activity,
    description: "Reports & insights"
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    description: "System config"
  },
];

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    logout();
    router.push("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white border-r border-slate-200/60 shadow-sm">
      {/* Logo/Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200/60">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">HealthCare</h1>
            <p className="text-xs text-slate-500 font-medium">Patient Management</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden hover:bg-slate-100"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left font-medium h-12 px-4 group transition-all duration-200",
                isActive
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              )}
              onClick={() => {
                router.push(item.href);
                setIsMobileMenuOpen(false);
              }}
            >
              <item.icon className={cn(
                "w-5 h-5 mr-3 transition-colors",
                isActive ? "text-white" : "text-slate-500 group-hover:text-slate-700"
              )} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{item.name}</div>
                <div className={cn(
                  "text-xs opacity-75 truncate",
                  isActive ? "text-blue-100" : "text-slate-500"
                )}>
                  {item.description}
                </div>
              </div>
              {isActive && (
                <ChevronRight className="w-4 h-4 text-white/80" />
              )}
            </Button>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-slate-200/60 bg-slate-50/50">
        <Card className="shadow-sm border-slate-200/60">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-slate-600" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {user ? `${user.firstName} ${user.lastName}` : "User"}
                </p>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={user?.role === 'admin' ? "default" : "secondary"}
                    className="text-xs px-2 py-0.5"
                  >
                    {user?.role === 'admin' ? 'Admin' : 'Provider'}
                  </Badge>
                  <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                  <span className="text-xs text-slate-500">Online</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors duration-200"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-10 lg:hidden bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-lg hover:bg-white"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="w-4 h-4" />
      </Button>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 z-50 transform transition-transform duration-300 ease-in-out">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className={cn("hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:z-30", className)}>
        <SidebarContent />
      </div>
    </>
  );
}

export default Sidebar; 