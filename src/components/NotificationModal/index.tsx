import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

type NotificationModalProps = {
  isVisible: boolean;
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

const NotificationModal = ({
  isVisible,
  message,
  type = "success",
  onClose,
}: NotificationModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: type === "success" ? "#d4edda" : "#f8d7da" },
          ]}
        >
          <Text
            style={[
              styles.modalText,
              { color: type === "success" ? "#155724" : "#721c24" },
            ]}
          >
            {message}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: { fontSize: 16, marginBottom: 15, textAlign: "center" },
  closeButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default NotificationModal;
