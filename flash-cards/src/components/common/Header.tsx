import React from 'react';
import { matchPath, useLocation, useParams } from 'react-router';
import { URLParams } from '../../utils/types';

const Header: React.FC = () => {
    const params: string = useLocation()?.pathname;
    const displayParams: string[] = params.split("/").splice(1);

    return (
        <header>
            {/* {displayParams.map(e => e)} */}
            <a href="">eeef</a>
        </header>
    );
};

export default Header;
