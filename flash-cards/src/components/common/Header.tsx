import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

/**
 * Header
 * Progressively show the current page, as the user browses 
 */
const Header: React.FC = () => {
    const params: string = useLocation()?.pathname;
    const displayParams: string[] = params === "/" ? [""] : params.split("/");
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
