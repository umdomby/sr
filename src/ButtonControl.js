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

    const FBL = (FBL) => {
        //store.setMessageFBL(FBL)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'messagesFBL',
            messageFBL: FBL
        }))
    }
    const FBR = (FBR) => {
        //store.setMessageFBR(FBR)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'messagesFBR',
            messageFBR: FBR
        }))
    }

    function handlerUP({ key }) {

        if(String(key) === 'Shift') {
            console.log('Shift')
            FBL(!store.messageFBL)
            FBR(!store.messageFBR)
            console.log('messageFBL ' + store.messageFBL)
            console.log('messageFBR ' + store.messageFBR)
        }

        if(String(key) === ' ') {
            console.log('Space UP')
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'messagesStop',
                messageStop: true
            }))
            store.setMessageL(0)
            store.setMessageR(0)
            messageL(0)
            messageR(0)
        }

        if(String(key) === 'Escape') {
            store.setMessageOnOff(!store.messageOnOff)
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'messagesOnOff',
                messageOnOff: store.messageOnOff
            }))
            console.log('messageOnOff ' + store.messageOnOff)
        }
    }

    function handlerDOWN({ key }) {
        console.log(String(key));

        if(String(key) === ' ') {
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'messagesStop',
                messageStop: false
            }))
        }

        if(String(key) === 'w' || String(key) === 'W' || String(key) === 'ц' || String(key) === 'Ц') {
            if(store.messageL > 0){
                FBL(true)
                console.log('messageFBL ' + store.messageFBL)
            }
            if(store.messageR > 0){
                FBR(true)
                console.log('messageFBR ' + store.messageFBR)
            }
            if(store.messageL < 117 && store.messageR < 117) {
                store.setMessageL(store.messageL + 3)
                store.setMessageR(store.messageR + 3)
                messageL(store.messageL)
                messageR(store.messageR)
            }
            console.log('CMD DOWN: WWWWW ' + store.messageL);
        }
        if(String(key) === 's' || String(key) === 'S' || String(key) === 'ы' || String(key) === 'Ы'){
            //if(store.messageR > 2 && store.messageR > 2) {

            if(store.messageL < 0){
                FBL(false)
                console.log('messageFBL ' + store.messageFBL)
            }
            if(store.messageR < 0){
                FBR(false)
                console.log('messageFBR ' + store.messageFBR)
            }
            if(store.messageL > -117) {
                store.setMessageL(store.messageL - 3)
                store.setMessageR(store.messageR - 3)
            }
            messageL(store.messageL)
            messageR(store.messageR)
            //}
            //console.log('CMD DOWN: WWWWW ' + store.messageR);
        }

        if(String(key) === 'a' || String(key) === 'A' || String(key) === 'ф' || String(key) === 'Ф') {
            if(store.messageR > 0 && store.messageL > 0) {
                if (store.messageR < store.messageL && store.messageL <= 117) {
                    store.setMessageR(store.messageR + 3)
                    messageR(store.messageR)
                } else if (store.messageR > store.messageL) {
                    store.setMessageL(store.messageL - 3)
                    messageL(store.messageL)
                }
                if(store.messageR == store.messageL) {
                    store.setMessageL(store.messageL - 3)
                    messageL(store.messageL)
                }
            }
            else if(store.messageR < 0 && store.messageL < 0){
                if (store.messageR > store.messageL && store.messageL <= 117) {
                    store.setMessageR(store.messageR - 3)
                    messageR(store.messageR)
                } else if (store.messageR < store.messageL) {
                    store.setMessageL(store.messageL + 3)
                    messageL(store.messageL)
                } else if (store.messageR == store.messageL) {
                    store.setMessageL(store.messageL + 3)
                    messageL(store.messageL)
                }
            }
            else if(store.messageR == 0 && store.messageL > 0) {
                store.setMessageR(store.messageR + 3)
                messageR(store.messageR)
            }
            else if(store.messageR == 0 && store.messageL < 0) {
                store.setMessageR(store.messageR - 3)
                messageR(store.messageR)
            }

            console.log('CMD DOWN: WWWWW ' + store.messageL);
        }
        if(String(key) === 'd' || String(key) === 'D' || String(key) === 'в' || String(key) === 'В'){
            if(store.messageR > 0 && store.messageL > 0) {
                if (store.messageL < store.messageR && store.messageR <= 117) {
                    store.setMessageL(store.messageL + 3)
                    messageL(store.messageL)
                } else if (store.messageL > store.messageR) {
                    store.setMessageR(store.messageR - 3)
                    messageR(store.messageR)
                } else if (store.messageR === store.messageL) {
                    store.setMessageR(store.messageR - 3)
                    messageR(store.messageR)
                }
            }
            else if(store.messageR < 0 && store.messageL < 0) {
                if (store.messageL > store.messageR && store.messageR <= 117) {
                    store.setMessageL(store.messageL - 3)
                    messageL(store.messageL)
                } else if (store.messageL < store.messageR) {
                    store.setMessageR(store.messageR + 3)
                    messageR(store.messageR)
                } else if (store.messageR === store.messageL) {
                    store.setMessageR(store.messageR + 3)
                    messageR(store.messageR)
                }
            }
            else if(store.messageL == 0 && store.messageR > 0) {
                store.setMessageL(store.messageL + 3)
                messageL(store.messageL)
            }
            else if(store.messageL == 0 && store.messageR < 0) {
                store.setMessageL(store.messageL - 3)
                messageL(store.messageL)
            }
            console.log('CMD DOWN: WWWWW ' + store.messageR);
        }
    }
    useEventListener('keydown', handlerDOWN);
    useEventListener('keyup', handlerUP);

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
                        <div>{ store.arduinoFBL !== null ?
                            store.arduinoFBL ? 'вперед ' : 'назад '
                            :
                            ''
                        }{store.messageL}</div>
                        <input
                            type="range"
                            min="-120"
                            max="120"
                            value={store.messageL}
                            className="form-range"
                            onChange={(event) => {
                                //localStorage.setItem('localSpeedStateUD', event.target.value)
                                handleChangeMessageL(event.target.value)
                            }}
                            id="customRange1">
                        </ input>


                        <input
                            type="range"
                            min="-120"
                            max="120"
                            value={store.messageR}
                            className="form-range"
                            onChange={(event) => {
                                //localStorage.setItem('localSpeedStateUD', event.target.value)
                                handleChangeMessageR(event.target.value)
                            }}
                            id="customRange1">
                        </ input>
                        <div>{ store.arduinoFBR !== null ?
                            store.arduinoFBR ? 'вперед ' : 'назад '
                            :
                            ''
                        }{store.messageR}</div>
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

