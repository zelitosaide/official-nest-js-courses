import { Controller, Get } from "@nestjs/common";

@Controller("coffees")
export class CoffeesController {
  // @Get("flavors")
  @Get()
  findAll() {
    return "This action return all coffees";
  }
}
