import events from '../../public/events.json';

const getDayFromIndex = (i: number) => {
    switch (i) {
        case 0:
            return 'Friday';
        case 1:
            return 'Saturday';
        case 2:
            return 'Sunday';
    }
    return 'Sunday';
}
const getTimeStringFromHour = (hour: number) => {
    const t = hour;
    hour = Math.floor(hour);
    const minute = (t - hour) * 60;
    return hour + ":" + minute;
}

const createEventDiv = (start: number, end: number, name: string, color: string) => {
    const div = document.createElement('div');
    div.className = 'event';
    div.style.top = ((start - 8) * 7) + '%';
    div.style.height = ((end - start) * 7) + '%';
    div.style.backgroundColor = color;
    div.innerHTML = name + ((end - start) > 1.4 ? "<br>" : " | ") + getTimeStringFromHour(start) + " - " + getTimeStringFromHour(end);

    return div;
}

const createDayDiv = (i: number) => {
    const div = document.createElement('div');
    div.className = 'day';
    div.innerHTML = getDayFromIndex(i);

    return div;
};

const dayDivs: HTMLElement[] = [];

for (let i = 0; i < 3; i++) {
    const dayDiv = createDayDiv(i);
    dayDivs.push(dayDiv);
    document.getElementById('main')!.appendChild(dayDiv);
}

for (const [i, e] of events.entries()) {
    for (const { start, end, color, name } of e) {
        const eventDiv = createEventDiv(start, end, name, color);
        dayDivs[i].appendChild(eventDiv);
    }
}