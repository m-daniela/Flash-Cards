import React from 'react';
import { useParams } from 'react-router';
import { getCategories } from '../../utils/server/serverCalls';
import Tile from '../common/Tile';

const Categories: React.FC = () => {
    const lesson: any = useParams();
    console.log(lesson);
    getCategories(lesson?.lesson);
    return (
        <div className="categories">
            <div className="tile">
                <span>add category</span> 
            </div>
            <Tile title="category" />
        </div>
    );
};

export default Categories;
