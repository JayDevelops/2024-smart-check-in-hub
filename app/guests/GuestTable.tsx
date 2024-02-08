"use client"
import React, {useState} from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuLabel,
    DropdownMenuTrigger,DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {camelCaseToSpacedString} from "@/lib/utils";

interface GuestsTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
}

export default function GuestTable<TData, TValue>({columns, data}: GuestsTableProps<TData, TValue>) {
    // useState to be able to sort columns, for example, like sorting asc or desc
    const [sorting, setSorting] = useState<SortingState>([])

    //  useState to be able to filter data, for example, like inputting text to names
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    //  useState to be able to hide and show columns visibility from the table
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    //  Initialize the tan-stack table, then pass the data and columns
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        //  below, we will update the sorting state
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        //  state object tracks the passed in states
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    return (
        <div>
            {/* TOP HEADER BUTTONS WHICH USE STATE TO FILTER NAME AND COLUMN VISIBILITY */}
            <div className="flex items-center py-4">
                {/* FILTER TEXT COMPONENT TO FILTER BY NAME DATA*/}
                <Input
                    placeholder="Filter name..."
                    value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
                    onChange={(e) => (
                        table.getColumn("fullName")?.setFilterValue(e.target.value)
                    )}
                    className="max-w-sm"
                />


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
                        {table.getAllColumns().filter((column) => column.getCanHide()).map(
                            (column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(value)}
                                >
                                    {camelCaseToSpacedString(column.id)}
                                </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                {/* THE MAIN TABLE IS BEING RENDERED BELOW*/}
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No Results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* PAGINATION COMPONENT IS BEING RENDERED BELOW */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

