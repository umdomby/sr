import './App.css';
import {observer} from "mobx-react-lite";

//import Dictaphone33 from "./components/Dictaphone33";
//import CameraFaceDetect from "./views/cameraFaceDetect";
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import styled from 'styled-components';
//import Main from './components/VideoChat/Main/Main';
//import Room from './components/VideoChat/Room/Room';
import React, {useEffect, useState} from "react";
// import Video from "./components/Video/Video";
//import WebSocketProject from "./components/WebSocketProject";
//import ConnectWebSocket from "./components/ConnectWebSocket";
import 'react-rangeslider/lib/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonControl from "./ButtonControl"

import {Outlet, Link, useLocation, NavLink } from "react-router-dom";


const App = observer(() => {

    // useEffect(()=>{
    //     WebSocketProject('123')
    // },[])

    // const [state, setState] = useState('');
    // const handler = (event) => {
    //     // changing the state to the name of the key
    //     // which is pressed
    //     // setState(event.key);
    //     console.log(event.key);
    // };

    function QueryNavLink({ to, ...props }) {
        let location = useLocation();
        return <NavLink to={to + location.search} {...props} />;
    }

    return (
         <div className="App">
        {/*<div>*/}

             {/*<Video/>*/}
             <Link to="/">Home</Link> |{" "}
             <Link to="/production">Production</Link>|{" "}
             <Link to="/video">Control</Link>



            <Outlet />

            {/*    /!*<CameraFaceDetect/>*!/*/}
            {/*    /!*<Dictaphone33/>*!/*/}
            {/*    /!*<BrowserRouter>*!/*/}
            {/*    /!*    <AppContainer>*!/*/}
            {/*    /!*        <Switch>*!/*/}
            {/*    /!*            <Route exact path="/" component={Main} />*!/*/}
            {/*    /!*            <Route exact path="/room/:roomId" component={Room} />*!/*/}
            {/*    /!*        </Switch>*!/*/}
            {/*    /!*    </AppContainer>*!/*/}
            {/*    /!*</BrowserRouter>*!/*/}
            {/*</div>*/}

        </div>
    );
});

export default App;

