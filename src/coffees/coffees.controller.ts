import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  // Inject,
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
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
// import { REQUEST } from "@nestjs/core";
// import { Request } from "express";

@Controller("coffees")
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
  ) // @Inject(REQUEST) private readonly request: Request,
  {
    // console.log("CoffeesController created");
    // console.log(request);
  }

  // @Get("flavors")
  @Get()
  // findAll(@Res() response: Response) {
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    // response.status(200).send("This action returns all coffees");
    // return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get("flavors")
  findAllFlavors(@Query() paginationQuery) {
    return this.coffeesService.findAllFlavors();
  }

  @Get("events")
  findAllEvents(@Query() paginationQuery) {
    return this.coffeesService.findAllEvents();
  }

  @Get(":id")
  // findOne(@Param() params) {
  // findOne(@Param("id") id: number) {
  findOne(@Param("id") id: string) {
    // console.log(typeof id);
    // return `This action returns #${id} coffee`;
    return this.coffeesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  // create(@Body("name") body) {
  // create(@Body() body) {
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // return body;
    // console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(":id")
  // update(@Param("id") id: string, @Body() body) {
  update(@Param("id") id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    // return `This action updates #${id} coffee`;
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Patch(":id/recommend")
  recommendCoffee(@Param("id") id: string) {
    return this.coffeesService.recommendCoffee(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    // return `This action removes #${id} coffee`;
    return this.coffeesService.remove(id);
  }
}
