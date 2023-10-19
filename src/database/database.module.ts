import { DynamicModule, Module } from "@nestjs/common";
import { DataSource, DataSourceOptions } from "typeorm";
import { CONNECTION } from "./database.constants";

@Module({
  // providers: [
  //   {
  //     provide: CONNECTION,
  //     useValue: new DataSource({
  //       type: "postgres",
  //       host: "localhost",
  //       username: "postgres",
  //       port: 5433,
  //       password: "pass123",
  //     }).initialize(),
  //   },
  // ],
})
export class DatabaseModule {
  static register(options: DataSourceOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: CONNECTION,
          useValue: new DataSource(options).initialize(),
        },
      ],
    };
  }
}
