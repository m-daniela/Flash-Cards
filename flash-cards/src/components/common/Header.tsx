import React, {useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { clearCards, fetchCards, fetchCategories, selectCategory, selectLesson } from '../../utils/store/redux';

/**
 * Progressively show the current page, as the user browses 
 * Save the current lesson and category in the store
 */
const Header: React.FC = () => {
    const params: string = useLocation()?.pathname;
    const displayParams: string[] = params === "/" ? [""] : params.split("/");

    const dispatch = useDispatch();

    useEffect(() => {
        if (displayParams[1]){
            const lesson: string = displayParams[1];
            dispatch(selectLesson(lesson));
            dispatch(fetchCategories({lesson}));
        }
        if (displayParams[2]){
            const lesson: string = displayParams[1];
            const category: string = displayParams[2];
            dispatch(selectLesson(lesson));
            dispatch(selectCategory(category));
            dispatch(fetchCards({lesson, category}));
        }
        dispatch(clearCards());
    }, [displayParams]);

    return (
        <Navbar className="justify-content-center text-center p-0">
            {displayParams.map((elem, index) => {
                if (elem === ""){
                    return <Link key={index} to={`/`}>Lessons</Link>;
                }
                const route = displayParams.slice(0, index + 1).reduce((acc, elem) => `${acc}/${elem}`);
                return <Link key={index} to={route}>{elem}</Link>;
            })}
        </Navbar>
    );
};

export default Header;
