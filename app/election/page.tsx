"use client";
import React, { useState } from "react";
import { ElectionsList } from "@/components/electionComponents/ElectionsList";
import { Leaderboard } from "@/components/electionComponents/Leaderboard";
import { VotersList } from "@/components/electionComponents/VotersList";
import { TrendingGraph } from "@/components/electionComponents/TrendingGraph";

// Define proper types matching the schema
type ElectionStatus = "Hidden" | "Registration" | "Ongoing" | "Completed";

interface Election {
  id: string;
  title: string;
  description?: string;
  status: ElectionStatus;
  startTime: Date;
  endTime: Date;
  candidates: Candidate[];
}

interface Candidate {
  id: string;
  student: {
    name: string;
    avatar?: string;
  };
  manifesto?: string;
  position: string;
  votes: number[];
  voteHistory?: { date: Date; count: number }[];
}

// Mock data with proper types and all sections populated
const mockElections: Election[] = [
  {
    id: "1",
    title: "Student Council President Election 2024",
    description: "Vote for your next student council president",
    status: "Ongoing",
    startTime: new Date("2024-02-01"),
    endTime: new Date("2024-02-15"),
    candidates: [
      {
        id: "c1",
        student: {
          name: "Alice Johnson",
          avatar: "/lovable-uploads/b7f59b1a-c382-49d1-9042-e1272dfae017.png",
        },
        position: "President",
        manifesto: "Building a better future together",
        votes: Array(340).fill(1),
        voteHistory: [
          { date: new Date("2024-02-01"), count: 100 },
          { date: new Date("2024-02-02"), count: 200 },
          { date: new Date("2024-02-03"), count: 300 },
        ],
      },
      {
        id: "c2",
        student: { name: "Bob Smith" },
        position: "President",
        manifesto: "Innovation and progress",
        votes: Array(2200).fill(1),
        voteHistory: [
          { date: new Date("2024-02-01"), count: 80 },
          { date: new Date("2024-02-02"), count: 180 },
          { date: new Date("2024-02-03"), count: 280 },
        ],
      },
      {
        id: "c3",
        student: { name: "Carol Williams" },
        position: "President",
        manifesto: "Empowering student voices",
        votes: Array(180).fill(1),
        voteHistory: [
          { date: new Date("2024-02-01"), count: 50 },
          { date: new Date("2024-02-02"), count: 120 },
          { date: new Date("2024-02-03"), count: 180 },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Class Representative Elections",
    description: "Register now to represent your class",
    status: "Registration",
    startTime: new Date("2024-02-20"),
    endTime: new Date("2024-03-05"),
    candidates: [
      {
        id: "c4",
        student: { name: "David Chen" },
        position: "Class Rep",
        manifesto: "Bringing our class together",
        votes: [],
      },
      {
        id: "c5",
        student: { name: "Emma Davis" },
        position: "Class Rep",
        manifesto: "Your voice matters",
        votes: [],
      },
    ],
  },
  {
    id: "3",
    title: "Sports Committee Selection",
    description: "Previous term election results",
    status: "Completed",
    startTime: new Date("2024-01-01"),
    endTime: new Date("2024-01-15"),
    candidates: [
      {
        id: "c6",
        student: { name: "Frank Wilson" },
        position: "Sports Captain",
        manifesto: "Champions in making",
        votes: Array(270).fill(1),
      },
      {
        id: "c7",
        student: { name: "Grace Lee" },
        position: "Sports Captain",
        manifesto: "Fitness for all",
        votes: Array(255).fill(1),
      },
    ],
  },
];

const mockVoters = [
  { id: "v1", name: "David Chen", timestamp: new Date() },
  { id: "v2", name: "Emma Davis", timestamp: new Date() },
  { id: "v3", name: "Frank Wilson", timestamp: new Date() },
].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

const lectionPage = () => {
  const [selectedElection, setSelectedElection] = useState<Election>(
    mockElections[0]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Elections Portal
          </h1>
          <p className="text-muted-foreground">
            View ongoing elections and cast your vote
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <ElectionsList
                elections={mockElections}
                onSelectElection={setSelectedElection}
              />
              {selectedElection && (
                <>
                  <Leaderboard candidates={selectedElection.candidates} />
                  <TrendingGraph candidates={selectedElection.candidates} />
                </>
              )}
            </div>
          </div>
          <div>
            <VotersList voters={mockVoters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default lectionPage;
