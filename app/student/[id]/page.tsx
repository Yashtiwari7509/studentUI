import { students } from '../../data/students';
import StudentProfileClient from './student-profile-client';

// This is required for static site generation with dynamic routes
export function generateStaticParams() {
  return students.map((student) => ({
    id: student.id,
  }));
}

export default function StudentProfile({ params }: { params: { id: string } }) {
  const student = students.find((s) => s.id === params.id);

  if (!student) {
    return <div>Student not found</div>;
  }

  return <StudentProfileClient student={student} />;
}