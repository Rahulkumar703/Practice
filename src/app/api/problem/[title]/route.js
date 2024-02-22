import Problem from "@/Models/Problem";
import User from "@/Models/User";
import { connect } from "@/lib/DB"
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        connect();

        const title = params?.title;
        // const userId = req.nextUrl.searchParams.get('user')


        if (!title)
            return NextResponse.json({ message: 'Please povide a problem title.', type: 'error' }, { status: 400 })

        const problem = await Problem.findOne({ title });
        if (!problem)
            return NextResponse.json({ message: 'Problem with this title not found', type: 'error' }, { status: 404 })


        return NextResponse.json({ problem, type: 'success' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error.message, type: 'error' }, { status: 500 })
    }
}