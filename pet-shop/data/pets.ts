import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { clienteData } from './clientes';

const PETS_KEY = '@PetShop:pets';

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

export const petData = {
  async getRaw(): Promise<Pet[]> {
    const jsonValue = await AsyncStorage.getItem(PETS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  },

  async getAll(): Promise<Pet[]> {
    const pets = await this.getRaw();
    const clientes = await clienteData.getAll();
    
    return pets.map(pet => ({
      ...pet,
      cliente: clientes.find(c => c.lookupId === pet.clienteLookupId)
    }));
  },

  async save(dados: { nome: string; raca: string; peso: string; idade: number; clienteLookupId: string; especie?: string }): Promise<Pet> {
    const pets = await this.getRaw();
    
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
    await AsyncStorage.setItem(PETS_KEY, JSON.stringify(pets));
    return novoPet;
  },

  async findByLookupId(lookupId: string): Promise<Pet | undefined> {
    const pets = await this.getAll();
    return pets.find(p => p.lookupId === lookupId);
  },

  async update(lookupId: string, dados: Partial<{ nome: string; raca: string; peso: string; idade: number; clienteLookupId: string; especie?: string }>): Promise<Pet> {
    const pets = await this.getRaw();
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

    await AsyncStorage.setItem(PETS_KEY, JSON.stringify(pets));
    return pets[index];
  },

  async remove(lookupId: string): Promise<void> {
    const pets = await this.getRaw();
    const index = pets.findIndex(p => p.lookupId === lookupId);

    if (index !== -1) {
      pets[index].ativo = false;
      await AsyncStorage.setItem(PETS_KEY, JSON.stringify(pets));
    }
  },

  async reactivate(lookupId: string): Promise<void> {
    const pets = await this.getRaw();
    const index = pets.findIndex(p => p.lookupId === lookupId);

    if (index !== -1) {
      pets[index].ativo = true;
      await AsyncStorage.setItem(PETS_KEY, JSON.stringify(pets));
    }
  }
};