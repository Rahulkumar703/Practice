import User from "@/Models/User";
import { connect } from "@/lib/DB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        connect();

        const reqBody = await req.json();


        const { userId, problemId, solutions, solved } = reqBody;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(problemId))
            return NextResponse.json({ message: 'Invalid User or Problem', type: "error" }, { status: 400 })

        const user = await User.findOne({ _id: userId, 'problems.problemId': problemId });

        if (!user)
            return NextResponse.json({ message: 'User not found', type: "error" }, { status: 404 })

        const problemIndex = user.problems.findIndex(p => {
            return p.problemId.toString() === problemId.toString()
        });

        user.problems[problemIndex].solutions = solutions;
        user.problems[problemIndex].solved = solved;

        await user.save();

        return NextResponse.json({ message: `successfully ${solved === user.problems[problemIndex].solved ? 'saved' : 'updated'}`, type: "success" }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message, type: "error" }, { status: 500 })
    }
}