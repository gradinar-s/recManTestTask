export enum Status {
  DONE = "done",
  PROGRESS = "progress",
}

export type TaskType = {
  id: number;
  text: string;
  status: Status;
};
