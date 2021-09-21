import React from 'react';
import Tile from '../common/Tile';

const Categories: React.FC = () => {
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
