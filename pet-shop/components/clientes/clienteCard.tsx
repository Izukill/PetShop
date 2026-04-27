import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Cliente } from "@/data/clientes";

interface ClienteCardProps {
  item: Cliente;
  onViewPets: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onReactivate: () => void;
}

export default function ClienteCard({
  item,
  onViewPets,
  onEdit,
  onDelete,
  onReactivate,
}: ClienteCardProps) {
  const isAtivo = item.pessoa?.ativo;
  const corBadgeFundo = isAtivo ? "#E8F5E9" : "#FFEBEE";
  const corBadgeTexto = isAtivo ? "#4CAF50" : "#E53935";
  const textoBadge = isAtivo ? "Ativo" : "Inativo";

  return (
    <View style={[styles.card, !isAtivo && { opacity: 0.7 }]}>
      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <Text style={styles.nomeCliente} numberOfLines={1}>
            {item.pessoa.nome}
          </Text>

          <View style={[styles.badge, { backgroundColor: corBadgeFundo }]}>
            <Text style={[styles.badgeTexto, { color: corBadgeTexto }]}>
              {textoBadge}
            </Text>
          </View>
        </View>

        <Text style={styles.detalheCliente}>
          <MaterialIcons name="email" size={14} /> {item.pessoa.email}
        </Text>
        <Text style={styles.detalheCliente}>
          <FontAwesome5 name="phone-alt" size={12} /> {item.numero}
        </Text>
      </View>

      <View style={styles.cardAcoes}>
        <TouchableOpacity
          style={[styles.botaoAcao, { backgroundColor: "#FFF0F5" }]}
          onPress={onViewPets}
        >
          <FontAwesome5 name="paw" size={16} color="#FF7675" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoAcao, { backgroundColor: "#E1F5FE" }]}
          onPress={onEdit}
        >
          <FontAwesome5 name="edit" size={16} color="#03A9F4" />
        </TouchableOpacity>

        {isAtivo ? (
          <TouchableOpacity
            style={[styles.botaoAcao, { backgroundColor: "#FFEBEE" }]}
            onPress={onDelete}
          >
            <FontAwesome5 name="trash-alt" size={16} color="#E53935" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.botaoAcao, { backgroundColor: "#E8F5E9" }]}
            onPress={onReactivate}
          >
            <FontAwesome5 name="undo-alt" size={16} color="#4CAF50" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardInfo: { marginBottom: 15 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  nomeCliente: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
    flex: 1,
    marginRight: 10,
  },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeTexto: { fontSize: 12, fontWeight: "bold", textTransform: "uppercase" },
  detalheCliente: { fontSize: 14, color: "#636E72", marginBottom: 2 },
  cardAcoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#F5F7FA",
    paddingTop: 10,
  },
  botaoAcao: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
