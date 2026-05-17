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
import { FontAwesome5, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { api } from "@/services/api";

import { Funcionario } from "@/data/funcionarios";

export default function EditarFuncionario() {
  const { lookupId } = useLocalSearchParams<{ lookupId: string }>();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [especializacao, setEspecializacao] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDadosDoFuncionario = async () => {
      try {
        const response = await api.get(`/funcionario/${lookupId}`, {
          headers: { },
        });

        const funcionario = response.data as unknown as Funcionario;

        setNome(funcionario.pessoa.nome);
        setEmail(funcionario.pessoa.email);
        setCargo(funcionario.cargo);
        setEspecializacao(funcionario.especializacao);
      } catch {
        Alert.alert(
          "Erro",
          "Não foi possível carregar os dados do funcionário.",
        );
        router.back();
      } finally {
        setLoading(false);
      }
    };

    carregarDadosDoFuncionario();
  }, [lookupId]);

  const atualizar = async () => {
    if (!nome || !email || !cargo || !especializacao) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      await api.patch(
        `/funcionario/${lookupId}`,
        { nome, email, cargo, especializacao },
        {
          headers: {},
        },
      );

      Alert.alert("Sucesso", "Funcionário atualizado com sucesso!");
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao atualizar o funcionário. Tente novamente.",
      );
    }
  };

  //pra mostrar a bolinha girando de carregando
  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#4D7BF0" />
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.botaoVoltar}
          >
            <FontAwesome5 name="arrow-left" size={20} color="#2D3436" />
          </TouchableOpacity>
          <Text style={styles.titulo}>
            {" "}
            <AntDesign name="user-switch" size={25} color="black" /> Editar
            Funcionário
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5
              name="user"
              size={18}
              color="#B2BEC3"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Ex: Jaqueline Ferreira"
              placeholderTextColor="#B2BEC3"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="email"
              size={20}
              color="#B2BEC3"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputText}
              placeholder="exemplo@gmail.com"
              placeholderTextColor="#B2BEC3"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.label}>Cargo</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5
              name="briefcase"
              size={18}
              color="#B2BEC3"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Ex: Veterinário"
              placeholderTextColor="#B2BEC3"
              value={cargo}
              onChangeText={setCargo}
            />
          </View>

          <Text style={styles.label}>Especialização</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5
              name="user-md"
              size={18}
              color="#B2BEC3"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Ex: Cirurgião"
              placeholderTextColor="#B2BEC3"
              value={especializacao}
              onChangeText={setEspecializacao}
            />
          </View>

          <TouchableOpacity style={styles.botaoSalvar} onPress={atualizar}>
            <Text style={styles.textoBotao}>Atualizar Funcionário</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
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
    borderRadius: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2D3436",
  },
  form: {
    gap: 15,
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
  inputIcon: { marginRight: 10 },
  inputText: { flex: 1, fontSize: 16, color: "#2D3436", height: "100%" },
  botaoSalvar: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#82AEF0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  textoBotao: { color: "#FFF", fontWeight: "bold", fontSize: 18 },
});
