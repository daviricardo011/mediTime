import React from "react";
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
        <Text
          style={[
            styles.tabText,
            selectedTab === "Contas" && styles.activeTabText,
          ]}
        >
          Contas
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          selectedTab === "Remédios" && styles.activeTab,
        ]}
        onPress={() => onSelectTab("Remédios")}
      >
        <Text
          style={[
            styles.tabText,
            selectedTab === "Remédios" && styles.activeTabText,
          ]}
        >
          Remédios
        </Text>
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
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#005b96",
  },
  tabText: {
    color: "#333",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff",
  },
});

export default SwitchTabs;
