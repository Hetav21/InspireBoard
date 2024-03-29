import { Hono } from 'hono/tiny';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { z } from 'zod';
import PinType from '../CustomTypes/Pin';

const uploadRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

uploadRouter.post('/', async (c) => {
	// Taking pin as input
	const body = await c.req.json();
	const Payload: PinType = body.pin;

	// Adding userId to Payload
	Payload.userId = c.get('userId');

	// Input Validation
	const pinSchema = z.object({
		title: z.string().min(3),
		about: z.string().optional(),
		url: z.string().url(),
		category: z.string().min(3),
		userId: z.string().uuid(),
	});

	const res = pinSchema.safeParse(Payload);

	if (res.success == false) {
		c.status(400);
		return c.json({
			pinUpload: false,
			inputError: true,
		});
	}

	// Uploading Pin to db
	const Prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const Pin = await Prisma.pin.create({
		data: {
			title: Payload.title,
			about: Payload.about,
			url: Payload.url,
			category: Payload.category,
			userId: Payload.userId,
		},
	});

	if (Pin == null) {
		c.status(500);
		return c.json({
			pinUpload: false,
			dbError: true,
		});
	}

	// Success:
	return c.json({
		pinUpload: true,
		Pin,
	});
});

export default uploadRouter;
