import moment from "moment";
const weekdays = ['יום ראשון', 'יום שני', 'יום שלישי', 'רביעי', 'יום חמישי', 'יום שישי', 'יום שבת'];
const hebrewMonths = ['ינואר' ,'פברואר', 'מרץ', 'אפריל', 'יוני', 'יולי', 'אוֹגוּסט', 'ספטמבר', 'אוקטובר', 'נובמבר' ,'דצמבר'];

export function hebrewFormat (month, day, weekday) {
	// const hebrewMonth = hebrewDate((new Date()).getFullYear(), month, day).month_name;
	return hebrewMonths[month] + ' ' + day + 'ה ' + weekdays[weekday];
}

export function nextTuesday (weekday = 2) {
	const date = moment().add(1, 'week').day(2);
	return hebrewFormat(date.month(), date.date(), weekday)
}