import React from 'react';
import { useCachedData } from '../../utils/cache/useCachedData';
import { Lesson } from '../../utils/types';
import Tile from '../common/Tile';

import { addLesson } from '../../utils/server/serverCalls';
import AddTile from '../common/AddTile';

/**
 * Show the available lessons
 */
const Lessons: React.FC = () => {
    const lessons = useCachedData();

    const addNewLesson = (title: string): void => {
        addLesson(title);
    };

    return (
        <div className="lessons">
            <AddTile editable="lesson" addNew={addNewLesson}/>
            {
                lessons.map((elem: Lesson) => <Tile title={elem.title} key={elem._id} />)
            }
        </div>
    );
};

export default Lessons;
