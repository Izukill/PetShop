import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { 
  ApiDocCriarPet, 
  ApiDocListarPets, 
  ApiDocBuscarPetPorId, 
  ApiDocAtualizarPet, 
  ApiDocRemoverPet 
} from './swagger/pet.swagger';

@ApiTags('Pets')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @ApiDocCriarPet()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
  }

  @Get()
  @ApiDocListarPets()
  findAll() {
    return this.petService.findAll();
  }

  @Get(':id')
  @ApiDocBuscarPetPorId()
  findOne(@Param('id') id: string) {
    return this.petService.findOne(+id);
  }

  @Patch(':id')
  @ApiDocAtualizarPet()
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(+id, updatePetDto);
  }

  @Delete(':id')
  @ApiDocRemoverPet()
  remove(@Param('id') id: string) {
    return this.petService.remove(+id);
  }
}
