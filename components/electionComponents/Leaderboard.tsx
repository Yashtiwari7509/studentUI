import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Trophy, PartyPopper, Star, Award } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Candidate {
  id: string;
  student: {
    name: string;
    avatar?: string;
  };
  position: string;
  votes: number[];
  manifesto?: string;
}

interface LeaderboardProps {
  candidates: Candidate[];
}

const positionColors = {
  1: "bg-gradient-to-br from-yellow-400 to-amber-600 text-white",
  2: "bg-gradient-to-br from-slate-300 to-slate-400 text-white",
  3: "bg-gradient-to-br from-amber-700 to-amber-800 text-white",
};

const positionBackgrounds = {
  1: "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200",
  2: "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200",
  3: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200",
};

const positionIcons = {
  1: Trophy,
  2: Star,
  3: PartyPopper,
};

export const Leaderboard = ({ candidates }: LeaderboardProps) => {
  const leaderboardRef = useRef<HTMLDivElement>(null);
  const winnerCardRef = useRef<HTMLDivElement>(null);
  const runnerUpCardRef = useRef<HTMLDivElement>(null);
  const thirdPlaceCardRef = useRef<HTMLDivElement>(null);
  const cardRefs = [winnerCardRef, runnerUpCardRef, thirdPlaceCardRef];
  const particlesRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const sortedCandidates = [...candidates].sort(
    (a, b) => b.votes.length - a.votes.length
  );

  // Create particles on demand
  const createParticles = () => {
    if (!particlesRef.current || !winnerCardRef.current) return;

    const container = particlesRef.current;
    container.innerHTML = "";

    const winnerRect = winnerCardRef.current.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const centerX = winnerRect.left + winnerRect.width / 2 - containerRect.left;
    const centerY = winnerRect.top + winnerRect.height / 2 - containerRect.top;

    // Create particles with different colors and shapes
    const colors = [
      "#FFD700",
      "#FFC0CB",
      "#87CEEB",
      "#32CD32",
      "#FF4500",
      "#9370DB",
    ];
    const shapes = ["circle", "square", "triangle"];

    for (let i = 0; i < 60; i++) {
      const particle = document.createElement("div");
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      // Apply basic styling to all particles
      particle.style.position = "absolute";
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      particle.style.opacity = "0";
      particle.style.zIndex = "20";

      // Apply shape-specific styling
      if (shape === "circle") {
        const size = 5 + Math.random() * 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = "50%";
      } else if (shape === "square") {
        const size = 4 + Math.random() * 8;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
      } else if (shape === "triangle") {
        const size = 8 + Math.random() * 12;
        particle.style.width = "0";
        particle.style.height = "0";
        particle.style.borderLeft = `${size / 2}px solid transparent`;
        particle.style.borderRight = `${size / 2}px solid transparent`;
        particle.style.borderBottom = `${size}px solid ${
          colors[Math.floor(Math.random() * colors.length)]
        }`;
        particle.style.backgroundColor = "transparent";
      }

      container.appendChild(particle);

      // Animate particle
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
        opacity: Math.random() * 0.7 + 0.3,
        scale: Math.random() * 2 + 0.5,
        rotation: Math.random() * 360,
        duration: 1.5 + Math.random() * 2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(particle, {
            opacity: 0,
            y: "+=50",
            duration: 1 + Math.random(),
            ease: "power1.in",
            onComplete: () => {
              if (particle.parentNode === container) {
                container.removeChild(particle);
              }
            },
          });
        },
      });
    }
  };

  useGSAP(() => {
    if (!leaderboardRef.current) return;

    // Kill any active animations
    gsap.killTweensOf([
      winnerCardRef.current,
      runnerUpCardRef.current,
      thirdPlaceCardRef.current,
    ]);

    // Main animation timeline
    const tl = gsap.timeline();

    // Animate cards with different entrance for each position
    if (winnerCardRef.current) {
      tl.fromTo(
        winnerCardRef.current,
        { y: 0, opacity: 0, scale: 0.5, rotationY: 40 },
        {
          y: 0,
          opacity: 1,
          scale: 1.05,
          rotationY: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          onComplete: createParticles,
        }
      );

      // Add continuous subtle animation to winner card
      gsap.to(winnerCardRef.current, {
        y: -50,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Create glowing effect
      const glow = document.createElement("div");
      glow.style.position = "absolute";
      glow.style.inset = "-10px";
      glow.style.borderRadius = "16px";
      glow.style.background =
        "radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0) 70%)";
      glow.style.zIndex = "-1";
      winnerCardRef.current.style.position = "relative";
      winnerCardRef.current.appendChild(glow);

      gsap.to(glow, {
        opacity: 0.3,
        scale: 1.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (runnerUpCardRef.current) {
      tl.fromTo(
        runnerUpCardRef.current,
        { x: -50, opacity: 0, rotateZ: -10 },
        { x: 0, opacity: 1, rotateZ: 0, duration: 0.8, ease: "back.out(1.5)" },
        "-=0.8"
      );
    }

    if (thirdPlaceCardRef.current) {
      tl.fromTo(
        thirdPlaceCardRef.current,
        { x: 200, opacity: 0, rotateZ: 10 },
        { x: 0, opacity: 1, rotateZ: 0, duration: 0.8, ease: "back.out(1.5)" },
        "-=0.8"
      );
    }

    // Animate vote counters
    counterRefs.current.forEach((counter, index) => {
      if (!counter) return;

      const finalValue = sortedCandidates[index]?.votes.length || 0;
      let obj = { value: 0 };

      tl.to(
        obj,
        {
          value: finalValue,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (counter) {
              counter.textContent = Math.round(obj.value).toString();
            }
          },
        },
        "-=0.5"
      );
    });

    // Add shine effect to winner card
    if (winnerCardRef.current) {
      const shine = document.createElement("div");
      shine.style.position = "absolute";
      shine.style.top = "0";
      shine.style.left = "-100%";
      shine.style.width = "50%";
      shine.style.height = "100%";
      shine.style.background =
        "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)";
      shine.style.transform = "skewX(-20deg)";
      shine.style.zIndex = "10";
      shine.style.pointerEvents = "none";
      winnerCardRef.current.appendChild(shine);

      gsap.to(shine, {
        left: "200%",
        duration: 2,
        delay: 1.2,
        ease: "power2.inOut",
        repeat: 3,
        repeatDelay: 4,
      });
    }
  });

  return (
    <Card className="glass-card">
      <CardHeader className="relative  text-black">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <CardTitle>Leaderboard Champions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="relative p-6 bg-gradient-to-b from-slate-50 to-white">
        {/* Particles container */}
        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
        />

        <div
          ref={leaderboardRef}
          className="grid gap-6 md:grid-cols-3 relative z-10"
        >
          {sortedCandidates.slice(0, 3).map((candidate, index) => {
            const position = index + 1;
            const PositionIcon =
              positionIcons[position as keyof typeof positionIcons];

            return (
              <div
                key={candidate.id}
                ref={cardRefs[index]}
                className={`relative rounded-xl p-6 border-2 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                  positionBackgrounds[
                    position as keyof typeof positionBackgrounds
                  ]
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Top position indicator */}
                {position === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <Crown className="w-10 h-10 text-yellow-500 filter drop-shadow-lg animate-pulse" />
                  </div>
                )}

                {/* Position badge with 3D effect */}
                <div
                  className={`w-16 h-16 rounded-full ${
                    positionColors[position as keyof typeof positionColors]
                  } flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg`}
                  style={{
                    transform: "translateZ(10px)",
                    boxShadow:
                      position === 1 ? "0 0 20px rgba(255, 215, 0, 0.5)" : "",
                  }}
                >
                  {position}
                </div>

                {/* Profile section */}
                <div className="w-28 h-28 mx-auto rounded-full bg-white shadow-lg overflow-hidden border-4 border-white mb-4">
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-primary/10">
                    {candidate.student.name.charAt(0)}
                  </div>
                </div>

                {/* Name and position */}
                <div className="text-center space-y-1 mb-4">
                  <h3 className="font-bold text-lg tracking-tight">
                    {candidate.student.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {candidate.position}
                  </p>
                </div>

                {/* Vote counter with animation */}
                <div className="mt-4 pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      TOTAL VOTES
                    </span>
                    <div className="flex items-center gap-2 font-bold text-lg">
                      <PositionIcon
                        className={`w-5 h-5 ${
                          position === 1
                            ? "text-yellow-500"
                            : position === 2
                            ? "text-slate-500"
                            : "text-amber-700"
                        }`}
                      />
                      <span
                        ref={(el) => (counterRefs.current[index] = el)}
                        className="tabular-nums"
                      >
                        0
                      </span>
                    </div>
                  </div>

                  {/* Progress bar for visual comparison */}
                  <div className="mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        position === 1
                          ? "bg-yellow-500"
                          : position === 2
                          ? "bg-slate-400"
                          : "bg-amber-600"
                      }`}
                      style={{
                        width: "0%",
                        transition: "width 2s ease-out",
                        animation: "growWidth 2s forwards ease-out",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Winner badge */}
                {position === 1 && (
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center transform rotate-12 shadow-lg z-20">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>

      {/* Add global CSS for animations */}
      <style jsx>{`
        @keyframes growWidth {
          to {
            width: 100%;
          }
        }
      `}</style>
    </Card>
  );
};
