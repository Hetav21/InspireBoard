import { Hono } from 'hono/tiny';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { z } from 'zod';

const createRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

createRouter.post('/', async (c) => {
	const body = await c.req.json();
	const title = body.title;

	const titleSchema = z.string().nonempty();

	if (titleSchema.safeParse(title).success == false) {
		c.status(400);
		return c.json({
			boardCreated: false,
			inputError: true,
		});
	}

	const Prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const Board = await Prisma.board.create({
		data: {
			title: title,
			userId: c.get('userId'),
		},
	});

	return c.json({
		boardCreated: true,
		Board,
	});
});

export default createRouter;
