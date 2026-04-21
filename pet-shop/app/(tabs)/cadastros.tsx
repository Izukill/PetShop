import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CadastrosHub() {
  
  const onPress = (rota: string) => {
    router.push(rota as any); 
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.titulo}>Central de Cadastros</Text>
        <Text style={styles.subtitulo}>Selecione a categoria que deseja gerenciar</Text>
      </View>

      {/* clientes */}
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => onPress('/cadastros/clientes')}
      >
        <View style={[styles.iconContainer, { backgroundColor: '#E1F5FE' }]}>
          <FontAwesome5 name="user-friends" size={24} color="#03A9F4" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Clientes</Text>
          <Text style={styles.cardDesc}>Gerenciar Donos e históricos</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#B2BEC3" />
      </TouchableOpacity>

      {/* pets */}
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => onPress('/cadastros/pets')}
      >
        <View style={[styles.iconContainer, { backgroundColor: '#FFF0F5' }]}>
          <FontAwesome5 name="paw" size={24} color="#FF7675" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Pets</Text>
          <Text style={styles.cardDesc}>Fichas médicas, raças e pesos</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#B2BEC3" />
      </TouchableOpacity>

      {/* funcionários */}
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => onPress('/cadastros/funcionarios')}
      >
        <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
          <FontAwesome5 name="id-badge" size={24} color="#4CAF50" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Funcionários</Text>
          <Text style={styles.cardDesc}>Gerenciar Equipe e acessos</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#B2BEC3" />
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  header: {
    marginBottom: 25,
    marginTop: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  subtitulo: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  cardDesc: {
    fontSize: 13,
    color: '#636E72',
    marginTop: 2,
  }
});