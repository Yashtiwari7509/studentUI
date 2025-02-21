import { Gender, Student, StudentRoleType } from '../types/student';

export const students: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    profile: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop&auto=format',
    bloodGroup: 'O+',
    hobbies: [
      { id: 'h1', hobby: 'Reading' },
      { id: 'h2', hobby: 'Chess' },
      { id: 'h3', hobby: 'Swimming' }
    ],
    achievements: [
      {
        id: 'a1',
        name: 'First Place - Science Fair 2023',
        certificateFile: '/certificates/science-fair-2023.pdf'
      }
    ],
    dob: '2000-05-15',
    gender: Gender.MALE,
    role: StudentRoleType.MaleClassRepresentative,
    classId: 'c1',
    className: '12A',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    isActive: true,
    studentEvent: [
      {
        id: 'e1',
        name: 'Annual Science Exhibition',
        description: 'Presented research on renewable energy',
        timeline: '2023-11-20T14:00:00Z',
        createdAt: '2023-11-01T00:00:00Z',
        updatedAt: '2023-11-01T00:00:00Z'
      }
    ],
    departmentId: 'd1',
    departmentName: 'Science',
    facilitySlots: [
      {
        id: 'f1',
        facility: 'Library',
        time: '14:00-16:00',
        day: 'Monday'
      }
    ],
    parentName: 'Michael Smith',
    parentMobile: '+1234567890',
    parentEmail: 'michael.smith@example.com',
    institutionId: 'i1',
    institutionName: 'Springfield High School'
  },
  // Add more sample students here
];