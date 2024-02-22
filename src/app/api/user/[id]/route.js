import User from "@/Models/User";
import { connect } from "@/lib/DB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        connect();

        if (!params?.id || !mongoose.Types.ObjectId.isValid(params?.id))
            return NextResponse.json({ message: 'You are not a valid Matrix member', type: "error" }, { status: 400 });


        const user = await User.findById(params?.id).populate('problems.problemId');

        return NextResponse.json({ user, type: "success" }, { status: 200 });


    } catch (error) {
        return NextResponse.json({ message: error.message, type: "success" }, { status: 500 })
    }
}