import { Hono } from "hono";
import { Pin, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import UserType from "../CustomTypes/User";
import { decode, sign, verify } from 'hono/jwt';
import { z } from "zod";
import Middleware from "../middleware/auth";
import PinType from "../CustomTypes/Pin";

const exploreRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	},
	Variables: {
		userId: string
	}
}>();

exploreRouter.on('GET',["/" ,"/:n"], async (c) => {
    const n: number = parseInt(c.req.param("n")) || 100;

    const Prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const pins = await Prisma.pin.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: n
    });

    return c.json({
        pins,
    })
});

export default exploreRouter;