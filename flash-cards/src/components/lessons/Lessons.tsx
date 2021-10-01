import React from 'react';
import { useCachedData } from '../../utils/cache/useCachedData';
import { Lesson } from '../../utils/types';
import Tile from '../common/Tile';

import { addLesson } from '../../utils/server/serverCalls';
import AddTile from '../common/AddTile';

/**
 * Shows the available lessons
 * Adds a new one, if valid
 */
const Lessons: React.FC = () => {
    const lessons = useCachedData();

    // add lesson
    const addNewLesson = (lesson: string): void => {
        if(lesson){
            addLesson(lesson);
        }
    };

    return (
        <div className="lessons">
            <AddTile add={addNewLesson}/>
            {
                lessons.map((elem: Lesson) => <Tile title={elem.title} key={elem._id} />)
            }
        </div>
    );
};

export default Lessons;
