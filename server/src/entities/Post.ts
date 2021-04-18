import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {
  @PrimaryKey()
  id!: number;

  @Property({ type: "date" }) // Propert = Colmun
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() }) // It is going to create date every time we update
  updatedAt = new Date();

  @Property({ type: "text" })
  title!: string;
}