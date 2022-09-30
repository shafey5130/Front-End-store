import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"

dotenv.config();

const config = process.env

export const passwordHash = (password: string) => {
    return bcrypt.hashSync(
        password+"7R52jB^NLzZ3", 
        12
    );
}

export const passwordVerify = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password+"7R52jB^NLzZ3", hashedPassword);
}

export const JSONResponse = ({msg, success=false}: any) => {
    return {
        "success":success,
        "data":msg,
    }
}

export const getToken = (req: express.Request) => {
    let token = req.headers['authorization'] || req.headers['Authorization'];
    if(!token) {
        return null
    }
    return token.toString().split(' ')[1];
}

export const auth = async (req: express.Request) => {
    let token = getToken(req);
    if(!token) return null;
    return await jwt.verify(token, process.env.JWT_KEY ? process.env.JWT_KEY : "VucO8hw09Aicw74!ZLA!q4Il")
}

export const isArrayOnlyHave = (arr: Array<any>, type: String): boolean => {
    if(Array.isArray(arr)) {
        return arr.every(item => {
            return typeof item === type
        })
    }
    return false
}
