"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Activity, FileText, Plus, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const stats = [
  {
    name: "Total Patients",
    value: "1,234",
    change: "+12%",
    changeType: "positive" as "positive" | "negative" | "neutral",
    icon: Users,
  },
  {
    name: "Appointments Today",
    value: "24",
    change: "+3",
    changeType: "positive" as "positive" | "negative" | "neutral",
    icon: Calendar,
  },
  {
    name: "Active Records",
    value: "892",
    change: "+8%",
    changeType: "positive" as "positive" | "negative" | "neutral",
    icon: FileText,
  },
  {
    name: "System Health",
    value: "98.5%",
    change: "0%",
    changeType: "neutral" as "positive" | "negative" | "neutral",
    icon: Activity,
  },
];

const quickActions = [
  {
    title: "Add New Patient",
    description: "Register a new patient in the system",
    href: "/patients/new",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Schedule Appointment",
    description: "Book a new appointment",
    href: "/appointments/new",
    icon: Calendar,
    color: "bg-green-500",
  },
  {
    title: "View Reports",
    description: "Access analytics and reports",
    href: "/analytics",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
  {
    title: "Medical Records",
    description: "Access patient records",
    href: "/records",
    icon: FileText,
    color: "bg-orange-500",
  },
];

function DashboardContent() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user ? `${user.firstName}` : "Healthcare Provider"}
        </h1>
        <p className="text-gray-600 mt-1">
          {`Here's what's happening in your healthcare system today.`}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6" onClick={() => router.push(action.href)}>
                <div className={`h-12 w-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your healthcare system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New patient registered</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Appointment scheduled</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Medical record updated</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
} 