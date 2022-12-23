import { Task, Timestamp } from '@models';

export function removeDateFromTasks(tasks: Task[], date: Timestamp): Task[] {
	let newMap: Map<Timestamp, string>;
	return tasks.map((task) => {
		newMap = new Map(task.statusMap);
		newMap.delete(date);
		return {
			name: task.name,
			statusMap: newMap,
		};
	});
}

export function mergeDates(tasks: Task[]): Timestamp[] {
	const mergedMap = tasks.reduce(
		(mapAcc: Task['statusMap'], task: Task) => new Map([...mapAcc, ...task.statusMap]),
		tasks[0].statusMap,
	);
	return [...mergedMap.keys()];
}
