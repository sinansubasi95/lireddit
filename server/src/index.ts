import {MikroORM} from "@mikro-orm/core";

const main = async () => {
    const orm = await MikroORM.init({
        dbName: "lireddit",
        user: "postgres",
        password: "123456",
        type: "postgresql",
        debug: true
    }); // Returns Promise
}

main();