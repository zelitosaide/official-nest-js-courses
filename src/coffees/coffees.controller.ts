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
  Res,
} from "@nestjs/common";
import { Response } from "express";

@Controller("coffees")
export class CoffeesController {
  // @Get("flavors")
  @Get()
  // findAll(@Res() response: Response) {
  findAll() {
    // response.status(200).send("This action returns all coffees");
    return "This action returns all coffees";
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
