import {observer} from "mobx-react-lite";
import React from "react";
import 'react-rangeslider/lib/index.css';
import {Col, Container, Row} from "react-bootstrap";
import Demonstration from "./components/Joy/Demonstration"
//import {ControlSliderUpDown} from "./Control/controlJoy/ControlSliderUpDown";
import store from "./store/DeviceStore"
//import SliderUpDown from "./components/SliderUpDown"
import {SliderUpDown} from "./Control/sliderUpDown";
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
        // if(String(key) == 'w' || String(key) == 'W') {
        //     console.log('w key pressed!');
        // }

        if(String(key) == 'w' || String(key) == 'W' || String(key) == 'ц' || String(key) == 'Ц') {
            if(store.sliderUpDown < 117) {
                store.setSliderUpDown(store.sliderUpDown + 3)
                SliderUpDown(store.sliderUpDown)
                //setState(state + 1)
                //SliderUpDown(store.sliderUpDown)
            }
            console.log('CMD DOWN: WWWWW ' + store.sliderUpDown);
        }
        if(String(key) == 's' || String(key) == 'S' || String(key) == 'ы' || String(key) == 'Ы'){
            if(store.sliderUpDown > 0) {
                store.setSliderUpDown(store.sliderUpDown - 3)
                SliderUpDown(store.sliderUpDown)
            }
            console.log('CMD DOWN: WWWWW ' + store.sliderUpDown);
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
        store.setSliderUpDown(Number(value))
        console.log('SliderUPDown ' + store.sliderUpDown)
        SliderUpDown(Number(value))
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
                            value={store.sliderUpDown}
                            className="form-range"
                            onChange={(event) => {
                                //localStorage.setItem('localSpeedStateUD', event.target.value)
                                handleChange(event.target.value)
                            }}
                            id="customRange1">
                        </ input>
                        {store.sliderUpDown}
                    </Col>
                    <Col>
                        {/*<div className="Joy">*/}
                            <Demonstration/>
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

