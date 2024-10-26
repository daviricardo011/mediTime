import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/pt-br";
import { Reminder } from "../../types";

const ReminderCard = ({
  type,
  title,
  amount,
  date,
  time,
  status,
}: Reminder) => {
  moment.locale("pt-br");

  const isOverdue = moment().isAfter(
    moment(date, "DD/MM/YYYY").add(time ? 1 : 0, "hours")
  );
  const isRemedy = type === "remedio";

  const backgroundColor =
    (isOverdue && !isRemedy && status === "missed") ||
    (isOverdue && isRemedy && status !== "completed")
      ? "#ffe6e6"
      : "#fff";

  const iconColor =
    status === "waiting"
      ? "#e99402"
      : isRemedy
      ? status === "completed"
        ? "#005b96"
        : "#d32f2f"
      : status === "completed"
      ? "#388e3c"
      : "#d32f2f";

  const statusText = isRemedy
    ? status === "completed"
      ? "Tomado"
      : "Pendente"
    : status === "completed"
    ? "Paga"
    : "Aberta";

  return (
    <View style={[styles.ReminderCard, { backgroundColor }]}>
      <View style={styles.transactionDetails}>
        <FontAwesome
          name={
            isRemedy
              ? status === "completed"
                ? "check-circle"
                : "times-circle"
              : "money"
          }
          size={28}
          color={iconColor}
        />
        <View style={styles.transactionInfo}>
          <Text style={[styles.descriptionText, { color: iconColor }]}>
            {title}
          </Text>
          <Text style={styles.transactionAmount}>
            {isRemedy ? time : amount}
          </Text>
        </View>
      </View>
      <View style={styles.rightSide}>
        <Text style={styles.dateText}>
          {moment(date, "DD/MM/YYYY").format("DD [de] MMMM")}
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
  rightSide: {
    alignItems: "flex-end",
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
