import {
  Inject,
  // HttpException,
  // HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Coffee } from "./entities/coffee.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { Flavor } from "./entities/flavor.entity";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { Event } from "src/events/entities/event.entity";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly dataSource: DataSource,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @Inject("COFFEE_BRANDS") coffeeBrands: string[],
  ) {
    console.log(coffeeBrands);
  }

  // private coffees: Coffee[] = [
  //   {
  //     id: 1,
  //     name: "Shipwreck Roast",
  //     brand: "Buddy Brew",
  //     flavors: ["chocolate", "vanilla"],
  //   },
  // ];

  findAll(paginationQuery: PaginationQueryDto) {
    // return this.coffees;
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: {
        flavors: true,
      },
      skip: offset,
      take: limit,
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
      //   coffees: true,
      // },
    });
  }

  // async recommendCoffee(coffee: Coffee) {
  async recommendCoffee(id: string) {
    const coffee = await this.findOne(id);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = "recommend_coffee";
      recommendEvent.type = "coffee";
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  findAllEvents() {
    return this.eventRepository.find();
  }
}
