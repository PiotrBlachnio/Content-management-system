import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { ShoesNotFoundException } from '../../common/exceptions/shoes-not-found.exception';
import { CreateShoesRequest } from './dto/create.dto';
import { ShoesResponse } from './dto/shoes.dto';
import { UpdateShoesRequest } from './dto/update.dto';
import { Shoes } from './entities/shoes.entity';
import { ShoesService } from './shoes.service';
import { CreateShoesSchema } from './schemas/create.schema';
import { UpdateShoesSchema } from './schemas/update.schema';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('shoes')
@UseGuards(JwtAuthGuard)
export class ShoesController {
    constructor(private readonly _shoesService: ShoesService) { }

    @Get('/:id')
    public async getById(@Param('id') id: string): Promise<ShoesResponse> {
        const shoes: Shoes | null = await this._shoesService.getById(id);

        if(!shoes) throw new ShoesNotFoundException();
        
        const response: ShoesResponse = ShoesResponse.fromObject(shoes);

        return response;
    }

    @Get()
    public async getAll(): Promise<ShoesResponse[]> {
        const shoes: Shoes[] = await this._shoesService.getAll();
        const response: ShoesResponse[] = shoes.map(entity => ShoesResponse.fromObject(entity));

        return response;
    }

    @Post()
    public async create(@Body(new ValidationPipe(CreateShoesSchema)) body: CreateShoesRequest): Promise<ShoesResponse> {
        const entity: Shoes = ShoesResponse.fromObject(body).toEntity();
        const shoes: Shoes = await this._shoesService.create(entity);
        const response = ShoesResponse.fromObject(shoes);

        return response;
    }

    @Delete('/:id')
    public async deleteById(@Param('id') id: string): Promise<void> {
        const shoes: Shoes | null = await this._shoesService.getById(id);

        if(!shoes) throw new ShoesNotFoundException();

        await this._shoesService.deleteById(id);
    }

    @Patch('/:id')
    public async updateById(@Param('id') id: string, @Body(new ValidationPipe(UpdateShoesSchema)) body: UpdateShoesRequest): Promise<void> {
        const shoes: Shoes | null = await this._shoesService.getById(id);

        if(!shoes) throw new ShoesNotFoundException();

        await this._shoesService.updateById(id, body);
    }
}