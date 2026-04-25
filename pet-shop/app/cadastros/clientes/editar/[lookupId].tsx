import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { api } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Pessoa {
  nome: string;
  email: string;
  ativo: boolean; 
}

interface Cliente {
  lookupId: string; 
  pessoa: Pessoa;
  numero: string;
}

export default function EditarCliente() {
  // 2. Pegamos o lookupId que foi passado pela URL!
  const { lookupId } = useLocalSearchParams<{ lookupId: string }>();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [loading, setLoading] = useState(true);

  // 3. Assim que a tela abrir, nós buscamos os dados do cliente
  useEffect(() => {
    carregarDadosDoCliente();
  }, [lookupId]);

  const carregarDadosDoCliente = async () => {
    try {
      const token = await AsyncStorage.getItem('@PetShop:token');
      const response = await api.get(`/cliente/${lookupId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const cliente = response.data as Cliente;
      
      setNome(cliente.pessoa.nome);
      setEmail(cliente.pessoa.email);
      setNumero(cliente.numero);

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do cliente.');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const atualizar = async () => {
    if (!nome || !email || !numero) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    try {

      const token = await AsyncStorage.getItem('@PetShop:token');

      await api.patch(`/cliente/${lookupId}`, 
        { nome, email, numero },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      Alert.alert('Sucesso', 'Cliente atualizado com sucesso!');
      router.back();

    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o cliente. Tente novamente.');
    }
  };

  //pra mostrar a bolinha girando de carregando
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4D7BF0" />
        <Text style={{ marginTop: 10, color: '#636E72' }}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.botaoVoltar}>
            <FontAwesome5 name="arrow-left" size={20} color="#2D3436" />
          </TouchableOpacity>
          <Text style={styles.titulo}> <AntDesign name="user-switch" size={25} color="black" /> Editar Cliente</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="user" size={18} color="#B2BEC3" style={styles.inputIcon} />
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
            <MaterialIcons name="email" size={20} color="#B2BEC3" style={styles.inputIcon} />
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

          <Text style={styles.label}>Telefone / WhatsApp</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="phone-alt" size={18} color="#B2BEC3" style={styles.inputIcon} />
            <TextInput 
              style={styles.inputText} 
              placeholder="(83) 99999-9999"
              placeholderTextColor="#B2BEC3"
              keyboardType="phone-pad"
              value={numero}
              onChangeText={setNumero}
            />
          </View>

          <TouchableOpacity style={styles.botaoSalvar} onPress={atualizar}>
            <Text style={styles.textoBotao}>Atualizar Cliente</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Os estilos são idênticos aos da tela de Novo Cliente para manter a consistência visual
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 30 },
  botaoVoltar: { padding: 10, backgroundColor: '#F5F7FA', borderRadius: 12 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#2D3436' },
  form: { gap: 15 },
  label: { fontSize: 14, fontWeight: '700', color: '#2D3436', marginBottom: -5, marginLeft: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F7FA', borderWidth: 1, borderColor: '#DFE6E9', borderRadius: 12, height: 55, paddingHorizontal: 15 },
  inputIcon: { marginRight: 10 },
  inputText: { flex: 1, fontSize: 16, color: '#2D3436', height: '100%' },
  botaoSalvar: { flexDirection: 'row', justifyContent: 'center', backgroundColor: '#4D7BF0', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 30, shadowColor: '#82AEF0', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
  textoBotao: { color: '#FFF', fontWeight: 'bold', fontSize: 18 }
});