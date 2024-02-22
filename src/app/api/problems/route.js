import Problem from "@/Models/Problem";
import { connect } from "@/lib/DB";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {

        connect();

        const problems = await Problem.find({});

        return NextResponse.json({ problems, type: "success" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error.message, type: "error" }, { status: 500 })
    }
}
