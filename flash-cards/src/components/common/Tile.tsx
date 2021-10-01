import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { URLParams } from '../../utils/types';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { deleteCategory, deleteLesson, updateCategory, updateLesson } from '../../utils/server/serverCalls';
import EditableTile from './EditableTile';
import { useDispatch } from 'react-redux';
import { deleteCategoryReducer, updateCategoryReducer } from '../../utils/store/redux';

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
    const [editable, toggleEditable] = useState(false);
    const dispatch = useDispatch();


    // remove the tile
    // check if it is a lesson or a category tile
    const deleteTile = () => {
        if (params.lesson){
            deleteCategory(params.lesson, title)
                .then(result => {
                    if (result.modifiedCount !== 0){
                        dispatch(deleteCategoryReducer(title));
                    }
                })
                .catch(console.log);
        }
        else {
            deleteLesson(title);
        }
    };

    // update the tile
    // check if it is a lesson or a category tile
    const updateTile = (entry: string) => {
        if (params.lesson){
            updateCategory(params.lesson, title, entry)
                .then(result => {
                    if (result){
                        dispatch(updateCategoryReducer({...result}));
                    }
                })
                .catch(console.log);
        }
        else {
            updateLesson(title, entry);
        }
    };

    return (
        <div className="tile">
            {editable ? 
                <EditableTile add={updateTile} toggleEdit={toggleEditable}/>
                :
                <>
                    <button name="edit" onClick={() => toggleEditable(true)}><EditRoundedIcon/></button>
                    <Link to={url}>{title}</Link>
                    <button name="delete" onClick={deleteTile}><DeleteRoundedIcon/></button>
                </>
            }
            

        </div>
    );
};

export default Tile;
