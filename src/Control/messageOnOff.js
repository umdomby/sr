import store from "../store/DeviceStore"

export const messageOnOff = (messageOnOff) => {
    store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messagesOnOff',
        messageOnOff: messageOnOff
    }))
}
