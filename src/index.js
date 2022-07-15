// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// //import DeviceStore from "./store/DeviceStore";
// //export const Context = createContext(null)
// //import 'bootstrap/dist/css/bootstrap.min.css';
//
// ReactDOM.render(
//     // <Context.Provider value={{
//     //     device: new DeviceStore()
//     // }}>
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     // </Context.Provider>,
//     document.getElementById('root')
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import DeviceStore from "./store/DeviceStore";
//export const Context = createContext(null)
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Video from "./components/Video/Video";
import Production from "./Pages/Production";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                {/*    <Route path="/" element={<App />} />*/}
                    <Route path="video" element={<Video/>} />
                    <Route path="production" element={<Production />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

