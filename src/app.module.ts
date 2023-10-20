import {
  Module,
  // ValidationPipe,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { CoffeesController } from "./coffees/coffees.controller";
// import { CoffeesService } from "./coffees/coffees.service";
import { CoffeesModule } from "./coffees/coffees.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeeRatingModule } from "./coffee-rating/coffee-rating.module";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import appConfig from "./config/app.config";
// import { APP_PIPE } from "@nestjs/core";
// import { DatabaseModule } from "./database/database.module";
import { CommonModule } from "./common/common.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      // envFilePath: ".environment",
      // envFilePath: ".env",
      // envFilePath: [".env", ".environment"],
      // ignoreEnvFile: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PASSWORD: Joi.required(),
        DATABASE_PORT: Joi.number().default(5433),
      }),
      load: [appConfig],
    }),
    CoffeesModule,
    // TypeOrmModule.forRoot({
    //   type: "postgres", // type of our database
    //   host: process.env.DATABASE_HOST, // database host
    //   port: +process.env.DATABASE_PORT, // database host
    //   username: process.env.DATABASE_USER, // username
    //   password: process.env.DATABASE_PASSWORD, // user password
    //   database: process.env.DATABASE_NAME, // name of our database,
    //   autoLoadEntities: true, // models will be loaded automatically
    //   synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    // }),
    CoffeeRatingModule,
    CommonModule,
    // DatabaseModule,
  ],
  controllers: [
    AppController,
    // CoffeesController
  ],
  providers: [
    AppService,
    // CoffeesService,
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe
    // },
  ],
})
export class AppModule {}
