import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { api } from '@/services/api';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
          const response = await api.post('/auth/login', { email, senha });
          const { access_token } = response.data;
          
          await AsyncStorage.setItem('@PetShop:token', access_token);
          router.replace('/(tabs)'); 
          
        } catch (error) {
          alert('E-mail ou senha inválidos!');
        }
    };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.card}>
        <FontAwesome5 name="paw" size={50} color="#FF7675" style={styles.logoIcon} />
        
        <Text style={styles.titulo}>PetControll</Text> 
        <Text style={styles.subtitulo}>Faça login para usar o sistema</Text>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#999" style={styles.inputIcon} />
          <TextInput 
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color="#999" style={styles.inputIcon} />
          <TextInput 
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5, 
    },
    logoIcon: {
        marginBottom: 10,
    },
    titulo : {
        color: '#2D3436',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitulo: {
        color: '#636E72',
        fontSize: 14,
        marginBottom: 30,
    },
   
    inputContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#F9FAFB',
        borderColor: '#DFE6E9',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#2D3436',
    },
    botao: {
        width: '100%',
        backgroundColor: '#FF7675',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    textoBotao: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
