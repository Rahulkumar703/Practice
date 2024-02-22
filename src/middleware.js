import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const middleware = async (req) => {
    try {
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        const { pathname } = req.nextUrl;

        const publicUrl =
            pathname === "/";

        if (!publicUrl && !token) {
            return NextResponse.redirect(
                new URL(`/?callbackUrl=${pathname}`, req.url)
            );
        }

        if ((publicUrl && token)) {
            return NextResponse.redirect(
                new URL(`/dashboard`, req.url)
            );
        }
        return NextResponse.next();
    } catch (error) {
        console.error(error);
    }
};

export const config = {
    matcher: [
        '/',
        '/dashboard/:path*',
        '/admin/:path*',
    ],
};

export default middleware;
