class Timeline {
    constructor() {
        this.startDate = new Date();
        this.zoomLevel = 1; // Initial zoom level
        this.views = [];
        this.loadViews();
    }

    loadViews() {
        const context = require.context('./views', false, /\.js$/);
        context.keys().forEach(key => {
            const ViewClass = context(key).default;
            this.views.push(new ViewClass());
        });
    }

    zoomIn() {
        this.zoomLevel = Math.min(this.zoomLevel + 1, this.views.length); // Max zoom level
    }

    zoomOut() {
        this.zoomLevel = Math.max(this.zoomLevel - 1, 1); // Min zoom level
    }

    setStartDate(scrollPercentage) {
        const totalDays = this.views[this.zoomLevel - 1].getTotalDays();
        const daysToScroll = totalDays * scrollPercentage;
        this.startDate = new Date();
        this.startDate.setDate(this.startDate.getDate() + daysToScroll);
    }

    render() {
        if (this.views.length === 0) {
            return document.createElement('div'); // Return an empty div if no views are loaded
        }
        return this.views[this.zoomLevel - 1].render(this.startDate);
    }
}