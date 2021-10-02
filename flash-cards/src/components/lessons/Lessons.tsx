import React from 'react';
import { Lesson } from '../../utils/types';
import Tile from '../common/Tile';

import { addLesson } from '../../utils/server/serverCalls';
import AddTile from '../common/AddTile';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { addLessonReducer } from '../../utils/store/redux';

/**
 * Shows the available lessons
 * Adds a new one, if valid
 */
const Lessons: React.FC = () => {
    const lessons = useSelector((state: RootStateOrAny) => state.lessons);
    const dispatch = useDispatch();

    // add lesson
    const addNewLesson = (lesson: string): void => {
        if(lesson){
            addLesson(lesson)
                .then(result => {
                    if (result) {
                        dispatch(addLessonReducer(result));
                    }
                })
                .catch(console.log);
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
