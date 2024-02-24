import User from '@/Models/User';
import { connect } from '@/lib/DB';
import { NextResponse } from 'next/server';


export const POST = async (req) => {
    try {

        connect();

        const reqBody = await req.json();

        const { name, username, email, password } = reqBody;
        if (!name || !username || !email || !password) {
            return NextResponse.json({ message: "All fields are required", type: "error" }, { status: 400 })
        }

        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            console.log(user);
            let message = ''
            if (user.username === username)
                message = "Username is already taken"
            else
                message = "You are already a matrix member."
            return NextResponse.json({ message, type: "info" }, { status: 403 })
        }

        await User.create({ name, username, email, password });

        return NextResponse.json({ message: "Account Created Successfully.", type: "success" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error.message, type: "error" }, { status: 500 })
    }
}