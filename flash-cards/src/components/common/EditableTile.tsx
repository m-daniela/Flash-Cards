import React, {useState} from 'react';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface Props{
    setEdit: (a: boolean) => void; 
    addNew: (a: string) => void
}


const EditableTile: React.FC<Props> = ({setEdit, addNew}: Props) => {
    const [title, setTitle] = useState("");

    const addNewWrapper = () => {
        addNew(title);
        setEdit(false);
    };

    return (
        <>
            <CheckRoundedIcon onClick={addNewWrapper}/>
            <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Your entry..."/> 
            <CloseRoundedIcon onClick={() => setEdit(false)}/>
        </>
                   
    );
};

export default EditableTile;
