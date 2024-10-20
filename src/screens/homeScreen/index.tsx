import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import SwitchTabs from "../../components/SwitchTabs";
import ReminderCard from "../../components/ReminderCard";
import FooterMenu from "../../components/FooterMenu";
import moment from "moment";

interface Conta {
  description: string;
  amount: string;
  date: string;
  status: "paid" | "unpaid";
}

interface Remedio {
  description: string;
  date: string;
  time: string;
  status: "taken" | "missed" | "waiting";
}

// Exemplo de dados para contas
const contas: Conta[] = [
  {
    description: "Energia",
    amount: "120.00",
    date: "2024-10-19",
    status: "paid",
  },
  {
    description: "Água",
    amount: "45.00",
    date: "2024-10-25",
    status: "unpaid",
  },
  {
    description: "Internet",
    amount: "89.00",
    date: "2024-10-26",
    status: "unpaid",
  },
];

// Exemplo de dados para remédios
const remedios: Remedio[] = [
  {
    description: "Vitamina D",
    date: "2024-10-20",
    time: "12:00",
    status: "waiting",
  },
  {
    description: "Aspirina",
    date: "2024-10-20",
    time: "00:00",
    status: "missed",
  },
  {
    description: "Antibiótico",
    date: "2024-10-22",
    time: "18:00",
    status: "waiting",
  },
];

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Contas");

  // Função para ordenar os itens pelo mais próximo
  const sortByDate = (a: Conta | Remedio, b: Conta | Remedio): number => {
    if ("amount" in a && "amount" in b) {
      const aDate = moment(a.date);
      const bDate = moment(b.date);
      return aDate.diff(bDate);
    }
    if ("time" in a && "time" in b) {
      const aDate = moment(a.date + ` ${a.time}`);
      const bDate = moment(b.date + ` ${b.time}`);
      return aDate.diff(bDate);
    }
    return 0;
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Lembretes" />
      <SwitchTabs
        selectedTab={selectedTab}
        onSelectTab={(tab: string) => setSelectedTab(tab)}
      />

      {/* Título de Transações */}
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionTitle}>
          {selectedTab === "Contas" ? "Contas" : "Remédios"}
        </Text>
      </View>

      {/* Exibir itens de acordo com a aba selecionada */}
      {selectedTab === "Contas"
        ? contas
            .sort(sortByDate)
            .map((conta, index) => (
              <ReminderCard
                key={index}
                type="conta"
                description={conta.description}
                amount={conta.amount}
                date={conta.date}
                status={conta.status}
              />
            ))
        : remedios
            .sort(sortByDate)
            .map((remedio, index) => (
              <ReminderCard
                key={index}
                type="remedio"
                description={remedio.description}
                date={remedio.date}
                time={remedio.time}
                status={remedio.status}
                isLate={moment().isAfter(
                  moment(remedio.date + ` ${remedio.time}`)
                )}
              />
            ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HomeScreen;
