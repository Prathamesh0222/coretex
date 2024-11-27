import { Router } from "express";
import { userSchema } from "../schema/validations";
import { User } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.post("/signup", async (req, res): Promise<any> => {
  try {
    const parsedResult = await userSchema.safeParse(req.body);
    if (!parsedResult.success) {
      return res.status(422).json({
        message: "Invalid Inputs",
      });
    }
    const { username, password } = parsedResult.data;

    const user = await User.findOne({ username });

    if (user) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User Created",
    });
  } catch (error) {
    console.error("Error in signup", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

userRouter.post("/signin", async (req, res): Promise<any> => {
  const parsedResult = await userSchema.safeParse(req.body);
  if (!parsedResult.success) {
    return res.status(422).json({
      message: "Invalid Inputs",
    });
  }
  try {
    const { username, password } = parsedResult.data;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret");

    return res.status(200).json({
      message: "Signin Successful",
      token,
    });
  } catch (error) {
    console.error("Error in signin", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default userRouter;
