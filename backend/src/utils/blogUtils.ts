import { z } from "zod";
import BadRequest from "../errors/BadRequest";
import InternalServer from "../errors/InternalServer";

const BlogDataSchema = z.object({
  authorId: z.string({
    required_error: "Author ID is required.",
    invalid_type_error: "Author ID must be a string.", 
  }),
  title: z
    .string()
    .min(1, { message: "Title must be at least 1 characters long." }),
  content: z
    .string()
    .min(1, { message: "Content must be at least 1 characters long." }),
});

const validateBlogInputDataType = (blogData: any) => {
  try {
    BlogDataSchema.parse(blogData);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors[0].message;
      throw new BadRequest(errorMessage);
    }
    else
      throw new InternalServer("Something went wrong , while validating Blog Input Type");
  }
};

export { validateBlogInputDataType };
