import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


interface ModalDeletarProps {
  visible: boolean;             
  nomeItem: string | undefined;  
  onCancel: () => void;          
  onConfirm: () => void;         
}

export default function ModalDeletar({ visible, nomeItem, onCancel, onConfirm }: ModalDeletarProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible} 
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          
          <View style={styles.modalIconContainer}>
            <FontAwesome5 name="exclamation-triangle" size={30} color="#E53935" />
          </View>
          
          <Text style={styles.modalTitle}>Excluir Registro?</Text>
          
          <Text style={styles.modalText}>
            Tem certeza que deseja excluir <Text style={{ fontWeight: 'bold' }}>{nomeItem}</Text>? Esta ação inativará o cadastro no sistema.
          </Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={styles.modalButtonCancel} 
              onPress={onCancel} //chama a função do pai
            >
              <Text style={styles.modalButtonCancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalButtonDelete} 
              onPress={onConfirm} //chama a função do pai
            >
              <Text style={styles.modalButtonDeleteText}>Sim, Excluir</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  
  modalOverlay: { 
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  modalContainer: { 
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10
  },

  modalIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 10
  },

  modalText: {
    fontSize: 15,
    color: '#636E72',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10
  },

  modalButtonCancel: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    alignItems: 'center'
  },

  modalButtonCancelText: {
    color: '#636E72',
    fontWeight: 'bold',
    fontSize: 16
  },

  modalButtonDelete: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: '#E53935',
    alignItems: 'center',
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },

  modalButtonDeleteText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});