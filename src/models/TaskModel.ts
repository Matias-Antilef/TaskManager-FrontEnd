export interface TaskItemModel {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export interface taskToggleContextModel {
  addTaskContext: (task: TaskItemModel) => void;
  removeTaskContext: (id: string) => void;
  updateTaskContext: (task: TaskItemModel) => void;
  getTaskContext: (task: TaskItemModel[]) => void;
}
