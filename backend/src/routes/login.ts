import { Hono } from 'hono/tiny';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import UserType from '../CustomTypes/User';
import { sign } from 'hono/jwt';
import { z } from 'zod';

const loginRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

loginRouter.post('/', async (c) => {
	//Inputs Body
	const body = await c.req.json();
	const login: UserType = body.login;

	//Input Validation
	const userSchema = z.object({
		username: z.string(),
		password: z.string().min(8),
	});

	const res = userSchema.safeParse(login);

	if (res.success == false) {
		c.status(400);
		return c.json({
			userLogin: false,
			inputError: true,
		});
	}

	//Checks if user exists and fetching user from DB
	const Prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const user = await Prisma.user.findUnique({
		where: {
			username: login.username,
		},
		select: {
			userId: true,
			username: true,
			email: true,
			password: true,
		},
	});

	if (user == null) {
		c.status(500);
		return c.json({
			userLogin: false,
			userExists: false,
		});
	}

	// Comparing Passwords
	if (user.password != login.password) {
		c.status(403);
		return c.json({
			userLogin: false,
			authError: true,
		});
	}

	// Generating JWT
	const idToken = await sign(user.userId, c.env.JWT_SECRET);

	//Success
	return c.json({
		userLogin: true,
		idToken,
	});
});

export default loginRouter;
