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
        <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
    </ion-page>
</template>

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


</script>