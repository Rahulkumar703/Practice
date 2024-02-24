import Problem from "@/Models/Problem";
import User from "@/Models/User";
import { connect } from "@/lib/DB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        connect();

        if (!mongoose.Types.ObjectId.isValid(params?.id))
            return NextResponse.json({ message: 'You are not a valid Matrix member', type: "error" }, { status: 400 });


        const users = await User.find({}).select('problems');

        const problems = await Problem.find({}).sort({ 'updated_at': 'desc' }).limit(5);


        const ranks = users.map((user) => {
            return ({ problems: user.problems.length, _id: user._id })
        });

        const solvedProblems = users.find((user) => user._id.toString() === params.id).problems.filter((problem) => problem.solved);
        const rank = ranks.sort((a, b) => b.problems - a.problems).findIndex((user) => user._id.toString() === params.id);

        return NextResponse.json({ rank: solvedProblems?.length ? rank + 1 : null, solvedProblems, problems, type: "success" }, { status: 200 });


    } catch (error) {
        return NextResponse.json({ message: error.message, type: "error" }, { status: 500 })
    }
}