import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PieChart, BarChart, LineChart } from "lucide-react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  LineChart as ReLineChart,
  Line,
} from "recharts";

interface WeeklyTrend {
  date: string;
  rate: number;
}

interface StatisticsPanelProps {
  statistics?: {
    totalStudents: number;
    presentCount: number;
    absentCount: number;
    attendanceRate: number;
    weeklyTrend: WeeklyTrend[];
  };
}

const StatisticsPanel = ({
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
}: StatisticsPanelProps) => {
  const donutData = [
    { name: "Present", value: statistics.presentCount },
    { name: "Absent", value: statistics.absentCount },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Attendance Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Daily
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="flex justify-center">
              <div className="w-64 h-64">
                <RePieChart width={256} height={256}>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={80}
                    label
                  >
                    {donutData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ReTooltip />
                </RePieChart>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="daily">
            <ResponsiveContainer width="100%" height={250}>
              <ReBarChart
                data={statistics.weeklyTrend}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ReTooltip />
                <Legend />
                <Bar dataKey="rate" fill="#82ca9d" />
              </ReBarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="trends">
            <ResponsiveContainer width="100%" height={250}>
              <ReLineChart
                data={statistics.weeklyTrend}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ReTooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </ReLineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StatisticsPanel;
