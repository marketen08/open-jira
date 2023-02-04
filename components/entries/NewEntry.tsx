import { useState, ChangeEvent, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {

    const { addNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext );

    // const [isAdding, setIsAdding] = useState(false);

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue( event.target.value );
    }

    const onSave = () => {

        if ( inputValue.length === 0 ) return;

        addNewEntry( inputValue );
        setInputValue('');
        setTouched(false);
        setIsAddingEntry(false);
    }

    return (
    <Box sx={{ marginBottom: 2, paddingX: 1, marginTop: 2 }}>

        {
            isAddingEntry ? (
                <>
                    <TextField 
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        placeholder='Nueva entrada'
                        autoFocus
                        multiline
                        label='Nueva Entrada'
                        helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' }
                        error={ inputValue.length <= 0 && touched }
                        value={ inputValue }
                        onChange={ onTextFieldChanges }
                        onBlur={ () => setTouched(true) }
                    />

                    <Box display='flex' justifyContent='space-between' >
                        <Button
                            variant='text'
                            startIcon={ <CancelOutlinedIcon /> }
                            onClick={ () => setIsAddingEntry(false) }
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant='outlined'
                            color='secondary'
                            startIcon={ <SaveOutlinedIcon /> }
                            onClick={ () => onSave() }
                        >
                            Guardar
                        </Button>
                    </Box>
                </>
            )
            : (
                <Button
                    startIcon={ <AddCircleOutlineOutlinedIcon /> }
                    fullWidth
                    variant='outlined'
                    onClick={ () => setIsAddingEntry(true) }

                >
                    Agregar Tarea
                </Button>
            )
        }        

        

        

    </Box>
  )
}
