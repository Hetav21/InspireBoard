import { Hono } from 'hono/tiny';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { z } from 'zod';

const feedRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

feedRouter.get('/:boardId', async (c) => {
	const boardId = c.req.param('boardId');

	const IdSchema = z.string().uuid();

	if (!IdSchema.safeParse(boardId).success) {
		c.status(400);
		return c.json({
			feedFound: false,
			inputError: true,
		});
	}

	const Prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const Pins = await Prisma.board.findUnique({
		where: {
			boardId,
		},
		select: {
			posts: true,
		},
	});

	return c.json({
		feedFound: true,
		Pins,
	});
});

export default feedRouter;
