import jwk from "jsonwebtoken";
import { LoginInput } from "../schemas/authSchema";
import { findUserByEmail } from "./userService";
import { db } from "../config/firebase";

const SECRET = process.env.TASK_MANAGER_JWT_SECRET || "";

export const loginUser = async (input: LoginInput): Promise<string | null> => {
  const user = await findUserByEmail(input.email);

  if (!user) return null;

  const token = jwk.sign({ userId: user.id }, SECRET, { expiresIn: "24h" });
  return token;
};

export const registerUser = async (
  input: LoginInput
): Promise<string | null> => {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser !== null) return null;

  const userRef = await db.collection("usersTest").add({ email: input.email });

  const token = jwk.sign({ userId: userRef.id }, SECRET, { expiresIn: "24h" });
  return token;
};
