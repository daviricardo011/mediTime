import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/pt-br"; // Importando a localidade pt-br

interface ReminderCardProps {
  type: "conta" | "remedio";
  description: string;
  amount?: string; // Apenas para contas
  date: string;
  time?: string; // Apenas para remédios
  status: "paid" | "unpaid" | "taken" | "missed" | "waiting";
  isLate?: boolean;
}

const ReminderCard = ({
  type,
  description,
  amount,
  date,
  time,
  status,
}: ReminderCardProps) => {
  // Definindo a localidade para pt-BR
  moment.locale("pt-br");

  const isOverdue = moment().isAfter(moment(date + (time ? ` ${time}` : "")));
  const isRemedy = type === "remedio";
  const backgroundColor = isOverdue && !isRemedy ? "#ffcccc" : "#fff";

  return (
    <View
      style={[
        styles.ReminderCard,
        { backgroundColor: isOverdue ? "#ffcccc" : backgroundColor },
      ]}
    >
      <View style={styles.transactionDetails}>
        <FontAwesome
          name={
            isRemedy
              ? status === "taken"
                ? "check-circle"
                : "times-circle"
              : "money"
          }
          size={20}
          color={
            isRemedy ? (status === "taken" ? "#7de3ea" : "#ff7272") : "#333"
          }
        />
        <View style={styles.transactionInfo}>
          <Text>{description}</Text>
          <Text style={styles.transactionAmount}>
            {isRemedy ? time : `$${amount}`}
          </Text>
        </View>
      </View>
      <Text>{moment(date).format("DD [de] MMM")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ReminderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 10,
    elevation: 1,
  },
  transactionDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionInfo: {
    marginLeft: 10,
  },
  transactionAmount: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
});

export default ReminderCard;
