import React from 'react';
import { render } from 'react-dom';

// Import CSS
import Style from './styles/App.scss';

// Import Components
import { App, AppAuthenticated } from './store/App';
import SigninFacebook from './components/SigninFacebook/SigninFacebook';
import Logout from './components/Logout/Logout';
import Index from './store/Index/Index';
import AddListing from './store/AddListing/AddListing';
import Listing from './store/Listing/Listing';
import Map from './store/Map/Map';
import Profile from './store/Profile/Profile';
import AddImages from './components/ListingTemplate/components/AddImages';

// Import Router
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store/store';
import ReactGA from 'react-ga';
if (localStorage.getItem('test.ApiUrl' == null)) {
    ReactGA.initialize('UA-121445370-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
}

const router = (
    <Provider store={store}>
        <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
            <Route component={AppAuthenticated}>
                <Route path="/add(/:step)" component={AddListing} />
                <Route path="/profile" component={Profile} />
                <Route path="/listing/:listingSlug/images" component={AddImages} />
            </Route>
            <Route path="/" component={App}>
                <IndexRoute component={Index} />
                <Route path="/logout" component={Logout} />
                <Route path="/signin-facebook" component={SigninFacebook} />
                <Route path="/listing/:listingSlug" component={Listing} />
                <Route path="/:citySlug" component={Map} />
            </Route>
        </Router>
    </Provider>
)

render(router, document.getElementById('root'));
