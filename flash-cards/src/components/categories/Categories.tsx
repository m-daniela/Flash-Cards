import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { addCategory } from '../../utils/server/serverCalls';
import { Category } from '../../utils/types';
import AddTile from '../common/AddTile';
import Tile from '../common/Tile';

/**
 * Displays the list of categories
 * Adds a new one, if valid
 */
const Categories: React.FC = () => {
    const lesson: any = useParams();
    const categories = useSelector((state: RootStateOrAny) => state.categories);

    // add new category
    const addNewCategory = (category: string): void => {
        if (category){
            addCategory(lesson.lesson, category);
        }
    };

    return (
        <div className="categories">
            <AddTile add={addNewCategory}/>
            {categories.map((elem: Category, index: number) => <Tile title={elem.name} key={index}/>)}
        </div>
    );
};

export default Categories;
