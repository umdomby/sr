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
import ConnectWebSocket from "./components/ConnectWebSocket";

const ButtonControl = observer(() => {

    // const [state, setState] = useState(0);
    // const inputEl = useRef(0);
    // const handler = (event) => {
    //     // changing the state to the name of the key
    //     // which is pressed
    //     // setState(event.key);
    //     // console.log(event.key);
    // };
    const speed = 10

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

    function Stop(){
        store.setMessageL(0)
        store.setMessageR(0)
        messageL(0)
        messageR(0)
    }

    function handlerUP({ key }) {

        if(String(key) === 'Shift') {
            Stop()
            store.setReversal(!store.reversal)
            console.log('Shift ' + store.reversal)
            // FBL(!store.messageFBL)
            // FBR(!store.messageFBR)
            // console.log('messageFBL ' + store.messageFBL)
            // console.log('messageFBR ' + store.messageFBR)
        }

        if(String(key) === ' ') {
            Stop()
            console.log('Space UP')
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'messagesStop',
                messageStop: true
            }))
        }

        if(String(key) === 'Escape') {
            Stop()
            store.setMessageOnOff(true)
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'messagesOnOff',
                messageOnOff: store.messageOnOff
            }))
            console.log('messageOnOff ' + store.messageOnOff)
        }

        if(String(key) === 'Enter') {
            Stop()
            store.setMessageOnOff(false)
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
            if (store.reversal == false) {
                if (store.messageL > 0) {
                    FBL(true)
                    console.log('messageFBL ' + store.messageFBL)
                }
                if (store.messageR > 0) {
                    FBR(true)
                    console.log('messageFBR ' + store.messageFBR)
                }
                if (store.messageL < speed && store.messageR < speed) {
                    store.setMessageL(store.messageL + 1)
                    store.setMessageR(store.messageR + 1)
                    messageL(store.messageL)
                    messageR(store.messageR)
                }
                console.log('CMD DOWN: WWWWW ' + store.messageL);
            }
        }
        if(String(key) === 's' || String(key) === 'S' || String(key) === 'ы' || String(key) === 'Ы'){
            if(store.reversal == false) {
                if (store.messageL < 0) {
                    FBL(false)
                    console.log('messageFBL ' + store.messageFBL)
                }
                if (store.messageR < 0) {
                    FBR(false)
                    console.log('messageFBR ' + store.messageFBR)
                }
                if (store.messageL > -speed) {
                    store.setMessageL(store.messageL - 1)
                    store.setMessageR(store.messageR - 1)
                }
                messageL(store.messageL)
                messageR(store.messageR)
            }
        }

        if(String(key) === 'a' || String(key) === 'A' || String(key) === 'ф' || String(key) === 'Ф') {
            if(store.reversal == false) {
                if (store.messageR > 0 && store.messageL > 0) {
                    if (store.messageR < store.messageL && store.messageL <= speed) {
                        store.setMessageR(store.messageR + 1)
                        messageR(store.messageR)
                    } else if (store.messageR > store.messageL) {
                        store.setMessageL(store.messageL - 1)
                        messageL(store.messageL)
                    }
                    if (store.messageR == store.messageL) {
                        store.setMessageL(store.messageL - 1)
                        messageL(store.messageL)
                    }
                } else if (store.messageR < 0 && store.messageL < 0) {
                    if (store.messageR > store.messageL && store.messageL <= speed) {
                        store.setMessageR(store.messageR - 1)
                        messageR(store.messageR)
                    } else if (store.messageR < store.messageL) {
                        store.setMessageL(store.messageL + 1)
                        messageL(store.messageL)
                    } else if (store.messageR == store.messageL) {
                        store.setMessageL(store.messageL + 1)
                        messageL(store.messageL)
                    }
                } else if (store.messageR == 0 && store.messageL > 0) {
                    store.setMessageR(store.messageR + 1)
                    messageR(store.messageR)
                } else if (store.messageR == 0 && store.messageL < 0) {
                    store.setMessageR(store.messageR - 1)
                    messageR(store.messageR)
                }
            }
            else if(store.reversal == true){
                if(store.messageL < 0 && store.messageR > 0){
                    FBL(true)
                    FBR(false)
                }
                if (store.messageL > -speed && store.messageR < speed) {
                    store.setMessageR(store.messageR + 1)
                    messageR(store.messageR)
                    store.setMessageL(store.messageL - 1)
                    messageL(store.messageL)
                }
            }

            console.log('CMD DOWN: WWWWW ' + store.messageL);
        }
        if(String(key) === 'd' || String(key) === 'D' || String(key) === 'в' || String(key) === 'В'){
            if(store.reversal == false) {
                if (store.messageR > 0 && store.messageL > 0) {
                    if (store.messageL < store.messageR && store.messageR <= speed) {
                        store.setMessageL(store.messageL + 1)
                        messageL(store.messageL)
                    } else if (store.messageL > store.messageR) {
                        store.setMessageR(store.messageR - 1)
                        messageR(store.messageR)
                    } else if (store.messageR === store.messageL) {
                        store.setMessageR(store.messageR - 1)
                        messageR(store.messageR)
                    }
                } else if (store.messageR < 0 && store.messageL < 0) {
                    if (store.messageL > store.messageR && store.messageR <= speed) {
                        store.setMessageL(store.messageL - 1)
                        messageL(store.messageL)
                    } else if (store.messageL < store.messageR) {
                        store.setMessageR(store.messageR + 1)
                        messageR(store.messageR)
                    } else if (store.messageR === store.messageL) {
                        store.setMessageR(store.messageR + 1)
                        messageR(store.messageR)
                    }
                } else if (store.messageL == 0 && store.messageR > 0) {
                    store.setMessageL(store.messageL + 1)
                    messageL(store.messageL)
                } else if (store.messageL == 0 && store.messageR < 0) {
                    store.setMessageL(store.messageL - 1)
                    messageL(store.messageL)
                }
            }
            else if(store.reversal == true){
                if(store.messageL > 0 && store.messageR < 0) {
                    FBL(false)
                    FBR(true)
                }
                if (store.messageR > -speed && store.messageL < speed) {
                    store.setMessageR(store.messageR - 1)
                    messageR(store.messageR)
                    store.setMessageL(store.messageL + 1)
                    messageL(store.messageL)
                }
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
        <div className="App" >
            <Container>
                <Row>
                    <Col>
                        <div>ON: "Enter" </div>
                        <div>OFF: "Escape" </div>
                        <div>Тормоз: "Space"</div>
                        <div>Разворот или прямая: "Shift"</div>
                        <div>Управление: "w  s  a  d"</div>
                    </Col>
                    <Col>
                        <div>{ store.arduinoFBL !== null ?
                            store.arduinoFBL ? 'вперед ' : 'назад '
                            :
                            '...'
                        }{store.messageL} {store.reversal ? ' разворот' : ''}</div>
                        <input
                            type="range"
                            min={-speed}
                            max={speed}
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
                            min={-speed}
                            max={speed}
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
                            '...'
                        }{store.messageR}{store.reversal ? ' разворот' : ''}</div>
                        <div>{ store.arduinoOnOff !== null ?
                            store.arduinoOnOff ? 'OFF ' : 'ON '
                            :
                            '...'}</div>
                        {/*<div className="Joy">*/}
                        {/*    <Demonstration/>*/}
                            {/*<input style={{width:'20%', backgroundColor:'black'}} type="text" value="" onKeyPress={(e) => handler(e)} />*/}
                        {/*</div>*/}
                    </Col>
                    <Col>
                        <div>
                            <ConnectWebSocket/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default ButtonControl;

