import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './themes.css';
import './index.css';
import './layout.css';

function noop() {}
// console.log(import.meta.env.MODE);
if (import.meta.env.MODE !== "development") {
    console.log = noop;
    console.warn = noop;
    console.error = noop;
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
)
