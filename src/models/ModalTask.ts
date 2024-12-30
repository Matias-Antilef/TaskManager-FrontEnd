export interface TaskModalProps {
  onClose: () => void;
  title_modal: string;
  option: "update" | "create";
  _id?: string;
  title?: string;
  description?: string;
  completed: boolean;
}
