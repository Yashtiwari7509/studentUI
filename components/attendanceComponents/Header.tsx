import React from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, FileDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface HeaderProps {
  onDateChange?: (date: Date) => void;
  onExport?: (format: "pdf" | "csv") => void;
  title?: string;
  date?: Date;
}

const Header = ({
  onDateChange = () => {},
  onExport = () => {},
  title = "Student Attendance Dashboard",
  date = new Date(),
}: HeaderProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(date);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateChange(date);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(selectedDate, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onExport("pdf")}>
              <Download className="mr-2 h-4 w-4" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport("csv")}>
              <Download className="mr-2 h-4 w-4" />
              Export as CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
