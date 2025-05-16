import dotenv from "dotenv";
dotenv.config();

import { ObjectId } from "mongodb";
import { getDB } from "../config/database";
import bcrypt from "bcryptjs";

export interface Profile {
  _id?: ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: Date;
}

export interface ProfileCreationData {
  email: string;
  password_plaintext: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface ProfileLoginData {
  email: string;
  password_plaintext: string;
}

const collectionName = process.env.COLLECTION_NAME || "profiles";

if (!collectionName) {
  console.error("Error: COLLECTION_NAME is not defined in your .env file");
}

export const ProfileModel = {
  create: async (
    profileData: ProfileCreationData
  ): Promise<Omit<Profile, "password">> => {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
    const hashedPassword = await bcrypt.hash(
      profileData.password_plaintext,
      saltRounds
    );

    const newProfile: Omit<Profile, "_id"> = {
      email: profileData.email,
      password: hashedPassword,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      phoneNumber: profileData.phoneNumber,
      createdAt: new Date(),
    };

    const db = await getDB();
    const result = await db
      .collection<Omit<Profile, "_id">>(collectionName)
      .insertOne(newProfile);

    const { password, ...profileWithoutPassword } = newProfile;
    return {
      _id: result.insertedId,
      ...profileWithoutPassword,
    };
  },

  findByEmail: async (email: string): Promise<Profile | null> => {
    const db = await getDB();
    const profile = await db
      .collection<Profile>(collectionName)
      .findOne({ email });

    return profile;
  },

  login: async ({ email, password_plaintext }: ProfileLoginData) => {
    const db = await getDB();
    const profile = await db
      .collection<Profile>(collectionName)
      .findOne({ email });

    if (!profile) {
      throw new Error("Profile not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password_plaintext,
      profile.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Incorrect password");
    }

    return profile;
  },
};
