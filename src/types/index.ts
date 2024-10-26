export interface Reminder {
  id?: number;
  title: string;
  type: "conta" | "remedio";
  date: string; // Deve ser no formato DD/MM/AAAA
  status: "completed" | "waiting" | "missed";
  amount?: string; // Apenas para contas
  time?: string; // Apenas para remédios
}
