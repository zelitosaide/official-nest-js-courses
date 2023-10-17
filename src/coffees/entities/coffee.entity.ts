import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Flavor } from "./flavor.entity";

// @Entity("coffees")
@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  // @Column("json", { nullable: true })
  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    // cascade: ["insert", "update"],
    cascade: true,
  })
  flavors: string[];
}
