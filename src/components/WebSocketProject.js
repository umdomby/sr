import store from "../store/DeviceStore"

const WebSocketProject = (id) => {

    try {
        if (store.webSocket.readyState !== store.webSocket.CLOSED && store.webSocket.readyState !== store.webSocket.CLOSING){
            store.webSocket.close()
        }
        //store.setWebSocket(new WebSocket('wss://servicerobot.pro:4433'))
        store.setWebSocket(new WebSocket('wss://umdom.by:4433'))

        store.webSocket.onopen = () => {
            store.webSocket.send(JSON.stringify({
                id: id,
                username: 'user',
                method: "connection",
            }))
        }
        store.webSocket.onmessage = (event) => {
            var s = event.data.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
            // remove non-printable and other non-valid JSON chars
            s = s.replace(/[\u0000-\u0019]+/g, "");
            let msg = JSON.parse(s)
            if (store.webSocket.readyState !== store.webSocket.CLOSED && store.webSocket.readyState !== store.webSocket.CLOSING) {
                switch (msg.method) {
                    case "connection":
                        console.log(`пользователь ${msg.id} присоединился`)
                        break
                    case "messagesL":
                        console.log("from arduino messageL " + msg.messageL)
                        break
                    case "messagesR":
                        console.log("from arduino messageR " + msg.messageR)
                        break
                    case "messagesOnOff":
                        console.log("from arduino messageOnOff " + msg.messageOnOff)
                        break
                    default:
                        console.log('default')
                }
            }
        }
    }catch (e) {
        console.log(e)
    }

    return ([])
}

export default WebSocketProject
