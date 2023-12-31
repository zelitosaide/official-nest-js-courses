import {
  // Injectable,
  Module,
  // Scope
} from "@nestjs/common";
import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";
import { Event } from "src/events/entities/event.entity";
import { COFFEE_BRANDS } from "./coffees.constants";
// import { Connection } from "typeorm";
import { ConfigModule } from "@nestjs/config";
import coffeesConfig from "./config/coffees.config";
// import { CommonModule } from "src/common/common.module";

// class MockCoffeesService {}

// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

// @Injectable()
// export class CoffeeBrandsFactory {
//   create() {
//     // do something ...
//     return ["buddy brew", "nescafe"];
//   }
// }

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    // ConfigModule,
    ConfigModule.forFeature(coffeesConfig),
    // CommonModule,
  ],
  controllers: [CoffeesController],
  // providers: [CoffeesService],
  providers: [
    {
      provide: CoffeesService,
      useClass: CoffeesService,
    },
    // {
    //   provide: CoffeesService,
    //   useValue: new MockCoffeesService(),
    // }
    // {
    //   provide: COFFEE_BRANDS,
    //   useValue: ["buddy brew", "nescafe"],
    // },
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === "development"
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: async (connection: Connection): Promise<string[]> => {
    //     // const coffeeBrands = await connection.query('SELECT * ...');
    //     const coffeeBrands = await Promise.resolve(["buddy brew", "nescafe"]);
    //     console.log("[!] Async factory");
    //     return coffeeBrands;
    //   },
    //   inject: [Connection],
    // },
    // CoffeeBrandsFactory,
    // {
    //   provide: COFFEE_BRANDS,
    //   // useFactory: () => ["buddy brew", "nescafe"],
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) =>
    //     brandsFactory.create(),
    //   inject: [CoffeeBrandsFactory],
    // },
    {
      provide: COFFEE_BRANDS,
      useFactory: () => ["buddy brew", "nescafe"],
      // scope: Scope.TRANSIENT,
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
