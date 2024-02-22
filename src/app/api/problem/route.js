import Problem from "@/Models/Problem";
import { connect } from "@/lib/DB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {

        connect();

        const reqBody = await req.json();

        const { title, statement, difficulty, week, companies, topics } = reqBody;

        if (!title || !statement || !difficulty || !week || !topics) {
            return NextResponse.json({ message: "All fields are required", type: "error" }, { status: 400 })
        }

        const problemExist = await Problem.findOne({ title });
        if (problemExist) {
            return NextResponse.json({ message: "Problem already exists in matrix", type: "info" }, { status: 403 })
        }

        await Problem.create({ title, statement, difficulty, week, companies, topics });

        return NextResponse.json({ message: "Problem added Successfully.", type: "success" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, type: "error" }, { status: 500 })
    }
}

