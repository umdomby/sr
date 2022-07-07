import store from "../store/DeviceStore"

export const messageL = (L) => {
    store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messagesL',
        messageL: L,
        messageR: store.messageR,
        accel: 1,
        stop: 0
    }))
}
