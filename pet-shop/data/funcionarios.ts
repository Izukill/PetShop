import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface Funcionario {
  id: number;
  lookupId: string;
  matricula: number;
  cargo: string;
  especializacao: string;
  pessoa: {
    nome: string;
    email: string;
    ativo: boolean;
  };
}

const STORAGE_KEY = '@funcionarios';

export const funcionarioData = {
  
  async getAll(): Promise<Funcionario[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Erro ao buscar funcionários", e);
      return [];
    }
  },

  async save(dados: { nome: string; email: string; cargo: string; especializacao: string }): Promise<Funcionario> {
    const funcionarios = await this.getAll();

    const novoFuncionario: Funcionario = {
      id: funcionarios.length > 0 ? Math.max(...funcionarios.map(f => f.id)) + 1 : 1,
      lookupId: uuidv4(),
      matricula: funcionarios.length > 0 ? Math.max(...funcionarios.map(f => f.matricula)) + 1 : 1001,
      cargo: dados.cargo,
      especializacao: dados.especializacao,
      pessoa: {
        nome: dados.nome,
        email: dados.email,
        ativo: true,
      }
    };

    funcionarios.push(novoFuncionario);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(funcionarios));
    return novoFuncionario;
  },

  async findByLookupId(lookupId: string): Promise<Funcionario | undefined> {
    const funcionarios = await this.getAll();
    return funcionarios.find(f => f.lookupId === lookupId);
  },

  async update(lookupId: string, dados: Partial<{ nome: string; email: string; matricula: number; cargo: string; especializacao: string }>): Promise<Funcionario> {
    const funcionarios = await this.getAll();
    const index = funcionarios.findIndex(f => f.lookupId === lookupId);

    if (index === -1) throw new Error("Funcionário não encontrado");

    funcionarios[index] = {
      ...funcionarios[index],
      cargo: dados.cargo || funcionarios[index].cargo,
      especializacao: dados.especializacao || funcionarios[index].especializacao,
      pessoa: {
        ...funcionarios[index].pessoa,
        nome: dados.nome || funcionarios[index].pessoa.nome,
        email: dados.email || funcionarios[index].pessoa.email,
      }
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(funcionarios));
    return funcionarios[index];
  },

  async remove(lookupId: string): Promise<void> {
    const funcionarios = await this.getAll();
    const index = funcionarios.findIndex(f => f.lookupId === lookupId);
    
    if (index !== -1) {
      funcionarios[index].pessoa.ativo = false;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(funcionarios));
    }
  },

  async reactivate(lookupId: string): Promise<void> {
    const funcionarios = await this.getAll();
    const index = funcionarios.findIndex(f => f.lookupId === lookupId);
    
    if (index !== -1) {
      funcionarios[index].pessoa.ativo = true;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(funcionarios));
    }
  }
};