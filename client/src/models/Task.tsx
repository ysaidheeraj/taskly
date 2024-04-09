export interface Task {
    id?: number;
    name: string;
    description: string;
    status: number;
    user?: number;
    created_time?: string
}

export enum TaskStatus {
    TODO = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2,
  }