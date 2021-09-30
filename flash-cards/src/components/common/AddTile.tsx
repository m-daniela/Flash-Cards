import React, {useState} from 'react';
import EditableTile from './EditableTile';

interface Props {
    editable?: string;
    addNew: (a: string) => void
}

const AddTile: React.FC<Props> = ({editable, addNew}) => {
    
    const [edit, setEdit] = useState(false);


    return (
        <div className="tile">
            {
                edit ? 
                    <EditableTile setEdit={setEdit} addNew={addNew}/>
                    :
                    <span onClick={() => setEdit(true)}>add {editable}</span>
            }
        </div>
    );
};

export default AddTile;
