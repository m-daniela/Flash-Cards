import React, { useState } from 'react';
import { useCachedData } from '../../utils/cache/useCachedData';
import { Lesson } from '../../utils/types';
import Tile from '../common/Tile';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { addLesson } from '../../utils/server/serverCalls';

/**
 * Show the available lessons
 * @TODO add new lesson
 */
const Lessons: React.FC = () => {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState("");
    const lessons = useCachedData();

    const addNewLesson = (): void => {
        addLesson(title);
    };

    return (
        <div className="lessons">
            <div className="tile" >
                {
                    edit ? 
                        <>
                            <EditRoundedIcon onClick={() => addNewLesson()}/>
                            <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Your entry..."/> 
                            <CloseRoundedIcon onClick={() => setEdit(false)}/>
                        </>
                        :
                        <span onClick={() => setEdit(true)}>add lesson</span>
                }
                
            </div>
            {
                lessons.map((elem: Lesson) => <Tile title={elem.title} key={elem._id} />)
            }
        </div>
    );
};

export default Lessons;
