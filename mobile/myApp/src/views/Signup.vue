<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>SignUp</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div class="login-logo">
                <img src="./../../resources/icon.png" alt="Ionic logo" style="border-radius: 100px;" />
                <p style="font-size: 30px;">Create an Account!</p>
            </div>

            <form novalidate @submit.prevent="onSignup">
                <ion-list style="border-radius: 10px;">
                    <ion-item>
                        <ion-input label="Email" labelPlacement="stacked" v-model="email" name="email" type="text"
                            :spellcheck="false" autocapitalize="off" required></ion-input>

                    </ion-item>

                    <ion-item>
                        <ion-input labelPlacement="stacked" label="Full Name" v-model="name" name="name" type="text"
                            required></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-select v-model="state" label="State" label-placement="stacked">
                            <ion-select-option v-for="(state, index) in stateIds" :value="states[index]">{{
                states[index]
            }}</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            <ion-input labelPlacement="stacked" label="Password" v-model="password" name="password"
                                type="text" required></ion-input>
                            <ion-input labelPlacement="stacked" label="Confirm Password" v-model="rePassword"
                                name="rePassword" type="text" required></ion-input></ion-label>
                    </ion-item>

                    <ion-item>
                        <ion-input labelPlacement="stacked" label="start" v-model="name" name="E" type="text"
                            required></ion-input>
                    </ion-item>
                    <ion-item> <ion-label>
                            <center>
                                <h1 style="align-self: center;">User Type</h1>
                            </center>
                            <p>
                                <ion-radio-group v-model="userType" value="stacked">
                                    <ion-radio value="advisor" label-placement="start">Advisor</ion-radio>
                                    <ion-radio value="student" label-placement="start">Student</ion-radio>
                                    <ion-radio value="parent" label-placement="start">Parent</ion-radio>

                                </ion-radio-group>
                            </p>
                        </ion-label>
                    </ion-item>
                    <ion-item v-if="userType=='student'"> <ion-label>
                            <center>
                                <h1 style="align-self: center;">Student</h1>
                            </center>
                            <ion-input labelPlacement="stacked" label="Chapter Id" v-model="chapterId" name="chapterId"
                                type="text" required></ion-input>
                                <ion-input labelPlacement="stacked" label="TSA Student Id" v-model="studentId" name="studentId"
                                type="text" required></ion-input>
                        </ion-label>
                    </ion-item>
                    <ion-item v-if="userType=='advisor'"> <ion-label>
                            <center>
                                <h1 style="align-self: center;">Advisor</h1>
                            </center>
                            <ion-radio-group v-model="chapterOption" value="stacked">
                                <ion-radio value="create" label-placement="start">Create a New Chapter</ion-radio>
                                <ion-radio value="existing" label-placement="start">Select an existing
                                    Chapter</ion-radio>

                            </ion-radio-group>
                            <ion-input labelPlacement="stacked" label="Chapter Id" v-model="chapterId" name="chapterId"
                                type="text" required></ion-input>
                            <ion-input labelPlacement="stacked" v-if="chapterOption=='create'" label="Organization Name" v-model="orgName"
                                name="orgName" type="text" required></ion-input>
                            <ion-input labelPlacement="stacked" v-if="chapterOption=='create'" label="Pin" v-model="pin"
                                name="pin" type="number" required></ion-input>
                        </ion-label>
                    </ion-item>
                    <ion-item v-if="userType=='parent'"> <ion-label>
                            <center>
                                <h1 style="align-self: center;">Parent</h1>
                            </center>
                            <ion-input labelPlacement="stacked" label="Chapter Id" v-model="chapterId" name="chapterId"
                                type="text" required></ion-input>
                            <ion-input labelPlacement="stacked" label="Student Id" v-model="studentId" name="studentId"
                                type="text" required></ion-input>
                        </ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-button><ion-label>Have an Account? Signup!</ion-label></ion-button></ion-item>
                </ion-list>

                <ion-row responsive-sm class="ion-padding">
                    <ion-col>
                        <ion-button  type="submit" expand="block">Login</ion-button>
                    </ion-col>

                </ion-row>
            </form>
            <ion-toast :is-open="showToast" :message="toastMessage" :duration="2000"></ion-toast>
        </ion-content>
    </ion-page>
</template>

<style scoped>
.login-logo {
    padding: 20px 0;
    min-height: 200px;
    text-align: center;
}

.login-logo img {
    max-width: 150px;
}

.list {
    margin-bottom: 0;
}
</style>

<script setup lang="ts">
import { Device } from '@capacitor/device';

import { states, stateIds, getState } from "../helper"
import { computed, ref } from "vue";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonSelectOption,
    IonMenuButton,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonTitle,
    IonRow,
    IonCol,
    IonInput,
    IonToast,
    IonSelect,
    IonRadioGroup,
    IonRadio
} from "@ionic/vue";

const email = ref("");
const name = ref("");
const state = ref("");
const userType = ref("");
const orgName = ref("");
const chapterId = ref("");
const password = ref("");
const rePassword = ref("");
const pin = ref("");
const chapterOption = ref("");
const studentId = ref("");


const submitted = ref(false); 
const showToast = ref(false);
const toastMessage = ref("");




const onSignup = () => {

   //this.$router.push("/announcements")
};

</script>