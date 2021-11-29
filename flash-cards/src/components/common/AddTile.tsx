import React, {useState} from 'react';
import EditableTile from './EditableTile';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

interface Props {
    add: (a: string) => void
}

/**
 * Wrapper component for adding a new tile
 * @param {function} add name of the 
 */
const AddTile: React.FC<Props> = ({add}: Props) => {
    
    const [edit, toggleEdit] = useState(false);

    return (
        <div className="tile col col-10 col-sm-5 col-md-4 col-lg-2 m-2 row">
            {
                edit ? 
                    <EditableTile toggleEdit={toggleEdit} add={add}/>
                    :
                    <span onClick={() => toggleEdit(true)}><AddRoundedIcon /> add</span>
            }
        </div>
    );
};

export default AddTile;
