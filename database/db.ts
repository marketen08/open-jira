import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = conecting
 * 3 = disconecting
 */


const mongoConection = {
    isConected: 0
}

export const connect = async() => {

    mongoose.set('strictQuery', false);
    
    if ( mongoConection.isConected ) {
        console.log('Ya estamos conectados');
        return;
    }

    if ( mongoose.connections.length > 0 ) {
        mongoConection.isConected = mongoose.connections[0].readyState;

        if ( mongoConection.isConected === 1 ) {
            console.log('Usando conexión anterior');
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect( process.env.MONGO_URL || '' );
    mongoConection.isConected = 1;
    console.log('Conectado mongoDB:', process.env.MONGO_URL );
}

export const disconnect = async() => {

    if ( process.env.NODE_ENV === 'development' ) return;
    if ( mongoConection.isConected === 0 ) return;

    
    await mongoose.disconnect();
    mongoConection.isConected = 0;
    console.log('Desconectado de mongoDB');
}