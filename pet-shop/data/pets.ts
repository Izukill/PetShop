import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { clienteData } from './clientes';

export interface Pet {
  lookupId: string;
  nome: string;
  especie?: string;
  raca: string;
  peso: string;
  idade: number;
  clienteLookupId: string;
  ativo: boolean;
  cliente?: any;
}


let pets: Pet[] = [
  {
    lookupId: 'pet-456-def',
    nome: 'Thor',
    especie: 'Cachorro',
    raca: 'Pug',
    peso: '8.5',
    idade: 2,
    clienteLookupId: '123-abc',
    ativo: true,
  }
];

export const petData = {
  
  async getAll(): Promise<Pet[]> {
    const clientes = await clienteData.getAll();
    
    return pets.map(pet => ({
      ...pet,
      cliente: clientes.find(c => c.lookupId === pet.clienteLookupId)
    }));
  },

  async save(dados: { nome: string; raca: string; peso: string; idade: number; clienteLookupId: string; especie?: string }): Promise<Pet> {
    const novoPet: Pet = {
      lookupId: uuidv4(),
      nome: dados.nome,
      raca: dados.raca,
      peso: dados.peso,
      idade: dados.idade,
      especie: dados.especie,
      clienteLookupId: dados.clienteLookupId,
      ativo: true,
    };

    pets.push(novoPet);
    return novoPet;
  },

  async findByLookupId(lookupId: string): Promise<Pet | undefined> {
    const petsComDono = await this.getAll();
    return petsComDono.find(p => p.lookupId === lookupId);
  },

  async update(lookupId: string, dados: Partial<{ nome: string; raca: string; peso: string; idade: number; clienteLookupId: string; especie?: string }>): Promise<Pet> {
    const index = pets.findIndex(p => p.lookupId === lookupId);

    if (index === -1) throw new Error("Pet não encontrado");

    pets[index] = {
      ...pets[index],
      nome: dados.nome || pets[index].nome,
      raca: dados.raca || pets[index].raca,
      peso: dados.peso || pets[index].peso,
      idade: dados.idade || pets[index].idade,
      clienteLookupId: dados.clienteLookupId || pets[index].clienteLookupId,
      especie: dados.especie || pets[index].especie,
    };

    return pets[index];
  },

  async remove(lookupId: string): Promise<void> {
    const index = pets.findIndex(p => p.lookupId === lookupId);
    if (index !== -1) {
      pets[index].ativo = false;
    }
  },

  async reactivate(lookupId: string): Promise<void> {
    const index = pets.findIndex(p => p.lookupId === lookupId);
    if (index !== -1) {
      pets[index].ativo = true;
    }
  }
};