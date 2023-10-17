import {
  // HttpException,
  // HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Coffee } from "./entities/coffee.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { Flavor } from "./entities/flavor.entity";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  // private coffees: Coffee[] = [
  //   {
  //     id: 1,
  //     name: "Shipwreck Roast",
  //     brand: "Buddy Brew",
  //     flavors: ["chocolate", "vanilla"],
  //   },
  // ];

  findAll() {
    // return this.coffees;
    return this.coffeeRepository.find({
      relations: {
        flavors: true,
      },
    });
  }

  // findOne(id: string) {
  async findOne(id: string) {
    // throw "A random error";
    // throw new Error();
    // const coffee = this.coffees.find((item) => item.id === +id);
    // if (!coffee) {
    //   // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    //   throw new NotFoundException(`Coffee #${id} not found`);
    // }
    // return coffee;
    const coffee = await this.coffeeRepository.findOne({
      where: { id: +id },
      relations: {
        flavors: true,
      },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  // create(createCoffeeDto: any) {
  // create(createCoffeeDto: CreateCoffeeDto) {
  async create(createCoffeeDto: CreateCoffeeDto) {
    // this.coffees.push(createCoffeeDto);
    // return createCoffeeDto;
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  // update(id: string, updateCoffeeDto: any) {
  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    // const existingCoffee = this.findOne(id);
    // if (existingCoffee) {
    //   // update the existing entity
    // }
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  // remove(id: string) {
  async remove(id: string) {
    // const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    // if (coffeeIndex >= 0) {
    //   this.coffees.splice(coffeeIndex, 1);
    // }
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }

  findAllFlavors() {
    return this.flavorRepository.find({
      // relations: {
      //   flavors: true,
      // },
    });
  }
}
