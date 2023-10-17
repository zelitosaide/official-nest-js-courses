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
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { CoffeesService } from "./coffees.service";

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
    return `This action returns #${id} coffee`;
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  // create(@Body("name") body) {
  create(@Body() body) {
    return body;
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return `This action removes #${id} coffee`;
  }
}
