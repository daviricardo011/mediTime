import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/homeScreen";
import FooterMenu from "./src/components/FooterMenu";
import { RootStackParamList } from "./src/navigation/types";
import * as Notifications from "expo-notifications";

// Tipando o Tab
const Tab = createBottomTabNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    // Configurar notificações
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Solicitar permissões para notificações
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus === "granted") {
          console.log("Permissão de notificação concedida");
        } else {
          console.log("Permissão de notificação negada");
        }
      } else {
        console.log("Permissão de notificação já concedida");
      }
    };

    requestPermissions();
  }, []);

  // Função para agendar notificações (exemplo)
  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lembrete",
        body: "Este é um lembrete para você!",
        data: { someData: "goes here" },
      },
      trigger: { seconds: 2 }, // A notificação será disparada em 2 segundos
    });
  };

  // Chame a função scheduleNotification em algum lugar do seu código

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        >
          <Tab.Screen name="Tela Inicial" component={HomeScreen} />
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
