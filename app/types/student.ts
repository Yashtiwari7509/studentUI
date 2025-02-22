export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum StudentRoleType {
  MaleClassRepresentative = "MaleClassRepresentative",
  FemaleClassRepresentative = "FemaleClassRepresentative",
}

export interface Achievement {
  id: string;
  name: string;
  certificateFile: string;
}

export interface Hobby {
  id: string;
  hobby: string;
}

export interface StudentEvent {
  id: string;
  name: string;
  description?: string;
  timeline: string;
  createdAt: string;
  updatedAt: string;
}

export interface FacilitySlot {
  id: string;
  facility: string;
  time: string;
  day: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  profile?: string;
  bloodGroup?: string;
  hobbies: Hobby[];
  achievements: Achievement[];
  dob?: string;
  gender: Gender;
  role?: StudentRoleType;
  classId?: string;
  className?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  studentEvent: StudentEvent[];
  departmentId: string;
  departmentName: string;
  facilitySlots: FacilitySlot[];

  // Parent Information
  parentName: string;
  parentMobile: string;
  parentEmail: string;

  institutionId: string;
  institutionName: string;
  isPresent?: boolean;
}
