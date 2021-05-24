<template>

    <div class="ds-event"
         :class="classes">

        <div class="ds-event-header ds-event-area">
            <div class="ds-event-cancel" v-if="hasCancel">

                <!-- Cancel -->
                <slot name="scheduleCancel" v-bind="{cancel, labels}">

                    <v-tooltip bottom>

                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" icon class="ds-button" @click="cancel">
                                <v-icon dark>clear</v-icon>
                            </v-btn>
                        </template>
                        <span v-html="labels.cancel"></span>
                    </v-tooltip>

                </slot>

            </div>

            <div class="ds-event-actions">

                <!-- Save -->
                <slot name="scheduleSave" v-bind="{hasSave, save, labels, readOnly}">

                    <v-btn
                            v-if="!isReadOnly"
                            class="ds-button-tall ml-3 mt-0 mb-2" depressed
                            color="primary"
                            :disabled="!canSave"
                            @click.stop="save">

                        <span v-html="labels.save"></span>

                    </v-btn>

                </slot>

                <!-- More Actions -->
                <slot name="scheduleActions" v-bind="{calendarEvent, schedule, calendar, actioned, readOnly}">
                    <ds-schedule-actions
                            v-if="calendarEvent && !isReadOnly"
                            v-bind="{$scopedSlots}"
                            v-on="$listeners"
                            :schedule="schedule"
                            :calendar-event="calendarEvent"
                            :calendar="calendar"
                            @finish="actioned">
                        <v-btn class="ds-button-tall ml-1 mt-0 mb-2" depressed>
                            {{ labels.moreActions }}
                        </v-btn>
                    </ds-schedule-actions>

                </slot>

            </div>

            <!-- Title -->
            <slot name="scheduleTitle" v-bind="{schedule, schedule, calendarEvent, details}">

                <!-- class="ds-textfield ds-calendar-event-title" -->
                <v-text-field single-line hide-details solo flat
                              class="ds-event-title"
                              :label="labels.title"
                              :readonly="isReadOnly"
                              v-model="details.title"
                ></v-text-field>

            </slot>

        </div>

        <div class="ds-event-body ds-event-area">

            <slot name="schedule" v-bind="slotData">

                <ds-schedule
                        :schedule="schedule"
                        :day="day"
                        :read-only="readOnly"
                ></ds-schedule>

            </slot>

        </div>

        <!-- Tabs -->
        <v-layout row v-if="hasTabs">
            <v-flex xs12 class="mt-2">


                <v-tabs class="text--primary" v-model="tab">

                    <v-tab href="#details" >
                      Карточка
                    </v-tab>

                    <v-tab href="#forecast" >
                      Дефектологи
                    </v-tab>

                    <v-tab href="#exclusions" >
                      Логопеды
                    </v-tab>

                    <v-tab href="#inclusions" >
                      Психологи
                    </v-tab>

                    <v-tab href="#cancelled" >
                      Семейный
                    </v-tab>

                    <slot name="eventTabsExtra" v-bind="slotData"></slot>

                    <!-- Details -->
                    <v-tab-item value="details">
                        <v-card flat>
                            <v-card-text>
                              <v-form v-model="valid">
                                <v-container>
                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="firstname"

                                          :counter="10"
                                          label="Дата"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="lastname"

                                          :counter="10"
                                          label="Ф.И.О"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="email"

                                          label="Возраст"
                                          required
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="firstname"

                                          :counter="10"
                                          label="Город"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="lastname"

                                          :counter="10"
                                          label="Отделение"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="email"

                                          label="№ и/б"
                                          required
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="firstname"

                                          :counter="10"
                                          label="Источн финансирования"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="lastname"

                                          :counter="10"
                                          label="Вид услуги"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="email"

                                          label="ФИО консультанта"
                                          required
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="firstname"

                                          :counter="10"
                                          label="Примечание (неявка или др.)"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="lastname"

                                          :counter="10"
                                          label="Контактные данные родителей (тел, @)"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="email"

                                          label="Клинический диагноз"
                                          required
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="firstname"

                                          :counter="10"
                                          label="Сопутствующий диагноз (данные анамнеза, заключение спец-та, результ. инструмен. обслед. оперативные вмеш.)"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="lastname"

                                          :counter="10"
                                          label="дл-ть бол-ни"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="email"

                                          label="Д или Р"
                                          required
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="firstname"

                                          :counter="10"
                                          label="Заб.н.с. (ЦНС) Д/Н"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="lastname"

                                          :counter="10"
                                          label="Врожд пороки развития (Д/Н)"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="email"

                                          label="Генет и наслед б-ни (Д/Н)"
                                          required
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="firstname"

                                          :counter="10"
                                          label="Нарушение слуха"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="lastname"

                                          :counter="10"
                                          label="Нарушение зрения"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="email"

                                          label="Тяжесть б-ни (З/Л/С/Т)"
                                          required
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="firstname"

                                          :counter="10"
                                          label="Стадия б-ни (З/Р/О/П)"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="lastname"

                                          :counter="10"
                                          label="Заб-я ОДА (ДЦП)"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="email"

                                          label="Психолого-педагогическое заключение"
                                          required
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="firstname"

                                          :counter="10"
                                          label="основное направление реабилитации (ревма)"
                                          required
                                      ></v-text-field>
                                    </v-col>


                                  </v-row>

                                </v-container>
                              </v-form>

                            </v-card-text>
                        </v-card>
                    </v-tab-item>

                    <!-- Forecast -->
                    <v-tab-item value="forecast" >
                      <v-card flat>
                        <v-card-text>
                          <v-form
                              ref="form"
                              v-model="valid"
                              lazy-validation
                          >
                            <v-text-field
                                v-model="defIntel"
                                :counter="200"

                                label="Степень нарушения интеллекта"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="gefMind"
                                :counter="200"

                                label="Форма мышления"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="defAge"
                                :counter="200"

                                label="Актуал. психол. возраст"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="defSipr"
                                :counter="200"

                                label="Рекомендуемая АООП, СИПР"
                                required
                            ></v-text-field>
                            <!--
                                                        <v-text-field
                                                            v-model="email"
                                                            :rules="emailRules"
                                                            label="E-mail"
                                                            required
                                                        ></v-text-field>

                                                        <v-select
                                                            v-model="select"
                                                            :items="items"
                                                            :rules="[v => !!v || 'Item is required']"
                                                            label="Item"
                                                            required
                                                        ></v-select>

                                                        <v-checkbox
                                                            v-model="checkbox"
                                                            :rules="[v => !!v || 'You must agree to continue!']"
                                                            label="Do you agree?"
                                                            required
                                                        ></v-checkbox>

                                                        <v-btn
                                                            :disabled="!valid"
                                                            color="success"
                                                            class="mr-4"
                                                            @click="validate"
                                                        >
                                                          Validate
                                                        </v-btn>

                                                        <v-btn
                                                            color="error"
                                                            class="mr-4"
                                                            @click="reset"
                                                        >
                                                          Reset Form
                                                        </v-btn>

                                                        <v-btn
                                                            color="warning"
                                                            @click="resetValidation"
                                                        >
                                                          Reset Validation
                                                        </v-btn>-->
                          </v-form>

                        </v-card-text>
                      </v-card>
                    </v-tab-item>

                    <!-- Exclusions -->
                    <v-tab-item value="exclusions" >
                      <v-card flat>
                        <v-card-text>

                          <v-form
                              ref="form"
                              v-model="valid"
                              lazy-validation
                          >
                            <v-text-field
                                v-model="logoRechi"
                                :counter="200"

                                label="Характеристика речи (норма, задер., особ.ф.р., наруш.фор.р./ ОНР/системн.н.р. + уровни)"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="logoSopnar"
                                :counter="200"

                                label="Сопутствующие наруш. (дизартрия, диз.симпт., заикание, алалия, афазия, наруш.письма, чтения)"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="logoActual"
                                :counter="200"

                                label="Актуальное речевое развитие+Нормативное речевое развитие"
                                required
                            ></v-text-field>

                          </v-form>

                        </v-card-text>
                      </v-card>
                    </v-tab-item>

                    <!-- Inclusions -->
                    <v-tab-item value="inclusions" >
                      <v-card flat>
                        <v-card-text>

                          <v-form
                              ref="form"
                              v-model="valid"
                              lazy-validation
                          >
                            <v-text-field
                                v-model="logoRechi"
                                :counter="200"

                                label="Эмоциональное состояние (норма -1, относительно стабильное -2, нестабильное -3, нарушенное подавленное - 4, нарушенное возбужденное-5)"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="logoSopnar"
                                :counter="200"

                                label="Мотивационно-потребностная сфера (норма-1, инф-2, суж-3, девиант -4, искаж-5)"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="logoActual"
                                :counter="200"

                                label="Социальные контакты (широкий круг общения -1, суженный - 2, ограничен общением с близким - 3)"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="logoActual"
                                :counter="200"

                                label="Дополнительные стрессоры"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="logoActual"
                                :counter="200"

                                label="неспецифические трудности (несформированность норм и правил поведения-1, недостаточная произвольность ЭВС-2, повышенная внутриличностная конфликтность-3, снижение учебной мотивации-4, проблемы самоопредения-5, возрастные кризисы-6, трудности адаптация к школе-7, прочее -8 (указать)"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="logoActual"
                                :counter="200"

                                label="специфические трудности (трудности адаптации к ситуации госпитализации-1, фиксация на психофизическом дискомфорте-2, конфликтное самоотношение, негативный образ телесного Я-3, трудности адаптации к новым социальным условиям в ситуации манифестации болезни-4, сужение деятельности и общения в ситуации длительного хронического заболевания -5, низкая комлаентность-6, страхи медицинских процедур-7, прочее-8 (указать)"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="logoActual"
                                :counter="200"

                                label="актуальная психологическая проблема"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="logoActual"
                                :counter="200"

                                label="приоритетное направление реабилитации (мониторинг-1, повышение комплаентности-2, формирование норм и правил поведения-3, поддержка положительного образа Я, самопринятия (телесное Я)-4, стабилизация эмоционального состояние-5, укрепление внутриличностных ресурсов (копинги)-6, помощь в решении ситуативных коммуникативных задач-7, расширение мотивационно-потребностной сферы-8, прочее-9 (указать)"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="logoActual"
                                :counter="200"

                                label="основная форма работы ( мониторинг-1, информирование -2, психообразование-3, игровая терапия -4, арт-терапия -5, включение в продуктивную деятельность -6, групповая терапия-7, помощь в формировании ближайших жизненных перспектив-8, прочее-9 (указать)"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="logoActual"
                                :counter="200"

                                label="воспитатальная установка родителей (личностно-ориентированная-1, на обучение-2, на лечение-3, отстраненная-4, прочее -5 (написать)"
                                required
                            ></v-text-field>

                          </v-form>

                        </v-card-text>
                      </v-card>
                    </v-tab-item>

                    <!-- Cancelled -->
                    <v-tab-item value="cancelled" >
                      <v-card flat>
                        <v-card-text>

                          <v-form
                              ref="form"
                              v-model="valid"
                              lazy-validation
                          >
                            <v-select
                                :items="ageCategory"
                                label="возрастная категория "
                                required
                            ></v-select>
                            <v-select
                                :items="emotionalCondition"
                                label="эмоциональное состояние "
                                required
                            ></v-select>
                            <v-select
                                :items="personalCharacteristics"
                                label="личностные характеристики "
                                required
                            ></v-select>
                            <v-select
                                :items="behaviorSituation"
                                label="поведение в ситуации стресса "
                                required
                            ></v-select>

                            <v-text-field
                                v-model="behaviorDesc"
                                :counter="200"

                                label="поведение в ситуации стресса описание"
                                required
                            ></v-text-field>
                            <v-select
                                :items="experienceSickChild"
                                label="наличие опыта воспитания больного ребенка "
                                required
                            ></v-select>

                            <v-select
                                :items="availabilitySupport"
                                label="наличие поддержки и помощи "
                                required
                            ></v-select>

                            <v-select
                                :items="childIllness"
                                label="восприятие матерью болезни ребенка "
                                required
                            ></v-select>

                            <v-select
                                :items="additionalStressors"
                                label="дополнительные стрессоры "
                                required
                            ></v-select>

                            <v-text-field
                                v-model="logoActual"
                                :counter="200"

                                label="Примечание (укажите какие стрессоры)"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="logoActual"
                                :counter="200"

                                label="актуальная проблема"
                                required
                            ></v-text-field>
                            <v-select
                                :items="directionsRehabilitation"
                                label="направления реабилитация "
                                required
                            ></v-select>

                          </v-form>

                        </v-card-text>
                      </v-card>
                    </v-tab-item>

                    <slot name="eventTabItemsExtra" v-bind="slotData"></slot>

                </v-tabs>
            </v-flex>
        </v-layout>
    </div>

</template>

<script>
import { Day, Calendar, CalendarEvent, Time, Schedule, Functions as fn } from 'custom-dayspan'

export default {

    name: 'dsEvent',

    props:
        {
            targetSchedule:
                {
                    required: true,
                    type: Schedule
                },

            targetDetails:
                {
                    type: Object,
                    required: true
                },

            calendarEvent:
                {
                    type: CalendarEvent
                },

            calendar:
                {
                    type: Calendar
                },

            day:
                {
                    type: Day
                },

            readOnly:
                {
                    type: Boolean,
                    default: false
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

            hasTitle:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasTitle
                    }
                },

            hasCancel:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasCancel
                    }
                },

            hasSave:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasSave
                    }
                },

            hasTabs:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasTabs
                    }
                },

            hasDetails:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasDetails
                    }
                },

            hasForecast:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasForecast
                    }
                },

            hasExclusions:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasExclusions
                    }
                },

            hasInclusions:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasInclusions
                    }
                },

            hasCancelled:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasCancelled
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

    data: vm => ({
        tab: 'details',
        schedule: vm.$dayspan.getDefaultEventSchedule(),
        details: vm.$dayspan.getDefaultEventDetails(),
        defSipr:null,
        defAge:null,
        gefMind:null,
        defIntel:null,
        email:null,
        firstname:null,
        lastname:null,
        valid:null,
        behaviorDesc:null,
        logoRechi:null,
        logoSopnar:null,
        logoActual:null,
        directionsRehabilitation:["структирирование режима дня", "эмоциональная поддержка", "информирование", "оптимизация взаимодействия с медицинским персоналом", "повышение комлаентности", "неотложная психологическая помощь", "семейное консультирование"],
        additionalStressors:["есть", "нет"],
        childIllness:["соответствует ситуации", "недооценка", "переоценка" ],
        availabilitySupport:["есть", "периодически", "нет"],
        experienceSickChild:["отсутствие опыта", "среднее", "продолжительный"],
        behaviorSituation:["констрруктивное", "неконструктивные"],
        personalCharacteristics:["Активный Гибкий", "Активный Ригидный", "Пассивный Гибкий", "Пассивный Ригидный"],
        ageCategory: ["юношеский до 20 лет", "молодой 21-25", "средний 26-35", "зрелый > 36"],
        emotionalCondition: ["норма", "относительно стабильное", "нестабильное", "нарушенное подавленное ", "нарушенное возбужденное"],
        types: [
          'text',
          'number',
          'email',
          'password',
          'search',
          'url',
          'tel',
          'date',
          'time',
          'range',
          'color'
        ]
    }),

    watch:
        {
            targetSchedule:
                {
                    handler: 'updateSchedule',
                    immediate: true,
                    deep: true
                },

            targetDetails:
                {
                    handler: 'updateDetails',
                    immediate: true,
                    deep: true
                }
        },

    computed:
        {
            slotData () {
                return {
                    targetSchedule: this.targetSchedule,
                    targetDetails: this.targetDetails,
                    schedule: this.schedule,
                    details: this.details,
                    busyOptions: this.busyOptions,
                    day: this.day,
                    calendar: this.calendar,
                    calendarEvent: this.calendarEvent,
                    labels: this.labels,
                    readOnly: this.readOnly
                }
            },

            classes () {
                return {
                    'ds-has-cancel': this.hasCancel,
                    'ds-event-small': this.$vuetify.breakpoint.smAndDown
                }
            },

            canSave () {
                return this.$dayspan.isValidEvent(this.details, this.schedule, this.calenderEvent)
            },

            repeats () {
                return !this.schedule.isSingleEvent()
            },

            showTitle () {
                return this.$dayspan.supports.title &&
                    this.hasTitle
            },

            showCancels () {
                return this.$dayspan.features.cancel &&
                    this.repeats &&
                    this.hasCancelled &&
                    !this.schedule.cancel.isEmpty()
            },

            showForecast () {
                return this.$dayspan.features.forecast &&
                    this.repeats &&
                    this.hasForecast
            },

            showExclusions () {
                return this.$dayspan.features.exclude &&
                    this.repeats &&
                    this.hasExclusions &&
                    !this.schedule.exclude.isEmpty()
            },

            showInclusions () {
                return this.$dayspan.features.include &&
                    this.repeats &&
                    this.hasInclusions &&
                    !this.schedule.include.isEmpty()
            },

            isReadOnly () {
                return this.readOnly || this.$dayspan.readOnly
            }
        },

    methods:
        {
            onChangeIcon (){
              switch (this.details.icon) {
                case 'virus':
                    this.schedule.durationUnit = "hour"
                    this.schedule.duration = 1
                    this.schedule.times = [Time.parse("01:00")]
                    this.details.color = "#F44336"
                    this.targetDetails.color = "#F44336"
                    break
                case 'bacteria':
                    this.schedule.durationUnit = "hour"
                    this.schedule.duration = 4
                    this.schedule.times = [Time.parse("01:00")]
                    this.details.color = "#607D8B"
                    this.targetDetails.color = "#607D8B"
                    break
                case 'continu_virus':
                    this.schedule.durationUnit = "day"
                    this.schedule.duration = 1
                    this.schedule.times = []
                    this.details.color = "#FFEB3B"
                    this.targetDetails.color = "#FFEB3B"
                    break
                case 'continu_bacteria':
                    this.schedule.durationUnit = "day"
                    this.schedule.duration = 1
                    this.schedule.times = []
                    this.details.color = "#00BCD4"
                    this.targetDetails.color = "#00BCD4"
                    break
              }
            },
            save () {
                var ev = this.getEvent('save')

                this.$emit('save', ev)

                if (!ev.handled) {
                    if (ev.target && ev.schedule) {
                        ev.target.set(ev.schedule)
                    }

                    if (ev.calendarEvent) {
                        this.$dayspan.setEventDetails(
                            ev.details,
                            ev.targetDetails,
                            ev.calendarEvent.event,
                            ev.calendarEvent
                        )

                        this.$emit('update', ev)

                        this.$emit('event-update', ev.calendarEvent.event)
                    } else if (ev.create) {
                        ev.created = this.$dayspan.createEvent(ev.details, ev.schedule, true)

                        if (ev.calendar) {
                            ev.calendar.addEvent(ev.created)
                            ev.added = true
                        }
                        this.$emit('create', ev)
                    }

                    if (ev.calendar && ev.refresh) {
                        ev.calendar.refreshEvents()
                    }

                    ev.handled = true

                    if (ev.created) {
                        this.$emit('event-create', ev.created)
                    }
                }

                this.$emit('saved', ev)
            },

            actioned (ev) {
                this.$emit('actioned', ev)
            },

            cancel () {
                this.$emit('cancel', this.getEvent('cancel'))
            },

            updateSchedule (schedule) {
                this.schedule = schedule.clone()
                this.tab = 'details'
            },

            updateDetails (details) {
                this.details = this.$dayspan.copyEventDetails(details)
                this.tab = 'details'
            },

            getEvent (type, extra = {}) {
                return fn.extend({
                    type: type,
                    day: this.day,
                    schedule: this.schedule,
                    target: this.targetSchedule,
                    details: this.details,
                    targetDetails: this.targetDetails,
                    calendar: this.calendar,
                    calendarEvent: this.calendarEvent,
                    handled: false,
                    refresh: true,
                    create: true,
                    added: false,
                    $vm: this,
                    $element: this.$el

                }, extra)
            }

        }
}
</script>

<style scoped lang="scss">

    .ds-calendar-event-title {
        font-size: 18px;
        padding-right: 8px;
        padding-top: 4px;
    }

    .ds-color-option {
        width: 100%;
        color: white;
        padding: 4px;
    }

    .ds-button-tall {
        height: 48px;
    }

    .ds-event {

        &.ds-has-cancel {

            .ds-event-area {
                margin-left: 60px;
            }
        }

        &.ds-event-small {

            &.ds-has-cancel {

                .ds-event-area {
                    margin-left: 0px;
                }

                .ds-event-header {
                    margin-left: 60px;
                    margin-bottom: 58px;
                }
            }

            .ds-event-title {
                position: absolute;
                right: 8px;
                left: -60px;
                top: 60px;
            }

            .ds-event-body {
                clear: both;
            }
        }

        .ds-event-area {
            position: relative;
        }

        .ds-event-actions {
            float: right;
            display: grid;

            > * {
                display: inline-block;
            }
        }

        .ds-event-header {
            min-height: 60px;
        }

        .ds-event-cancel {
            position: absolute;
            left: -60px;
        }

        .v-input {
            margin-bottom: 8px;
        }
    }

</style>
