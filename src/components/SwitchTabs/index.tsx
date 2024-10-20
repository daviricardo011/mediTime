import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SwitchTabsProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const SwitchTabs = ({ selectedTab, onSelectTab }: SwitchTabsProps) => {
  return (
    <View style={styles.switchTabs}>
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === "Contas" && styles.activeTab]}
        onPress={() => onSelectTab("Contas")}
      >
        <Text style={styles.tabText}>Contas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          selectedTab === "Remédios" && styles.activeTab,
        ]}
        onPress={() => onSelectTab("Remédios")}
      >
        <Text style={styles.tabText}>Remédios</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  switchTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeTab: {
    backgroundColor: "#7de3ea",
  },
  tabText: {
    color: "#333",
    fontWeight: "bold",
  },
});

export default SwitchTabs;
