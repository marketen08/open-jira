import { formatDistanceToNow, addDays } from 'date-fns';
import { es } from 'date-fns/locale'

export const getFormatDistanceToNow = ( date: Date ) => {

    const fromNow = formatDistanceToNow( date, { locale: es } );

    return `hace ${ fromNow }`;
}
