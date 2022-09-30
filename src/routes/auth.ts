import express from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { User, UserStore } from '../models/User';
import { JSONResponse } from '../helpers/functions';

const auth = express.Router();

dotenv.config()

const users = new UserStore();

auth.post('/login', async (req: express.Request, res: express.Response) => {
    try{
        if(!req.body.username || !req.body.password) {
            return res.send(JSONResponse({
                "msg":"username and password are required",
            }));
        }

        const user = await users.login(req.body.username, req.body.password);

        if(!user) {
            return res.send(JSONResponse({
                "msg":"Username or password is invalid",
            }));
        }

        return res.send(JSONResponse({
            success: true,
            msg: jwt.sign(
                user,
                process.env.JWT_KEY ? process.env.JWT_KEY : "VucO8hw09Aicw74!ZLA!q4Il"
            ),
        }));
    } catch(err) {
        res.status(500).send(JSONResponse({
            "msg":"Server error",
        }));
    }
}); // end of login

auth.post('/register', async (req: express.Request, res: express.Response) => {
    try{
        if(!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.password) {
            return res.send("first name and last name and username and password are required");
        }
        res.send(JSONResponse({
            "success":true,
            "msg":await users.register({
                id: 0,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: req.body.password,
            })
        }));
    } catch(err) {
        res.send(JSONResponse({
            "msg":"Use another username because it was exists",
        }));
    }
}); // end of register

export default auth;