import store from "../store/DeviceStore"

export const ControlJoy = (x, y) => {
    store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messages',
        messageX: x,
        messageY: y,
        accel: 1,
        stop: 0
    }))
}




