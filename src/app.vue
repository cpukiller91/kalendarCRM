<template>
    <v-app id="dayspan" v-cloak  >

        <ds-calendar-app v-if="logIn===true" ref="app"
                        :nav-drawer="false"
                         :calendar="calendar"
                         :read-only="readOnly"
                         @change="saveState">

            <template v-slot:title>
                CDMC
            </template>

            <template slot="menuRight">
                <v-btn icon large href="https://github.com/ClickerMonkey/dayspan-vuetify" target="_blank">
                    <v-avatar size="32px" tile>
                        <img src="https://simpleicons.org/icons/github.svg" alt="Github">
                    </v-avatar>
                </v-btn>
            </template>

            <template slot="eventPopover" slot-scope="slotData">
                <ds-calendar-event-popover
                        v-bind="slotData"
                        :read-only="readOnly"
                        @finish="saveState"
                ></ds-calendar-event-popover>
            </template>

            <template slot="eventCreatePopover" slot-scope="{placeholder, calendar}">
                <ds-calendar-event-create-popover
                        :calendar-event="placeholder"
                        :calendar="calendar"
                        :close="$refs.app.$refs.calendar.clearPlaceholder"
                        @create-edit="$refs.app.editPlaceholder"
                        @create-popover-closed="saveState"
                ></ds-calendar-event-create-popover>
            </template>

            <template slot="eventTimeTitle" slot-scope="{calendarEvent, details}">
                <div>
                    <v-icon class="ds-ev-icon"
                            v-if="details.icon"
                            size="14"
                            :style="{color: details.forecolor}">
                        {{ details.icon }}
                    </v-icon>
                    <strong class="ds-ev-title">{{ details.title }}</strong>
                </div>
                <div class="ds-ev-description">{{ getCalendarTime( calendarEvent ) }}</div>
            </template>

            <template slot="drawerBottom">
                <v-container fluid>
                    <v-layout wrap align-center>
                        <v-flex xs12>
                            <v-checkbox box
                                        label="Read Only?"
                                        v-model="readOnly"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs12>
                            <v-select
                                    label="Language"
                                    :items="locales"
                                    v-model="currentLocale"
                                    @input="setLocale"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                </v-container>
            </template>

        </ds-calendar-app>

        <v-container class="grey lighten-5" v-if="logIn===false">
          <v-alert
              :value="alert"
              color="pink"
              dark
              border="top"
              icon="mdi-home"
              transition="scale-transition">Неправильное имя пользователя или пароль</v-alert>
          <v-row no-gutters>
            <v-col cols="12" sm="4">

            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="pa-2" outlined tile>

                <form >
                  <v-text-field
                      v-model="identifier"
                      label="Login"
                      required

                  ></v-text-field>
                  <v-text-field
                      v-model="password"
                      type="password"
                      label="Password"
                      required

                  ></v-text-field>

                  <v-btn
                      class="mr-4"
                      @click="submit"
                  >
                    Login
                  </v-btn>
                  <v-btn @click="clear">
                    clear
                  </v-btn>
                </form>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">

            </v-col>
          </v-row>
        </v-container>

    </v-app>

</template>

<script>
import { dsMerge } from './functions'
//import ru from '/src/locales/ru';
import { Calendar, Weekday, Month, Sorts,Time } from 'custom-dayspan'
import axios from "axios";
axios.defaults.baseURL = "https://admin.cdcmc.ru";

export default {
    name: 'dayspan',

    data: vm => ({
        logIn:false,
        alert: false,
        identifier: 'user1@rambler.ru',
        password: '!4L@mer90',
        //username:"Павлова Наталья Николаевна",
        storeKey: 'dayspanState',
        calendar: Calendar.days(),
        readOnly: false,
        AddCard: false,
        nav: false,
        currentLocale: 'ru',
        locales: [
            {value: 'ru', text: 'Русский'},
            {value: 'en', text: 'English'},
            {value: 'fr', text: 'French'},
            {value: 'de', text: 'German'},
            {value: 'nl', text: 'Dutch'}
        ],
        defaultEvents: [],
        removeList:[],
        EventList:[],
        UserList:[]


    }),
    mounted () {
        axios.get('/eventlists', {params:{}})
        .then(response => {
            //console.log("Test ",this.UserList)
            var d = new Date();
            response.data.forEach((element) => {
                if(element.month-1 == d.getMonth() && element.dayOfMonth == d.getDate()){
                    this.removeList.push( element.userId);
                }

                //console.log(element.babycard.id)
                this.defaultEvents.push({
                    id:element.id,
                    data: {
                        id:element.id,
                        type:"event",
                        title: element.title + "("+element.babycard.kidf+" "+element.babycard.kidi+")",
                        color: element.color
                    },
                    schedule: {

                        month: [element.month-1],
                        dayOfMonth: [element.dayOfMonth],
                        //duration: 1,
                        //durationUnit: 'hour',

                        times: [Time.parse(element.strtime)],

                        // durationUnit: "hour",
                        //times: [12],
                        //minute:30,
                        //hour:[30],
                        duration: element.duration,
                        durationUnit: element.durationUnit
                    }
                })
            })

            //console.log("Eventlists load");



            //this.rebuild();
            //console.log("eventlists",response.data);

            //this.edit();
        });
        this.loadData();
        //this.loadData();
      //console.log("-->",typeof localStorage.getItem('login'), localStorage.getItem('login'))
      if(localStorage.getItem('login')){

        var LoginData = JSON.parse(localStorage.getItem('login'));
        this.logIn = true;
        this.readOnly = LoginData.user.usergroup.readOnly;
        window.app = this.$refs.app
        //this.$refs.addCard = "dsdsd"
        this.nav = true;


      }


    },
    methods: {

        submit () {

        //this.$v.$touch()
        axios.post('/auth/local', {

          identifier: this.identifier,
          password: this.password,
        })
        .then(response => {
          this.alert = false;
          // var  LoginData = JSON.parse(localStorage.getItem('login'));
          // console.log(LoginData);
          if(response.data.jwt){
            let json = JSON.stringify(response.data)
            this.logIn = true;
            localStorage.setItem("login", json)
            window.location.href = '/'
          }


        })
        .catch(error => {
          console.log(error);
          this.alert = true;
        });

        },
        clear () {
            //this.$v.$reset()
            this.login = ''
            this.pass = ''
            localStorage.removeItem(this.storeKey)
            localStorage.setItem("login", '')
        },

        loadData(){

            var d = new Date();
            console.log("defaultEvents----",this.defaultEvents);

            axios.get('/users?visState_ne=false', {params:{}})
            .then(response => {
                this.UserList = response.data;
                //console.log(response.data)
                response.data.forEach((element) => {
                    if (this.removeList.indexOf(element.id) == -1) {

                        this.defaultEvents.push({
                            //id:element.id,
                            data: {
                                userId: element.id,
                                type: "user",
                                title: element.username,
                                color: element.usergroup.color
                            },
                            schedule: {

                                month: [d.getMonth()],
                                dayOfMonth: [d.getDate()],
                                //duration: 1,
                                //durationUnit: 'hour',

                                times: [Time.parse(element.stateTime)],

                                // durationUnit: "hour",
                                //times: [12],
                                //minute:30,
                                //hour:[30],
                                duration: 30,
                                durationUnit: "minutes"
                            }
                        })
                    }

                })

                // console.log("Remove List",this.removeList)
                // this.loadState ();
                this.loadState ();
            });




        },
        getCalendarTime (calendarEvent) {
            let sa = calendarEvent.start.format('p')
            let ea = calendarEvent.end.format('p')
            let sh = calendarEvent.start.format('HH:mm')
            let eh = calendarEvent.end.format('HH:mm')
            if (calendarEvent.start.minute !== 0) {
                sh += calendarEvent.start.format(':mm')
            }
            if (calendarEvent.end.minute !== 0) {
                eh += calendarEvent.end.format(':mm')
            }
            return (sa === ea) ? (sh + ' - ' + eh) : (sh  + ' - ' + eh)
        },
        setLocale (code) {
            //this.$dayspan.addLocales(['ru', 'ru-RU'], ru);
            this.$dayspan.setLocale(code)
            this.$dayspan.refreshTimes()
            this.$refs.app.$forceUpdate()
        },
        saveState () {
            localStorage.removeItem(this.storeKey)
            let state = this.calendar.toInput(true)
            let json = JSON.stringify(state)
            localStorage.setItem(this.storeKey, json)
        },
        loadState () {

            let state = {}
            try {
                let savedState = JSON.parse(localStorage.getItem(this.storeKey))
                if (savedState) {
                    state = savedState
                    state.preferToday = false
                }
            } catch (e) {
                console.log(e)
            }
            if (!state.events || !state.events.length) {
                state.events = this.defaultEvents
            }

            //console.log("Load stale",state)
            this.$refs.app.setState(state)
        }
        }
}
</script>


<style>
    body, html, #app {
        width: 100%;
        height: 100%;
    }
</style>
