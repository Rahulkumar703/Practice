import Problem from "@/Models/Problem";
import User from "@/Models/User";
import { connect } from "@/lib/DB"
import mongoose, { mongo } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        connect();

        const title = params?.title;
        const userId = req.nextUrl.searchParams.get('user');

        if (!title)
            return NextResponse.json({ message: 'Please povide a problem title.', type: 'error' }, { status: 400 })

        const problem = await Problem.findOne({ title }).select('-solutions');

        if (!problem)
            return NextResponse.json({ message: 'Problem with this title not found', type: 'error' }, { status: 404 })


        if (mongoose.Types.ObjectId.isValid(userId)) {

            const user = await User.findById(userId);

            const alreadyVisited = user.problems.find(p => p.problemId.toString() === problem._id.toString());

            if (!alreadyVisited) {
                user.problems.push({ problemId: problem._id, solutions: [], solved: false });
                await user.save();
                return NextResponse.json({ problem: { ...problem._doc, userSolutions: [], isSolved: false }, type: 'success' }, { status: 200 })
            }
            return NextResponse.json({ problem: { ...problem._doc, userSolutions: alreadyVisited.solutions, isSolved: alreadyVisited.solved }, type: 'success' }, { status: 200 })
        }


        return NextResponse.json({ problem, type: 'success' }, { status: 200 })


    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message, type: 'error' }, { status: 500 })
    }
}


export const DELETE = async (req, { params }) => {
    try {
        connect();

        const title = params?.title;

        if (!title)
            return NextResponse.json({ message: 'Please povide a problem title.', type: 'error' }, { status: 400 })

        const problem = await Problem.findOne({ title });
        if (!problem)
            return NextResponse.json({ message: 'Problem with this title not found', type: 'error' }, { status: 404 })

        await Problem.deleteOne({ title })
        await User.updateMany({}, { $pull: { problems: { problemId: problem._id } } });
        return NextResponse.json({ message: 'Problem Deleted Successfully', type: 'success' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error.message, type: 'error' }, { status: 500 })
    }
}