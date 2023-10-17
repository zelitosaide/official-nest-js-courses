import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller("coffees")
export class CoffeesController {
  // @Get("flavors")
  @Get()
  findAll() {
    return "This action returns all coffees";
  }

  @Get(":id")
  // findOne(@Param() params) {
  findOne(@Param("id") id: string) {
    return `This action returns #${id} coffee`;
  }

  @Post()
  // create(@Body("name") body) {
  create(@Body() body) {
    return body;
  }
}
