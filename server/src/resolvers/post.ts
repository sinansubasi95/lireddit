import { MyContext } from "src/types";
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import { Post } from "../entities/Post";

@Resolver()
export class PostResolver {
    @Query(() => [Post]) // Post is data type
    posts(@Ctx() {em}: MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }

    @Query(() => Post, { nullable: true }) // Post is data type
    post(
        @Arg("id") id: number, // Gets argument which is integer, and the name of the arugment must be "id"
        @Ctx() {em}: MyContext): Promise<Post | null> { // Returns "a Post" or "null"
        return em.findOne(Post, { id });
    }

    // Query in graphql is used to fetch data while mutation is used for insert, update, delete operation.
    @Mutation(() => Post) 
    async createPost(
        @Arg("title") title: string,
        @Ctx() {em}: MyContext
    ): Promise<Post> {
        const post = em.create(Post, { title });
        await em.persistAndFlush(post);
        return post;
    }

    @Mutation(() => Post, { nullable: true }) 
    async updatePost(
        @Arg("id") id: number,
        @Arg("title", () => String, { nullable : true }) title: string,
        @Ctx() {em}: MyContext
    ): Promise<Post | null> {
        const post = await em.findOne(Post, {id});
        if(!post) {
            return null;
        }
        if(typeof title !== 'undefined') {
            post.title = title;
            await em.persistAndFlush(post);
        }
        post.title = title;
        return post;
    }

    @Mutation(() => Boolean) 
    async deletePost(
        @Arg("id") id: number,
        @Ctx() {em}: MyContext
    ): Promise<boolean> {
        // i can try catch it if i want to
        await em.nativeDelete(Post, {id});
        return true;
    }
}