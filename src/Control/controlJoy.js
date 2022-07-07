import store from "../store/DeviceStore"

export const ControlJoy = (x, y) => {
    store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messages',
        messageL: x,
        messageR: y,
        accel: 1,
        stop: 0
    }))
}




