import { Request ,Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../prisma/prismaClient";
import { validateBlogInputDataType } from "../utils/blogUtils";
import InternalServer from "../errors/InternalServer";
import redisClient from "../redis/redisClient";
import { redisGetBlog , redisPutBlog} from "../utils/redisUtil";

type BlogInputType = {
  authorId: string,
  title: string,
  content: string,
};

type BlogType = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string | null;
  }
};

type AllBlogsType = BlogType[];

const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const response : AllBlogsType = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(StatusCodes.OK).json({ status: "Successful", message: "All blogs retrieved" ,data:response});
  } catch (error) {
    throw new InternalServer("Error while getting all blogs");
  }
};

const getBlog = async (req: Request, res: Response) => {
  const id = req.params.id;

  const response : string | null = await redisGetBlog(id);

  if (response) {
    const data: BlogType = JSON.parse(response);
    return res.status(StatusCodes.OK).json({ status: "Successful", message: "Blog retrieved", data });
  }
    

  try {
    const response: BlogType | null = await prisma.blog.findUnique({
      where: {
        id,
      },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    await redisPutBlog(id, JSON.stringify(response));
    res.status(StatusCodes.OK).json({ status: "Successful", message: "Blog retrieved", data: response });
  } catch (error) {
    throw new InternalServer(`Error while getting user Blog with id ${id}`);
  }
};

const addBlog = async (req: Request, res: Response) => {
  const { user } = req.body;
  const { blogData } = req.body;
  
  const blogInput : BlogInputType = {
    authorId: user.id,
    title: blogData.title,
    content: blogData.content,
  };
  validateBlogInputDataType(blogInput);
  try {
    const blog = await prisma.blog.create({
      data: blogInput,
      select: {
        id: true,      
        title: true,   
        content: true, 
        author: {
          select: {
            name: true, 
          },
        },
      },
    });
    res.status(StatusCodes.CREATED).json({ status: "Successful", message: "Blog created", blog });
  } catch (error) {
    throw new InternalServer("Error while creating blog");
  }
};

const updateBlog = async (req: Request, res: Response) => {
  res.send("update blog");
};

export { getAllBlogs, addBlog, updateBlog, getBlog };
