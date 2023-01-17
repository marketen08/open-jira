import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry} from '../../../models';

type Data = 
| { messaje: string }
| IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.body;

    if ( mongoose.isValidObjectId( id )) {
        return res.status(400).json({ messaje: 'El id no es valido' + id });
    }

    switch ( req.method ) {
        case 'GET':
            return getEntry( req, res );
        case 'PUT':
            return updateEntry( req, res );
        case 'DELETE':
            return deleteEntry( req, res );
        default:
            res.status(400).json({ messaje: 'Metodo no existe' })
    }

}


const getEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();

    const entry = await Entry.findById( id );

    if ( !entry ) {
        await db.disconnect();
        return res.status(400).json({ messaje: 'No hay entrada con ese ID:' + id });
    }

    res.status(200).json( entry! );

}


const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById( id );

    if ( !entryToUpdate ) {
        await db.disconnect();
        return res.status(400).json({ messaje: 'No hay entrada con ese ID:' + id });
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;

    
    try {
        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true });
        await db.disconnect();
        res.status(200).json( updatedEntry! );

    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ messaje: error.errors.status });
    }

}

const deleteEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();

    const entryDeleted = await Entry.findByIdAndDelete( id );

    if ( !entryDeleted ) {
        await db.disconnect();
        return res.status(400).json({ messaje: 'No hay entrada con ese ID:' + id });
    }

    res.status(200).json( entryDeleted! );

}