import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Card from './components/cards/Card';
import Categories from './components/categories/Categories';


import Header from './components/common/Header';
import Lessons from './components/lessons/Lessons';

import './style/main.scss';
import { routes } from './utils/constants';
import { fetchLessons } from './utils/store/redux';

const App: React.FC = () => {
    const dispatch = useDispatch();

    // get the lessons 
    useEffect(() => {
        dispatch(fetchLessons());
    }, []);
    
    return (
        <>
            <Router>
                <Header />

                <div className="container my-4 mx-auto justify-content-center" >
                
                    <Route exact path={routes.lessons}>
                        <Lessons/>
                    </Route>
                    <Route exact path={routes.categories}>
                        <Categories/>
                    </Route>
                    <Route exact path={routes.card}>
                        <Card/>
                    </Route>
                
                </div>
            </Router>
        </>
    );
};

export default App;
