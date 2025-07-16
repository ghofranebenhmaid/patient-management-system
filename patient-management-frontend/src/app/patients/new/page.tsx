"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";
import PatientForm from "@/components/PatientForm";

export default function NewPatientPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
      
      if (!authenticated) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return null; // Prevent flash of content during auth check
  }

  if (!isAuthenticated) {
    return null; // Prevent flash of content before redirect
  }

  return (
    <PatientForm 
      mode="create"
      onSuccess={() => {
        router.push("/patients");
      }}
    />
  );
} 