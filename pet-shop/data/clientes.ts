import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const CLIENTES_KEY = '@PetShop:clientes';

export interface Cliente {
  id: number;
  lookupId: string;
  numero: string;
  pessoa: {
    nome: string;
    email: string;
    ativo: boolean;
  };
}

export const clienteData = {
  async getAll(): Promise<Cliente[]> {
    const jsonValue = await AsyncStorage.getItem(CLIENTES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  },

  async save(dados: { nome: string; email: string; numero: string }): Promise<Cliente> {
    const clientes = await this.getAll();
    
    const novoCliente: Cliente = {
      id: clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1,
      lookupId: uuidv4(),
      numero: dados.numero,
      pessoa: {
        nome: dados.nome,
        email: dados.email,
        ativo: true,
      }
    };

    clientes.push(novoCliente);
    await AsyncStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
    return novoCliente;
  },

  async findByLookupId(lookupId: string): Promise<Cliente | undefined> {
    const clientes = await this.getAll();
    return clientes.find(c => c.lookupId === lookupId);
  },

  async update(lookupId: string, dados: Partial<{ nome: string; email: string; numero: string }>): Promise<Cliente> {
    const clientes = await this.getAll();
    const index = clientes.findIndex(c => c.lookupId === lookupId);

    if (index === -1) throw new Error("Cliente não encontrado");

    clientes[index] = {
      ...clientes[index],
      numero: dados.numero || clientes[index].numero,
      pessoa: {
        ...clientes[index].pessoa,
        nome: dados.nome || clientes[index].pessoa.nome,
        email: dados.email || clientes[index].pessoa.email,
      }
    };

    await AsyncStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
    return clientes[index];
  },

  async remove(lookupId: string): Promise<void> {
    const clientes = await this.getAll();
    const index = clientes.findIndex(c => c.lookupId === lookupId);

    if (index !== -1) {
      clientes[index].pessoa.ativo = false;
      await AsyncStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
    }
  },

  async reactivate(lookupId: string): Promise<void> {
    const clientes = await this.getAll();
    const index = clientes.findIndex(c => c.lookupId === lookupId);
    
    if (index !== -1) {
      clientes[index].pessoa.ativo = true;
      await AsyncStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
    }

  }

};