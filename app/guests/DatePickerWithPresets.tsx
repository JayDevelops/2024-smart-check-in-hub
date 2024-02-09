/*
* Come back to this component
* */
"use client"
import React, {useState} from "react"
import { format, subWeeks } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function DatePickerWithPresets({ onDateChange }: { onDateChange: (date: DateRange | undefined) => void }) {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })

    const handlePresetChange = (value: string) => {
        let fromDate: Date | undefined
        let toDate: Date | undefined

        switch (value) {
            case "today":
                fromDate = toDate = new Date()
                break
            case "lastWeek":
                toDate = new Date()
                fromDate = subWeeks(toDate, 1)
                break
            case "lastMonth":
                toDate = new Date()
                fromDate = subWeeks(toDate, 1)
                break
            case "yearToDate":
                //  Get the current date then subtract that range from the beginning of the year
                const currDate = new Date()
                fromDate = new Date(currDate.getFullYear(), 0, 1)
                toDate = currDate
                break
            default:
                fromDate = toDate = undefined
        }


        setDateRange({ from: fromDate, to: toDate });

        if (fromDate && toDate) {
            onDateChange({ from: fromDate, to: toDate });
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                        dateRange.to ? (
                            <>
                                {format(dateRange.from, "LLL dd, y")} -{" "}
                                {format(dateRange.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(dateRange.from, "LLL dd, y")
                        )
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <Select onValueChange={(value: string) => handlePresetChange(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent position="popper">
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="lastWeek">Last Week</SelectItem>
                        <SelectItem value="lastMonth">Last Month</SelectItem>
                        <SelectItem value="yearToDate">Year to Date</SelectItem>
                    </SelectContent>
                </Select>

                <div className="rounded-md border">
                    <Calendar initialFocus
                              mode="range"
                              defaultMonth={dateRange?.from}
                              selected={dateRange}
                              onSelect={setDateRange}
                              numberOfMonths={1}
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}