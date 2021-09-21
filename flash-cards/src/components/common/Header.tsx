import React from 'react';
import { useParams } from 'react-router';
import { URLParams } from '../../utils/types';

const Header: React.FC = () => {
    const params: URLParams = useParams();
    console.log(params);
    return (
        <header>
            <a href="">eeef</a>
        </header>
    );
};

export default Header;
