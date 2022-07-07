import store from "../store/DeviceStore"

export const messageLR = (x, y) => {
    store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messagesLR',
        messageL: x,
        messageR: y,
        accel: 1,
        stop: 0
    }))
}
