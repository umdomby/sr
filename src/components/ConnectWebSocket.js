import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import WebSocketProject from "./WebSocketProject";
import store from "../store/DeviceStore"

const ConnectWebSocket = observer(() => {

    const [idSocket, setIdSocket] = useState(localStorage.getItem('localIdSocket') || '')

    useEffect(()=>{
        if( localStorage.getItem('localIdSocket') === null || localStorage.getItem('localIdSocket') === undefined) {
            //localStorage.setItem('localIdSocket', pass_gen())
            localStorage.setItem('localIdSocket', '123')
        }
        setIdSocket(localStorage.getItem('localIdSocket') || '')
        store.setIdSocket(idSocket)
        connectID(idSocket)
    },[idSocket])

    const connectID = () => {
        WebSocketProject(idSocket)
    }

    return (
        <div className="App">
            <div>
                <input type='text'
                       disabled={false}
                       style={{backgroundColor: '#D3D3D3', textAlign: 'center', borderWidth: 1, width: 120, fontSize: 16, marginTop: 4, marginRight: 5}}
                       value={idSocket}
                       onChange={(event) => {
                           localStorage.setItem('localIdSocket', event.target.value)
                           setIdSocket(event.target.value)
                           store.setIdSocket(event.target.value)
                       }}
                />
            </div>
            {/*<div>*/}
            {/*    <button onClick={connectID}>Connect</button>*/}
            {/*</div>*/}
        </div>
    );
});

export default ConnectWebSocket;

