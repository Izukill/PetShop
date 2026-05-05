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

let funcionarios: Funcionario[] = [];

export const funcionarioData = {
  
  async getAll(): Promise<Funcionario[]> {
    return [...funcionarios];
  },

  async save(dados: { nome: string; email: string; cargo: string; especializacao: string }): Promise<Funcionario> {
    const novoFuncionario: Funcionario = {
      id: funcionarios.length > 0 ? Math.max(...funcionarios.map(f => f.id)) + 1 : 1,
      lookupId: uuidv4(),
      matricula: funcionarios.length > 0 ? Math.max(...funcionarios.map(f => f.matricula)) + 1 : 1,
      cargo: dados.cargo,
      especializacao: dados.especializacao,
      pessoa: {
        nome: dados.nome,
        email: dados.email,
        ativo: true,
      }
    };

    funcionarios.push(novoFuncionario);
    return novoFuncionario;
  },

  async findByLookupId(lookupId: string): Promise<Funcionario | undefined> {
    return funcionarios.find(f => f.lookupId === lookupId);
  },

  async update(lookupId: string, dados: Partial<{ nome: string; email: string; matricula: number; cargo: string; especializacao: string }>): Promise<Funcionario> {
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

    return funcionarios[index];
  },

  async remove(lookupId: string): Promise<void> {
    const index = funcionarios.findIndex(f => f.lookupId === lookupId);
    if (index !== -1) {
      funcionarios[index].pessoa.ativo = false;
    }
  },

  async reactivate(lookupId: string): Promise<void> {
    const index = funcionarios.findIndex(f => f.lookupId === lookupId);
    if (index !== -1) {
      funcionarios[index].pessoa.ativo = true;
    }
  }
};