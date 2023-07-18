import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import App from './App';
import { AlertProvider } from './context/alertContext';
import Alert from './components/Alert';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AlertProvider>
        <Alert />
        <App />
    </AlertProvider>
);

