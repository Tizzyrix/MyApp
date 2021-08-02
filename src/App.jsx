import React, {ReactFragment} from 'react';
import './styles/main.scss';
import './styles/app.scss'

import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import PageMain from './components/main/PageMain'
import PageNews from './components/news/PageNews'
import Header from './components/Header'

const App = () => {
    return (
        <div className='wrapper'>
            <Router>
            <Header />
                <Switch>
                    <Route path='/' exact>
                        <PageMain />
                    </Route>
                    <Route path='/news'>
                        <PageNews />
                    </Route>
                    <Redirect to='/' />
                </Switch>
            </Router>
        </div>
    )
};

export default App;