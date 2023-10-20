import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { CoffeesController } from "./coffees/coffees.controller";
// import { CoffeesService } from "./coffees/coffees.service";
import { CoffeesModule } from "./coffees/coffees.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeeRatingModule } from "./coffee-rating/coffee-rating.module";
import { ConfigModule } from "@nestjs/config";
// import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: "postgres", // type of our database
      host: process.env.DATABASE_HOST, // database host
      port: +process.env.DATABASE_PORT, // database host
      username: process.env.DATABASE_USER, // username
      password: process.env.DATABASE_PASSWORD, // user password
      database: process.env.DATABASE_NAME, // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    CoffeeRatingModule,
    // DatabaseModule,
  ],
  controllers: [
    AppController,
    // CoffeesController
  ],
  providers: [
    AppService,
    // CoffeesService
  ],
})
export class AppModule {}
