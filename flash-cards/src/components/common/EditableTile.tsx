import React, {useState} from 'react';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface Props{
    toggleEdit: (a: boolean) => void; 
    add: (a: string) => void
}

/**
 * Editable version of the lesson and category tiles
 * @param {function} toggleEdit toggle edit mode
 * @param {function} add the specialized add function
 * @returns 
 */
const EditableTile: React.FC<Props> = ({toggleEdit, add}: Props) => {
    const [title, setTitle] = useState("");

    const addWrapper = () => {
        add(title);
        toggleEdit(false);
    };

    return (
        <>
            <CheckRoundedIcon onClick={addWrapper}/>
            <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Your entry..."/> 
            <CloseRoundedIcon onClick={() => toggleEdit(false)}/>
        </>
                   
    );
};

export default EditableTile;
