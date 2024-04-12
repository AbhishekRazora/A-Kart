import User from "../model/User.js"
import bcryptjs from "bcryptjs"
import { COOKIE_Name } from "../utils/constant.js";
import { createToken } from "../utils/token-manager.js";
import crypto from "crypto"
import sendEmail from "../utils/email.js";


export const createUser = async (req, res, next) => {
    try {

        
        const { email, password, role, addresses } = req.body;
       
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return (
                res.status(401).json({
                    success: false,
                    message: 'User already registered'
                })
            )
        }
        const user = new User({ email, password: hashedPassword, role, addresses })

       
        await user.save()

        res.clearCookie(COOKIE_Name, {
            path: "/",
            // domain: "localhost",
            domain: "a-kart.onrender.com",
            httpOnly: true,
            signed: true,
        })

        const token = createToken(user.id.toString(), user.email, "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_Name, token, {
            path: "/",
            // domain: "localhost",
            domain: "a-kart.onrender.com",
            expires,
            httpOnly: true,
            signed: true,
        })
        return res.status(201).json({ id: user.id, role: user.role })
        // res.status(201).json(user)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)

    }

}


export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "No such user found" })
        }
        const isPasswordCorrect = bcryptjs.compareSync(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "Incorrect credentials" })
        }

        res.clearCookie(COOKIE_Name, {
            path: "/",
            // domain: "localhost",
            domain: "a-kart.onrender.com",
            httpOnly: true,
            signed: "true",
        })

        const token = createToken(user.id.toString(), user.email, "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)

        res.cookie(COOKIE_Name, token, {
            path: "/",
            // domain: "localhost",
            domain: "a-kart.onrender.com",
            expires,
            httpOnly: true,
            signed: true,
        })

        return res.status(201).json({ id: user.id, role: user.role })



    } catch (error) {
        console.log(error)
        return res.status(400).json(error)

    }
   
}












export const signOutUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);

        if (!user) {
            return res.status(401).json({ success: false, message: "User not registered or token mulfunctioned" })
        }

        if (user.id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ success: false, message: "Permissions didn't match" })
        }
        res.clearCookie(COOKIE_Name, {
            path: "/",
            // domain: "localhost",
            domain: "a-kart.onrender.com",
            httpOnly: true,
            signed: true,
        })
        return res.status(200).json({
            success: true,
            message: "OK, Logout successfully"
        })
    } catch (error) {
        return res.status(400).json({
            message: "error occur in signOut"
        })

    }
}


export const checkUserAuth = async (req, res, next) => {
    try {
        const { id } = res.locals.jwtData;
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not registered or token mulfunctioned" })
        }

        if (user.id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ success: false, message: "Permissions didn't match" })
        }
        return res.status(200).json({ id: user.id, role: user.role })

    } catch (error) {
        return res.status(401).json({
            message: "error occur in check user auth"
        })

    }

}

export const resetPasswordRequest = async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'We could not find the user with given email'
        })
    }
    if (user) {
        const token = crypto.randomBytes(48).toString('hex')
        user.resetPasswordToken = token;
        await user.save()

        // Also set token in email
        const resetPageLink = `http://localhost:5173/reset-password?token=${token}&email=${email}`
        const message = `We have received a password reset request.Please use the below link to reset your password\n\n${resetPageLink}`
        const subject = 'Password change request received'

        try {
            await sendEmail({
                email: user.email,
                subject,
                message,
            })
            res.status(200).json({
                success: true,
                message: 'Password reset link send to the user email'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "There was an error in sending password reset email.Please try again later"
            })
        }



    }




}


export const resetPassword = async (req, res, next) => {
    const { email, password, token } = req.body;

    const user = await User.findOne({ email: email, resetPasswordToken: token })

    if (user) {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        user.password = hashedPassword;
        await user.save()

        // sending mail for successful reseting the password
        const message = `Successfully able to Reset Password`
        const subject = 'Password successfully reset for A-Kart'

        try {
            await sendEmail({
                email: user.email,
                subject,
                message,
            })
            res.status(200).json({
                success: true,
                message: 'Password successfully rest for A-kart.'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "There was an error in sending successfull password reset email.Please try again later"
            })
        }
    }else{
        res.status(404).json({
            success:false,
            message:"User or token invalid"
        })
    }
}