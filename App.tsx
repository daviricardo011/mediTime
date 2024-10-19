import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Medication {
  id: number;
  name: string;
  time: string;
  frequency: number; // a cada X horas
  taken: boolean;
}

interface Bill {
  id: number;
  name: string;
  dueDate: string; // formato: YYYY-MM-DD
  paid: boolean;
}

const App = () => {
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "Paracetamol", time: "08:00", frequency: 8, taken: false },
    { id: 2, name: "Ibuprofeno", time: "12:00", frequency: 12, taken: false },
  ]);

  const [bills, setBills] = useState<Bill[]>([
    { id: 1, name: "Conta de Luz", dueDate: "2024-10-30", paid: false },
    { id: 2, name: "Internet", dueDate: "2024-10-25", paid: false },
  ]);

  const toggleMedication = (id: number) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, taken: !med.taken } : med))
    );
  };

  const toggleBill = (id: number) => {
    setBills((prev) =>
      prev.map((bill) =>
        bill.id === id ? { ...bill, paid: !bill.paid } : bill
      )
    );
  };

  const showAlert = (name: string) => {
    Alert.alert(`Info`, `Você clicou em ${name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gerenciador de Saúde</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medicamentos</Text>
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardText}>Hora: {item.time}</Text>
                <Text style={styles.cardText}>
                  Frequência: a cada {item.frequency} horas
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => toggleMedication(item.id)}
                style={[
                  styles.statusButton,
                  item.taken ? styles.taken : styles.notTaken,
                ]}
              >
                <Text style={styles.statusButtonText}>
                  {item.taken ? "✔️ Tomado" : "❌ Não Tomado"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contas</Text>
        <FlatList
          data={bills}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardText}>Vencimento: {item.dueDate}</Text>
              </View>
              <TouchableOpacity
                onPress={() => toggleBill(item.id)}
                style={[
                  styles.statusButton,
                  item.paid ? styles.paid : styles.notPaid,
                ]}
              >
                <Text style={styles.statusButtonText}>
                  {item.paid ? "✔️ Pago" : "❌ Não Pago"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => showAlert("Informações")}
      >
        <Icon name="info-circle" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    backgroundColor: "#4C6EF5",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4C6EF5",
  },
  cardText: {
    fontSize: 14,
    color: "#555",
  },
  statusButton: {
    padding: 10,
    borderRadius: 8,
  },
  taken: {
    backgroundColor: "#6BCB77",
  },
  notTaken: {
    backgroundColor: "#FF6B6B",
  },
  paid: {
    backgroundColor: "#6BCB77",
  },
  notPaid: {
    backgroundColor: "#FF6B6B",
  },
  statusButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  infoButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#4C6EF5",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
});

export default App;
