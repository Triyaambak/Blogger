import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import InternalServer from  "../errors/InternalServer";
import { validateAuthSignUpInput, validateAuthSigninInput, hashPassword, comparePassword , createJWt } from '../utils/authUtil';
import BadRequest from '../errors/BadRequest';
import { StatusCodes } from 'http-status-codes';

type AuthInputType = {
    name?: string;
    email: string;
    password: string;
}

type AuthUserDetailsType = {
  id: string,
  name: string,
  email:string,
}

const getAuth = (req: Request, res: Response) => {
  const authUserDetails : AuthUserDetailsType = {
    "id": req.body.user.id,
    "name": req.body.user.name,
    "email": req.body.user.email,
  }
  res.status(StatusCodes.OK).json(authUserDetails);
}

const signin = async (req: Request, res: Response) => {
    const authInput: AuthInputType = req.body;
    validateAuthSigninInput(authInput);
    const user = await prisma.user.findUnique({
        where: {
            email: authInput.email,
        }
    });
    if (!user)
        throw new BadRequest("Email is not registered");
    const isMatch = await comparePassword(authInput.password, user.password);
    if (!isMatch) {
        throw new BadRequest("Email and Password do not match");
    }
    const token = createJWt(user.id, user.name, user.email);
    res.cookie("authToken", token, {
        maxAge: 86400000,
        sameSite: "strict",
        httpOnly: true,
    });
    res.status(StatusCodes.OK).json({
        status: "Successful",
        message: "User signed in",
    });
}

const signup = async (req: Request, res: Response) => {
    const authInput : AuthInputType = req.body;
    validateAuthSignUpInput(authInput);
    const exists = await prisma.user.findUnique({
        where: {
            email: authInput.email,
        }
    });
    if (exists) {
        throw new BadRequest("Email is already registered");
    }
    authInput.password = await hashPassword(authInput.password);
    try {
        const user = await prisma.user.create({
            data: {
            name: authInput.name,
            email: authInput.email,
            password: authInput.password,
          },
        });
        const token = createJWt(user.id, user.name, user.email);
        res.cookie("authToken", token, {
            maxAge: 86400000,
            sameSite: "strict",
            httpOnly: true,
        });
        res.status(StatusCodes.CREATED).json({
            status: "Successful",
            message: "User registered",
        });
    } catch (error) {
        throw new InternalServer("Failed to register user");
    }
}

export { signin, signup, getAuth };
