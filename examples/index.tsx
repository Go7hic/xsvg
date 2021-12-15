import React from 'react';
import ReactDOM from 'react-dom';
import { getRoutes } from './routes';

ReactDOM.render(<React.StrictMode>{getRoutes()}</React.StrictMode>, document.getElementById('root'));
