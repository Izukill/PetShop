import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

// Dados mockados pra demonstração - depois puxa da API
const agendamentosHoje = [
  { id: '1', hora: '10:00', pet: 'Rex', servico: 'Banho e Tosa', dono: 'Jaqueline' },
  { id: '2', hora: '11:30', pet: 'Mimi', servico: 'Consulta', dono: 'Carlos' },
  { id: '3', hora: '14:00', pet: 'Thor', servico: 'Banho', dono: 'Ana' },
];

const avisos = [
  { id: '1', icone: 'box-open', cor: '#E53935', texto: 'Estoque Baixo: Ração Golden 15kg' },
  { id: '2', icone: 'syringe', cor: '#F39C12', texto: '3 Pets com vacinas atrasadas' },
];

export default function Home() {
  
  const handleLogout = () => {
    console.log('Logout realizado');
    Alert.alert('Logout', 'Você saiu da sua conta.');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <View style={styles.avatarContainer}>
            <FontAwesome5 name="user-tie" size={26} color="#4D7BF0" />
          </View>
          <View>
            <Text style={styles.saudacao}>Olá, Equipe!</Text>
            <Text style={styles.subSaudacao}>Terça-feira, 05 de Maio</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
          <FontAwesome5 name="sign-out-alt" size={18} color="#D63031" />
        </TouchableOpacity>
      </View>

      {/* RESUMO - NOVO ESTILO WIDGET */}
      <View style={styles.cardsContainer}>
        {/* Cartão de Faturamento (Azul) */}
        <View style={[styles.card, { backgroundColor: '#4D7BF0' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitulo, { color: 'rgba(255,255,255,0.8)' }]}>Faturamento</Text>
            <View style={styles.iconContainerAzul}>
              <FontAwesome5 name="coins" size={14} color="#4D7BF0" />
            </View>
          </View>
          <Text style={[styles.cardValor, { color: '#FFF' }]}>R$ 450,00</Text>
        </View>

        {/* Cartão de Agendamentos (Salmão) */}
        <View style={[styles.card, { backgroundColor: '#FF7675' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitulo, { color: 'rgba(255,255,255,0.8)' }]}>Agendamentos</Text>
            <View style={styles.iconContainerSalmao}>
              <FontAwesome5 name="calendar-check" size={14} color="#FF7675" />
            </View>
          </View>
          <Text style={[styles.cardValor, { color: '#FFF' }]}>5 Hoje</Text>
        </View>
      </View>

      {/* ATALHOS RÁPIDOS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.acoesContainer}>
          <TouchableOpacity style={styles.acaoBotao} onPress={() => router.push('/cadastros')}>
            <View style={[styles.acaoIcone, { backgroundColor: '#E1F5FE' }]}>
              <Ionicons name="people" size={27} color="#03A9F4" />
            </View>
            <Text style={styles.acaoTexto}>Cadastros</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.acaoBotao} onPress={() => router.push('/cadastros/pets')}>
            <View style={[styles.acaoIcone, { backgroundColor: '#FFF0F5' }]}>
              <FontAwesome5 name="paw" size={22} color="#FF7675" />
            </View>
            <Text style={styles.acaoTexto}>Pets</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.acaoBotao} onPress={() => router.push('/agendamentos')}>
            <View style={[styles.acaoIcone, { backgroundColor: '#E8F5E9' }]}>
              <FontAwesome5 name="calendar-plus" size={22} color="#4CAF50" />
            </View>
            <Text style={styles.acaoTexto}>Agendar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.acaoBotao} onPress={() => router.push('/vendas')}>
            <View style={[styles.acaoIcone, { backgroundColor: '#FFF8E1' }]}>
              <FontAwesome5 name="shopping-cart" size={22} color="#FFC107" />
            </View>
            <Text style={styles.acaoTexto}>Vender</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* AGENDA */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Serviços Agendados</Text>
          <TouchableOpacity onPress={() => router.push('/agendamentos')}>
            <Text style={styles.verTodos}>Ver agenda</Text>
          </TouchableOpacity>
        </View>
        
        {agendamentosHoje.map((agendamento) => (
          <View key={agendamento.id} style={styles.agendamentoCard}>
            <View style={styles.agendamentoHora}>
              <Text style={styles.horaTexto}>{agendamento.hora}</Text>
            </View>
            <View style={styles.agendamentoInfo}>
              <Text style={styles.agendamentoPet}>{agendamento.pet} <Text style={styles.agendamentoDono}>({agendamento.dono})</Text></Text>
              <Text style={styles.agendamentoServico}>{agendamento.servico}</Text>
            </View>
            <TouchableOpacity style={styles.botaoCheck}>
              <FontAwesome5 name="check" size={16} color="#B2BEC3" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* AVISOS */}
      <View style={[styles.section, { paddingBottom: 40 }]}>
        <Text style={styles.sectionTitle}>Avisos do Sistema</Text>
        
        {avisos.map((aviso) => (
          <View key={aviso.id} style={styles.avisoCard}>
            <View style={[styles.avisoIcone, { backgroundColor: aviso.cor + '20' }]}>
              <FontAwesome5 name={aviso.icone} size={18} color={aviso.cor} />
            </View>
            <Text style={styles.avisoTexto}>{aviso.texto}</Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  
  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 25,
    backgroundColor: '#FFF',
    paddingTop: 60,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saudacao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  subSaudacao: {
    fontSize: 13,
    color: '#636E72',
    marginTop: 2,
  },
  botaoSair: {
    backgroundColor: '#FFEBEE', 
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // CARDS DE RESUMO - ATUALIZADOS
  cardsContainer: {
    padding: 20,
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', 
    padding: 20,
    borderRadius: 20, // Bordas mais suaves
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15, // Mais respiro antes do valor
  },
  cardTitulo: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardValor: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainerAzul: {
    backgroundColor: '#FFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerSalmao: {
    backgroundColor: '#FFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // SEÇÕES GENÉRICAS
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 15,
  },
  verTodos: {
    color: '#4D7BF0',
    fontSize: 14,
    fontWeight: '600',
  },

  // ATALHOS RÁPIDOS
  acoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acaoBotao: {
    alignItems: 'center',
    width: '22%',
  },
  acaoIcone: {
    width: 55,
    height: 55,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  acaoTexto: {
    fontSize: 12,
    color: '#636E72',
    fontWeight: '600',
    textAlign: 'center',
  },

  // AGENDA
  agendamentoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  agendamentoHora: {
    backgroundColor: '#F5F7FA',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 15,
  },
  horaTexto: {
    fontWeight: 'bold',
    color: '#4D7BF0',
  },
  agendamentoInfo: {
    flex: 1,
  },
  agendamentoPet: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 2,
  },
  agendamentoDono: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#B2BEC3',
  },
  agendamentoServico: {
    fontSize: 13,
    color: '#636E72',
  },
  botaoCheck: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 1,
    borderColor: '#DFE6E9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // AVISOS
  avisoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F5F7FA',
  },
  avisoIcone: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avisoTexto: {
    flex: 1,
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
  }
});