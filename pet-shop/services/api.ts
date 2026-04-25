import { clienteData } from '../data/clientes';
// import { petData } from '../data/petData'; // Descomente quando criar o petData
// import { funcionarioData } from '../data/funcionarioData'; // Descomente quando criar o funcionarioData



export const api = {
  
  // ==========================================
  // MOCK DE GET
  // ==========================================
  get: async (rota: string, config?: any) => {

    
    // Rota: Listar todos os clientes
    if (rota === '/cliente') {
      const clientes = await clienteData.getAll();
      return { data: clientes };
    }
    
    // Rota: Buscar um cliente específico (Ex: /cliente/123-abc)
    if (rota.startsWith('/cliente/')) {
      const id = rota.split('/')[2];
      const cliente = await clienteData.findByLookupId(id);
      
      if (!cliente) throw new Error("Cliente não encontrado (404)");
      return { data: cliente };
    }

    // Retorno padrão caso a rota não exista no nosso Mock
    return { data: [] };
  },

  // ==========================================
  // MOCK DE POST
  // ==========================================
  post: async (rota: string, body: any, config?: any) => {


    if (rota === '/cliente') {
      // Passamos o body direto para o data layer, que gera o UUID e salva no AsyncStorage
      const novoCliente = await clienteData.save(body);
      return { data: novoCliente };
    }

    throw new Error("Rota de POST não implementada no Mock");
  },

  // ==========================================
  // MOCK DE PATCH / PUT
  // ==========================================
  patch: async (rota: string, body: any, config?: any) => {

    if (rota.startsWith('/cliente/')) {
      const id = rota.split('/')[2];
      
      // O data layer cuida de achar, atualizar e salvar no AsyncStorage
      const clienteAtualizado = await clienteData.update(id, body);
      return { data: clienteAtualizado };
    }

    throw new Error("Rota de PATCH não implementada no Mock");
  },

  // ==========================================
  // MOCK DE DELETE
  // ==========================================
  delete: async (rota: string, config?: any) => {
    
    if (rota.startsWith('/cliente/')) {
      const id = rota.split('/')[2];
      
      // O data layer cuida de fazer o Soft Delete (ativo: false)
      await clienteData.remove(id);
      return { data: { sucesso: true } };
    }

    throw new Error("Rota de DELETE não implementada no Mock");
  }
};