import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {camelCaseToSpacedString} from "@/lib/utils";
import React from "react";
import {Table} from "@tanstack/table-core";

export function ColumnFilterMenu({table}: {table: Table<any>}) {
    const renderColumnFilters = () => {
        return table.getAllColumns()
            .filter(column => column.getCanHide())
            .map(column => (
                <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(value)}
                >
                    {camelCaseToSpacedString(column.id)}
                </DropdownMenuCheckboxItem>
            ))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    Columns
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Show/Hide Table Columns
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {renderColumnFilters()}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}