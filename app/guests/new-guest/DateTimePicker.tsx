import React, {useMemo, useState} from 'react'
import {Calendar} from "@/components/ui/calendar"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Text} from "@/components/Typography/Text"

/**
 * Represents the properties for the DateTimePicker component.
 */
type DateTimePickerProps = {
    value: Date | null,
    onChange: (date: Date) => void,
}

/**
 * DateTimePicker component allows the user to select a date and time.
 *
 * @param {Object} props - The props object.
 * @param {Date} props.value - The initial value of the date and time.
 * @param {function} props.onChange - The callback function triggered when the date and time are changed.
 *
 * @returns {JSX.Element} The rendered DateTimePicker component.
 */
export default function DateTimePicker({value, onChange}: DateTimePickerProps): JSX.Element {
    const today = new Date()
    const [selected, setSelected] = useState<Date>(today)
    const [timeValue, setTimeValue] = useState<string>(
        `${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`
    )

    const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const time = e.target.value;
        if (!selected) {
            setTimeValue(time)
            return;
        }
        const [hours, minutes] = time.split(':').map((str) => parseInt(str, 10))
        const newSelectedDate = new Date(
            selected.getFullYear(),
            selected.getMonth(),
            selected.getDate(),
            hours,
            minutes
        )
        setSelected(newSelectedDate);
        setTimeValue(time);
    };

    const handleDaySelect = (date: Date | undefined) => {
        if (!timeValue || !date) {
            setSelected(date!);
            return;
        }
        const [hours, minutes] = timeValue
            .split(':')
            .map((str) => parseInt(str, 10));
        const newDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hours,
            minutes
        );
        setSelected(newDate)
        onChange(newDate)
    }

    const footerComponent = useMemo(() => (
        <div className="space-y-2">
            <div className="w-full">
                <Label htmlFor="email">Pick a Time</Label>
                <Input
                    type="time"
                    value={timeValue}
                    onChange={handleTimeChange}
                    className="w-[240px]"
                />
            </div>
            <div>
                <Text>
                    Check In Time
                </Text>
                <Text>
                    {selected ? selected.toLocaleString() : 'none'}
                </Text>
            </div>
        </div>
    ), [selected, timeValue, handleTimeChange])

    return (
        <Calendar
            mode="single"
            selected={selected}
            onSelect={handleDaySelect}
            footer={footerComponent}
        />
    )
}