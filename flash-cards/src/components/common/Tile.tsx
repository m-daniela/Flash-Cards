import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { URLParams } from '../../utils/types';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

interface Props {
    title: string
}

/**
 * Tile component
 * Shows the information passed, such as lesson name or category
 * On click, it redirects to the list of categories for the lesson
 * or to the card from the selected category
 * @param {string} title - title that will be displayed
 * @todo make edit and delete functional and replace the letters 
 * with icons
 */
const Tile: React.FC<Props> = ({title}: Props) => {
    const params: URLParams = useParams();
    const url = params.lesson ? `/${params.lesson}/${title}` : `/${title}`;

    return (
        <div className="tile">
            <button name="edit"><EditRoundedIcon/></button>
            <Link to={url}>{title}</Link>
            <button name="delete"><DeleteForeverRoundedIcon/></button>

        </div>
    );
};

export default Tile;
