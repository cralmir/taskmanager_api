import {Request, Response, RequestHandler} from "express";
import {
  loginUser,
  registerUser,
} from "../../application/services/authService";
import {ZodError} from "zod";
import {loginSchema} from "../../schemas/authSchema";

export const loginController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const input = loginSchema.parse(req.body);

    const token = await loginUser(input);

    if (!token) {
      res.status(401).json({message: "User not found!"});
      return;
    }

    res.status(200).json({token});
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({errors: error.errors});
    }

    console.log(error);
    res.status(500).json({message: "Internal server error"});
  }
};

export const registerController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const input = loginSchema.parse(req.body);

    const token = await registerUser(input);

    if (!token) {
      res.status(409).json({message: "User already existed!"});
      return;
    }

    res.status(200).json({token});
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({errors: error.errors});
    }

    console.log(error);
    res.status(500).json({message: "Internal server error"});
  }
};
