class GanttChart {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.content = document.getElementById('ganttContent');
        this.tasks = [];
        this.milestones = [];
        this.releases = [];
        this.timeline = new Timeline();
        this.init();
    }

    init() {
        this.renderTimeline();
        this.renderDayline();
        this.addZoomListeners();
        this.addScrollListeners();
    }

    addZoomListeners() {
        this.container.addEventListener('wheel', (event) => {
            if (event.deltaY < 0) {
                this.timeline.zoomIn();
            } else {
                this.timeline.zoomOut();
            }
            this.renderTimeline();
        });
    }

    addScrollListeners() {
        const horizontalSlider = document.getElementById('horizontalSlider');
        const verticalSlider = document.getElementById('verticalSlider');

        horizontalSlider.addEventListener('input', () => {
            const maxScrollLeft = this.content.scrollWidth - this.content.clientWidth;
            const scrollPercentage = horizontalSlider.value / 100;
            this.timeline.setStartDate(scrollPercentage);
            this.renderTimeline();
        });

        verticalSlider.addEventListener('input', () => {
            const maxScrollTop = this.content.scrollHeight - this.content.clientHeight;
            this.content.scrollTop = (verticalSlider.value / 100) * maxScrollTop;
        });

        this.content.addEventListener('scroll', () => {
            const maxScrollLeft = this.content.scrollWidth - this.content.clientWidth;
            const maxScrollTop = this.content.scrollHeight - this.content.clientHeight;
            horizontalSlider.value = (this.content.scrollLeft / maxScrollLeft) * 100;
            verticalSlider.value = (this.content.scrollTop / maxScrollTop) * 100;
        });
    }

    renderTimeline() {
        this.content.innerHTML = ''; // Clear previous timeline
        const timelineElement = this.timeline.render();
        this.content.appendChild(timelineElement);
    }

    renderDayline() {
        const dayline = document.createElement('div');
        dayline.className = 'gantt-row';
        dayline.innerHTML = 'Dayline (current day)';
        this.content.appendChild(dayline);
    }

    renderTasks() {
        this.tasks.forEach(task => {
            const row = document.createElement('div');
            row.className = 'gantt-row';

            const bar = document.createElement('div');
            bar.className = 'gantt-bar';
            bar.style.width = (new Date(task.end) - new Date(task.start)) / (1000 * 60 * 60 * 24) * 20 + 'px';

            row.appendChild(bar);
            this.content.appendChild(row);
        });
    }

    renderMilestones() {
        this.milestones.forEach(milestone => {
            const row = document.createElement('div');
            row.className = 'gantt-row';

            const milestoneElement = document.createElement('div');
            milestoneElement.className = 'milestone';

            row.appendChild(milestoneElement);
            this.content.appendChild(row);
        });
    }

    renderReleases() {
        this.releases.forEach(release => {
            const row = document.createElement('div');
            row.className = 'gantt-row';

            const releaseElement = document.createElement('div');
            releaseElement.className = 'release';
            releaseElement.innerHTML = release.name;

            row.appendChild(releaseElement);
            this.content.appendChild(row);
        });
    }
}