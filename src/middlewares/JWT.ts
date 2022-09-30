import express from 'express'
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config()

export const jwtverify = (req: express.Request, res: express.Response, next: Function) => {
  const token = req.headers["Authorization"]?.toString().split(' ')[1] || req.headers["authorization"]?.toString().split(' ')[1] || req.body.jwt || req.query.jwt

  if (!token) {
    return res.status(401).send("Unauthorized action")
  }

  try {
    if(jwt.verify(token, process.env.JWT_KEY ? process.env.JWT_KEY : "VucO8hw09Aicw74!ZLA!q4Il")) {
      return next()
    }
    return res.status(401).send("Unauthorized action")
  } catch (err) {
    res.status(401).send("Invalid user token")
    return next()
  }
} // end of jwtverify
