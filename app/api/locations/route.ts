import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client"

export async function GET(request: NextRequest) {
    const locations = await prisma.location.findMany({
        orderBy: {
            name: "asc",
        },
    })

    return NextResponse.json(locations)
}