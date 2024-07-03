<template>
    <input type="text" v-model="message" @keyup.enter="sendMessage">
</template>
<script>
import {sendNotification,socket,CredentialManager} from "./../../globals"
export default {
    data() {
        return {
            message: ''
        }
    },
    methods: {
        sendMessage() {
            socket.emit('message', this.message)
            this.message = ''
        }
    },
    mounted() {
        socket.join("server")
        socket.on('message', (data) => {
            sendNotification(data)
        })
    }
}
</script>