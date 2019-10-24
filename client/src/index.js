import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import authReducer from './store/reducers/authReducer';
import postsReducer from './store/reducers/postsReducer';

const rootReducers = combineReducers( {
    
    posts: postsReducer,
    auth: authReducer
});

const store = createStore( rootReducers,  composeWithDevTools(applyMiddleware( thunk )) ); 

const app = ( 
    <Provider store={ store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'));


