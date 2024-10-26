import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInputMask } from "react-native-masked-text";
import { useReminderStorage } from "../../hooks/useReminderStorage";
import { Reminder } from "../../types";
import { Alert } from "react-native";

interface ReminderModalProps {
  visible: boolean;
  onClose: () => void;
  reminder: Reminder | null;
  handleStorageChange: () => void;
}

const ReminderModal = ({
  visible,
  onClose,
  reminder,
  handleStorageChange,
}: ReminderModalProps) => {
  const { addToList, updateItem, removeFromList } = useReminderStorage();

  const [title, setTitle] = useState("");
  const [type, setType] = useState<"conta" | "remedio" | null>();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<
    "completed" | "waiting" | "missed" | null
  >();

  const [isConfirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  useEffect(() => {
    if (reminder) {
      setTitle(reminder.title);
      setDate(reminder.date);
      setType(reminder.amount ? "conta" : "remedio");
      setAmount(reminder.amount || "");
      setTime(reminder.time || "");
      setStatus(reminder.status);
    } else {
      setTitle("");
      setDate("");
      setType(null);
      setAmount("");
      setTime("");
      setStatus(null);
    }
  }, [reminder]);

  const isValidDate = (dateString: string): boolean => {
    const parts = dateString.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    return (
      date.getDate() === day &&
      date.getMonth() === month &&
      date.getFullYear() === year
    );
  };

  const isValidTime = (timeString: string): boolean => {
    const parts = timeString.split(":");
    const hour = parseInt(parts[0], 10);
    const minute = parseInt(parts[1], 10);

    return hour >= 0 && hour < 24 && minute >= 0 && minute < 60;
  };

  const handleSave = async () => {
    if (
      !title ||
      !date ||
      !type ||
      (type === "remedio" && !time) ||
      (type === "conta" && !amount)
    ) {
      Alert.alert("Aviso!", "Todos os campos são obrigatórios.");
      return;
    }
    if (!isValidDate(date)) {
      Alert.alert("Aviso!", "Data inválida. Use o formato DD/MM/AAAA.");
      return;
    }

    if (type === "remedio" && !isValidTime(time)) {
      Alert.alert("Aviso!", "Hora inválida. Use o formato HH:MM.");
      return;
    }

    if (!reminder?.id) {
      await addToList({
        id: Date.now(),
        title,
        type: type || "remedio",
        date,
        time: type === "remedio" ? time : undefined,
        amount: type === "conta" ? amount : undefined,
        status: "waiting",
      });
    } else {
      await updateItem(reminder.id, {
        title,
        type: type || "remedio",
        date,
        time: type === "remedio" ? time : undefined,
        amount: type === "conta" ? amount : undefined,
        status: status || "waiting",
      });
    }
    handleStorageChange();
    onClose();
  };

  const handleDelete = () => {
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = async () => {
    if (reminder?.id) {
      await removeFromList(reminder.id);
      handleStorageChange();
    }
    setConfirmDeleteVisible(false);
  };

  const cancelDelete = () => {
    setConfirmDeleteVisible(false);
  };

  return (
    <>
      <Modal visible={visible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {reminder ? "Gerenciar lembrete" : "Cadastrar novo lembrete"}
            </Text>

            <Text style={styles.label}>Título do lembrete*</Text>
            <TextInput
              style={styles.input}
              placeholder="Título do lembrete"
              value={title}
              onChangeText={setTitle}
            />
            <Text style={styles.label}>Tipo*</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label={"Toque para selecionar"} value={null} />
                <Picker.Item label="Conta" value="conta" />
                <Picker.Item label="Remédio" value="remedio" />
              </Picker>
            </View>

            {!!type && (
              <>
                <Text style={styles.label}>Data (DD/MM/AAAA)*</Text>
                <TextInputMask
                  style={styles.input}
                  value={date}
                  onChangeText={setDate}
                  type={"datetime"}
                  options={{
                    format: "DD/MM/YYYY",
                  }}
                />

                {type === "remedio" && (
                  <>
                    <Text style={styles.label}>Hora (HH:MM)*</Text>
                    <TextInputMask
                      style={styles.input}
                      value={time}
                      onChangeText={setTime}
                      type={"datetime"}
                      options={{
                        format: "HH:mm",
                      }}
                    />
                  </>
                )}

                {type === "conta" && (
                  <>
                    <Text style={styles.label}>Valor (R$)*</Text>
                    <TextInputMask
                      style={styles.input}
                      value={amount}
                      onChangeText={setAmount}
                      type={"money"}
                      options={{
                        precision: 2,
                        separator: ",",
                        delimiter: ".",
                        unit: "R$ ",
                      }}
                    />
                  </>
                )}
                {reminder && (
                  <>
                    <Text style={styles.label}>Status</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={status}
                        onValueChange={(itemValue) => setStatus(itemValue)}
                        style={styles.picker}
                      >
                        <Picker.Item
                          label={"Toque para selecionar"}
                          value={null}
                        />
                        <Picker.Item
                          label={type === "conta" ? "Paga" : "Tomado"}
                          value={"completed"}
                        />
                        <Picker.Item
                          label={type === "conta" ? "Não paga" : "Pendente"}
                          value={"waiting"}
                        />
                      </Picker>
                    </View>
                  </>
                )}
              </>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSave} style={styles.button}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
              {reminder?.id && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete}
                >
                  <Text style={styles.deleteButtonText}>Excluir lembrete</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal
          visible={isConfirmDeleteVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.confirmModalContent}>
              <Text style={styles.confirmTitle}>
                Tem certeza que deseja excluir este lembrete?
              </Text>
              <View style={styles.confirmButtonContainer}>
                <TouchableOpacity
                  onPress={confirmDelete}
                  style={styles.confirmButton}
                >
                  <Text style={styles.confirmButtonText}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={cancelDelete}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "white",
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#333",
  },
  buttonContainer: {
    marginTop: 15,
    gap: 20,
  },
  button: {
    backgroundColor: "#005b96",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "red",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  confirmModalContent: {
    width: "80%",
    maxWidth: 350,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    alignItems: "center",
  },
  confirmTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  confirmButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ReminderModal;
