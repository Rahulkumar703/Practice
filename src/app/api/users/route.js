import User from '@/Models/User';
import { connect } from '@/lib/DB';
import { NextResponse } from 'next/server';


export const GET = async (req) => {
    try {

        connect();

        const users = await User.find({});
        return NextResponse.json({ users, type: "success" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error.message, type: "error" }, { status: 500 })
    }
}
