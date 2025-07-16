"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { authService } from "@/lib/auth";
import { Patient, patientService } from "@/lib/api";
import PatientForm from "@/components/PatientForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditPatientPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (!authenticated) {
        router.push("/login");
        return;
      }
    };

    checkAuth();
  }, [router]);

  // Fetch patient data
  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientId || isNaN(Number(patientId))) {
        setError("Invalid patient ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await patientService.getById(Number(patientId));
        setPatient(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching patient:", err);
        setError("Failed to load patient data");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && patientId) {
      fetchPatient();
    }
  }, [patientId, isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Prevent flash of content before redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/patients")}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Patients</span>
                </Button>
                <div className="h-6 w-px bg-gray-300" />
                <h1 className="text-2xl font-bold text-gray-900">Edit Patient</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Loading */}
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading patient data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/patients")}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Patients</span>
                </Button>
                <div className="h-6 w-px bg-gray-300" />
                <h1 className="text-2xl font-bold text-gray-900">Edit Patient</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Error */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
            <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Patient</h3>
            <p className="text-red-600 mb-4">{error || "Patient not found"}</p>
            <div className="space-x-3">
              <Button
                variant="outline"
                onClick={() => router.push("/patients")}
              >
                Back to Patients
              </Button>
              <Button
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PatientForm 
      mode="edit"
      initialData={patient}
      onSuccess={() => {
        router.push("/patients");
      }}
    />
  );
} 