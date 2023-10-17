import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  // Res,
} from "@nestjs/common";
// import { Response } from "express";
import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";

@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  // @Get("flavors")
  @Get()
  // findAll(@Res() response: Response) {
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    // response.status(200).send("This action returns all coffees");
    // return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
    return this.coffeesService.findAll();
  }

  @Get(":id")
  // findOne(@Param() params) {
  findOne(@Param("id") id: string) {
    // return `This action returns #${id} coffee`;
    return this.coffeesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  // create(@Body("name") body) {
  // create(@Body() body) {
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // return body;
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(":id")
  // update(@Param("id") id: string, @Body() body) {
  update(@Param("id") id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    // return `This action updates #${id} coffee`;
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    // return `This action removes #${id} coffee`;
    return this.coffeesService.remove(id);
  }
}
