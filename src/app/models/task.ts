export interface Task {
	name: string;
	statusMap: Map<Timestamp, string>;
}

export type Timestamp = number;
