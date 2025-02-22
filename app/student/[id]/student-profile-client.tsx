"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Award,
  Calendar,
  GraduationCap,
  Users,
  Mail,
  Phone,
  School,
  Activity,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student } from "@/app/types/student";
import { Input } from "@/components/ui/input";

interface StudentProfileClientProps {
  student: Student;
}

export default function StudentProfileClient({
  student,
}: StudentProfileClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Student>(student);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Make API call to update student details in DB
    console.log("Updated student data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto py-10">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Students List
      </Button>

      <div className="flex justify-end mb-4">
        {isEditing ? (
          <>
            <Button onClick={handleSave} className="mr-2">
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setFormData(student);
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card className="md:w-1/3">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={formData.profile} />
                <AvatarFallback>{getInitials(formData.name)}</AvatarFallback>
              </Avatar>
              {isEditing ? (
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              ) : (
                <h2 className="text-2xl font-bold">{formData.name}</h2>
              )}
              {isEditing ? (
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-muted-foreground">{formData.email}</p>
              )}
              <div className="flex gap-2 mt-2">
                <Badge>{formData.gender}</Badge>
                {formData.role && (
                  <Badge variant="outline">{formData.role}</Badge>
                )}
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  {isEditing ? (
                    <Input
                      name="bloodGroup"
                      value={formData.bloodGroup || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="font-medium">
                      {formData.bloodGroup || "N/A"}
                    </p>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={formData.isActive ? "default" : "secondary"}>
                    {formData.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Class</p>
                {isEditing ? (
                  <Input
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="font-medium">{formData.className}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                {isEditing ? (
                  <Input
                    name="departmentName"
                    value={formData.departmentName}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="font-medium">{formData.departmentName}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Institution</p>
                {isEditing ? (
                  <Input
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="font-medium">{formData.institutionName}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                {isEditing ? (
                  <Input
                    name="dob"
                    type="date"
                    value={
                      formData.dob
                        ? new Date(formData.dob).toISOString().substring(0, 10)
                        : ""
                    }
                    onChange={handleChange}
                  />
                ) : (
                  <p className="font-medium">
                    {formData.dob
                      ? new Date(formData.dob).toLocaleDateString()
                      : "N/A"}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Parent Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{formData.parentName}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    name="parentMobile"
                    value={formData.parentMobile}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{formData.parentMobile}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{formData.parentEmail}</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="achievements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <h4 className="font-medium">{achievement.name}</h4>
                        <a
                          href={achievement.certificateFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          View Certificate
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hobbies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {formData.hobbies.map((hobby) => (
                    <div
                      key={hobby.id}
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {hobby.hobby}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Student Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.studentEvent.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        {event.name}
                      </TableCell>
                      <TableCell>{event.description}</TableCell>
                      <TableCell>
                        {new Date(event.timeline).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities">
          <Card>
            <CardHeader>
              <CardTitle>Facility Slots</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facility</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.facilitySlots.map((slot) => (
                    <TableRow key={slot.id}>
                      <TableCell>{slot.facility}</TableCell>
                      <TableCell>{slot.day}</TableCell>
                      <TableCell>{slot.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
