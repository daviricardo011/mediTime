import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import SwitchTabs from "../../components/SwitchTabs";
import ReminderCard from "../../components/ReminderCard";
import ReminderModal from "../../components/ReminderModal"; // Certifique-se de importar o modal
import FooterMenu from "../../components/FooterMenu";
import moment from "moment";

interface Conta {
  description: string;
  amount: string;
  date: string; // Deve ser no formato DD/MM/AAAA
  status: "paid" | "unpaid";
}

interface Remedio {
  description: string;
  date: string; // Deve ser no formato DD/MM/AAAA
  time: string;
  status: "taken" | "missed" | "waiting";
}

// Exemplo de dados para contas
const contas: Conta[] = [
  {
    description: "Energia",
    amount: "120.00",
    date: "19/10/2024",
    status: "paid",
  },
  {
    description: "Água",
    amount: "45.00",
    date: "20/10/2024",
    status: "unpaid",
  },
  {
    description: "Internet",
    amount: "89.00",
    date: "19/12/2024",
    status: "unpaid",
  },
];

const remedios: Remedio[] = [
  {
    description: "Vitamina D",
    date: "19/10/2024",
    time: "12:00",
    status: "waiting",
  },
  {
    description: "Aspirina",
    date: "20/10/2024",
    time: "00:00",
    status: "missed",
  },
  {
    description: "Antibiótico",
    date: "19/10/2024",
    time: "18:00",
    status: "taken",
  },
];

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Contas");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentReminder, setCurrentReminder] = useState<any>(null);

  // Função para ordenar os itens pelo mais próximo
  const sortByDate = (a: Conta | Remedio, b: Conta | Remedio): number => {
    if ("amount" in a && "amount" in b) {
      const aDate = moment(a.date, "DD/MM/YYYY");
      const bDate = moment(b.date, "DD/MM/YYYY");
      return aDate.diff(bDate);
    }
    if ("time" in a && "time" in b) {
      const aDate = moment(a.date + ` ${a.time}`, "DD/MM/YYYY HH:mm");
      const bDate = moment(b.date + ` ${b.time}`, "DD/MM/YYYY HH:mm");
      return aDate.diff(bDate);
    }
    return 0;
  };

  const handleOpenModal = (reminder: Conta | Remedio | null) => {
    setCurrentReminder(reminder);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Lembretes" onAdd={() => handleOpenModal(null)} />
      <SwitchTabs
        selectedTab={selectedTab}
        onSelectTab={(tab: string) => setSelectedTab(tab)}
      />

      <View style={styles.transactionHeader}>
        <Text style={styles.transactionTitle}>
          {selectedTab === "Contas" ? "Contas" : "Remédios"}
        </Text>
      </View>

      {selectedTab === "Contas"
        ? contas.sort(sortByDate).map((conta, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOpenModal(conta)}
            >
              <ReminderCard
                type="conta"
                description={conta.description}
                amount={conta.amount}
                date={conta.date} // Exibindo no formato DD/MM/AAAA
                status={conta.status}
              />
            </TouchableOpacity>
          ))
        : remedios.sort(sortByDate).map((remedio, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOpenModal(remedio)}
            >
              <ReminderCard
                type="remedio"
                description={remedio.description}
                date={remedio.date} // Exibindo no formato DD/MM/AAAA
                time={remedio.time}
                status={remedio.status}
              />
            </TouchableOpacity>
          ))}

      <ReminderModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        reminder={currentReminder}
      />
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
