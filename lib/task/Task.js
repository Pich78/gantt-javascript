class Task {
    constructor(name, start, end) {
        this.name = name;
        this.start = new Date(start);
        this.end = new Date(end);
    }
}