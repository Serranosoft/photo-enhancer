
/** Devuelve la fecha con el siguiente formato: '16 marzo de 2024, 15:58' */
export function convertDateToString(date) {

    const iso = date.toISOString();
    const dateFromIso = new Date(iso);

    const dateConfig = { day: '2-digit', month: 'short', year: 'numeric' };
    const hourConfig = { hour: '2-digit', minute: '2-digit' };

    const dateFormatted = dateFromIso.toLocaleDateString('es-ES', dateConfig).replace('.', '');
    const hourFormatted = dateFromIso.toLocaleTimeString('es-ES', hourConfig);

    const result = `${dateFormatted}, ${hourFormatted}`;
    return result;
}

/** A partir de una fecha con el siguiente formato '16 marzo de 2024, 15:58' devuelve un objeto Date */
export function convertStringDateToDateObject(date) {
    const segments = date.match(/(\d{2}) (\w{3}) (\d{4}), (\d{2}):(\d{2})/);
    const d = segments[1];
    const month = segments[2];
    const y = segments[3];
    const h = segments[4];
    const min = segments[5];

    const months = {
        'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
        'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11
    };

    const dateISO = new Date(Date.UTC(y, months[month], d, h, min)).toISOString();
    const result = new Date(dateISO);

    return result;
}

/** A partir de un objeto date devuelve la fecha en el siguiente formato '2024-03-16' */
export function parseDateToString(date) {
    // Ensure input is a Date object
    if (!(date instanceof Date)) {
        throw new Error('Invalid date object');
    }

    // Get components of the date
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);  // Months are zero indexed
    let day = ('0' + date.getDate()).slice(-2);

    // Form the string in YYYY-MM-DD format
    let formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}