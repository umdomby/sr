import React, { useEffect, useRef } from 'react';
import { Client, LocalStream } from 'ion-sdk-js';
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl';
import ButtonControl from "../../ButtonControl";

const Video = () => {
    const pubVideo = useRef();
    const subVideo = useRef();

    let isPub, client, signal;

    const config = {
        iceServers: [
            {
                urls: "stun:stun.l.google.com:19302",
            },
        ],
    };
    // http://localhost:8000/?publish=true
    const URL = new URLSearchParams(window.location.search).get("publish");
    console.log("url", URL);
    if (URL) {
        isPub = true;
    } else {
        isPub =false;
    }

    useEffect(() => {
        signal = new IonSFUJSONRPCSignal("wss://servicerobot.pro:4435/ws");
        client = new Client(signal, config);
        signal.onopen = () => client.join("test room");

        if (!isPub) {
            client.ontrack = (track, stream) => {
                console.log("got track: ", track.id, "for stream: ", stream.id);
                track.onunmute = () => {
                    subVideo.current.srcObject = stream;
                    subVideo.current.autoplay = true;
                    subVideo.current.muted = false;

                    stream.onremovetrack = () => {
                        subVideo.current.srcObject = null;
                    }
                }
            }
        }
    }, []);

    const start = (event) => {
        if (event) {
            LocalStream.getUserMedia({
                resolution: 'vga',
                audio: true,
                codec: "vp8"
            }).then((media) => {
                pubVideo.current.srcObject = media;
                pubVideo.current.autoplay = true;
                pubVideo.current.controls = true;
                pubVideo.current.muted = true;
                client.publish(media);
            }).catch(console.error);
        } else {
            LocalStream.getDisplayMedia({
                resolution: 'vga',
                video: true,
                audio: true,
                codec: "vp8"
            }).then((media) => {
                pubVideo.current.srcObject = media;
                pubVideo.current.autoplay = true;
                pubVideo.current.controls = true;
                pubVideo.current.muted = true;
                client.publish(media);
            }).catch(console.error);
        }
    }

    return (
        <div>
            {isPub ? (
                <div>
                    <header style={{marginBottom: "10px", marginTop: "10px"}}>
                        {/*<div>ion-sfu</div>*/}
                        {isPub ? (
                            <div className="absolute top-2 right-5">
                                <button id="bnt_pubcam" onClick={() => start(true)}>Publish Camera</button>
                                <button id="bnt_pubscreen" onClick={() => start(false)}>Publish Screen</button>
                            </div >
                        ) : null
                        }
                    </header>
                    <video id="pubVideo" className="bg-black" controls ref={pubVideo}></video>
                </div>
            ) : (
                <video autoPlay={true} id="subVideo" className="bg-black" controls ref={subVideo}></video>
            )}
            <ButtonControl/>
        </div>
    );
}

export default Video;
