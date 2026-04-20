import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function Home() {
  
  const handleLogout = async () => {

    await AsyncStorage.removeItem('@PetShop:token');
    
    router.replace('/');
  };

  return (
    //scrollView permite rolar a tela se tiver muito conteúdo
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <View>
          <Text style={styles.saudacao}>Olá, Equipe!</Text>
          <Text style={styles.subSaudacao}>Resumo do dia</Text>
        </View>
        
        <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
          <Text style={styles.textoBotaoSair}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* cartões com dados mockados pra teste de layout */}
      <View style={styles.cardsContainer}>
        <View style={[styles.card, { borderTopColor: '#74B9FF', borderTopWidth: 4 }]}>
          <Text style={styles.cardTitulo}>Vendas Hoje</Text>
          <Text style={styles.cardValor}>R$ 450,00</Text>
        </View>

        <View style={[styles.card, { borderTopColor: '#55E6C1', borderTopWidth: 4 }]}>
          <Text style={styles.cardTitulo}>Banhos Agendados</Text>
          <Text style={styles.cardValor}>5 Pets</Text>
        </View>
      </View>

    </ScrollView>
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
    padding: 25,
    backgroundColor: '#FFF',
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  saudacao: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  subSaudacao: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 4,
  },
  botaoSair: {
    backgroundColor: '#FC7E7E', 
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  textoBotaoSair: {
    color: '#D63031',
    fontWeight: 'bold',
  },
  cardsContainer: {
    padding: 20,
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', 
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitulo: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 10,
  },
  cardValor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
  }
});