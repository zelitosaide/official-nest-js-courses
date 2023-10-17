import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
}
