
import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle } from "lucide-react";
import gsap from "gsap";

interface Voter {
  id: string;
  name: string;
  avatar?: string;
  timestamp: Date;
}

interface VotersListProps {
  voters: Voter[];
}

export const VotersList = ({ voters }: VotersListProps) => {
  const votersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!votersRef.current) return;

    gsap.fromTo(
      votersRef.current.children,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "back.out(1.7)",
      }
    );
  }, [voters]);

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <CardTitle>Recent Voters</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div ref={votersRef} className="space-y-2">
            {voters.map((voter) => (
              <div
                key={voter.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 animate-vote-success"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {voter.avatar ? (
                    <img
                      src={voter.avatar}
                      alt={voter.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-medium">
                      {voter.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium">{voter.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(voter.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
