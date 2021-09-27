import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchCards, fetchCategories } from '../../utils/store/redux';

/**
 * Header
 * Progressively show the current page, as the user browses 
 */
const Header: React.FC = () => {
    const params: string = useLocation()?.pathname;
    const displayParams: string[] = params === "/" ? [""] : params.split("/");

    const dispatch = useDispatch();

    useEffect(() => {
        if (displayParams[1]){
            const lesson: string = displayParams[1];
            dispatch(fetchCategories({lesson}));
        }
        if (displayParams[2]){
            const lesson: string = displayParams[1];
            const category: string = displayParams[2];
            dispatch(fetchCards({lesson, category}));

        }
    }, [displayParams]);

    return (
        <header>
            {displayParams.map((elem, index) => {
                if (elem === ""){
                    return <Link key={index} to={`/`}>Lessons</Link>;
                }
                const route = displayParams.slice(0, index + 1).reduce((acc, elem) => `${acc}/${elem}`);
                return <Link key={index} to={route}>{elem}</Link>;
            })}
        </header>
    );
};

export default Header;
