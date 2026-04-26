import { clienteData } from '../data/clientes';
// import { petData } from '../data/petData'; // Descomente quando criar o petData
// import { funcionarioData } from '../data/funcionarioData'; // Descomente quando criar o funcionarioData



export const api = {
  

  get: async (rota: string, config?: any) => {

    if (rota === '/cliente') {
      const clientes = await clienteData.getAll();
      return { data: clientes };
    }
    
    if (rota.startsWith('/cliente/')) {
      const id = rota.split('/')[2];
      const cliente = await clienteData.findByLookupId(id);
      
      if (!cliente) throw new Error("Cliente não encontrado (404)");
      return { data: cliente };
    }

    return { data: [] };
  },


  post: async (rota: string, body: any, config?: any) => {


    if (rota === '/cliente') {
      const novoCliente = await clienteData.save(body);
      return { data: novoCliente };
    }

    throw new Error("Erro na rota de POST não implementada no Mock");
  },


  patch: async (rota: string, body: any, config?: any) => {

    if (rota.includes('/reativar')) {
      const id = rota.split('/')[2];
      await clienteData.reactivate(id);
      return { data: { sucesso: true } };
    }

    if (rota.startsWith('/cliente/')) {
      const id = rota.split('/')[2];
      
      const clienteAtualizado = await clienteData.update(id, body);
      return { data: clienteAtualizado };
    }

    throw new Error("Erro na rota de PATCH implementada no Mock");
  },

  delete: async (rota: string, config?: any) => {
    
    if (rota.startsWith('/cliente/')) {
      const id = rota.split('/')[2];
      
      await clienteData.remove(id);
      return { data: { sucesso: true } };
    }

    throw new Error("Erro na rota de DELETE implementada no Mock");
  }
};