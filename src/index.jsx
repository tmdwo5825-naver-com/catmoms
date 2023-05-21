import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from "./companent/routes/RootLayout";
import MapShowAll from "./companent/MapShowAll";
import IntroPage from "./companent/IntroPage";

const router = createBrowserRouter([
    { path: '/', element: <RootLayout />, children : [
            { path : '/', element: <IntroPage /> },
            { path : '/3hours', element: <App /> },
            { path: '/show-all', element: <MapShowAll />}
        ]}


]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
