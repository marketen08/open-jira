import { useContext } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { externalApiConToken } from '../../apiAxios';
import { AdjuntosContext } from '../../context';

interface Props {
    id: string
}

export const PedidoUploadFile:FC<Props> = ({ id }) => {
  
    const { refreshAdjuntos } = useContext(AdjuntosContext);

    const [fileList, setFileList] = useState<FileList | null>(null);
    const [botonSubirVisible, setBotonSubirVisible] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileList(e.target.files);
        setBotonSubirVisible(true);
    };

    const handleUploadClick = async () => {
        if (!fileList) {
            return;
        }

        // Create an object of formData
        const formData = new FormData();
      
        for ( let i = 0; i < fileList.length; i++ ) {
            formData.append(`archivo[${ i }]`, fileList[0])
        }

        try {
            const resp = await externalApiConToken({
                method: "post",
                url: `/adjuntos/${ id }`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            setFileList(null);
            setBotonSubirVisible(false);
            refreshAdjuntos( id );
        } catch (error) {
            console.log(error);
        }
        
    };

    return (
        <>
            <ButtonGroup size="small" aria-label="small outlined button group">
                <Button sx={{ p: 0 }}>
                    <Button
                        variant='contained'
                        component='label'
                        sx={{ borderRadius: 0 }}
                    >
                        Seleccionar imagenes
                    <input 
                        accept="image/*" 
                        type="file"
                        capture
                        onChange={handleFileChange} 
                        multiple 
                        hidden 
                    />
                    </Button>
                </Button>
                <Button onClick={handleUploadClick} type='button' variant='contained' color='success' sx={ !botonSubirVisible ? { display: 'none' } : { }} >Subir</Button>
            </ButtonGroup>
            <ul>
                { 
                    fileList && 
                    Object.values(fileList).map(( file, i ) => (
                        <li key={ i }>
                            { file.name }
                        </li>
                    ))
                }
            </ul>
        </>
    );
}
