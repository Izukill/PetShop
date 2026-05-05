import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { api } from "@/services/api";

import { Pet } from "@/data/pets";

import { Cliente } from "@/data/clientes";


export default function EditarPet() {
  const { lookupId } = useLocalSearchParams<{ lookupId: string }>();
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");

  const [clientesDisponiveis, setClientesDisponiveis] = useState<Cliente[]>([]);
  const [buscaCliente, setBuscaCliente] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(
    null,
  );

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarDadosBase();
  }, [lookupId]);

  const carregarDadosBase = async () => {
    try {

      const clientesResponse = await api.get("/cliente", {
        headers: { },
      });
      const clientesAtivos = (clientesResponse.data as Cliente[]).filter(
        (c) => c.pessoa?.ativo !== false,
      );
      setClientesDisponiveis(clientesAtivos);

      const petResponse = await api.get(`/pet/${lookupId}`, {
        headers: { },
      });
      const pet = petResponse.data as Pet;

      setNome(pet.nome || "");
      setEspecie(pet.especie || "");
      setRaca(pet.raca || "");
      setIdade(pet.idade ? pet.idade.toString() : "");
      setPeso(pet.peso || "");

      //pet já vem com o cliente vinculado
      if (pet.cliente) {
        setClienteSelecionado(pet.cliente);
      }
    } catch {
      Alert.alert("Erro não foi possível carregar os dados do pet.");
      router.push("/cadastros/pets");
    } finally {
      setLoading(false);
    }
  };

  const atualizar = async () => {
    if (!nome || !especie || !raca || !idade || !peso) {
      Alert.alert("Atenção por favor, preencha todos os campos do pet.");
      return;
    }

    if (!clienteSelecionado) {
      Alert.alert("Atenção o pet precisa ter um dono vinculado.");
      return;
    }

    setSalvando(true);
    try {

      await api.patch(
        `/pet/${lookupId}`,
        {
          nome,
          especie,
          raca,
          idade,
          peso,
          clienteLookupId: clienteSelecionado.lookupId,
        },
        {
          headers: { },
        },
      );

      Alert.alert("Sucesso pet atualizado com sucesso!");
      router.push("/cadastros/pets");
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao atualizar o pet. Tente novamente.",
      );
    } finally {
      setSalvando(false);
    }
  };

  const clientesFiltrados =
    buscaCliente.length > 0
      ? clientesDisponiveis
          .filter((c) =>
            c.pessoa.nome.toLowerCase().includes(buscaCliente.toLowerCase()),
          )
          .slice(0, 4)
      : [];

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#FF7675" />
        <Text style={{ marginTop: 10, color: "#636E72" }}>
          Carregando dados...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.push("/cadastros/pets")}
            style={styles.botaoVoltar}
          >
            <FontAwesome5 name="arrow-left" size={20} color="#2D3436" />
          </TouchableOpacity>
          <Text style={styles.titulo}>
            <FontAwesome5 name="paw" size={25} color="#2D3436" /> Editar Pet
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.form}>

          <Text style={styles.label}>Nome do Pet</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5
              name="dog"
              size={18}
              color="#B2BEC3"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Ex: Rex"
              placeholderTextColor="#B2BEC3"
              value={nome}
              onChangeText={setNome}
            />
          </View>


          <Text style={styles.label}>Espécie</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5
              name="cat"
              size={18}
              color="#B2BEC3"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Ex: Cachorro, Gato, Ave"
              placeholderTextColor="#B2BEC3"
              value={especie}
              onChangeText={setEspecie}
            />
          </View>

          <Text style={styles.label}>Raça</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5
              name="paw"
              size={18}
              color="#B2BEC3"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Ex: Golden Retriever"
              placeholderTextColor="#B2BEC3"
              value={raca}
              onChangeText={setRaca}
            />
          </View>

  
          <Text style={styles.label}>Idade</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5
              name="birthday-cake"
              size={18}
              color="#B2BEC3"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Ex: 2 anos"
              placeholderTextColor="#B2BEC3"
              value={idade}
              onChangeText={setIdade}
            />
          </View>


          <Text style={styles.label}>Peso (kg)</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5
              name="weight-hanging"
              size={18}
              color="#B2BEC3"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Ex: 15.5"
              placeholderTextColor="#B2BEC3"
              keyboardType="numeric"
              value={peso}
              onChangeText={setPeso}
            />
          </View>

          {/* divisor do dono*/}
          <View style={styles.divisor}>
            <View style={styles.linha} />
            <Text style={styles.textoDivisor}>Alterar Dono</Text>
            <View style={styles.linha} />
          </View>

          {!clienteSelecionado ? (
            <>
              <View style={styles.inputBuscaContainer}>
                <FontAwesome5
                  name="search"
                  size={18}
                  color="#03A9F4"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.inputText}
                  placeholder="Digite o nome do novo dono..."
                  placeholderTextColor="#B2BEC3"
                  value={buscaCliente}
                  onChangeText={setBuscaCliente}
                />
              </View>

              {clientesFiltrados.length > 0 && (
                <View style={styles.resultadosContainer}>
                  {clientesFiltrados.map((cliente) => (
                    <TouchableOpacity
                      key={cliente.lookupId}
                      style={styles.itemResultado}
                      onPress={() => {
                        setClienteSelecionado(cliente);
                        setBuscaCliente("");
                      }}
                    >
                      <View>
                        <Text style={styles.nomeResultado}>
                          {cliente.pessoa.nome}
                        </Text>
                        <Text style={styles.emailResultado}>
                          {cliente.pessoa.email}
                        </Text>
                      </View>
                      <FontAwesome5
                        name="check-circle"
                        size={20}
                        color="#03A9F4"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          ) : (
            <View style={styles.clienteSelecionadoCard}>
              <View style={styles.clienteSelecionadoInfo}>
                <FontAwesome5
                  name="user-check"
                  size={24}
                  color="#4CAF50"
                  style={{ marginRight: 15 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.labelSelecionado}>Dono Atual:</Text>
                  <Text style={styles.nomeSelecionado}>
                    {clienteSelecionado.pessoa.nome}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setClienteSelecionado(null)}>
                  <FontAwesome5 name="exchange-alt" size={20} color="#E53935" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[styles.botaoSalvar, salvando && { opacity: 0.7 }]}
            onPress={atualizar}
            disabled={salvando}
          >
            {salvando ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.textoBotao}>Atualizar Pet</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FFF" 
  },
  scrollContent: { 
    padding: 20, 
    paddingBottom: 40 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
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
  form: { 
    gap: 15 
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: -5,
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    borderWidth: 1,
    borderColor: "#DFE6E9",
    borderRadius: 12,
    height: 55,
    paddingHorizontal: 15,
  },
  inputIcon: { 
    marginRight: 10 
  },
  inputText: { 
    flex: 1, 
    fontSize: 16, 
    color: "#2D3436", 
    height: "100%" 
  },

  divisor: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginVertical: 10 
  },
  linha: { 
    flex: 1, 
    height: 1, 
    backgroundColor: "#DFE6E9" 
  },
  textoDivisor: {
    marginHorizontal: 10,
    color: "#B2BEC3",
    fontWeight: "bold",
    fontSize: 12,
    textTransform: "uppercase",
  },

  inputBuscaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E1F5FE",
    borderWidth: 1,
    borderColor: "#81D4FA",
    borderRadius: 12,
    height: 55,
    paddingHorizontal: 15,
  },
  resultadosContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DFE6E9",
    borderRadius: 12,
    marginTop: -5,
    overflow: "hidden",
  },
  itemResultado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F7FA",
  },
  nomeResultado: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#2D3436" 
  },
  emailResultado: { 
    fontSize: 13, 
    color: "#636E72", 
    marginTop: 2 
  },

  clienteSelecionadoCard: {
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#A5D6A7",
  },
  clienteSelecionadoInfo: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  labelSelecionado: {
    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  nomeSelecionado: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    marginTop: 2,
  },

  botaoSalvar: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#FF7675",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#FF7675",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  textoBotao: { 
    color: "#FFF", 
    fontWeight: "bold", 
    fontSize: 18 
   },
});
