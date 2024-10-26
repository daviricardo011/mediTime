// FooterMenu.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation/types";
import {
  CompositeNavigationProp,
  NavigationProp,
} from "@react-navigation/native";

type FooterMenuNavigationProp = CompositeNavigationProp<
  NavigationProp<RootStackParamList>,
  NavigationProp<Record<string, object | undefined>>
>;

const routes: { name: keyof RootStackParamList; icon: string }[] = [
  { name: "Tela Inicial", icon: "home" },
];

const FooterMenu = () => {
  const navigation = useNavigation<FooterMenuNavigationProp>();
  const state = useNavigationState((state) => state);

  return (
    <View style={styles.container}>
      {routes.map((route) => {
        const isActive =
          state?.routes[state.index].name === route.name ||
          (!state?.routes[state.index].name && route.name === "Tela Inicial");
        const iconColor = isActive ? "#005b96" : "gray";

        return (
          <TouchableOpacity
            key={route.name}
            onPress={() => navigation.navigate(route.name)}
            style={styles.menuItem}
          >
            <FontAwesome name={route.icon as any} size={25} color={iconColor} />
            <Text style={[styles.menuText, { color: iconColor }]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    marginTop: 5,
  },
});

export default FooterMenu;
