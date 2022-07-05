import store from "../store/DeviceStore"

export const SliderUpDown = (y) => {
    store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messagesY',
        //messageX: x,
        messageY: y,
        accel: 1,
        stop: 0
    }))
}
