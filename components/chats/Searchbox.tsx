import { Typography } from '@mui/material';
import { useContext } from 'react'
import { AuthContext } from '../../context';

export const Searchbox = () => {

    const { user, logout } = useContext( AuthContext );

    return (
        <Typography
            variant='h5'
        >
            { user?.nombre }
        </Typography>
    )
}
