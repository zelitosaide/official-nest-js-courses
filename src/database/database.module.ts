import { Module } from "@nestjs/common";
import { DataSource } from "typeorm";

@Module({
  providers: [
    {
      provide: "CONNECTION",
      useValue: new DataSource({
        type: "postgres",
        host: "localhost",
        username: "postgres",
        port: 5433,
        password: "pass123"
      }).initialize(),
    }
  ],
})
export class DatabaseModule {}
