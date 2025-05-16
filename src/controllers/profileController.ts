import { Request, Response } from "express";
import { ProfileModel } from "../models/Profile";
import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined in .env file.");
  process.exit(1);
}

export const profileController = {
  registerUser: async (req: Request, res: Response) => {
    try {
      const { email, password_plaintext, firstName, lastName, phoneNumber } =
        req.body;

      if (!email || !password_plaintext || !firstName || !lastName) {
        return res.status(400).json({
          status: "error",
          message: "Email, password, firstName, and lastName are required.",
        });
      }

      const existingProfile = await ProfileModel.findByEmail(email);
      if (existingProfile) {
        return res.status(409).json({
          status: "error",
          message: "User with this email already exists.",
        });
      }

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

      const payload = {
        id: profile._id,
        email: profile.email,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({
        status: "success",
        message: "Login successful.",
        token: `Bearer ${token}`,
        data: {
          id: profile._id,
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
        },
      });
    } catch (error) {
      console.log("error :", error);
      res.status(500).json({
        status: "error",
        message: "Failed to login",
      });
    }
  },

  seeUserDetail: async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Authorization token is missing",
      });
    }

    const pureToken = token.split(" ")[1];

    try {
      const decodedToken = jwt.verify(pureToken, JWT_SECRET) as {
        id: string;
        email: string;
      };

      const profile = await ProfileModel.findById(decodedToken.id);

      if (!profile) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      res.status(200).json({
        status: "success",
        data: profile,
      });
    } catch (error) {
      console.log("error :", error);
      res.status(500).json({
        status: "error",
        message: "Failed to get user detail",
      });
    }
  },
};
