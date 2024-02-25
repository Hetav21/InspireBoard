import { Hono } from 'hono/tiny';
import { Pin, PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { z } from 'zod';
import PinType from '../CustomTypes/Pin';

const editRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

editRouter.put('/:pinId', async (c) => {
	const pinId = c.req.param('pinId');
	const userId = c.get('userId');

	const pinIdSchema = z.string().uuid();

	if (!pinIdSchema.safeParse(pinId).success) {
		c.status(400);
		return c.json({
			pinEdit: false,
			invalidPinId: true,
		});
	}

	// Checking if User has access to this pin
	const Prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const pin = await Prisma.pin.findUnique({
		where: {
			postId: pinId,
		},
	});

	if (pin == null) {
		c.status(401);
		return c.json({
			pinEdit: false,
			invalidPin: true,
		});
	}

	if (pin.userId != userId) {
		c.status(401);
		return c.json({
			pinEdit: false,
			unauthorized: true,
		});
	}

	// Updating Pin
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
			pinEdit: false,
			inputError: true,
		});
	}

	// Updating Pin in db

	const Pin = await Prisma.pin.update({
		where: {
			postId: pinId,
		},
		data: {
			title: Payload.title,
			about: Payload.about,
			url: Payload.url,
			category: Payload.category,
			userId: Payload.userId,
			isEdited: true,
		},
	});

	if (Pin == null) {
		c.status(500);
		return c.json({
			pinEdit: false,
			dbError: true,
		});
	}

	// Success:
	return c.json({
		pinEdit: true,
		Pin,
	});
});

export default editRouter;
