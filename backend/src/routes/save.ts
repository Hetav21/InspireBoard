import { Hono } from 'hono/tiny';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { z } from 'zod';

const saveRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

saveRouter.put('/:pinId/board/:boardId', async (c) => {
	const { pinId, boardId } = c.req.param();
	const userId = c.get('userId');

	const IdSchema = z.string().uuid();

	if (!IdSchema.safeParse(pinId).success || !IdSchema.safeParse(boardId).success) {
		c.status(400);
		return c.json({
			pinSaved: false,
			inputError: true,
		});
	}

	const Prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const Board = await Prisma.board.findUnique({
		where: {
			boardId,
		},
	});

	if (Board == null) {
		c.status(401);
		return c.json({
			pinSaved: false,
			boardExists: false,
		});
	}

	if (Board?.userId != userId) {
		c.status(403);
		return c.json({
			pinSaved: false,
			authError: true,
		});
	}

	const Pin = await Prisma.pin.findUnique({
		where: {
			postId: pinId,
		},
	});

	if (Pin == null) {
		c.status(401);
		return c.json({
			pinSaved: false,
			pinExists: false,
		});
	}

	const Save = await Prisma.board.update({
		where: {
			boardId,
		},
		data: {
			posts: {
				connect: {
					postId: pinId,
				},
			},
		},
	});

	return c.json({
		pinSaved: true,
		Save,
	});
});

export default saveRouter;
