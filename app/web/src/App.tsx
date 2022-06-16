import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './assets/styles/global';
import AppProvider from './hooks';

import Routes from './routes';
const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <AppProvider>
                    <Routes />
                </AppProvider>
            </BrowserRouter>
            <GlobalStyle />
        </>
    );
};

export default App;
