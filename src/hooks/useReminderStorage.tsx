import AsyncStorage from "@react-native-async-storage/async-storage";
import { Reminder } from "../types";
import { useState } from "react";
import NotificationModal from "../components/NotificationModal";
import * as Notifications from "expo-notifications";

const STORAGE_KEY = "@my_reminder_list";

const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day); // month - 1 porque o mês em Date começa do zero
};

const scheduleNotification = async (notificationData: {
  title: string;
  body: string;
  date: Date;
  identifier: string;
}) => {
  await Notifications.cancelScheduledNotificationAsync(
    notificationData.identifier
  );

  await Notifications.scheduleNotificationAsync({
    content: {
      title: notificationData.title,
      body: notificationData.body,
      data: { someData: "" },
    },
    trigger: {
      date: notificationData.date,
    },
  });
};

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
      const updatedList = [...currentList, newItem];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

      let notificationDate: Date;

      if (newItem.type === "remedio" && newItem.time) {
        const [hours, minutes] = newItem.time.split(":").map(Number);
        notificationDate = new Date(
          parseDate(newItem.date).setHours(hours, minutes)
        );
      } else {
        // Para contas, agendar um dia antes
        notificationDate = new Date(
          parseDate(newItem.date).getTime() - 24 * 60 * 60 * 1000
        );
      }

      await scheduleNotification({
        title: newItem.title,
        body:
          newItem.type === "remedio"
            ? "Hora de tomar seu remédio!"
            : "Lembre de pagar sua conta!",
        date: notificationDate,
        identifier: newItem.id?.toString() || Date.now().toString(),
      });

      showModal("Item adicionado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao adicionar item à lista:", error);
      showModal("Erro ao adicionar item à lista.", "error");
    }
  };

  const removeFromList = async (id: number): Promise<void> => {
    try {
      const storedList = await AsyncStorage.getItem(STORAGE_KEY);
      const currentList: Reminder[] = storedList ? JSON.parse(storedList) : [];
      const updatedList = currentList.filter((item) => item.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

      await Notifications.cancelScheduledNotificationAsync(id.toString());

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

      let notificationDate: Date;

      if (updatedItem.type === "remedio" && updatedItem.time) {
        const [hours, minutes] = updatedItem.time.split(":").map(Number);
        notificationDate = new Date(
          parseDate(updatedItem.date).setHours(hours, minutes)
        );
      } else {
        notificationDate = new Date(
          parseDate(updatedItem.date).getTime() - 24 * 60 * 60 * 1000
        );
      }

      await scheduleNotification({
        title: updatedItem.title,
        body:
          updatedItem.type === "remedio"
            ? "Hora de tomar seu remédio!"
            : "Lembre de pagar sua conta!",
        date: notificationDate,
        identifier: id.toString(),
      });

      showModal("Item atualizado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao atualizar item da lista:", error);
      showModal("Erro ao atualizar item da lista.", "error");
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

  return {
    addToList,
    getList,
    removeFromList,
    updateItem,
    showModal,
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
