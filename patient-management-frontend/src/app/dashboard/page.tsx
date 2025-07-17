"use client";

import { Button } from "@/components/ui/button";
import { authService } from "@/lib/auth";
import { RabbitIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with logout button */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

            <RabbitIcon className="size-9" /> 
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <svg 
                className="w-4 h-4" 
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
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
           
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <button  
                   onClick={() => router.push("/patients")}
                   className="border cursor-pointer rounded-lg p-6 hover:shadow-md transition-shadow text-center w-full"
                 >
                   <div className="size-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                     <svg className="size-9 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                     </svg>
                   </div>
                   <h4 className="font-medium text-gray-900">Patient Management</h4>
                   <p className="text-sm text-gray-600 mt-2">
                     Manage patient information
                   </p>
                 </button>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className=" size-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className=" size-9 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h6m-6 0l-.5 5.5A1.5 1.5 0 0010 14h4a1.5 1.5 0 001.5-1.5L15 7H9z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-900">Appointments</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Schedule and manage appointments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 