import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { URLParams } from '../../utils/types';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { deleteCategory, deleteLesson, updateCategory, updateLesson } from '../../utils/server/serverCalls';
import EditableTile from './EditableTile';

interface Props {
    title: string
}

/**
 * Tile component
 * Shows the information passed, such as lesson name or category
 * On click, it redirects to the list of categories for the lesson
 * or to the card from the selected category
 * @param {string} title - title that will be displayed
 */
const Tile: React.FC<Props> = ({title}: Props) => {
    const params: URLParams = useParams();
    const url = params.lesson ? `/${params.lesson}/${title}` : `/${title}`;
    const [editable, setEditable] = useState(false);

    const deleteTile = () => {
        if (params.lesson){
            deleteCategory(params.lesson, title);
        }
        else {
            deleteLesson(title);
        }
    };

    const updateTile = (entry: string) => {
        if (params.lesson){
            updateCategory(params.lesson, title, entry);
        }
        else {
            updateLesson(title, entry);
        }
    };

    return (
        <div className="tile">
            {editable ? 
                <EditableTile addNew={updateTile} setEdit={setEditable}/>
                :
                <>
                    <button name="edit" onClick={() => setEditable(true)}><EditRoundedIcon/></button>
                    <Link to={url}>{title}</Link>
                    <button name="delete" onClick={deleteTile}><DeleteRoundedIcon/></button>
                </>
            }
            

        </div>
    );
};

export default Tile;
