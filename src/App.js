import './App.css';
import {observer} from "mobx-react-lite";

// import Main from './components/VideoChat/Main/Main';
// import Room from './components/VideoChat/Room/Room';
import React, {useEffect} from "react";
import Demonstration from "./components/Joy/Demonstration"
import Video from "./components/Video/Video";
import WebSocketProject from "./components/WebSocketProject";

import SliderUpDown from "./components/SliderUpDown"
import SliderLeftRight from "./components/SliderLeftRight"
import 'react-rangeslider/lib/index.css'

const App = observer(() => {

    useEffect(()=>{
        WebSocketProject('123')
    },[])

    return (
        <div className="App">
            <div>
                <Video/>
            </div>
            <div className="Joy">
                <Demonstration />
            </div>
            <div>
                <SliderUpDown/>
            </div>
            <div className="SliderLeftRight">
                <SliderLeftRight/>
            </div>
            <div>
                {/*<CameraFaceDetect/>*/}

                {/*<Dictaphone33/>*/}
                {/*<BrowserRouter>*/}
                {/*    <AppContainer>*/}
                {/*        <Switch>*/}
                {/*            <Route exact path="/" component={Main} />*/}
                {/*            <Route exact path="/room/:roomId" component={Room} />*/}
                {/*        </Switch>*/}
                {/*    </AppContainer>*/}
                {/*</BrowserRouter>*/}
            </div>
        </div>
    );
});

export default App;

