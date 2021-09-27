import React, {useState} from 'react';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface Props{
    editable: string,
    addNew: (a: string) => void
}


const EditableTile: React.FC<Props> = ({editable, addNew}: Props) => {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState("");
    return (
        <div className="tile">
            {
                edit ? 
                    <>
                        <EditRoundedIcon onClick={() => addNew(title)}/>
                        <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Your entry..."/> 
                        <CloseRoundedIcon onClick={() => setEdit(false)}/>
                    </>
                    :
                    <span onClick={() => setEdit(true)}>add {editable}</span>
            }
        </div>
    );
};

export default EditableTile;
