import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    messaje: string
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'POST':
            return loginUser( req, res )
            
        default:
            res.status(400).json({
                messaje: 'Bad request'
            })
    }
}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { email = '', password = ' ' } = req.body;


}
