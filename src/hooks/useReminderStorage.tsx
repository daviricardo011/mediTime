import AsyncStorage from "@react-native-async-storage/async-storage";
import { Reminder } from "../types";
import { useState } from "react";
import NotificationModal from "../components/NotificationModal";

const STORAGE_KEY = "@my_reminder_list";

export const useReminderStorage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const showModal = (message: string, type: "success" | "error") => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addToList = async (newItem: Reminder): Promise<void> => {
    try {
      const storedList = await AsyncStorage.getItem(STORAGE_KEY);
      const currentList: Reminder[] = storedList ? JSON.parse(storedList) : [];
      const updatedList = [...currentList, { ...newItem }];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      showModal("Item adicionado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao adicionar item à lista:", error);
      showModal("Erro ao adicionar item à lista.", "error");
    }
  };

  const getList = async (): Promise<Reminder[]> => {
    try {
      const storedList = await AsyncStorage.getItem(STORAGE_KEY);
      return storedList ? JSON.parse(storedList) : [];
    } catch (error) {
      console.error("Erro ao recuperar lista do armazenamento:", error);
      showModal("Erro ao recuperar lista do armazenamento.", "error");
      return [];
    }
  };

  const removeFromList = async (id: number): Promise<void> => {
    try {
      const storedList = await AsyncStorage.getItem(STORAGE_KEY);
      const currentList: Reminder[] = storedList ? JSON.parse(storedList) : [];
      const updatedList = currentList.filter((item) => item.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      showModal("Item removido com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao remover item da lista:", error);
      showModal("Erro ao remover item da lista.", "error");
    }
  };

  const updateItem = async (
    id: number,
    updatedItem: Reminder
  ): Promise<void> => {
    try {
      const storedList = await AsyncStorage.getItem(STORAGE_KEY);
      const currentList: Reminder[] = storedList ? JSON.parse(storedList) : [];
      const updatedList = currentList.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      showModal("Item atualizado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao atualizar item da lista:", error);
      showModal("Erro ao atualizar item da lista.", "error");
    }
  };

  return {
    addToList,
    getList,
    removeFromList,
    updateItem,
    modalVisible,
    modalMessage,
    modalType,
    closeModal,
    NotificationModal: (
      <NotificationModal
        isVisible={modalVisible}
        message={modalMessage}
        type={modalType}
        onClose={closeModal}
      />
    ),
  };
};
