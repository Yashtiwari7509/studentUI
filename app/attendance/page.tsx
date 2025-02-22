'use client'
import React from "react";

// import { useStore } from "@/lib/store";
import Header from "@/components/attendanceComponents/Header";
import FilterBar from "@/components/attendanceComponents/FilterBar";
import AttendanceGrid from "@/components/attendanceComponents/AttendanceGrid";
import StudentRow from "@/components/attendanceComponents/StudentRow";
import StatisticsPanel from "@/components/attendanceComponents/StatisticsPanel";

interface HomeProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
  onExport?: (format: "pdf" | "csv") => void;
  onSearch?: (query: string) => void;
  onClassFilter?: (section: string) => void;
  onStatusFilter?: (status: string) => void;
  onAttendanceChange?: (studentId: string, isPresent: boolean) => void;
  statistics?: {
    totalStudents: number;
    presentCount: number;
    absentCount: number;
    attendanceRate: number;
    weeklyTrend: Array<{ date: string; rate: number }>;
  };
  students?: Array<{
    id: string;
    name: string;
    studentId: string;
    avatarUrl?: string;
    isPresent?: boolean;
    lastUpdated?: string;
  }>;
}

const Home = ({
  initialDate = new Date(),
  onDateChange = () => {},
  onExport = () => {},
  onSearch = () => {},
  onClassFilter = () => {},
  onStatusFilter = () => {},
  onAttendanceChange = () => {},
  statistics = {
    totalStudents: 50,
    presentCount: 45,
    absentCount: 5,
    attendanceRate: 90,
    weeklyTrend: [
      { date: "Mon", rate: 92 },
      { date: "Tue", rate: 88 },
      { date: "Wed", rate: 95 },
      { date: "Thu", rate: 90 },
      { date: "Fri", rate: 85 },
    ],
  },
  students = [
    {
      id: "1",
      name: "John Doe",
      studentId: "STU001",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      isPresent: true,
      lastUpdated: "2024-03-20T09:00:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      studentId: "STU002",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      isPresent: false,
      lastUpdated: "2024-03-20T09:05:00Z",
    },
    {
      id: "3",
      name: "Mike Johnson",
      studentId: "STU003",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      isPresent: true,
      lastUpdated: "2024-03-20T09:10:00Z",
    },
  ],
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6 space-y-6">
        <Header
          date={initialDate}
          onDateChange={onDateChange}
          onExport={onExport}
        />
        <FilterBar
          onSearch={onSearch}
          onClassFilter={onClassFilter}
          onStatusFilter={onStatusFilter}
        />
        <StatisticsPanel statistics={statistics} />
        <AttendanceGrid
          students={students}
          onAttendanceChange={onAttendanceChange}
        />
      </div>
    </div>
  );
};

export default Home;