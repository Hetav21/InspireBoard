import { Hono } from "hono";
import { verify } from "hono/jwt";

const Middleware = new Hono <{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	}, Variables: {
        userId: string
    }
}>();

Middleware.use(async (c, next) => {
    const token: string = c.req.header("authorization") || "";

    if(token == null){
        c.json({
            tokenError: true
        });
    }

    const payload = await verify(token, c.env.JWT_SECRET);

    if(payload == null){
        c.json({
            tokenError: true,
            authError: true
        });
    }

    c.set('userId', payload.userId);

    await next();
});

export default Middleware;