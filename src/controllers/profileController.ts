import { Request, Response } from "express";
import { ProfileModel } from "../models/Profile";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export const profileController = {
  registerUser: async (req: Request, res: Response) => {
    try {
      const { email, password_plaintext, firstName, lastName, phoneNumber } =
        req.body;
      const profile = await ProfileModel.create({
        email,
        password_plaintext,
        firstName,
        lastName,
        phoneNumber,
      });

      res.status(201).json({
        status: "success",
        data: profile,
      });
    } catch (error) {
      console.log("error :", error);
      res.status(500).json({
        status: "error",
        message: "Failed to create lead",
      });
    }
  },

  loginUser: async (req: Request, res: Response) => {
    try {
      const { email, password_plaintext } = req.body;
      const profile = await ProfileModel.login({ email, password_plaintext });

      res.status(201).json({
        status: "success",
        data: profile,
      });
    } catch (error) {
      console.log("error :", error);
      res.status(500).json({
        status: "error",
        message: "Failed to login",
      });
    }
  },
};
