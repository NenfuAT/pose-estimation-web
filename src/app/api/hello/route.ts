import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
        return new NextResponse("Hello World!");
}
