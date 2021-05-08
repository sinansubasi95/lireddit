import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from './resolvers/post';
import { UserResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

const main = async () => {
    // Returns Promise
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up(); // automatically run the migration

    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()
    
    const app = express();

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));

    app.use(
      session({
        name: 'qid',
        store: new RedisStore({
            client: redisClient,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // years 
            httpOnly: true,
            sameSite: 'lax', // protect from Cross-Site Request Forgery (CSRF)
            secure: __prod__ // cookie only works in https
        },
        saveUninitialized: false,
        secret: 'keyboard cat',
        resave: false,
      })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
    context: ({ req, res }) => ({ em: orm.em, req, res }) // Context is a special object that is accessible by all resolvers
    });

    apolloServer.applyMiddleware({ app, cors: false });

    // to ignore variable, use underscore(_)
    app.get("/", (_, res) => {
        res.send("hello");
    });

    app.listen(4000, () => {
        console.log("Server started on localhost:4000");
    });

    // const post = orm.em.create(Post, {title: 'my first post'});
    // await orm.em.persistAndFlush(post);

    // const posts = await orm.em.find(Post, {});
    // console.log(posts);
}

main().catch((err) => {
    console.log(err);
});