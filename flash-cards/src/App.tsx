import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Card from './components/cards/Card';
import Categories from './components/categories/Categories';


import Header from './components/common/Header';
import Lessons from './components/lessons/Lessons';

import './style/main.scss';
import { routes } from './utils/constants';

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Header />

                <div className="app">
                
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
