import React from 'react';
import { useCachedData } from '../../utils/cache/useCachedData';
import { Lesson } from '../../utils/types';
import Tile from '../common/Tile';

import { addLesson } from '../../utils/server/serverCalls';
import EditableTile from '../common/EditableTile';

/**
 * Show the available lessons
 * @TODO add new lesson
 */
const Lessons: React.FC = () => {
    const lessons = useCachedData();

    const addNewLesson = (title: string): void => {
        addLesson(title);
    };

    return (
        <div className="lessons">
            <EditableTile editable="lesson" addNew={addNewLesson} />
            {
                lessons.map((elem: Lesson) => <Tile title={elem.title} key={elem._id} />)
            }
        </div>
    );
};

export default Lessons;
