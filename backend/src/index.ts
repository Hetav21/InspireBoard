import { Hono } from "hono";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
import uploadRouter from "./routes/upload";
import { verify } from 'hono/jwt';
import pinRouter from "./routes/pin";
import exploreRouter from "./routes/explore";
import editRouter from "./routes/edit";
import saveRouter from "./routes/save";
import createRouter from "./routes/board";
import feedRouter from "./routes/feed";
import deleteRouter from "./routes/delete";
import profileRouter from "./routes/profile";

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
        c.status(401);

        c.json({
            tokenError: true
        });

        return ;
    }

    const payload = await verify(token, c.env.JWT_SECRET);

    if(payload == null){
        c.status(403);

        c.json({
            tokenError: true,
            authError: true
        });
    }

    c.set('userId', payload);

    await next();
})
app.route("/upload", uploadRouter);

app.route("/pin/", pinRouter);

app.route("/explore", exploreRouter);

app.route("/edit", editRouter);

app.route("/create", createRouter);

app.route("/save", saveRouter);

app.route("/feed", feedRouter);

app.route("/delete", deleteRouter);

app.route("/profile", profileRouter);

export default app;