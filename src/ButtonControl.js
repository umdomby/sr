import {observer} from "mobx-react-lite";
import React from "react";
import 'react-rangeslider/lib/index.css';
import {Col, Container, Row} from "react-bootstrap";
import Demonstration from "./components/Joy/Demonstration"
//import {ControlSliderUpDown} from "./Control/controlJoy/ControlSliderUpDown";
import store from "./store/DeviceStore"
//import messageL from "./components/messageL"
import {messageL} from "./Control/messageL";
import {messageR} from "./Control/messageR";
import useEventListener from '@use-it/event-listener'

const ButtonControl = observer(() => {

    // const [state, setState] = useState(0);
    // const inputEl = useRef(0);
    // const handler = (event) => {
    //     // changing the state to the name of the key
    //     // which is pressed
    //     // setState(event.key);
    //     // console.log(event.key);
    // };

    function handler({ key }) {
        //console.log(String(key));
        if(String(key) == 'w' || String(key) == 'W' || String(key) == 'ц' || String(key) == 'Ц') {
            if(store.messageL < 117) {
                store.setMessageL(store.messageL + 3)
                store.setMessageR(store.messageR + 3)
                messageL(store.messageL)
                messageR(store.messageR)
            }
            console.log('CMD DOWN: WWWWW ' + store.messageL);
        }
        if(String(key) == 's' || String(key) == 'S' || String(key) == 'ы' || String(key) == 'Ы'){
            if(store.messageR > 0) {
                store.setMessageL(store.messageL - 3)
                store.setMessageR(store.messageR - 3)
                messageL(store.messageL)
                messageR(store.messageR)
            }
            console.log('CMD DOWN: WWWWW ' + store.messageR);
        }
    }
    useEventListener('keydown', handler);

    // window.addEventListener('keydown', function(event) {
    // document.body.addEventListener('keypress', function(event) {
    //     console.log('CMD DOWN: ' + event.key);
    // });

    //ButtonSliderUpDown(movement.x, movement.y)

    const handleChangeMessageL = (value) => {
        //setState(value)
        store.setMessageL(Number(value))
        console.log('SliderUPDown ' + store.messageL)
        messageL(Number(value))
    }
    const handleChangeMessageR = (value) => {
        //setState(value)
        store.setMessageR(Number(value))
        console.log('SliderUPDown ' + store.messageR)
        messageR(Number(value))
    }

    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <input
                            type="range"
                            min="0"
                            max="120"
                            value={store.messageL}
                            className="form-range"
                            onChange={(event) => {
                                //localStorage.setItem('localSpeedStateUD', event.target.value)
                                handleChangeMessageL(event.target.value)
                            }}
                            id="customRange1">
                        </ input>
                        {store.messageL}

                        <input
                            type="range"
                            min="0"
                            max="120"
                            value={store.messageR}
                            className="form-range"
                            onChange={(event) => {
                                //localStorage.setItem('localSpeedStateUD', event.target.value)
                                handleChangeMessageR(event.target.value)
                            }}
                            id="customRange1">
                        </ input>
                        {store.messageL}
                    </Col>
                    <Col>
                        {/*<div className="Joy">*/}
                        {/*    <Demonstration/>*/}
                            {/*<input style={{width:'20%', backgroundColor:'black'}} type="text" value="" onKeyPress={(e) => handler(e)} />*/}
                        {/*</div>*/}
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default ButtonControl;

