export default class View12Hours {
    getTotalDays() {
        return 2;
    }

    render(startDate) {
        const timelineElement = document.createElement('div');
        timelineElement.className = 'timeline';

        const yearRow = document.createElement('div');
        yearRow.className = 'timeline-row';

        const monthRow = document.createElement('div');
        monthRow.className = 'timeline-row';

        const dayRow = document.createElement('div');
        dayRow.className = 'timeline-row';

        const dayOfWeekRow = document.createElement('div');
        dayOfWeekRow.className = 'timeline-row';

        const hourRow = document.createElement('div');
        hourRow.className = 'timeline-row';

        for (let i = 0; i < 48; i += 2) {
            const currentDate = new Date(startDate);
            currentDate.setHours(i);

            this.appendCell(yearRow, currentDate.getFullYear());
            this.appendCell(monthRow, currentDate.toLocaleString('default', { month: 'short' }));
            this.appendCell(dayRow, currentDate.getDate());
            this.appendCell(dayOfWeekRow, currentDate.toLocaleString('default', { weekday: 'short' }));
            this.appendCell(hourRow, `${i % 24}:00`);
        }

        timelineElement.appendChild(yearRow);
        timelineElement.appendChild(monthRow);
        timelineElement.appendChild(dayRow);
        timelineElement.appendChild(dayOfWeekRow);
        timelineElement.appendChild(hourRow);

        return timelineElement;
    }

    appendCell(row, content) {
        const cell = document.createElement('div');
        cell.className = 'timeline-cell';
        cell.innerHTML = content;
        row.appendChild(cell);
    }
}