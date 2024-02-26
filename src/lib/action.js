"use server"

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs"

export const sayHello = async (prevState, data) => {

    const { title, desc, slug, userId} = Object.fromEntries(data)

    try {
        connectToDb()
        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        })
        await newPost.save()
        console.log("saved to MDB")
        revalidatePath("/blog")
        revalidatePath("/admin")
    } catch (err) {
        console.log(err)
        return { error: "something went wrong"}
    }
};

export const deletePost = async (data) => {

    const { id } = Object.fromEntries(data)

    try {
        connectToDb()
        await Post.findByIdAndDelete(id)
        console.log("deleted from MDB")
        revalidatePath("/blog")
        revalidatePath("/admin")
    } catch (err) {
        console.log(err)
        return { error: "something went wrong"}
    }
};

export const addUser = async (prevState, data) => {

    const { username, email, password, img } = Object.fromEntries(data)

    try {
        connectToDb()
        const newUser = new User({
            username, 
            email, 
            password, 
            img
        })
        await newUser.save()
        console.log("saved to MDB")
        revalidatePath("/admin")
    } catch (err) {
        console.log(err)
        return { error: "something went wrong"}
    }
};

export const deleteUser = async (data) => {

    const { id } = Object.fromEntries(data)

    try {
        connectToDb()

        await Post.deleteMany({userId:id})
        await User.findByIdAndDelete(id)
        console.log("deleted from MDB")
        revalidatePath("/admin")
    } catch (err) {
        console.log(err)
        return { error: "something went wrong"}
    }
};

export const handleGithubLogin = async () => {
    "use server"
    await signIn("github")
  }

export const handleLogout = async () => {
    "use server"
    await signOut()
  }

  export const register = async (previousState, formData) => {

    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData)

    if (password !== passwordRepeat) {
        return {error: "Passwords do not match"}
    }

    try {
        connectToDb()

        const user = await User.findOne({ username })

        if (user) {
            return {error: "Username already exists"}
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword, 
            img
        })

        await newUser.save()
        console.log("saved to MDB")

        return {success: true}
    } catch (err) {
        console.log(err)
        return { error: "something went wrong"}
    }
};

export const login = async (previousState, formData) => {

    const { username, password } = Object.fromEntries(formData)

    try {
        await signIn("credentials", { username, password })
    } catch (err) {
        console.log(err)

        if (err.message.includes("CredentialsSignin")) {
            return { error: "invalid username or password"}
        }

        throw err
    }
};