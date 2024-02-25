import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import UserType from "../CustomTypes/User";
import { decode, sign, verify } from 'hono/jwt';
import { z } from "zod";
import Middleware from "../middleware/auth";

const uploadRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	}
}>();

uploadRouter.get("/" ,async(c) => {

})


export default uploadRouter;