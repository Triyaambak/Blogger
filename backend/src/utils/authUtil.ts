import "dotenv/config";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import BadRequest from "../errors/BadRequest";
import InternalServer from "../errors/InternalServer";

const AuthInputSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long." })
        .regex(/^[A-Za-z\s]+$/, { message: "Name must contain only alphabetic characters and spaces." }),
    email: z.string().email({ message: "Invalid email format." }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[\W_]/, { message: "Password must contain at least one special character." })
});

const validateAuthSignUpInput = (authInput: any): void => {
  try {
    AuthInputSchema.parse(authInput);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors[0].message;
      throw new BadRequest(errorMessage);
    }
    else
      throw new InternalServer("Something went wrong while validating Sign Up input , Please try again later");
  }
};

const validateAuthSigninInput = (authInput: any): void => {
    if (authInput.email.length === 0)
        throw new BadRequest("Email cannot be empty");
    if (authInput.password.length === 0)
        throw new BadRequest("Password cannot be empty");
}

const hashPassword = async (password: string) : Promise<string> => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
}

const comparePassword = async (candidatePassword: string, hashPassword: string): Promise<Boolean> => {
    return await bcryptjs.compare(candidatePassword, hashPassword);
}

const createJWt = (id: string, name: string | null, email: string): string => {
    const secret = process.env.JWT_SECRET;
    const expirationTime = process.env.JWT_EXPIRATION_TIME;

    if (!secret) {
        throw new InternalServer("JWT_SECRET environment variable is not defined");
    }

    if (!expirationTime) {
        throw new InternalServer("JWT_EXPIRATION_TIME environment variable is not defined");
    }

    return jwt.sign({ id, name, email }, secret, { expiresIn: expirationTime });
}

export { validateAuthSignUpInput, validateAuthSigninInput, hashPassword, comparePassword ,createJWt};
