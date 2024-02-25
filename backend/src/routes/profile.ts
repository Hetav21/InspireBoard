import { Hono } from 'hono/tiny';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { z } from 'zod';

const profileRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

profileRouter.get('/:userId', async (c) => {
	const userId = c.req.param('userId');

	const IdSchema = z.string().uuid();

	if (!IdSchema.safeParse(userId).success) {
		c.status(400);
		return c.json({
			profileFound: false,
			inputError: true,
		});
	}

	const Prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const User = await Prisma.user.findUnique({
		where: {
			userId,
		},
	});

	if (User == null) {
		c.status(401);
		return c.json({
			profileFound: false,
			userExists: false,
		});
	}

	const Content = await Prisma.user.findUnique({
		where: {
			userId: userId,
		},
		select: {
			boards: true,
			posts: true,
		},
	});

	return c.json({
		profileFound: true,
		Content,
	});
});

profileRouter.get('/', async (c) => {
	const userId = c.get('userId');

	const Prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const Content = await Prisma.user.findUnique({
		where: {
			userId: userId,
		},
		select: {
			boards: true,
			posts: true,
		},
	});

	return c.json({
		profileFound: true,
		Content,
	});
});

export default profileRouter;
