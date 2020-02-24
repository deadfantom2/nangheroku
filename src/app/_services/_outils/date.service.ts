import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

    constructor() { }

    public customDateInMs(date: Date) {
        return new Date(date).getTime();
    }

    public customDateDDMMYYYY(date: Date) {
        const newDate = new Date(date);

        const Day = newDate.getDate();
        const Month = newDate.getMonth() + 1;
        const Year = newDate.getFullYear();

        if (Day < 10 && Month < 10) {
            return '0' + Day + '/' + '0' + Month + '/' + Year
        }
        else if (Day < 10) {
            return '0' + Day + '/' + Month + '/' + Year
        }
        else if (Month < 10) {
            return Day + '/' + '0' + Month + '/' + Year
        }
        else {
            return Day + '/' + Month + '/' + Year
        }
    }

}
