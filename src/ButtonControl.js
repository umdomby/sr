import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import SliderUpDown from "./components/SliderUpDown";
import SliderLeftRight from "./components/SliderLeftRight";
import SliderReversal from "./components/SliderReversal";
import 'react-rangeslider/lib/index.css';
import {Col, Container, Row} from "react-bootstrap";
import Demonstration from "./components/Joy/Demonstration"
//import {ControlSliderUpDown} from "./Control/controlJoy/ControlSliderUpDown";
const ButtonControl = observer(() => {

    //const [state, setState] = useState('');
    const handler = (event) => {
        // changing the state to the name of the key
        // which is pressed
        // setState(event.key);
        console.log(event.key);
    };

    window.addEventListener('keypress', function(event) {
        console.log('CMD DOWN: ' + event.key);
    });

    // document.body.addEventListener('keypress', function(event) {
    //     console.log('CMD DOWN: ' + event.key);
    // });

    // window.addEventListener("keyup", log);
    // window.addEventListener("keypress", log);
    // window.addEventListener("keydown", log);
    //
    // function log(event){
    //     console.log( event.type );
    // }

    //ButtonSliderUpDown(movement.x, movement.y)

    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <SliderUpDown/>
                    </Col>
                    <Col>
                        <div className="Joy">
                            <Demonstration/>
                            {/*<input style={{width:'20%', backgroundColor:'black'}} type="text" value="" onKeyPress={(e) => handler(e)} />*/}
                        </div>
                    </Col>
                    <Col>
                        <div style={{ marginTop: '10%' }}>
                            <SliderLeftRight/>
                        </div>
                        <div style={{ marginTop: '20%' }}>
                            <SliderReversal/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default ButtonControl;

