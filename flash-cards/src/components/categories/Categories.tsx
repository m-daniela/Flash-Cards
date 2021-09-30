import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { addCategory } from '../../utils/server/serverCalls';
import { Category } from '../../utils/types';
import AddTile from '../common/AddTile';
import Tile from '../common/Tile';


const Categories: React.FC = () => {
    const lesson: any = useParams();
    const categories = useSelector((state: RootStateOrAny) => state.categories);

    const addNewCategory = (category: string): void => {
        addCategory(lesson.lesson, category);
    };

    return (
        <div className="categories">
            <AddTile editable="category" addNew={addNewCategory}/>
            {categories.map((elem: Category, index: number) => <Tile title={elem.name} key={index}/>)}
        </div>
    );
};

export default Categories;
