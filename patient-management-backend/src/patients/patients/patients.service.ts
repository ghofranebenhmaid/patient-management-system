import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { PatientResponseDto } from '../dto/patient-response.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(
    createPatientDto: CreatePatientDto,
  ): Promise<PatientResponseDto> {
    const patient = this.patientRepository.create(createPatientDto);
    const savedPatient = await this.patientRepository.save(patient);
    return this.toResponseDto(savedPatient);
  }

  async findAll(): Promise<PatientResponseDto[]> {
    const patients = await this.patientRepository.find();
    return patients.map((patient) => this.toResponseDto(patient));
  }

  async findOne(id: number): Promise<PatientResponseDto> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return this.toResponseDto(patient);
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<PatientResponseDto> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    Object.assign(patient, updatePatientDto);
    const savedPatient = await this.patientRepository.save(patient);
    return this.toResponseDto(savedPatient);
  }

  async remove(id: number): Promise<void> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    await this.patientRepository.remove(patient);
  }

  private toResponseDto(patient: Patient): PatientResponseDto {
    return {
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      dob: patient.dob,
    };
  }
}
