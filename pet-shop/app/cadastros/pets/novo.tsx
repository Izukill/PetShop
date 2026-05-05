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
  Alert,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { api } from "@/services/api";

import { Cliente } from "@/data/clientes";

export default function NovoPet() {
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [peso, setPeso] = useState("");
  const [idade, setIdade] = useState("");

  const [clientesDisponiveis, setClientesDisponiveis] = useState<Cliente[]>([]);
  const [buscaCliente, setBuscaCliente] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(
    null,
  );

  const [salvando, setSalvando] = useState(false);

  //carrega todos os clientes para a busca quando o componente monta
  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const response = await api.get("/cliente", {
        headers: { },
      });
      

      const clientesAtivos = (response.data as Cliente[]).filter(
        (c) => c.pessoa?.ativo !== false,
      );
      setClientesDisponiveis(clientesAtivos);
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível carregar a lista de clientes para vínculo.",
      );
    }
  };

  //filtro de clientes por nome
  const clientesFiltrados =
    buscaCliente.length > 0
      ? clientesDisponiveis
          .filter((c) =>
            c.pessoa.nome.toLowerCase().includes(buscaCliente.toLowerCase()),
          )
          .slice(0, 4)
      : [];

  

  const salvar = async () => {
    if (!nome || !raca || !peso) {
      Alert.alert("Atenção", "Preencha todos os dados do pet.");
      return;
    }

    if (!clienteSelecionado) {
      Alert.alert("Atenção", "Você precisa selecionar um dono para o pet.");
      return;
    }

    setSalvando(true);
    try {

      await api.post(
        "/pet",
        {
          nome,
          raca,
          peso,
          especie,
          idade,
          clienteLookupId: clienteSelecionado.lookupId,
        },
        { headers: { } },
      );

      Alert.alert("Sucesso Pet cadastrado com sucesso!");
      router.push("/cadastros/pets");
    } catch{
      Alert.alert("Ocorreu um erro ao salvar o pet. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

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
            onPress={() => router.back()}
            style={styles.botaoVoltar}
          >
            <FontAwesome5 name="arrow-left" size={20} color="#2D3436" />
          </TouchableOpacity>
          <Text style={styles.titulo}>
            <FontAwesome5 name="paw" size={25} color="#FF7675" /> Novo Pet
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.form}>

          {/* dados do pet */}
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
              placeholder="Ex: Cachorro"
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
              placeholder="Ex: 3 anos"
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

          {/* linha pra vincular o dono ao pet */}
          <View style={styles.divisor}>
            <View style={styles.linha} />
            <Text style={styles.textoDivisor}>Vincular Dono</Text>
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
                  placeholder="Digite o nome do cliente..."
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
                        name="plus-circle"
                        size={20}
                        color="#03A9F4"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          ) : (
            /* card pra mostrar o cliente selecionado */
            <View style={styles.clienteSelecionadoCard}>
              <View style={styles.clienteSelecionadoInfo}>
                <FontAwesome5
                  name="user-check"
                  size={24}
                  color="#4CAF50"
                  style={{ marginRight: 15 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.labelSelecionado}>Dono Vinculado:</Text>
                  <Text style={styles.nomeSelecionado}>
                    {clienteSelecionado.pessoa.nome}
                  </Text>
                </View>
                {/* botão para remover a seleção e buscar outro */}
                <TouchableOpacity onPress={() => setClienteSelecionado(null)}>
                  <FontAwesome5 name="times-circle" size={24} color="#E53935" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[styles.botaoSalvar, salvando && { opacity: 0.7 }]}
            onPress={salvar}
            disabled={salvando}
          >
            {salvando ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.textoBotao}>Cadastrar Pet</Text>
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
