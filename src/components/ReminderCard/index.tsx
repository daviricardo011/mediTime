import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/pt-br";

interface ReminderCardProps {
  type: "conta" | "remedio";
  description: string;
  amount?: string; // Apenas para contas
  date: string; // Deve ser no formato DD/MM/AAAA
  time?: string; // Apenas para remédios
  status: "paid" | "unpaid" | "taken" | "missed" | "waiting";
}

const ReminderCard = ({
  type,
  description,
  amount,
  date,
  time,
  status,
}: ReminderCardProps) => {
  moment.locale("pt-br");

  const isOverdue = moment().isAfter(
    moment(date, "DD/MM/YYYY").add(time ? 1 : 0, "hours")
  );
  const isRemedy = type === "remedio";

  const backgroundColor =
    (isOverdue && !isRemedy && status === "unpaid") ||
    (isOverdue && isRemedy && status !== "taken")
      ? "#ffe6e6"
      : "#fff";

  const iconColor = isRemedy
    ? status === "taken"
      ? "#005b96"
      : "#d32f2f"
    : status === "paid"
    ? "#388e3c"
    : "#d32f2f";

  const statusText = isRemedy
    ? status === "taken"
      ? "Remédio tomado"
      : "Remédio pendente"
    : status === "paid"
    ? "Conta paga"
    : "Conta em aberto";

  return (
    <View style={[styles.ReminderCard, { backgroundColor: backgroundColor }]}>
      <View style={styles.transactionDetails}>
        <FontAwesome
          name={
            isRemedy
              ? status === "taken"
                ? "check-circle"
                : "times-circle"
              : "money"
          }
          size={28}
          color={iconColor}
        />
        <View style={styles.transactionInfo}>
          <Text
            style={[
              styles.descriptionText,
              {
                color:
                  status !== "paid" && status !== "taken" ? "#d32f2f" : "#333",
              },
            ]}
          >
            {description}
          </Text>
          <Text style={styles.transactionAmount}>
            {isRemedy ? time : `$${amount}`}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.dateText}>
          {moment(date, "DD/MM/YYYY").format("DD [de] MMMM")}{" "}
        </Text>
        <Text style={[styles.statusText, { color: iconColor }]}>
          {statusText}
        </Text>
      </View>
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
  descriptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReminderCard;
