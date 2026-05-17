import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { api } from "@/services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalDeletar from "@/components/layout/modalDeletar";
import ModalReativar from "@/components/layout/modalReativar";
import ClienteCard from "@/components/clientes/clienteCard";

interface Cliente {
  lookupId: string;
  pessoa: {
    nome: string;
    email: string;
    ativo: boolean;
  };
}

export default function ListaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  const { clienteId } = useLocalSearchParams<{
    clienteId: string;
    clienteNome: string;
  }>();

  const [itemParaDeletar, setItemParaDeletar] = useState<Cliente | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [itemParaReativar, setItemParaReativar] = useState<Cliente | null>(
    null,
  );
  const [modalReativarVisible, setModalReativarVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      carregarClientes();
    }, []),
  );

  const carregarClientes = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('@PetShop:token');
      const response = await api.get("/cliente", {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });
      setClientes(response.data as Cliente[]);
    } catch (error) {
      console.error("Erro ao carregar:", error);
      Alert.alert("Erro", "Não foi possível carregar os clientes.");
    } finally {
      setLoading(false);
    }
  };

  const confirmarDelecao = async () => {
    if (!itemParaDeletar) return;
    try {
      setModalVisible(false); 
      const token = await AsyncStorage.getItem('@PetShop:token');
     
      await api.delete(`/cliente/${itemParaDeletar.lookupId}`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });
      Alert.alert("Sucesso", "Cliente removido!");
      carregarClientes();
    } catch (error) {
      console.error("Erro ao deletar:", error);
      Alert.alert("Erro", "Não foi possível excluir o cliente.");
    } finally {
      setItemParaDeletar(null);
    }
  };

  const confirmarReativacao = async () => {
    if (!itemParaReativar) return;
    try {
      const token = await AsyncStorage.getItem('@PetShop:token');
      setModalReativarVisible(false);
      await api.patch(
        `/cliente/${itemParaReativar.lookupId}/reativar`,
        {},
        {
          headers: { 
            Authorization: `Bearer ${token}` 
          },
        },
      );
      Alert.alert("Sucesso", "Cliente reativado com sucesso!");
      carregarClientes();
    } catch (error) {
      console.error("Erro ao reativar:", error);
      Alert.alert("Erro", "Não foi possível reativar o cliente.");
    } finally {
      setItemParaReativar(null);
    }
  };

  const clientesProcessados = clientes
    .filter((cliente) => {
      if (clienteId && cliente.lookupId !== clienteId) return false;

      const nomeSeguro = cliente.pessoa?.nome || "";
      const emailSeguro = cliente.pessoa?.email || "";
      const buscaSegura = busca || "";

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

  const renderItem = ({ item }: { item: Cliente }) => (
    <ClienteCard
      item={item}
      onViewPets={() => {
        router.push({
          pathname: "/cadastros/pets",
          params: { clienteId: item.lookupId, clienteNome: item.pessoa.nome },
        });
      }}
      onEdit={() =>
        router.push(`/cadastros/clientes/editar/${item.lookupId}` as any)
      }
      onDelete={() => {
        setItemParaDeletar(item);
        setModalVisible(true);
      }}
      onReactivate={() => {
        setItemParaReativar(item);
        setModalReativarVisible(true);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/cadastros")}
          style={styles.botaoVoltar}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.titulo}>
          <FontAwesome5 name="user-friends" size={25} color="#03A9F4" />{" "}
          Clientes
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.buscaContainer}>
        <FontAwesome5
          name="search"
          size={18}
          color="#B2BEC3"
          style={styles.buscaIcone}
        />
        <TextInput
          style={styles.buscaInput}
          placeholder="Buscar por nome ou e-mail..."
          value={busca}
          onChangeText={setBusca}
        />
      </View>


      {loading ? (
        <ActivityIndicator
          size="large"
          color="#4D7BF0"
          style={{ marginTop: 50 }}
        />
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
        onPress={() => router.push("/cadastros/clientes/novo")}
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
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#FFF",
  },
  botaoVoltar: { padding: 10, backgroundColor: "#F5F7FA", borderRadius: 12 },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#2D3436" },
  buscaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    margin: 20,
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DFE6E9",
    height: 50,
  },
  buscaIcone: { marginRight: 10 },
  buscaInput: { flex: 1, fontSize: 16, color: "#2D3436" },

  // Estilos da etiqueta do filtro
  filtroAtivoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E1F5FE",
    marginHorizontal: 20,
    marginTop: -5,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#81D4FA",
  },
  filtroAtivoTexto: { color: "#0288D1", fontSize: 14 },

  listaConfig: { paddingHorizontal: 20, paddingBottom: 100 },
  textoVazio: {
    textAlign: "center",
    color: "#B2BEC3",
    marginTop: 50,
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: "#4D7BF0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4D7BF0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
});
