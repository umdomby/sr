import {observer} from "mobx-react-lite";
import React from "react";
import 'react-rangeslider/lib/index.css';
import {Col, Container, Row} from "react-bootstrap";
import Demonstration from "./components/Joy/Demonstration"
//import {ControlSliderUpDown} from "./Control/controlJoy/ControlSliderUpDown";
import store from "./store/DeviceStore"
//import messageLR from "./components/messageLR"
import {messageLR} from "./Control/messageLR";
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
            if(store.messageLR < 117) {
                store.setMessageLR(store.messageLR + 3)
                messageLR(store.messageLR, store.messageLR)
            }
            console.log('CMD DOWN: WWWWW ' + store.messageLR);
        }
        if(String(key) == 's' || String(key) == 'S' || String(key) == 'ы' || String(key) == 'Ы'){
            if(store.messageLR > 0) {
                store.setMessageLR(store.messageLR - 3)
                messageLR(store.messageLR, store.messageLR)
            }
            console.log('CMD DOWN: WWWWW ' + store.messageLR);
        }
    }
    useEventListener('keydown', handler);

    // window.addEventListener('keydown', function(event) {
    // document.body.addEventListener('keypress', function(event) {
    //     console.log('CMD DOWN: ' + event.key);
    // });

    //ButtonSliderUpDown(movement.x, movement.y)

    const handleChange = (value) => {
        //setState(value)
        store.setMessageLR(Number(value))
        console.log('SliderUPDown ' + store.messageLR)
        messageLR(Number(value))
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
                            value={store.messageLR}
                            className="form-range"
                            onChange={(event) => {
                                //localStorage.setItem('localSpeedStateUD', event.target.value)
                                handleChange(event.target.value)
                            }}
                            id="customRange1">
                        </ input>
                        {store.messageLR}

                        <input
                            type="range"
                            min="0"
                            max="120"
                            value={store.messageLR}
                            className="form-range"
                            onChange={(event) => {
                                //localStorage.setItem('localSpeedStateUD', event.target.value)
                                handleChange(event.target.value)
                            }}
                            id="customRange1">
                        </ input>
                        {store.messageLR}
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

