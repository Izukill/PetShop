import { clienteData } from '../data/clientes';
import { petData } from '../data/pets';
import { funcionarioData } from '../data/funcionarios';


export const api = {
  
  get: async (rota: string, config?: any) => {

    if (rota === '/cliente') return { data: await clienteData.getAll() };
    if (rota.startsWith('/cliente/')) {
      const id = rota.split('/')[2];
      const cliente = await clienteData.findByLookupId(id);
      if (!cliente) throw new Error("Cliente não encontrado");
      return { data: cliente };
    }

    if (rota === '/pet') return { data: await petData.getAll() };
    if (rota.startsWith('/pet/')) {
      const id = rota.split('/')[2];
      const pet = await petData.findByLookupId(id);
      if (!pet) throw new Error("Pet não encontrado");
      return { data: pet };
    }

    if (rota === '/funcionario') return { data : await funcionarioData.getAll() };
    if (rota.startsWith('/funcionario/')) {
      const id = rota.split('/')[2];
      const funcionario = await funcionarioData.findByLookupId(id);
      if (!funcionario) throw new Error("Funcionário não encontrado");
      return { data: funcionario };
    }

    return { data: [] };
  },

  post: async (rota: string, body: any, config?: any) => {

    if (rota === '/cliente') return { data: await clienteData.save(body) };
    if (rota === '/pet') return { data: await petData.save(body) };
    if (rota === '/funcionario') return { data: await funcionarioData.save(body) };
    throw new Error("Erro na rota de POST");
  },

  patch: async (rota: string, body: any, config?: any) => {

  
    if (rota.includes('/cliente/') && rota.includes('/reativar')) {
      const id = rota.split('/')[2];
      await clienteData.reactivate(id);
      return { data: { sucesso: true } };
    }
    if (rota.startsWith('/cliente/')) {
      const id = rota.split('/')[2];
      return { data: await clienteData.update(id, body) };
    }

    if (rota.includes('/pet/') && rota.includes('/reativar')) {
      const id = rota.split('/')[2];
      await petData.reactivate(id);
      return { data: { sucesso: true } };
    }
    if (rota.startsWith('/pet/')) {
      const id = rota.split('/')[2];
      return { data: await petData.update(id, body) };
    }

    if (rota.includes('/funcionario/') && rota.includes('/reativar')) {
      const id = rota.split('/')[2];
      await funcionarioData.reactivate(id);
      return { data: { sucesso: true } };
    }
    if (rota.startsWith('/funcionario/')) {
      const id = rota.split('/')[2];
      return { data: await funcionarioData.update(id, body) };
    }

    throw new Error("Erro na rota de PATCH");
  },

  delete: async (rota: string, config?: any) => {

    if (rota.startsWith('/cliente/')) {
      const id = rota.split('/')[2];
      await clienteData.remove(id);
      return { data: { sucesso: true } };
    }
    if (rota.startsWith('/pet/')) {
      const id = rota.split('/')[2];
      await petData.remove(id);
      return { data: { sucesso: true } };
    }
    if (rota.startsWith('/funcionario/')) {
      const id = rota.split('/')[2];
      await funcionarioData.remove(id);
      return { data: { sucesso: true } };
    }
    throw new Error("Erro na rota de DELETE");
  },

  reactivate: async (rota: string, config?: any) => {

    if (rota.startsWith('/cliente/')) {
      const id = rota.split('/')[2];
      await clienteData.reactivate(id);
      return { data: { sucesso: true } };
    }

    if (rota.startsWith('/pet/')) {
      const id = rota.split('/')[2];
      await petData.reactivate(id);
      return { data: { sucesso: true } };
    }

    if (rota.startsWith('/funcionario/')) {
      const id = rota.split('/')[2];
      await funcionarioData.reactivate(id);
      return { data: { sucesso: true } };
    }
    throw new Error("Erro na rota de REACTIVATE");
  }

};