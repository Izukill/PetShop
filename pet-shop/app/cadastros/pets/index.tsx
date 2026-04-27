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
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalDeletar from "@/components/layout/modalDeletar";
import ModalReativar from "@/components/layout/modalReativar";

import { Pet } from "@/data/pets";

export default function ListaPets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  const { clienteId } = useLocalSearchParams<{ clienteId: string }>();

  const [itemParaDeletar, setItemParaDeletar] = useState<{
    lookupId: string;
    nome: string;
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [itemParaReativar, setItemParaReativar] = useState<{
    lookupId: string;
    nome: string;
  } | null>(null);
  const [modalReativarVisible, setModalReativarVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      carregarPets();
    }, []),
  );

  const carregarPets = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("@PetShop:token");
      const response = await api.get("/pet", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPets(response.data as Pet[]);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os pets.");
    } finally {
      setLoading(false);
    }
  };

  const confirmarDelecao = async () => {
    if (!itemParaDeletar) return;
    try {
      setModalVisible(false);
      const token = await AsyncStorage.getItem("@PetShop:token");
      await api.delete(`/pet/${itemParaDeletar.lookupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert("Sucesso", "Pet removido!");
      carregarPets();
    } catch {
      Alert.alert("Erro", "Não foi possível excluir o pet.");
    } finally {
      setItemParaDeletar(null);
    }
  };

  const confirmarReativacao = async () => {
    if (!itemParaReativar) return;
    try {
      setModalReativarVisible(false);
      const token = await AsyncStorage.getItem("@PetShop:token");
      await api.patch(
        `/pet/${itemParaReativar.lookupId}/reativar`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      Alert.alert("Sucesso", "Pet reativado!");
      carregarPets();
    } catch {
      Alert.alert("Erro", "Não foi possível reativar o pet.");
    } finally {
      setItemParaReativar(null);
    }
  };

  const petsProcessados = pets
    .filter(pet => {
      //se clienteId filtra por ele
      if (clienteId && pet.clienteLookupId !== clienteId) {
        return false;
      }

      const nomeSeguro = pet.nome || '';
      const racaSegura = pet.raca || '';
      const donoSeguro = pet.cliente?.pessoa?.nome || '';
      const buscaSegura = busca || '';

      return (
        nomeSeguro.toLowerCase().includes(buscaSegura.toLowerCase()) || 
        racaSegura.toLowerCase().includes(buscaSegura.toLowerCase()) ||
        donoSeguro.toLowerCase().includes(buscaSegura.toLowerCase()) 
      );
    })
    .sort((a, b) => {
      const aStatus = a.ativo ? 1 : 0;
      const bStatus = b.ativo ? 1 : 0;
      return bStatus - aStatus; 
    });

  const renderItem = ({ item }: { item: Pet }) => {
    const isAtivo = item.ativo;
    const corBadgeFundo = isAtivo ? "#FFF0F5" : "#FFEBEE";
    const corBadgeTexto = isAtivo ? "#FF7675" : "#E53935";

    return (
      <View style={[styles.card, !isAtivo && { opacity: 0.7 }]}>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <Text style={styles.nomePet} numberOfLines={1}>
              {item.nome}
            </Text>
            <View style={[styles.badge, { backgroundColor: corBadgeFundo }]}>
              <Text style={[styles.badgeTexto, { color: corBadgeTexto }]}>
                {isAtivo ? "Ativo" : "Inativo"}
              </Text>
            </View>
          </View>

          <Text style={styles.detalhePet}>
            <FontAwesome5 name="bone" size={12} color="#B2BEC3" /> Raça:{" "}
            {item.raca} | Peso: {item.peso}kg
          </Text>
          {/* Graças ao JOIN que fizemos, podemos mostrar o nome do dono aqui: */}
          <Text style={styles.detalhePet}>
            <FontAwesome5 name="user" size={12} color="#B2BEC3" /> Dono:{" "}
            {item.cliente?.pessoa?.nome || "Sem dono vinculado"}
          </Text>
        </View>

        <View style={styles.cardAcoes}>
          <TouchableOpacity
            style={[styles.botaoAcao, { backgroundColor: "#E1F5FE" }]}
            onPress={() =>
              router.push(`/cadastros/pets/editar/${item.lookupId}` as any)
            }
          >
            <FontAwesome5 name="edit" size={16} color="#03A9F4" />
          </TouchableOpacity>

          {isAtivo ? (
            <TouchableOpacity
              style={[styles.botaoAcao, { backgroundColor: "#FFEBEE" }]}
              onPress={() => {
                setItemParaDeletar({
                  lookupId: item.lookupId,
                  nome: item.nome,
                });
                setModalVisible(true);
              }}
            >
              <FontAwesome5 name="trash-alt" size={16} color="#E53935" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.botaoAcao, { backgroundColor: "#E8F5E9" }]}
              onPress={() => {
                setItemParaReativar({
                  lookupId: item.lookupId,
                  nome: item.nome,
                });
                setModalReativarVisible(true);
              }}
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
        <TouchableOpacity
          onPress={() => router.push("/cadastros")}
          style={styles.botaoVoltar}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.titulo}>
          <FontAwesome5 name="paw" size={25} color="#FF7675" /> Pets
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
          placeholder="Buscar pet, raça ou dono..."
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FF7675"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={petsProcessados}
          keyExtractor={(item) => item.lookupId}
          renderItem={renderItem}
          contentContainerStyle={styles.listaConfig}
          ListEmptyComponent={
            <Text style={styles.textoVazio}>Nenhum pet encontrado.</Text>
          }
        />
      )}

      <TouchableOpacity
        style={[
          styles.fab,
          { backgroundColor: "#FF7675", shadowColor: "#FF7675" },
        ]}
        onPress={() => router.push("/cadastros/pets/novo")}
      >
        <FontAwesome5 name="plus" size={24} color="#FFF" />
      </TouchableOpacity>

      <ModalDeletar
        visible={modalVisible}
        nomeItem={itemParaDeletar?.nome}
        onCancel={() => setModalVisible(false)}
        onConfirm={confirmarDelecao}
      />

      <ModalReativar
        visible={modalReativarVisible}
        nomeItem={itemParaReativar?.nome}
        onCancel={() => setModalReativarVisible(false)}
        onConfirm={confirmarReativacao}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F5F7FA" 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#FFF",
  },

  botaoVoltar: { 
    padding: 10, 
    backgroundColor: "#F5F7FA", 
    borderRadius: 12 
  },
  titulo: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#2D3436" 
  },
  buscaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    margin: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DFE6E9",
    height: 50,
  },

  buscaIcone: { 
    marginRight: 10 
  },
  buscaInput: { 
    flex: 1, 
    fontSize: 16, 
    color: "#2D3436" 
  },
  listaConfig: { 
    paddingHorizontal: 20, 
    paddingBottom: 100 
  },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  cardInfo: { 
    marginBottom: 15 
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  nomePet: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
    flex: 1,
    marginRight: 10,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },

  badgeTexto: { 
    fontSize: 12, 
    fontWeight: "bold", 
    textTransform: "uppercase" 
  },

  detalhePet: { 
    fontSize: 14, 
    color: "#636E72", 
    marginBottom: 2 
  },

  cardAcoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#F5F7FA",
    paddingTop: 10,
  },

  botaoAcao: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
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
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
});
