import { Gender, Student, StudentRoleType } from "../types/student";

export const students: Student[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    profile:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop&auto=format",
    bloodGroup: "O+",
    hobbies: [
      { id: "h1", hobby: "Reading" },
      { id: "h2", hobby: "Chess" },
      { id: "h3", hobby: "Swimming" },
    ],
    achievements: [
      {
        id: "a1",
        name: "First Place - Science Fair 2023",
        certificateFile: "/certificates/science-fair-2023.pdf",
      },
    ],
    dob: "2000-05-15",
    gender: Gender.MALE,
    role: StudentRoleType.MaleClassRepresentative,
    classId: "c1",
    className: "12A",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
    isActive: true,
    studentEvent: [
      {
        id: "e1",
        name: "Annual Science Exhibition",
        description: "Presented research on renewable energy",
        timeline: "2023-11-20T14:00:00Z",
        createdAt: "2023-11-01T00:00:00Z",
        updatedAt: "2023-11-01T00:00:00Z",
      },
    ],
    departmentId: "d1",
    departmentName: "Science",
    facilitySlots: [
      {
        id: "f1",
        facility: "Library",
        time: "14:00-16:00",
        day: "Monday",
      },
    ],
    parentName: "Michael Smith",
    parentMobile: "+1234567890",
    parentEmail: "michael.smith@example.com",
    institutionId: "i1",
    institutionName: "Springfield High School",
  },
  {
    id: "2",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    profile:
      "https://images.unsplash.com/photo-1502767089025-6572583495b9?w=256&h=256&fit=crop&auto=format",
    bloodGroup: "A-",
    hobbies: [
      { id: "h4", hobby: "Dancing" },
      { id: "h5", hobby: "Singing" },
      { id: "h6", hobby: "Drawing" },
    ],
    achievements: [
      {
        id: "a2",
        name: "Winner - Art Competition 2023",
        certificateFile: "/certificates/art-competition-2023.pdf",
      },
    ],
    dob: "2001-07-20",
    gender: Gender.FEMALE,
    role: StudentRoleType.FemaleClassRepresentative, // Assuming this enum value exists
    classId: "c2",
    className: "12B",
    createdAt: "2023-02-01T00:00:00Z",
    updatedAt: "2023-02-01T00:00:00Z",
    isActive: true,
    studentEvent: [
      {
        id: "e2",
        name: "Drama Festival",
        description: "Performed in the school play",
        timeline: "2023-10-15T16:00:00Z",
        createdAt: "2023-10-01T00:00:00Z",
        updatedAt: "2023-10-01T00:00:00Z",
      },
    ],
    departmentId: "d2",
    departmentName: "Arts",
    facilitySlots: [
      {
        id: "f2",
        facility: "Auditorium",
        time: "10:00-12:00",
        day: "Wednesday",
      },
    ],
    parentName: "Karen Johnson",
    parentMobile: "+1987654321",
    parentEmail: "karen.johnson@example.com",
    institutionId: "i1",
    institutionName: "Springfield High School",
  },
  {
    id: "3",
    name: "Robert Brown",
    email: "robert.brown@example.com",
    profile:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=256&h=256&fit=crop&auto=format",
    bloodGroup: "B+",
    hobbies: [
      { id: "h7", hobby: "Football" },
      { id: "h8", hobby: "Gaming" },
    ],
    achievements: [
      {
        id: "a3",
        name: "Runner-up - Math Olympiad 2023",
        certificateFile: "/certificates/math-olympiad-2023.pdf",
      },
    ],
    dob: "1999-11-30",
    gender: Gender.MALE,
    role: StudentRoleType.MaleClassRepresentative,
    classId: "c3",
    className: "12C",
    createdAt: "2023-03-01T00:00:00Z",
    updatedAt: "2023-03-01T00:00:00Z",
    isActive: false,
    studentEvent: [
      {
        id: "e3",
        name: "Sports Day",
        description: "Participated in the relay race",
        timeline: "2023-09-25T09:00:00Z",
        createdAt: "2023-09-01T00:00:00Z",
        updatedAt: "2023-09-01T00:00:00Z",
      },
    ],
    departmentId: "d3",
    departmentName: "Physical Education",
    facilitySlots: [
      {
        id: "f3",
        facility: "Gymnasium",
        time: "08:00-10:00",
        day: "Friday",
      },
    ],
    parentName: "Sarah Brown",
    parentMobile: "+1123456789",
    parentEmail: "sarah.brown@example.com",
    institutionId: "i1",
    institutionName: "Springfield High School",
  },
];
