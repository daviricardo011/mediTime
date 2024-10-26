import React, { useEffect, useState } from "react";
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
import ReminderModal from "../../components/ReminderModal";
import moment from "moment";
import { useReminderStorage } from "../../hooks/useReminderStorage";
import { Reminder } from "../../types";

const HomeScreen = () => {
  const { getList, removeFromList, updateItem } = useReminderStorage();
  const [selectedTab, setSelectedTab] = useState("Contas");
  const [reminderModal, setReminderModal] = useState(false);
  const [currentReminder, setCurrentReminder] = useState<any>(null);
  const [medicines, setMedicines] = useState<Reminder[]>([]);
  const [bills, setBills] = useState<Reminder[]>([]);

  const handleFetchReminders = async () => {
    const reminders = await getList();
    console.log("storage");
    console.log(reminders);
    const med: Reminder[] = [];
    const b: Reminder[] = [];

    reminders.forEach((reminder) => {
      if (reminder.type === "remedio") {
        med.push(reminder);
      } else {
        b.push(reminder);
      }
    });
    setMedicines(med);
    setBills(b);
  };

  useEffect(() => {
    handleFetchReminders();
  }, [reminderModal]);

  // Função para ordenar os itens pelo mais próximo
  const sortByDate = (a: Reminder, b: Reminder): number => {
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

  const handleOpenModal = (reminder: Reminder | null) => {
    setCurrentReminder(reminder);
    setReminderModal(true);
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
        ? bills.sort(sortByDate).map((debit, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOpenModal(debit)}
            >
              <ReminderCard
                type="conta"
                title={debit.title}
                amount={debit.amount}
                date={debit.date}
                status={debit.status}
              />
            </TouchableOpacity>
          ))
        : medicines.sort(sortByDate).map((medicine, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOpenModal(medicine)}
            >
              <ReminderCard
                type="remedio"
                title={medicine.title}
                date={medicine.date}
                time={medicine.time}
                status={medicine.status}
              />
            </TouchableOpacity>
          ))}

      <ReminderModal
        visible={reminderModal}
        onClose={() => setReminderModal(false)}
        reminder={currentReminder}
        onDelete={(id: number) => removeFromList(id)}
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
