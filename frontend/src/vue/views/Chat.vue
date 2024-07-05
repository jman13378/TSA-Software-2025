<template>
    <input type="text" v-model="message" @keyup.enter="sendMessage">
</template>
<script>
import {sendNotification,socket,CredentialManager, playSound} from "./../../globals"
export default {
    data() {
        return {
            message: ''
        }
    },
    methods: {
        sendMessage() {
            socket.join("lmao")
console.log("sending message")
            socket.emit('send message', this.message)
            this.message = ''
        }
    },
    mounted() {
        socket.on('receive message', (data) => {
            sendNotification("lmao loller",data.message)
            console.log("received message")
            playSound();
        })
    }
}
</script>