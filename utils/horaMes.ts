import moment from 'moment';

export const horaMes = ( fecha:Date ) => {

    const hoyMes = moment( fecha )

    return hoyMes.format('HH:mm a | MMMM Do');
}
