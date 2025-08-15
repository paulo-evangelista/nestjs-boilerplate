import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Example } from '@/db/entities/example.entity';
import addLogger from '@/utils/logging/logger';
@Injectable()
export class ExampleService {
  private readonly l = addLogger(ExampleService.name);

  constructor(@InjectRepository(Example) private readonly exampleRepository: Repository<Example>) {}

  create(createExampleDto: CreateExampleDto) {
    return this.exampleRepository.save(createExampleDto);
  }

  async findAll() {
    this.l.debug('Finding all examples');
    return await this.exampleRepository.find();
  }

  async findOne(id: number) {
    this.l.debug('Finding one example');
    const example = await this.exampleRepository.findOne({ where: { id } });
    if (!example) {
      throw new NotFoundException('Example not found');
    }
    return example;
  }

  update(id: number, updateExampleDto: UpdateExampleDto) {
    this.l.debug('Updating example');
    return this.exampleRepository.update(id, updateExampleDto);
  }

  remove(id: number) {
    return this.exampleRepository.delete(id);
  }
}
