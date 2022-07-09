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

    function handlerUP({ key }) {

        if(String(key) === 'Shift') {
            console.log('Shift')
            store.setMessageFBL(!store.messageFBL)
            store.setMessageFBR(!store.messageFBR)

            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'messagesFBL',
                messageFBL: store.messageFBL
            }))
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'messagesFBR',
                messageFBR: store.messageFBR
            }))

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
            if(store.messageL < 117 && store.messageR < 117) {
                store.setMessageL(store.messageL + 3)
                store.setMessageR(store.messageR + 3)
                messageL(store.messageL)
                messageR(store.messageR)
            }
            console.log('CMD DOWN: WWWWW ' + store.messageL);
        }
        if(String(key) === 's' || String(key) === 'S' || String(key) === 'ы' || String(key) === 'Ы'){
            if(store.messageR > 2 && store.messageR > 2) {
                store.setMessageL(store.messageL - 3)
                store.setMessageR(store.messageR - 3)
                messageL(store.messageL)
                messageR(store.messageR)
            }
            console.log('CMD DOWN: WWWWW ' + store.messageR);
        }

        if(String(key) === 'a' || String(key) === 'A' || String(key) === 'ф' || String(key) === 'Ф') {

            if(store.messageR < store.messageL && store.messageL <= 120){
                store.setMessageR(store.messageR + 3)
                messageR(store.messageR)
            }
            else if(store.messageR > store.messageL){
                store.setMessageL(store.messageL - 3)
                messageL(store.messageL)
            }
            else if(store.messageR == store.messageL){
                store.setMessageL(store.messageL - 3)
                messageL(store.messageL)
            }

            console.log('CMD DOWN: WWWWW ' + store.messageL);
        }
        if(String(key) === 'd' || String(key) === 'D' || String(key) === 'в' || String(key) === 'В'){
            if(store.messageL < store.messageR && store.messageR <= 120){
                store.setMessageL(store.messageL + 3)
                messageL(store.messageL)
            }
            else if(store.messageL > store.messageR){
                store.setMessageR(store.messageR - 3)
                messageR(store.messageR)
            }

            else if(store.messageR === store.messageL){
                store.setMessageR(store.messageR - 3)
                messageR(store.messageR)
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
                        <label>Вперёд</label>
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
                        {store.messageR}
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

