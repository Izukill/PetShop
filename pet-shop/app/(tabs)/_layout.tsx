import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  //configurações de css do tabs precisa ser colocado dentro do componente para acessar o insets e ajustar o paddingBottom da tabBarStyle

  const configuracaoDasAbas = {
    tabBarActiveTintColor: '#FF7675',
    tabBarInactiveTintColor: '#B2BEC3',
    headerShown: true,
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    headerTitleStyle: {
      color: '#2D3436',
      fontWeight: 'bold' as const, 
    },
    tabBarStyle: {
      backgroundColor: '#FFFFFF',
      borderTopWidth: 0,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      height: 60 + insets.bottom,
      paddingBottom: 10 + insets.bottom,
    },
  };

  return (
    <Tabs screenOptions={configuracaoDasAbas}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="agendamentos"
        options={{
          title: 'Agenda',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="calendar-alt" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="vendas"
        options={{
          title: 'Caixa',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="cash-register" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="cadastros"
        options={{
          title: 'Cadastros',
          tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="catalogo"
        options={{
          title: 'Catálogo',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="inventory" size={size} color={color} />,
        }}
      />
      
    </Tabs>
  );
}