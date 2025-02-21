
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

interface Election {
  id: string;
  title: string;
  description?: string;
  status: "Hidden" | "Registration" | "Ongoing" | "Completed";
  startTime: Date;
  endTime: Date;
  candidates: Array<any>;
}

interface ElectionsListProps {
  elections: Election[];
  onSelectElection: (election: Election) => void;
}

const statusColors = {
  Hidden: "bg-gray-500",
  Registration: "bg-yellow-500",
  Ongoing: "bg-green-500",
  Completed: "bg-blue-500",
};

export const ElectionsList = ({ elections, onSelectElection }: ElectionsListProps) => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    gsap.fromTo(
      cardsRef.current.children,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {elections.map((election) => (
        <Card
          key={election.id}
          className="glass-card hover:scale-105 transform transition-all duration-300 cursor-pointer"
          onClick={() => onSelectElection(election)}
        >
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge className={`${statusColors[election.status]}`}>
                {election.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(election.startTime).toLocaleDateString()}
              </span>
            </div>
            <CardTitle className="line-clamp-2">{election.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{election.candidates.length} Candidates</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(election.endTime).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
