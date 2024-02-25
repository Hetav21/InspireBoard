import { Hono } from 'hono/tiny';
import { Pin, PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { z } from 'zod';

const pinRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

pinRouter.get('/:pinId', async (c) => {
	const pinId = c.req.param('pinId');

	const pinSchema = z.string().uuid();

	if (!pinSchema.safeParse(pinId).success) {
		c.status(400);
		return c.json({
			pinFound: false,
			invalidPinId: true,
		});
	}

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
			pinFound: false,
			pinExists: false,
		});
	}

	return c.json({
		pinFound: true,
		pin,
	});
});

export default pinRouter;
