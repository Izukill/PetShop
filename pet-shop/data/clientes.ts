import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


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

let clientes: Cliente[] = [
  {
    id: 1,
    lookupId: '123-abc',
    numero: '(83) 99999-1111',
    pessoa: { nome: 'João Silva', email: 'joao@email.com', ativo: true }
  }
];

export const clienteData = {
  async getAll(): Promise<Cliente[]> {
    return [...clientes]; 
  },


  async findByLookupId(lookupId: string): Promise<Cliente | undefined> {
    return clientes.find(c => c.lookupId === lookupId);
  },


  async save(dados: { nome: string; email: string; numero: string }): Promise<Cliente> {
    const novoCliente: Cliente = {
      id: clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1,
      lookupId: uuidv4(),
      numero: dados.numero,
      pessoa: {
        nome: dados.nome,
        email: dados.email,
        ativo: true,
      },
    };

    clientes.push(novoCliente);
    
    return novoCliente;
  },

  async update(lookupId: string, dados: Partial<{ nome: string; email: string; numero: string }>): Promise<Cliente> {
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

    return clientes[index];
  },

  async remove(lookupId: string): Promise<void> {
    const index = clientes.findIndex(c => c.lookupId === lookupId);
    if (index !== -1) {
      clientes[index].pessoa.ativo = false;
    }
  },

  async reactivate(lookupId: string): Promise<void> {
    const index = clientes.findIndex(c => c.lookupId === lookupId);
    if (index !== -1) {
      clientes[index].pessoa.ativo = true;
    }
  }
};