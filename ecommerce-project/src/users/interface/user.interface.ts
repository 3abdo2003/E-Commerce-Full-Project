/* eslint-disable prettier/prettier */
// user.interface.ts
import { Document } from "mongoose";


export interface Users extends Document {
  email: string;
  password: string;
  token: string; // Include the token field
  resetPasswordToken: string
}
