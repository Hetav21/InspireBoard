import { Hono } from "hono";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";

const app = new Hono();

app.route("/register", registerRouter);
app.route("/login", loginRouter);

export default app;