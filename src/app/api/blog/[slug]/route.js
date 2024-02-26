import { Post } from "@/lib/models"
import { connectToDb } from "@/lib/utils"
import { NextResponse } from "next/server"

export const GET = async (request, {params}) => {
    const {slug} = params

    try {
        connectToDb()

        const posts = await Post.findOne({slug})
        return NextResponse.json(posts)
    } catch (err) {
        console.log(err)
        throw new Error("failed to fetch post")
    }
}

export const DELETE = async (request, {params}) => {
    const {slug} = params

    try {
        connectToDb()

        await Post.deleteOne({slug})
        return NextResponse.json("post deleted")
    } catch (err) {
        console.log(err)
        throw new Error("failed to fetch post")
    }
}