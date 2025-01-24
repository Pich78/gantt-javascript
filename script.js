// General load of the library
const ganttChart = new GanttChart('ganttContainer');
ganttChart.addTask(new Task('Task 1', '2025-01-01', '2025-01-05'));
ganttChart.addTask(new Task('Task 2', '2025-01-03', '2025-01-10'));
ganttChart.addMilestone(new Milestone('Milestone 1', '2025-01-07'));
ganttChart.addRelease(new Release('Release 1', '2025-01-15', ['Feature 1', 'Feature 2']));