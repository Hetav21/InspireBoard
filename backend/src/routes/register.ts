import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import UserType from "../CustomTypes/User";
import { z } from "zod";
import { decode, sign, verify } from 'hono/jwt';

const registerRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	}
}>();

registerRouter.post("/", async (c) => {
    //Inputs Body
    const body = await c.req.json();
    const user: UserType = body.user; 

    //Input Validation
    const userSchema = z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(8)
    });

    const res = userSchema.safeParse(user);

    if(res.success == false){
        c.status(400)
        return c.json({
            userCreated: false,
            inputError: true
        });
    }

    //Checks if user already exists
    const Prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userExists = await Prisma.user.findUnique({
        where: {
            username: user.username
        },
    });

    if(userExists != null){
        c.status(403)
        return c.json({
            userCreated: false,
            userExists: true
        })
    }


    //Creating User and Storing in Database
    const newUser = await Prisma.user.create({
        data: {
            username: user.username,
            email: user.email,
            password: user.password
        }
    });

    //Error Handling
    if(newUser == null){
        c.status(500)
        return c.json({
            userCreated: false,
            dbError: true
        });
    }

    //Generating JWT
    const idToken = await sign(newUser.userId, c.env.JWT_SECRET)

    //Success
    return c.json({
        userCreated: true,
        idToken
    });
});

export default registerRouter;