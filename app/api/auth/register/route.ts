import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";

//API to get user info and create new user in db
export const POST = async (request: NextRequest) => {
    const { name, email, password } = await request.json()
    await dbConnect()
    const hashedPassword = await bcrypt.hash(password, 5)
    const newUser = new UserModel({
        name,
        email,
        password: hashedPassword
    })

    try {
        await newUser.save()
        return Response.json(
            {message: 'New user created'},
            {status: 201}
        )
    } catch (err: any) {
        return Response.json(
            {message: err.message},
            {status: 500}
        )
    }
}