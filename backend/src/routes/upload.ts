import { Hono } from "hono";
import { Pin, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import UserType from "../CustomTypes/User";
import { decode, sign, verify } from 'hono/jwt';
import { z } from "zod";
import Middleware from "../middleware/auth";
import PinType from "../CustomTypes/Pin";

const uploadRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	},
	Variables: {
		userId: string
	}
}>();

uploadRouter.post("/" ,async(c) => {
	// Taking pin as input
	const body = await c.req.json();
	const Payload: PinType = body.pin;

	// Adding userId to Payload
	Payload.userId = c.get("userId");

	// Input Validation
	const pinSchema = z.object({
		title: z.string().min(3),
		about: z.string().optional(),
		url: z.string().url(),
		category: z.string().min(3),
		userId: z.string().uuid()
	});

	const res = pinSchema.safeParse(Payload);

	if(res.success == false){
		return c.json({
			pinUpload: false,
			inputError: true
		});
	}

	// Uploading Pin to db
	const Prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const Pin = await Prisma.pin.create({
		data: {
			title: Payload.title,
			about: Payload.about,
			url: Payload.url,
			category: Payload.category,
			userId: Payload.userId
		}
	})

	if(Pin == null){
		return c.json({
			pinUpload: false,
			dbError: true
		});
	}

	// Success:
	return c.json({
		pinUpload: true,
		Pin
	});
})


export default uploadRouter;