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
                                type="password" @ion-input="completePassword"
                                error-text="Password is missing the proper items" required></ion-input>
                            <ion-list>
                                <ion-item>
                                    <ion-label style="font-size: .3cm;">

                                        <ion-label><ion-icon
                                                :style="`color:${hasCharAmount() ? 'green' : 'red'} ;font-size: .5cm;`"
                                                :icon="hasCharAmount() ? outlines.checkmark : outlines.close"></ion-icon>
                                            Must Include at least 8 Characters</ion-label>
                                        <ion-label><ion-icon
                                                :style="`color:${hasLowercase() ? 'green' : 'red'} ;font-size: .5cm;`"
                                                :icon="hasLowercase() ? outlines.checkmark : outlines.close"></ion-icon>
                                            Must Include at least 1 Lowercase Character </ion-label>
                                        <ion-label><ion-icon
                                                :style="`color:${hasUppercase() ? 'green' : 'red'} ;font-size: .5cm;`"
                                                :icon="hasUppercase() ? outlines.checkmark : outlines.close"></ion-icon>
                                            Must Include at least 1 Uppercase Character </ion-label>
                                        <ion-label><ion-icon
                                                :style="`color:${hasSymbol() ? 'green' : 'red'} ;font-size: .5cm;`"
                                                :icon="hasSymbol() ? outlines.checkmark : outlines.close"></ion-icon>
                                            Must Include at least 1 Symbol</ion-label>
                                        <ion-label><ion-icon
                                                :style="`color:${hasNumber() ? 'green' : 'red'} ;font-size: .5cm;`"
                                                :icon="hasNumber() ? outlines.checkmark : outlines.close"></ion-icon>
                                            Must Include at least 1 Number</ion-label>
                                    </ion-label>

                                </ion-item>
                            </ion-list>
                            <ion-input labelPlacement="stacked" label="Confirm Password" v-model="rePassword"
                                name="rePassword" type="password" error-text="Passwords Don't Match" required>
                            </ion-input>
                        </ion-label>
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
                    <ion-item v-if="userType == 'student'"> <ion-label>
                            <center>
                                <h1 style="align-self: center;">Student Signup</h1>
                            </center>
                            <ion-input labelPlacement="stacked" label="Chapter Id" v-model="chapterId" name="chapterId"
                                type="text" placeholder="Your unique Chapter Id assigned from TSA" required></ion-input>
                            <ion-input labelPlacement="stacked" label="TSA Student Id" v-model="studentId"
                                name="studentId" placeholder="Your unique Student Id assigned from TSA" type="text"
                                required></ion-input>
                        </ion-label>
                    </ion-item>
                    <ion-item v-if="userType == 'advisor'"> <ion-label>
                            <center>
                                <h1 style="align-self: center;">Advisor Signup</h1>
                            </center>
                            <ion-item>
                                <ion-radio-group v-model="chapterOption" value="stacked">
                                    <ion-radio value="create" label-placement="start">Create a New Chapter</ion-radio>
                                    <ion-radio value="existing" label-placement="start">Select an existing
                                        Chapter</ion-radio>



                                </ion-radio-group></ion-item>
                            <ion-input labelPlacement="stacked" label="Chapter Id" v-model="chapterId" name="chapterId"
                                type="text" placeholder="Your unique Chapter Id assigned from TSA" required></ion-input>
                            <ion-input labelPlacement="stacked" v-if="chapterOption == 'create'"
                                label="Organization Name" v-model="orgName" name="orgName"
                                placeholder="The name which will be displayed on your Chapter" type="text"
                                required></ion-input>
                            <ion-input labelPlacement="stacked" v-if="chapterOption == 'create'" label="Pin"
                                v-model="pin" name="pin" type="number" :maxlength='6' :minlength="4"
                                placeholder="A Chapter Modification PIN 4-6 Numbers" required></ion-input>
                        </ion-label>
                    </ion-item>
                    <ion-item v-if="userType == 'parent'"> <ion-label>
                            <center>
                                <h1 style="align-self: center;">Parent Signup</h1>
                            </center>
                            <ion-input labelPlacement="stacked" label="Chapter Id" v-model="chapterId" name="chapterId"
                                type="text" placeholder="Your unique Chapter Id assigned from TSA" required></ion-input>
                            <ion-input labelPlacement="stacked" label="Student Id" v-model="studentId" name="studentId"
                                type="text" placeholder="Your child's unique Student Id assigned from TSA"
                                required></ion-input>
                        </ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-button><ion-label>Have an Account? Login!</ion-label></ion-button></ion-item>
                </ion-list>

                <ion-row responsive-sm class="ion-padding">
                    <ion-col>
                        <ion-button type="submit" expand="block">Signup</ion-button>
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

<script lang="ts">
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
    IonIcon,
    IonTitle,
    IonRow,
    IonCol,
    IonInput,
    IonToast,
    IonSelect,
    IonRadioGroup,
    IonRadio
} from "@ionic/vue";
import * as outlines from 'ionicons/icons';
import { defineComponent } from 'vue';

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


function hasLowercase() {
    return /[a-z]/.test(password.value);
}
function hasUppercase() {
    return /[A-Z]/.test(password.value);
}
function hasSymbol() {
    return /[!@#$%^&*(),.?":{}|<>_\-+=\[\]`~;'\/]/.test(password.value);
}
function hasNumber() {
    return /[0-9]/.test(password.value);
}
function hasCharAmount() {
    return /.{8,}/.test(password.value);
}
function completePassword() {
    hasLowercase() && hasUppercase() && hasSymbol() && hasNumber() && hasCharAmount() ? password.$el.classList.add('ion-valid')
        : password.$el.classList.add('ion-invalid');
}
export default defineComponent({
})
const onSignup = () => {
    console.log(email.value, name.value, state.value, userType.value, chapterId.value, password.value, rePassword.value, pin.value, chapterOption.value, studentId.value)
    //this.$router.push("/announcements")
};
console.log(hasCharAmount())
</script>