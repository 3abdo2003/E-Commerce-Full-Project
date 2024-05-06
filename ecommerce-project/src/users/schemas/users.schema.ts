/* eslint-disable prettier/prettier */
import { Schema, Document } from 'mongoose';

export interface Users extends Document {
  email: string;
  password: string;
  token: string;
  resetPasswordToken: string;
}
export const UsersSchema = new Schema<Users>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String }, // Update schema to include the token field
  resetPasswordToken: {type : String}
});
