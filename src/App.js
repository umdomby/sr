import './App.css';
import {observer} from "mobx-react-lite";
//import Dictaphone33 from "./components/Dictaphone33";
//import CameraFaceDetect from "./views/cameraFaceDetect";

//import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import styled from 'styled-components';
// import Main from './components/VideoChat/Main/Main';
// import Room from './components/VideoChat/Room/Room';
import React, {useEffect, useState} from "react";
import Video from "./components/Video/Video";
import WebSocketProject from "./components/WebSocketProject";

import SliderUpDown from "./components/SliderUpDown";
import SliderLeftRight from "./components/SliderLeftRight";
import SliderReversal from "./components/SliderReversal";
import 'react-rangeslider/lib/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";
import ButtonControl from "./ButtonControl"
const App = observer(() => {

    useEffect(()=>{
        WebSocketProject('123')
    },[])

    // const [state, setState] = useState('');
    const handler = (event) => {
        // changing the state to the name of the key
        // which is pressed
        // setState(event.key);
        console.log(event.key);
    };

    return (
        <div className="App">
            <div>
                <Video/>
            </div>
            <ButtonControl/>
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

