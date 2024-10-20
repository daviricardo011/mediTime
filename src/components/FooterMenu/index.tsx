// FooterMenu.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation/types"; // Importando o tipo
import {
  CompositeNavigationProp,
  NavigationProp,
} from "@react-navigation/native";

// Tipando a navegação
type FooterMenuNavigationProp = CompositeNavigationProp<
  NavigationProp<RootStackParamList>,
  NavigationProp<Record<string, object | undefined>>
>;

const routes: { name: keyof RootStackParamList; icon: string }[] = [
  { name: "Home", icon: "home" },
  { name: "Another", icon: "bar-chart" },
  // Adicione mais rotas conforme necessário
];

const FooterMenu = () => {
  const navigation = useNavigation<FooterMenuNavigationProp>();
  const state = useNavigationState((state) => state);

  return (
    <View style={styles.container}>
      {routes.map((route) => {
        const isActive = state?.routes[state.index].name === route.name;
        const iconColor = isActive ? "#7de3ea" : "gray";

        return (
          <TouchableOpacity
            key={route.name}
            onPress={() => navigation.navigate(route.name)} // Certifique-se de que `route.name` é do tipo correto
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
    alignItems: "center", // Alinhando ícones e texto no centro
  },
  menuText: {
    marginTop: 5, // Espaçamento entre o ícone e o texto
  },
});

export default FooterMenu;
