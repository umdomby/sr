import store from "../store/DeviceStore"

export const messageR = (R) => {
    store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messagesR',
        messageR: R,
        accel: 1,
        stop: 0
    }))
}
