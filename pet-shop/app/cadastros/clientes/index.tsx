import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router'; 
import { api } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalDeletar from '@/components/layout/modalDeletar';
import ModalReativar from '@/components/layout/modalReativar'; 

import { Cliente } from '@/data/clientes';

export default function ListaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  const [itemParaDeletar, setItemParaDeletar] = useState<Cliente | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [itemParaReativar, setItemParaReativar] = useState<Cliente | null>(null);
  const [modalReativarVisible, setModalReativarVisible] = useState(false);

  const abrirModalDelecao = (lookupId: string, nome: string) => {
    setItemParaDeletar({ lookupId, pessoa: { nome, email: '', ativo: false }, numero: '', id: 0 });
    setModalVisible(true);
  };

  const confirmarDelecao = async () => {
    if (!itemParaDeletar) return;
    try {
      setModalVisible(false); 
      const token = await AsyncStorage.getItem('@PetShop:token');
      
      await api.delete(`/cliente/${itemParaDeletar.lookupId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      Alert.alert('Sucesso', 'Cliente removido!');
      carregarClientes(); 
    } catch {
      Alert.alert('Erro', 'Não foi possível excluir o cliente.');
    } finally {
      setItemParaDeletar(null); 
    }
  };

  const abrirModalReativacao = (lookupId: string, nome: string) => {
    setItemParaReativar({ lookupId, pessoa: { nome, email: '', ativo: true }, numero: '', id: 0 });
    setModalReativarVisible(true);
  };

  const confirmarReativacao = async () => {
    if (!itemParaReativar) return;
    try {
      setModalReativarVisible(false);
      const token = await AsyncStorage.getItem('@PetShop:token');

      await api.patch(`/cliente/${itemParaReativar.lookupId}/reativar`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Alert.alert('Sucesso', 'Cliente reativado com sucesso!');
      carregarClientes(); 
    } catch {
      Alert.alert('Erro', 'Não foi possível reativar o cliente.');
    } finally {
      setItemParaReativar(null);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarClientes();
    }, [])
  );

  const carregarClientes = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('@PetShop:token');
      const response = await api.get("/cliente", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClientes(response.data as Cliente[]);
    } catch{
      Alert.alert('Erro', 'Não foi possível carregar os clientes.');
    } finally {
      setLoading(false);
    }
  };

  const clientesProcessados = clientes
    .filter(cliente => {
      const nomeSeguro = cliente.pessoa?.nome || '';
      const emailSeguro = cliente.pessoa?.email || '';
      const buscaSegura = busca || '';

      return (
        nomeSeguro.toLowerCase().includes(buscaSegura.toLowerCase()) || 
        emailSeguro.toLowerCase().includes(buscaSegura.toLowerCase())
      );
    })
    .sort((a, b) => {
      const aStatus = a.pessoa?.ativo ? 1 : 0;
      const bStatus = b.pessoa?.ativo ? 1 : 0;
      return bStatus - aStatus; 
    });

  const renderItem = ({ item }: { item: Cliente }) => {
    const isAtivo = item.pessoa?.ativo;
    const corBadgeFundo = isAtivo ? '#E8F5E9' : '#FFEBEE';
    const corBadgeTexto = isAtivo ? '#4CAF50' : '#E53935';
    const textoBadge = isAtivo ? 'Ativo' : 'Inativo';

    return (
      <View style={[styles.card, !isAtivo && { opacity: 0.7 }]}>
        
        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <Text style={styles.nomeCliente} numberOfLines={1}>{item.pessoa.nome}</Text>
            
            <View style={[styles.badge, { backgroundColor: corBadgeFundo }]}>
              <Text style={[styles.badgeTexto, { color: corBadgeTexto }]}>
                {textoBadge}
              </Text>
            </View>
          </View>

          <Text style={styles.detalheCliente}><MaterialIcons name="email" size={14} /> {item.pessoa.email}</Text>
          <Text style={styles.detalheCliente}><FontAwesome5 name="phone-alt" size={12} /> {item.numero}</Text>
        </View>
        
        <View style={styles.cardAcoes}>
          <TouchableOpacity 
            style={[styles.botaoAcao, { backgroundColor: '#FFF0F5' }]}
            onPress={() => {
              router.push({
                pathname: '/cadastros/pets',
                params: { clienteId: item.lookupId } 
              } as any); 
            }}
          >
            <FontAwesome5 name="paw" size={16} color="#FF7675" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.botaoAcao, { backgroundColor: '#E1F5FE' }]}
            onPress={() => {
              router.push({
                pathname: `/cadastros/clientes/editar/${item.lookupId}`,
                params: { clienteId: item.lookupId } 
              } as any); 
            }}
          >
            <FontAwesome5 name="edit" size={16} color="#03A9F4" />
          </TouchableOpacity>

          {/* lógica dos botões de ativar/desativar */}
          {isAtivo ? (
            <TouchableOpacity 
              style={[styles.botaoAcao, { backgroundColor: '#FFEBEE' }]}
              onPress={() => abrirModalDelecao(item.lookupId, item.pessoa.nome)}
            >
              <FontAwesome5 name="trash-alt" size={16} color="#E53935" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.botaoAcao, { backgroundColor: '#E8F5E9' }]}
              onPress={() => abrirModalReativacao(item.lookupId, item.pessoa.nome)}
            >
              <FontAwesome5 name="undo-alt" size={16} color="#4CAF50" />
            </TouchableOpacity>
          )}
          
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/cadastros')} style={styles.botaoVoltar}>
          <FontAwesome5 name="arrow-left" size={20} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.titulo}><FontAwesome5 name="user-friends" size={25} color="#03A9F4" /> Clientes</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.buscaContainer}>
        <FontAwesome5 name="search" size={18} color="#B2BEC3" style={styles.buscaIcone} />
        <TextInput 
          style={styles.buscaInput}
          placeholder="Buscar por nome ou e-mail..."
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4D7BF0" style={{ marginTop: 50 }} />
      ) : (
        <FlatList 
          data={clientesProcessados}
          keyExtractor={(item) => item.lookupId}
          renderItem={renderItem}
          contentContainerStyle={styles.listaConfig}
          ListEmptyComponent={
             <Text style={styles.textoVazio}>Nenhum cliente encontrado.</Text>
          }
        />
      )}

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/cadastros/clientes/novo')}
      >
        <FontAwesome5 name="plus" size={24} color="#FFF" />
      </TouchableOpacity>

      <ModalDeletar
        visible={modalVisible}
        nomeItem={itemParaDeletar?.pessoa.nome}
        onCancel={() => setModalVisible(false)}
        onConfirm={confirmarDelecao}
      />

      <ModalReativar
        visible={modalReativarVisible}
        nomeItem={itemParaReativar?.pessoa.nome}
        onCancel={() => setModalReativarVisible(false)}
        onConfirm={confirmarReativacao}
      />

    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: '#F5F7FA',
    },
    header: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: 20, 
      paddingTop: 60, 
      backgroundColor: '#FFF',
    },
    botaoVoltar: { 
      padding: 10, 
      backgroundColor: '#F5F7FA', 
      borderRadius: 12,
    },
    titulo: { 
      fontSize: 22, 
      fontWeight: 'bold', 
      color: '#2D3436',
    },
    buscaContainer: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      backgroundColor: '#FFF', 
      margin: 20, 
      paddingHorizontal: 15, 
      borderRadius: 12, 
      borderWidth: 1, 
      borderColor: '#DFE6E9', 
      height: 50,
    },
    buscaIcone: { 
      marginRight: 10,
    },
    buscaInput: { 
      flex: 1, 
      fontSize: 16, 
      color: '#2D3436',
    },
    listaConfig: { 
      paddingHorizontal: 20, 
      paddingBottom: 100,
    },
    card: { 
      backgroundColor: '#FFF', 
      padding: 15, 
      borderRadius: 15, 
      marginBottom: 15, 
      shadowColor: '#000', 
      shadowOffset: { 
        width: 0, 
        height: 2 
      }, 
      shadowOpacity: 0.05, 
      shadowRadius: 5, 
      elevation: 2,
    },
    cardInfo: { 
      marginBottom: 15,
    },
    cardHeader: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: 8,
    },
    nomeCliente: { 
      fontSize: 18, 
      fontWeight: 'bold', 
      color: '#2D3436', 
      flex: 1, 
      marginRight: 10,
    },
    badge: { 
      paddingHorizontal: 8, 
      paddingVertical: 4, 
      borderRadius: 12,
    },
    badgeTexto: { 
      fontSize: 12, 
      fontWeight: 'bold', 
      textTransform: 'uppercase',
    },
    detalheCliente: { 
      fontSize: 14, 
      color: '#636E72', 
      marginBottom: 2,
    },
    cardAcoes: { 
      flexDirection: 'row', 
      justifyContent: 'flex-end', 
      gap: 10, 
      borderTopWidth: 1, 
      borderTopColor: '#F5F7FA', 
      paddingTop: 10,
    },
    botaoAcao: { 
      width: 40, 
      height: 40, 
      borderRadius: 20, 
      justifyContent: 'center', 
      alignItems: 'center',
    },
    textoVazio: { 
      textAlign: 'center', 
      color: '#B2BEC3', 
      marginTop: 50, 
      fontSize: 16,
    },
    fab: { 
      position: 'absolute', 
      bottom: 30, 
      right: 30, 
      width: 60, 
      height: 60, 
      backgroundColor: '#4D7BF0', 
      borderRadius: 30, 
      justifyContent: 'center', 
      alignItems: 'center', 
      shadowColor: '#4D7BF0', 
      shadowOffset: { 
        width: 0, 
        height: 4 
      }, 
      shadowOpacity: 0.4, 
      shadowRadius: 5, 
      elevation: 6,
    }
  });