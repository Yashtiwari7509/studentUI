'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Award, Calendar, GraduationCap, Users, Mail, Phone, School, Activity } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Student } from '@/app/types/student';

interface StudentProfileClientProps {
  student: Student;
}

export default function StudentProfileClient({ student }: StudentProfileClientProps) {
  const router = useRouter();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto py-10">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Students List
      </Button>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card className="md:w-1/3">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={student.profile} />
                <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-muted-foreground">{student.email}</p>
              <div className="flex gap-2 mt-2">
                <Badge>{student.gender}</Badge>
                {student.role && <Badge variant="outline">{student.role}</Badge>}
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p className="font-medium">{student.bloodGroup || 'N/A'}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={student.isActive ? "default" : "secondary"}>
                    {student.isActive ? "Active" : "Inactive"}
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
                <p className="font-medium">{student.className}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">{student.departmentName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Institution</p>
                <p className="font-medium">{student.institutionName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium">
                  {student.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'}
                </p>
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
                <span>{student.parentName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{student.parentMobile}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{student.parentEmail}</span>
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
                  {student.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
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
                  {student.hobbies.map((hobby) => (
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
                  {student.studentEvent.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell>{event.description}</TableCell>
                      <TableCell>{new Date(event.timeline).toLocaleDateString()}</TableCell>
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
                  {student.facilitySlots.map((slot) => (
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