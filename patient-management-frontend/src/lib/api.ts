import { api } from "./auth";

// Patient types
export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
}

export interface CreatePatientDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
}

export type UpdatePatientDto = Partial<CreatePatientDto>;

// Patient service
export const patientService = {
  // Get all patients
  async getAll(): Promise<Patient[]> {
    try {
      const response = await api.get("/patients");
      return response.data;
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw new Error("Failed to fetch patients");
    }
  },

  // Get patient by ID
  async getById(id: number): Promise<Patient> {
    try {
      const response = await api.get(`/patients/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching patient:", error);
      throw new Error("Failed to fetch patient");
    }
  },

  // Create new patient
  async create(patientData: CreatePatientDto): Promise<Patient> {
    try {
      const response = await api.post("/patients", patientData);
      return response.data;
    } catch (error) {
      console.error("Error creating patient:", error);
      throw new Error("Failed to create patient");
    }
  },

  // Update patient
  async update(id: number, patientData: UpdatePatientDto): Promise<Patient> {
    try {
      const response = await api.patch(`/patients/${id}`, patientData);
      return response.data;
    } catch (error) {
      console.error("Error updating patient:", error);
      throw new Error("Failed to update patient");
    }
  },

  // Delete patient
  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/patients/${id}`);
    } catch (error) {
      console.error("Error deleting patient:", error);
      throw new Error("Failed to delete patient");
    }
  },
}; 