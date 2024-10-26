import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  title: string;
  onAdd: () => void;
}

const Header = ({ title, onAdd }: Props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.newReminderView}
        onPress={() => onAdd()}
      >
        <Text style={styles.newReminderText}>Adicionar</Text>
        <FontAwesome name="plus" size={18} color="#005b96" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  newReminderView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: "#fff",
    borderColor: "#005b96",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    gap: 15,
  },
  newReminderText: {
    fontSize: 16,
    color: "#005b96",
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default Header;
