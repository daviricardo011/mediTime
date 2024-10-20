import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/homeScreen";
import FooterMenu from "./src/components/FooterMenu";
import { RootStackParamList } from "./src/navigation/types";
import { NavigatorScreenParams } from "@react-navigation/native";

// Tipando o Tab
const Tab = createBottomTabNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false, // Ocultar o cabeçalho padrão
            tabBarStyle: { display: "none" }, // Ocultar a barra de abas padrão
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen
            name="Another"
            component={() => (
              <View>
                <Text>TESTE DE OUTRA PAGINA</Text>
              </View>
            )}
          />
        </Tab.Navigator>
        <FooterMenu />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default App;
