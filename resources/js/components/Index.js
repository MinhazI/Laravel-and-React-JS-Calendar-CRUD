import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import AddHoliday from './AddHoliday';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import EditHoliday from './Edit';
import Search from './Search';
import SearchResults from './SearchResults';

function Index() {

    return (
        <Router>
            <div className="container">
                <Header />

                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/holiday/edit/:id" component={EditHoliday} />
                    <Route path="/holiday/search/" component={Search} />
                    <Route path="/holiday/search/results/:startdate/:enddate" component={SearchResults} />
                </Switch>

                <Footer />
            </div>
        </Router>
    );
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
