import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;
}
