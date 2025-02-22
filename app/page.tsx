"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { students } from "./data/students";
import { useRouter } from "next/navigation";
import { Gender, Student } from "./types/student";
import { Switch } from "@/components/ui/switch";
import StatisticsPanel from "@/components/attendanceComponents/StatisticsPanel";
import Header from "@/components/attendanceComponents/Header";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [studentStatus, setStudentStatus] = useState<Record<string, boolean>>(
    students.reduce(
      (acc, student) => ({ ...acc, [student.id]: student?.isPresent }),
      {}
    )
  );

  const handleStatusChange = (studentId: string, isPresent: boolean) => {
    setStudentStatus((prevState) => ({ ...prevState, [studentId]: isPresent }));
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.id.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || student.departmentName === departmentFilter;
    const matchesGender =
      genderFilter === "all" || student.gender === genderFilter;
    const matchesClass =
      classFilter === "all" || student.className === classFilter;

    return matchesSearch && matchesDepartment && matchesGender && matchesClass;
  });

  const departments = Array.from(
    new Set(students.map((s) => s.departmentName))
  );
  const classes = Array.from(
    new Set(
      students.map((s) => s.className).filter((cls): cls is string => !!cls)
    )
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Students Directory</h1>
        <Badge variant="outline" className="text-base">
          Total: {filteredStudents.length}
        </Badge>
      </div>
      <div className="w-full py-5">
        <StatisticsPanel />
      </div>
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Search by name, email or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={genderFilter} onValueChange={setGenderFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value={Gender.MALE}>Male</SelectItem>
            <SelectItem value={Gender.FEMALE}>Female</SelectItem>
          </SelectContent>
        </Select>

        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {classes.map((cls) => (
              <SelectItem key={cls} value={cls}>
                {cls}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow
                key={student.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => router.push(`/student/${student.id}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.profile} />
                      <AvatarFallback>
                        {getInitials(student.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {student.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.className}</TableCell>
                <TableCell>{student.departmentName}</TableCell>
                <TableCell className="flex justify-start gap-2">
                  <Badge
                    variant={
                      studentStatus[student.id] ? "default" : "destructive"
                    }
                  >
                    {studentStatus[student.id] ? "Present" : "Absent"}
                  </Badge>
                  <Switch
                    checked={studentStatus[student.id]}
                    onCheckedChange={(checked) =>
                      handleStatusChange(student.id, checked)
                    }
                    onClick={(e) => e.stopPropagation()} // Prevents row click event from firing
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
