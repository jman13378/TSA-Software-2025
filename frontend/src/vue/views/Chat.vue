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
            socket.join("lmao")

            socket.emit('send message', this.message)
            this.message = ''
        }
    },
    mounted() {
        socket.on('receive message', (data) => {
            sendNotification("lmao loller",data.message)
        })
    }
}
</script>