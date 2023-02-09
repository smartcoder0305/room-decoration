import moment from "moment";
const weekdays = ['יום ראשון', 'יום שני', 'יום שלישי', 'רביעי', 'יום חמישי', 'יום שישי', 'יום שבת'];
const hebrewMonths = ['ינואר' ,'פברואר', 'מרץ', 'אפריל', 'יוני', 'יולי', 'אוֹגוּסט', 'ספטמבר', 'אוקטובר', 'נובמבר' ,'דצמבר'];

export function hebrewFormat (month, day, weekday) {
	// const hebrewMonth = hebrewDate((new Date()).getFullYear(), month, day).month_name;
	return ' ' + weekdays[weekday] + ' ה' + day + ' ב' + hebrewMonths[month] + ' ';
}

export function nextTuesday (weekday = 4) {
	let date;
	if (moment().day() === 0) date = moment().add(0, 'week').day(weekday);
	else date = moment().add(1, 'week').day(weekday);
	return hebrewFormat(date.month(), date.date(), weekday)
}