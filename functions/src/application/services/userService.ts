import {db} from "../../config/firebase";
import {User} from "../../types/user";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as User;
};
