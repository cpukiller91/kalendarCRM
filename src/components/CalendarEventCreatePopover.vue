<template>

    <v-card v-if="AddCard" class="ds-calendar-event-popover-card"
            :class="classes">

        <v-toolbar extended flat
                   :style="styleHeader">

            <v-toolbar-title slot="extension">
<!--
                <v-text-field single-line hide-details solo flat autofocus
                    :label="labels.title"
                    v-model="details.title">
                </v-text-field>
                -->
              <v-select
                  :items="personal"
                  label="Вибрать сециалиста"
                  :color="personal.color"
                  v-model="userId"
                  item-text="title"
                  item-value="id"
                  v-on:change="onChangeDoc"
              ></v-select>

            </v-toolbar-title>
            <!--Button edit--->
            <v-btn
                v-if="!details.readonly && details.title"

                color="secondary"
                small absolute bottom left fab icon
                @click="edit" style="background-color: #424242!important; color: #fff!important;">
                <v-icon>{{ icons.edit }}</v-icon>
            </v-btn>

            <slot name="eventCreatePopoverToolbarLeft" v-bind="slotData"></slot>

            <v-spacer></v-spacer>

            <slot name="eventCreatePopoverToolbarRight" v-bind="slotData"></slot>

            <slot name="eventCreatePopoverToolbarSave" v-bind="slotData">

                <v-btn
                  class="ds-create-popover-save"
                  text
                  :disabled="!isValid"
                  :style="styleText"
                  @click="save">

                  <v-icon left>{{ icons.save }}</v-icon>
                  <span>{{ labels.save }}</span>

                </v-btn>

            </slot>

            <slot name="eventCreatePopoverToolbarClose" v-bind="slotData">

                <v-btn icon
                       @click="close"
                       :style="styleText" style="background-color: transparent!important;">

                    <v-icon>{{ icons.close }}</v-icon>

                </v-btn>

            </slot>

        </v-toolbar>
        <v-card-text>

            <slot name="eventCreatePopoverBodyTop" v-bind="slotData"></slot>

            <v-list>

                <v-list-item>
                    <v-list-item-avatar>

                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                      <v-select
                          :items="itemCardKids"
                          label="Карточка ребенка"
                          v-model="babycard"
                          item-text="title"
                          item-value="id"
                          v-on:change="onChangeKid"
                      ></v-select>
                        <v-select
                            :items="timerDuration"
                            label="Начало приема"

                            v-model="durationSelect"
                        ></v-select>
                        <v-select
                            :items="timerDurationRange"
                            label="Длительность приема"

                            v-model="durationSelectRange"
                        ></v-select>
                        <v-select
                                :items="typeEventList"
                                label="Тип приема"

                                v-model="typeEvent"
                        ></v-select>
                        <slot name="eventCreatePopoverOccurs" v-bind="slotData">
                            <v-list-item-title>{{ startDate }}</v-list-item-title>
                            <v-list-item-subtitle>{{ occurs }}</v-list-item-subtitle>
                        </slot>

                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="prompts.location && $dayspan.supports.location">
                    <v-list-item-avatar>
                        <v-icon>location_on</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverLocation" v-bind="slotData">

                            <v-text-field
                                    single-line hide-details solo flat full-width
                                    :label="labels.location"
                                    v-model="details.location"
                            ></v-text-field>

                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="prompts.description && $dayspan.supports.description">
                    <v-list-item-avatar>
                        <v-icon>subject</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverDescription" v-bind="slotData">

                            <v-textarea
                                    hide-details single-line solo flat full-width
                                    :label="labels.description"
                                    v-model="details.description"
                            ></v-textarea>

                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="prompts.calendar && $dayspan.supports.calendar">
                    <v-list-item-avatar>
                        <v-icon>event</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverCalendar" v-bind="slotData">

                            <v-text-field
                                    single-line hide-details solo flat full-width
                                    :label="labels.calendar"
                                    v-model="details.calendar"
                            ></v-text-field>

                        </slot>
                    </v-list-item-content>
                </v-list-item>
<!--
                <v-list-item v-if="prompts.color && $dayspan.supports.color">
                    <v-list-item-avatar>
                        <v-icon>invert_colors</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverColor" v-bind="slotData">

                            <v-select
                                    single-line hide-details solo flat full-width
                                    :items="$dayspan.colors"
                                    :color="details.color"
                                    v-model="details.color">
                                <template slot="item" slot-scope="{ item }">
                                    <v-list-item-content>
                                        <div class="ds-color-option" :style="{backgroundColor: item.value}" v-text="item.text"></div>
                                    </v-list-item-content>
                                </template>
                            </v-select>

                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="prompts.icon && $dayspan.supports.icon">

                  <v-list-item-avatar>

                   <v-icon>coronavirus</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content class="py-0">
                       <slot name="eventCreatePopoverIcon" v-bind="slotData">

                           <v-select
                                   single-line hide-details solo flat full-width
                                   :items="$dayspan.icons"
                                   v-model="details.icon"
                                   v-on:change="onChangeIcon">
                               <template slot="item" slot-scope="{ item }">
                                   <v-list-item-avatar>
                                       <v-icon>{{ item.value }}</v-icon>
                                   </v-list-item-avatar>
                                   <v-list-item-content>
                                       {{ item.text }}
                                   </v-list-item-content>
                               </template>
                           </v-select>

                       </slot>
                  </v-list-item-content>

             </v-list-item>
-->
             <v-list-item v-if="prompts.busy && $dayspan.supports.busy">
                 <v-list-item-avatar>
                     <v-icon>work</v-icon>
                 </v-list-item-avatar>
                 <v-list-item-content class="py-0">
                     <slot name="eventCreatePopoverBusy" v-bind="slotData">

                         <v-select
                                 single-line hide-details solo flat full-width
                                 :items="busyOptions"
                                 v-model="details.busy"
                         ></v-select>

                     </slot>
                 </v-list-item-content>
             </v-list-item>

         </v-list>

         <slot name="eventCreatePopoverBodyBottom" v-bind="slotData"></slot>

     </v-card-text>

     <slot name="eventCreatePopoverActions" v-bind="slotData"></slot>

 </v-card>

</template>

<script>
import { CalendarEvent, Calendar, Pattern, Functions as fn } from 'custom-dayspan'
import axios from "axios";
//axios.defaults.baseURL = "http://localhost:1337";

export default {

 name: 'dsCalendarEventCreatePopover',

 props:
     {
         calendarEvent:
             {
                 required: true,
                 type: CalendarEvent
             },

         calendar:
             {
                 required: true,
                 type: Calendar
             },

         close:
             {
                 type: Function
             },

         formats:
             {
                 validate (x) {
                     return this.$dsValidate(x, 'formats')
                 },
                 default () {
                     return this.$dsDefaults().formats
                 }
             },

         icons:
             {
                 validate (x) {
                     return this.$dsValidate(x, 'icons')
                 },
                 default () {
                     return this.$dsDefaults().icons
                 }
             },

         labels:
             {
                 validate (x) {
                     return this.$dsValidate(x, 'labels')
                 },
                 default () {
                     return this.$dsDefaults().labels
                 }
             },

         prompts:
             {
                 validate (x) {
                     return this.$dsValidate(x, 'prompts')
                 },
                 default () {
                     return this.$dsDefaults().prompts
                 }
             },

         busyOptions:
             {
                 type: Array,
                 default () {
                     return this.$dsDefaults().busyOptions
                 }
             }
     },

 computed:
     {

         slotData () {
             return {
                 calendarEvent: this.calendarEvent,
                 calendar: this.calendar,
                 close: this.close,
                 details: this.details
             }
         },

         classes () {
             return {
                 'ds-event-cancelled': this.calendarEvent.cancelled
             }
         },

         styleHeader () {
             return {
                 backgroundColor: this.details.color,
                 color: this.details.forecolor
             }
         },

         styleText () {
             return {
                 color: this.details.forecolor
             }
         },

         startDate () {
             // unixTimeZero.toLocaleString('ru-Ru')
             console.log("startDate-",this.calendarEvent.start.date)

             var date = new Date(this.calendarEvent.start.date);
             // Запрашиваем день недели вместе с длинным форматом даты
             var options = { weekday: 'long'
                 // , year: 'numeric'
                  , month: 'long'
                  , day: 'numeric'
             };
             //console.log("startDate",date.toLocaleString('ru-Ru', options));
             //return this.calendarEvent.start.format(this.formats.start)
             return date.toLocaleString('ru-Ru', options);
         },
       dayOfMonth () {
          //"2021-03-09"
           return this.calendarEvent.start.format("DD")
         },
       month () {
         //"2021-03-09"
         return this.calendarEvent.start.format("MM")
       },
       startDateForm () {
         //"2021-03-09"
         return this.calendarEvent.start.format("Y-MM-DD")
       },

         busyness () {
             return this.details.busy ? this.labels.busy : this.labels.free
         },

         isValid () {
             return this.$dayspan.isValidEvent(
                 this.details,
                 this.calendarEvent.schedule,
                 this.calendarEvent
             )
         },

         occurs () {
             return this.$dayspan.getEventOccurrence(
                 this.calendarEvent.schedule,
                 this.calendarEvent.start,
                 this.labels,
                 this.formats
             )
         }
     },

 data: vm => ({
    userId:null,
    timerDurationRange:[30,60],
    durationSelectRange:30,
    typeEventList:[
        "Диагностика",
        "Консультация",
        "Индивидуальное занятие",
        "Групповое занятие",
        "Консультация родителей",
        "Прием КДЦ",
        "Мониторинг"
    ],
    typeEvent:"Диагностика",
    durationUnit:"day",
    duration:1,
    durationSelect:"9:00",

    timerDuration:["9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30",
        "15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00"],

    details: vm.buildDetails(),
    personal:[],
    itemCardKids:[],
    babycard:null,
    AddCard: false,
    title:""
 }),
 mounted (){
     // Set default duration to be consistent with default icon selection for virus
    //console.log(this.startDate,this.formats.start);
   var LoginData = JSON.parse(localStorage.getItem('login'));
   this.AddCard = LoginData.user.usergroup.addCard

     axios.get('/users', {params:{visState_ne:false}})
     .then(response => {
       this.alert = false;
       var item = [];
       var c = 0;
       // var  LoginData = JSON.parse(localStorage.getItem('login'));
       //console.log(response.data);
       response.data.forEach((element) => {
         item[c] = {
             "title": element.username,
             "id": element.id
         };
         c++;
         //console.log(element.username)

       })
       //console.log(item);
       this.personal = item;

     })
     .catch(error => {
       console.log(error);
       //this.alert = true;
     });

    axios.get('/babycards', {})
       .then(response => {

         var itemCard = [];
         var c = 0;
         // var  LoginData = JSON.parse(localStorage.getItem('login'));
         //console.log(response.data);
         response.data.forEach((element) => {
           itemCard[c] = {
             "title":element.kidf+" "+element.kidi+" "+element.kido,
             "id":element.id};
           c++;
           //console.log(element.username)

         })
         //console.log(itemCard);
         this.itemCardKids = itemCard;

       })
       .catch(error => {
         console.log(error);
         //this.alert = true;
       });
     //this.calendarEvent.fullDay = false
     //this.calendarEvent.schedule.durationUnit = "day"
     //this.calendarEvent.schedule.duration = 1
     //this.calendarEvent.schedule.durationUnit = "minutes"
     //this.calendarEvent.schedule.duration = 10
     //this.calendarEvent.schedule.times = [9]
 },
 methods:
     {
       onChangeKid(){

       },
       onChangeDoc (){
        axios.get('/users', {params:{id:this.userId}})
        .then(response => {
            this.details.color = response.data[0].usergroup.color;
            this.title = response.data[0].username;
          //console.log(response.data[0].usergroup.color);
          //this.edit();
        })
       },
         onChangeIcon (){
           switch (this.details.icon) {
             case 'virus':
                 this.calendarEvent.schedule.durationUnit = "day"
                 this.calendarEvent.schedule.duration = 1
                 this.calendarEvent.schedule.times = []
                 this.details.color = "#F44336"
                 break
             case 'bacteria':
                 this.calendarEvent.schedule.durationUnit = "day"
                 this.calendarEvent.schedule.duration = 1
                 this.calendarEvent.schedule.times = []
                 this.details.color = "#607D8B"
                 break
             case 'continu_virus':
                 this.calendarEvent.schedule.durationUnit = "day"
                 this.calendarEvent.schedule.duration = 1
                 this.calendarEvent.schedule.times = []
                 this.details.color = "#FFEB3B"
                 break
             case 'continu_bacteria':
                 this.calendarEvent.schedule.durationUnit = "day"
                 this.calendarEvent.schedule.duration = 1
                 this.calendarEvent.schedule.times = []
                 this.details.color = "#bf00cd"
                 break
           }
         },
         edit () {
             var ev = this.getEvent('create-edit')

             this.$emit('create-edit', ev)

             this.finishEvent(ev)
         },

         save () {
           console.log("Event Create ",this.calendarEvent.schedule);


           if(this.calendarEvent.schedule.durationUnit == "hour"){

               this.times = this.calendarEvent.start.hour;
               //console.log("1-1",this.calendarEvent.start);
               this.durationSelect = this.calendarEvent.start.hour+":00";
               this.durationUnit = "minutes";
               this.duration = this.durationSelectRange;
           }

            if(this.calendarEvent.schedule.durationUnit == "day"){

                this.times = this.calendarEvent.start.hour;
                //console.log("1-1",this.calendarEvent.start);
                this.durationUnit = "minutes";
                this.duration = this.durationSelectRange;
            }
//console.log("ITEM",item);
           var data = {
            durationUnit:this.durationUnit,
            duration:this.duration,
            times:this.times,
            strtime: this.durationSelect,
               typeEvent:this.typeEvent,
            title:this.title,
            userId:this.userId,
            month:this.month,
            dayOfMonth:this.dayOfMonth,
            color:this.details.color,
            babycard:this.babycard,

           }
             let ev = this.getEvent('creating')

             this.$emit('creating', ev)

             if (!ev.handled && ev.details && ev.calendarEvent) {
                 ev.created = ev.calendarEvent.event

                 this.$dayspan.setEventDetails(
                     ev.details,
                     ev.created.data,
                     ev.created,
                     ev.calendarEvent
                 )

                 if (ev.calendar) {
                     ev.calendar.addEvent(ev.created)
                     ev.added = true
                 }
                 //
                 this.$emit('created', ev)

                 if (ev.calendar && ev.refresh) {
                     ev.calendar.refreshEvents()
                 }

                 ev.handled = true

                 this.$emit('event-create', ev.created)
             }
             //
            this.finishEvent(ev)
            //console.log(this);
            axios.post('/eventlists', data)
            .then(response => {
             console.log("eventlists save",response);
                window.location.href = '/'

            })
            .catch(function (error) {
             console.log(error);
            });


         },

         finishEvent (ev) {
             if (ev.close) {
                 this.close()

                 this.$emit('create-popover-closed', ev)
             }
         },

         buildDetails () {
             let details = this.$dayspan.copyEventDetails(this.calendarEvent.event.data)

             // details.title = ''

             return details
         },

         getEvent (type, extra = {}) {

             console.log(this.calendarEvent.start.hour)
             //console.log(this)


             return fn.extend({

                 type: type,
                 calendarEvent: this.calendarEvent,
                 calendar: this.calendar,
                 close: this.close,
                 details: this.details,
                 handled: false,
                 added: false,
                 refresh: true,
                 close: true,
                 $vm: this,
                 $element: this.$el

             }, extra)
         }
     }
}
</script>

<style scoped lang="scss">

 .v-btn--floating.v-btn--left {
     margin-left: 0px !important;

     .v-icon {
         height: auto;
     }
 }

 .ds-calendar-event-popover-card {

     .v-toolbar__extension {
         padding: 0 16px !important;
         height: 60px !important;
         align-items: start;

         .v-toolbar__title {
             width: 100%;
             margin-left: 56px;
             margin-right: 0px;

             .v-input__slot {
                 background-color: rgba(255, 255, 255, 0.2) !important;

                 input {
                     caret-color: rgba(0, 0, 0, .87) !important;
                 }
             }
         }
     }
 }

 .v-text-field--full-width {
     width: 100%;
 }

 .v-card__text {
     padding: 16px 0;

     .v-list {
         padding-bottom: 0px;

         > div:first-child {
             margin-bottom: 1em;
         }

         .v-list__tile {
             height: auto !important;
         }
     }
 }

 .ds-create-popover-save {
     background-color: transparent !important;
 }

 .ds-color-option {
     width: 100%;
     color: white;
     padding: 4px;
 }

 .v-input {
     margin-bottom: 8px !important;
 }

</style>
