import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { TrendingUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface TrendingGraphProps {
  candidates: Candidate[];
}

// Modern, accessible color palette
const colors = ["#3b82f6", "#10b981", "#f43f5e", "#8b5cf6", "#f59e0b"];

export const TrendingGraph = ({ candidates }: TrendingGraphProps) => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });
  const cardRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Initial animation with native transitions
    if (cardRef.current) {
      const card = cardRef.current;
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";

      setTimeout(() => {
        card.style.transition =
          "opacity 0.6s ease-out, transform 0.6s ease-out";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 100);
    }

    if (starRef.current) {
      const star = starRef.current;
      star.style.opacity = "0";
      star.style.transform = "scale(0)";

      setTimeout(() => {
        star.style.transition =
          "opacity 0.5s ease-out, transform 0.5s ease-out";
        star.style.opacity = "1";
        star.style.transform = "scale(1)";
      }, 300);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [candidates]);

  // Format data for chart and handle responsiveness
  const processedData = React.useMemo(() => {
    if (!candidates[0]?.voteHistory?.length) return [];

    const isMobile = screenSize.width < 640;
    const isTablet = screenSize.width >= 640 && screenSize.width < 1024;

    return candidates[0].voteHistory.map((entry, index) => {
      const dataPoint: any = {
        fullDate: entry.date.toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
        }),
        // Format date string based on screen size
        date: isMobile
          ? `${entry.date.getMonth() + 1}/${entry.date.getDate()}`
          : isTablet
          ? entry.date.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })
          : entry.date.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "2-digit",
            }),
        timestamp: entry.date.getTime(),
      };

      // Get vote counts for all candidates
      candidates.forEach((candidate) => {
        if (candidate.voteHistory?.[index]) {
          // For mobile, truncate long candidate names
          const displayName =
            isMobile && candidate.student.name.length > 10
              ? `${candidate.student.name.substring(0, 8)}...`
              : candidate.student.name;

          dataPoint[displayName] = candidate.voteHistory[index].count;
          // Store original name for tooltip matching
          dataPoint[`${displayName}_fullName`] = candidate.student.name;
        }
      });

      return dataPoint;
    });
  }, [candidates, screenSize.width]);

  // Get chart configuration based on screen size
  const getChartConfig = () => {
    const isMobile = screenSize.width < 640;
    const isTablet = screenSize.width >= 640 && screenSize.width < 1024;

    return {
      xAxisHeight: isMobile ? 50 : 30,
      xAxisTickAngle: isMobile ? -30 : 0,
      xAxisTickSize: isMobile ? 10 : isTablet ? 11 : 12,
      yAxisWidth: isMobile ? 40 : 50,
      yAxisTickSize: isMobile ? 10 : 12,
      dotRadius: isMobile ? 2 : 3,
      activeDotRadius: isMobile ? 5 : 7,
      strokeWidth: isMobile ? 2 : 3,
      margin: {
        top: 20,
        right: isMobile ? 10 : 20,
        bottom: isMobile ? 10 : 20,
        left: isMobile ? 0 : 10,
      },
      legendPosition: isMobile ? "bottom" : "top" as "top" | "bottom",
    };
  };

  const chartConfig = getChartConfig();

  // Find leading candidate
  const leadingCandidate = [...candidates].sort(
    (a, b) => b.votes.length - a.votes.length
  )[0];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const isMobile = screenSize.width < 640;

    return (
      <div className="backdrop-blur-md  shadow-lg border border-gray-200 rounded-lg p-3">
        <p className="font-semibold mb-2 text-gray-800 text-sm">
          {payload[0]?.payload.fullDate}
        </p>
        <div className="space-y-1.5 max-h-40 overflow-y-auto">
          {payload.map((entry: any, index: number) => {
            // Get full name from data point if available
            const fullName =
              entry.payload[`${entry.name}_fullName`] || entry.name;

            return (
              <div key={`tooltip-${index}`} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <p className="text-gray-700 text-xs sm:text-sm truncate max-w-56">
                  <span className="font-medium">{fullName}: </span>
                  <span className="font-bold">{entry.value}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Calculate optimal height based on screen size
  const getOptimalHeight = () => {
    const isMobile = screenSize.width < 640;
    const isTablet = screenSize.width >= 640 && screenSize.width < 1024;

    if (isMobile) {
      // On very small screens, use fixed small height
      if (screenSize.width < 375) return 250;
      return 280;
    }

    if (isTablet) return 320;

    // For desktop, use responsive height based on card width
    return 350;
  };

  // If no candidate data, show placeholder
  if (!candidates.length || !processedData.length) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-sm border">
        <CardContent className="p-6 flex justify-center items-center">
          <p className="text-gray-500">No voting data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      ref={cardRef}
      className="w-full mx-auto shadow-sm border bg-white"
    >
      <CardHeader className="p-3 sm:p-4 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-md">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
              Voting Trends
            </CardTitle>
          </div>
          {leadingCandidate && (
            <div
              ref={starRef}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                "bg-amber-50 border border-amber-200 self-start sm:self-auto"
              )}
            >
              <Star className="w-4 h-4 text-amber-500" />
              <span className="text-xs sm:text-sm font-medium text-amber-700 truncate max-w-32 sm:max-w-48">
                {leadingCandidate.student.name} is leading
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div style={{ height: `${getOptimalHeight()}px` }} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={processedData} margin={chartConfig.margin}>
              <defs>
                {candidates.map((candidate, index) => (
                  <linearGradient
                    key={`gradient-${candidate.id}`}
                    id={`color-${candidate.id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={colors[index % colors.length]}
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor={colors[index % colors.length]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{
                  fill: "#4b5563",
                  fontSize: chartConfig.xAxisTickSize,
                }}
                axisLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
                tickLine={{ stroke: "#d1d5db" }}
                angle={chartConfig.xAxisTickAngle}
                textAnchor={chartConfig.xAxisTickAngle !== 0 ? "end" : "middle"}
                height={chartConfig.xAxisHeight}
                tickMargin={5}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                tick={{
                  fill: "#4b5563",
                  fontSize: chartConfig.yAxisTickSize,
                }}
                axisLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
                tickLine={{ stroke: "#d1d5db" }}
                allowDecimals={false}
                width={chartConfig.yAxisWidth}
                tickMargin={5}
                padding={{ top: 10, bottom: 0 }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#9ca3af",
                  strokeWidth: 1,
                  strokeDasharray: "3 3",
                }}
                wrapperStyle={{ zIndex: 1000 }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                align="center"
                verticalAlign={chartConfig.legendPosition as "top" | "bottom"}
                wrapperStyle={{
                  paddingTop: chartConfig.legendPosition === "top" ? 0 : 10,
                  paddingBottom:
                    chartConfig.legendPosition === "bottom" ? 0 : 10,
                  fontSize: screenSize.width < 640 ? 10 : 12,
                }}
              />
              {candidates.map((candidate, index) => {
                const candidateName =
                  screenSize.width < 640 && candidate.student.name.length > 10
                    ? `${candidate.student.name.substring(0, 8)}...`
                    : candidate.student.name;

                return (
                  <Area
                    key={candidate.id}
                    name={candidateName}
                    type="monotone"
                    dataKey={candidateName}
                    stroke={colors[index % colors.length]}
                    strokeWidth={chartConfig.strokeWidth}
                    fill={`url(#color-${candidate.id})`}
                    dot={{
                      r: chartConfig.dotRadius,
                      strokeWidth: 1,
                      fill: "#ffffff",
                      stroke: colors[index % colors.length],
                    }}
                    activeDot={{
                      r: chartConfig.activeDotRadius,
                      strokeWidth: 1,
                      stroke: "#ffffff",
                      fill: colors[index % colors.length],
                    }}
                  />
                );
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
