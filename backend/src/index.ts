import { Hono } from "hono";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
import Middleware from "./middleware/auth";
import uploadRouter from "./routes/upload";
import { decode, sign, verify } from 'hono/jwt';

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
	}, Variables: {
        userId: string
    }
}>();

app.all("/", async (c) => {
    return c.text("Hello World!!");
}) 

app.route("/register", registerRouter);
app.route("/login", loginRouter);

app.use(async (c, next) => {
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

    c.set('userId', payload);

    await next();
})
app.route("/upload", uploadRouter);

export default app;