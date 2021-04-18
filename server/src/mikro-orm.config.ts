import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core"
import path from 'path';

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post],
    dbName: "lireddit",
    user: "postgres",
    password: "123456",
    type: "postgresql",
    debug: !__prod__, // when were not in production, i want debugging to be on
} as Parameters<typeof MikroORM.init>[0]; // to make type more specific. ex: type of "type" prop will be "postgresql" instead of string.