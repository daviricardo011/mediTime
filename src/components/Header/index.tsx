import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.newReminderView}
        onPress={() => console.log("Novo lembrete")}
      >
        {/* <Text style={styles.newReminderText}>Adicionar</Text> */}
        <FontAwesome name="plus" size={24} color="#ffffff" />
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
    gap: 10,
    backgroundColor: "#09686e",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 50,
  },
  newReminderText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Header;
