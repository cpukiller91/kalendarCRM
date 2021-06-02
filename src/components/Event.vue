<template>

    <div class="ds-event" :class="classes">

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
            <div style="height: 40px"></div>
            <!-- Title -->
            <slot name="scheduleTitle" v-bind="{schedule, schedule, calendarEvent, details}">

                <!-- class="ds-textfield ds-calendar-event-title" -->
                <v-text-field single-line hide-details solo flat
                              class="ds-event-title"
                              :label="labels.title"
                              :readonly="true"
                              v-model="details.title"
                ></v-text-field>

            </slot>

        </div>
      <!--
              <div class="ds-event-body ds-event-area">

                  <slot name="schedule" v-bind="slotData">

                      <ds-schedule
                              :schedule="schedule"
                              :day="day"
                              :read-only="readOnly"
                      ></ds-schedule>

                  </slot>

              </div>

               Tabs -->
        <v-layout row v-if="hasTabs">
            <v-flex xs12 class="mt-2">


                <v-tabs class="text--primary" v-model="tab">

                    <v-tab href="#details"  v-if="this.card">
                      Карточка
                    </v-tab>

                    <v-tab v-if="this.defect" href="#forecast" >
                      Дефектолог
                    </v-tab>

                    <v-tab v-if="this.logos" href="#exclusions" >
                      Логопед
                    </v-tab>

                    <v-tab v-if="this.psiho" href="#inclusions" >
                      Психолог
                    </v-tab>

                    <v-tab v-if="this.famili"  href="#cancelled" >
                      Семейный Психолог
                    </v-tab>

                    <slot name="eventTabsExtra" v-bind="slotData"></slot>

                    <!-- Details -->
                    <v-tab-item v-if="this.card" value="details">
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
                                          v-model="kidf"

                                          label="Фамилия ребенка"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >

                                      <v-text-field
                                          v-model="kidi"

                                          label="Имя ребенка"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="kido"
                                          label="Отчество ребенка"
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
                                          v-model="mamf"

                                          label="Фамилия Мамы"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >

                                      <v-text-field
                                          v-model="mami"

                                          label="Имя Мамы"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="mamo"
                                          label="Отчество Мамы"
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
                                          v-model="dadf"

                                          label="Фамилия Папы"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >

                                      <v-text-field
                                          v-model="dadi"

                                          label="Имя Папы"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="dado"
                                          label="Отчество Папы"
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
                                          v-model="startDateForm"
                                          label="Дата"
                                          prepend-icon="mdi-calendar"

                                      ></v-text-field>

                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="momtel"

                                          label="Телефон Мамы"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="age"
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
                                          v-model="city"
                                          :counter="10"
                                          label="Город"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-select
                                          :items="OtdelenijeList"
                                          label="Отделение"
                                          v-model="Otdelenije"
                                          required
                                      ></v-select>

                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="ibn"

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
                                      <v-select
                                          :items="finsrcList"
                                          label="Источн финансирования"
                                          v-model="finsrc"
                                          required
                                      ></v-select>

                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="servicetype"
                                          label="Вид услуги"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="consaltfio"
                                          label="ФИО консультанта"
                                          required
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="12"
                                    >
                                      <v-textarea
                                          label="Примечание (неявка или др.)"
                                          v-model="desc"
                                          hint="Hint text"
                                      ></v-textarea>

                                    </v-col>

                                  </v-row>

                                  <v-row>



                                  </v-row>

                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="dadtel"
                                          label="Телефон Папы"
                                          required
                                      ></v-text-field>

                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="firstdiagnoz"
                                          label="Клинический диагноз"
                                          required
                                      ></v-text-field>

                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-text-field
                                          v-model="lastdiagnoz"

                                          label="Сопутствующий диагноз (данные анамнеза, заключение спец-та, результ. инструмен. обслед. оперативные вмеш.)"
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
                                          v-model="sikrange"

                                          :counter="10"
                                          label="дл-ть бол-ни"
                                          required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-select
                                          :items="drList"
                                          label="Д или Р"
                                          v-model="dr"
                                          required
                                      ></v-select>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-select
                                          :items="dnList"
                                          label="Заб.н.с. (ЦНС)"
                                          v-model="zapnsdn"
                                          required
                                      ></v-select>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-select
                                          :items="dnList"
                                          label="Врожд пороки развития"
                                          v-model="porkdn"
                                          required
                                      ></v-select>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-select
                                          :items="dnList"
                                          label="Генет и наслед б-ни "
                                          v-model="genetnasdn"
                                          required
                                      ></v-select>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                      <v-select
                                          :items="dnList"
                                          label="Нарушение слуха"
                                          v-model="narsluhdn"
                                          required
                                      ></v-select>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="3"
                                    >
                                      <v-select
                                          :items="dnList"
                                          label="Нарушение зрения"
                                          v-model="narzrendn"
                                          required
                                      ></v-select>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="3"
                                    >
                                      <v-select
                                        :items="tiajestList"
                                        label="Тяжесть б-ни"
                                        v-model="tiajest"
                                        required
                                    ></v-select>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        md="3"
                                    >
                                      <v-select
                                          :items="stadijaList"
                                          label="Стадия б-ни"
                                          v-model="stadija"
                                          required
                                      ></v-select>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="3"
                                    >
                                      <v-select
                                          :items="dnList"
                                          label="Заб-я ОДА"
                                          v-model="zabjadn"
                                          required
                                      ></v-select>
                                    </v-col>

                                  </v-row>
                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="12"
                                    >
                                      <v-textarea
                                          label="Психолого-педагогическое заключение"
                                          v-model="psihozak"
                                          hint="Hint text"
                                      ></v-textarea>

                                    </v-col>

                                  </v-row>
                                  <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    > <!-- Save -->
                                      <slot name="scheduleSave" v-bind="{hasSave, save, labels, readOnly}">

                                        <v-btn
                                            v-if="AddCard"
                                            class="ds-button-tall ml-3 mt-0 mb-2" depressed
                                            color="primary"
                                            :disabled="!canSave"
                                            @click.stop="save">

                                          <span v-html="labels.save"></span>

                                        </v-btn>

                                      </slot></v-col>
                                  </v-row>

                                </v-container>
                              </v-form>

                            </v-card-text>
                        </v-card>
                    </v-tab-item>

                    <!-- Forecast -->
                    <v-tab-item v-if="this.defect" value="forecast" >
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
                            <v-row>
                              <v-col
                                  cols="12"
                                  md="4"
                              > <!-- Save -->
                                <slot name="scheduleSave" v-bind="{hasSave, save, labels, readOnly}">

                                  <v-btn
                                      v-if="!isReadOnly"
                                      class="ds-button-tall ml-3 mt-0 mb-2" depressed
                                      color="primary"
                                      :disabled="!canSave"
                                      @click.stop="saveDefect">

                                    <span v-html="labels.save"></span>

                                  </v-btn>

                                </slot></v-col>
                            </v-row>
                          </v-form>
                          <template>
                            <v-expansion-panels focusable>
                              <v-expansion-panel
                                  v-for="(item,i) in defectologs"
                                  :key="i"
                              >
                                <v-expansion-panel-header>{{item.id}} - Комментарий специалиста ({{item.created_at}})</v-expansion-panel-header>

                                <v-expansion-panel-content>
                                  <v-text-field
                                      v-model="item.defIntel"
                                      :counter="200"
                                      :readonly="true"
                                      label="Степень нарушения интеллекта"
                                      required
                                  ></v-text-field>
                                  <v-text-field
                                      v-model="item.gefMind"
                                      :counter="200"
                                      :readonly="true"
                                      label="Форма мышления"
                                      required
                                  ></v-text-field>
                                  <v-text-field
                                      v-model="item.defAge"
                                      :counter="200"
                                      :readonly="true"
                                      label="Актуал. психол. возраст"
                                      required
                                  ></v-text-field>
                                  <v-text-field
                                      v-model="item.defSipr"
                                      :counter="200"
                                      :readonly="true"
                                      label="Рекомендуемая АООП, СИПР"
                                      required
                                  ></v-text-field>
                                </v-expansion-panel-content>

                              </v-expansion-panel>
                            </v-expansion-panels>
                          </template>
                        </v-card-text>

                      </v-card>
                    </v-tab-item>

                    <!-- Exclusions -->
                    <v-tab-item v-if="this.logos" value="exclusions" >
                      <v-card flat>
                        <v-card-text>

                          <v-form
                              ref="form"
                              v-model="valid"
                              lazy-validation
                          >
                            <v-select
                                :items="CharacteristicsSpeech"
                                v-model="characteristics"
                                label="Характеристика речи"
                                required
                            ></v-select>

                            <v-select
                                :items="AssociatedViolations"
                                v-model="associated"
                                label="Сопутствующие наруш."
                                required
                            ></v-select>


                            <v-text-field
                                v-model="logoActual"
                                :counter="200"

                                label="Актуальное речевое развитие+Нормативное речевое развитие"
                                required
                            ></v-text-field>
                            <v-row>
                              <v-col
                                  cols="12"
                                  md="4"
                              > <!-- Save -->
                                <slot name="scheduleSave" v-bind="{hasSave, save, labels, readOnly}">

                                  <v-btn
                                      class="ds-button-tall ml-3 mt-0 mb-2" depressed
                                      color="primary"
                                      @click.stop="saveLogoped">

                                    <span v-html="labels.save"></span>

                                  </v-btn>

                                </slot></v-col>
                            </v-row>
                          </v-form>
                          <template>
                            <v-expansion-panels focusable>
                              <v-expansion-panel
                                  v-for="(item,i) in logopeds"
                                  :key="i"
                              >
                                <v-expansion-panel-header>{{item.id}} - Комментарий специалиста ({{item.created_at}})</v-expansion-panel-header>

                                <v-expansion-panel-content>
                                  <v-select
                                      :items="CharacteristicsSpeech"
                                      v-model="item.characteristics"
                                      label="Характеристика речи"
                                      :readonly="true"
                                      required
                                  ></v-select>

                                  <v-select
                                      :items="AssociatedViolations"
                                      v-model="item.associated"
                                      label="Сопутствующие наруш."
                                      :readonly="true"
                                      required
                                  ></v-select>


                                  <v-text-field
                                      v-model="item.logoactual"
                                      :counter="200"
                                      :readonly="true"
                                      label="Актуальное речевое развитие+Нормативное речевое развитие"
                                      required
                                  ></v-text-field>
                                </v-expansion-panel-content>

                              </v-expansion-panel>
                            </v-expansion-panels>
                          </template>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>

                    <!-- Inclusions -->
                    <v-tab-item v-if="this.psiho" value="inclusions" >
                      <v-card flat>
                        <v-card-text>

                          <v-form
                              ref="form"
                              v-model="valid"
                              lazy-validation
                          >
                            <v-select
                                :items="emotionalCondition"
                                v-model="emotionalcondition"
                                label="эмоциональное состояние "
                                required
                            ></v-select>

                            <v-select
                                :items="MotivationalSphere"
                                v-model="motivationalsphere"
                                label="Мотивационно-потребностная сфера "
                                required
                            ></v-select>

                            <v-select
                                :items="SocialContacts"
                                v-model="socialcontacts"
                                label="Социальные контакты "
                                required
                            ></v-select>

                            <v-text-field
                                v-model="dopolstesor"
                                :counter="200"
                                label="Дополнительные стрессоры"
                                required
                            ></v-text-field>

                            <v-select
                                :items="nspecificDifficulties"
                                v-model="nspecificdifficulties"
                                label="неспецифические трудности"
                                required
                            ></v-select>

                            <v-select
                                :items="specificDifficulties"
                                v-model="specificdifficulties"
                                label="специфические трудности"
                                required
                            ></v-select>

                            <v-text-field
                                v-model="actualtrabl"
                                :counter="200"

                                label="актуальная психологическая проблема"
                                required
                            ></v-text-field>
                            <v-select
                                :items="directionsRehabilitation"
                                label="направления реабилитация "
                                v-model="directionsrehabilitation"
                                required
                            ></v-select>
                            <v-select
                                :items="formOfWork"
                                label="основная форма работы "
                                v-model="formofwork"
                                required
                            ></v-select>
                            <v-select
                                :items="parentingAttitude"
                                v-model="parentingattitude"
                                label="спитательная установка родителей"
                                required
                            ></v-select>

                            <v-row>
                              <v-col
                                  cols="12"
                                  md="4"
                              > <!-- Save -->
                                <slot name="scheduleSave" v-bind="{hasSave, save, labels, readOnly}">

                                  <v-btn
                                      class="ds-button-tall ml-3 mt-0 mb-2" depressed
                                      color="primary"

                                      @click.stop="savePsiholog">

                                    <span v-html="labels.save"></span>

                                  </v-btn>

                                </slot></v-col>
                            </v-row>
                          </v-form>
                          <template>
                            <v-expansion-panels focusable>
                              <v-expansion-panel
                                  v-for="(item,i) in psiholog"
                                  :key="i"
                              >
                                <v-expansion-panel-header>{{item.id}} - Комментарий специалиста ({{item.created_at}})</v-expansion-panel-header>

                                <v-expansion-panel-content>
                                  <v-select
                                      :items="emotionalCondition"
                                      v-model="item.emotionalcondition"
                                      label="эмоциональное состояние "
                                      :readonly="true"
                                      required
                                  ></v-select>

                                  <v-select
                                      :items="MotivationalSphere"
                                      v-model="item.motivationalsphere"
                                      label="Мотивационно-потребностная сфера "
                                      :readonly="true"
                                      required
                                  ></v-select>

                                  <v-select
                                      :items="SocialContacts"
                                      v-model="item.socialcontacts"
                                      label="Социальные контакты "
                                      :readonly="true"
                                      required
                                  ></v-select>

                                  <v-text-field
                                      v-model="item.dopolstesor"
                                      :counter="200"
                                      label="Дополнительные стрессоры"
                                      :readonly="true"
                                      required
                                  ></v-text-field>

                                  <v-select
                                      :items="nspecificDifficulties"
                                      v-model="item.nspecificdifficulties"
                                      label="неспецифические трудности"
                                      :readonly="true"
                                      required
                                  ></v-select>

                                  <v-select
                                      :items="specificDifficulties"
                                      v-model="item.specificdifficulties"
                                      label="специфические трудности"
                                      :readonly="true"
                                      required
                                  ></v-select>

                                  <v-text-field
                                      v-model="item.actualtrabl"
                                      :counter="200"
                                      :readonly="true"
                                      label="актуальная психологическая проблема"
                                      required
                                  ></v-text-field>
                                  <v-select
                                      :items="directionsRehabilitation"
                                      label="направления реабилитация "
                                      v-model="item.directionsrehabilitation"
                                      :readonly="true"
                                      required
                                  ></v-select>
                                  <v-select
                                      :items="formOfWork"
                                      label="основная форма работы "
                                      v-model="item.formofwork"
                                      :readonly="true"
                                      required
                                  ></v-select>
                                  <v-select
                                      :items="parentingAttitude"
                                      v-model="item.parentingattitude"
                                      label="спитательная установка родителей"
                                      :readonly="true"
                                      required
                                  ></v-select>
                                </v-expansion-panel-content>

                              </v-expansion-panel>
                            </v-expansion-panels>
                          </template>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>

                    <!-- Cancelled -->
                    <v-tab-item v-if="this.famili" value="cancelled" >
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
                                v-model="agecategory"
                                required
                            ></v-select>
                            <v-select
                                :items="emotionalCondition"
                                v-model="emotional"
                                label="эмоциональное состояние "
                                required
                            ></v-select>
                            <v-select
                                :items="personalCharacteristics"
                                v-model="personalcharacteristics"
                                label="личностные характеристики "
                                required
                            ></v-select>
                            <v-select
                                :items="behaviorSituation"
                                v-model="behaviorsituation"
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
                                v-model="experiencesickshild"
                                label="наличие опыта воспитания больного ребенка "
                                required
                            ></v-select>

                            <v-select
                                :items="availabilitySupport"
                                v-model="availabilitysupport"
                                label="наличие поддержки и помощи "
                                required
                            ></v-select>

                            <v-select
                                :items="childIllness"
                                v-model="childillness"
                                label="восприятие матерью болезни ребенка "
                                required
                            ></v-select>

                            <v-select
                                :items="additionalStressors"
                                v-model="additionalstressors"
                                label="дополнительные стрессоры "
                                required
                            ></v-select>

                            <v-text-field
                                v-model="stressor"
                                :counter="200"

                                label="Примечание (укажите какие стрессоры)"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="actualtr"
                                :counter="200"

                                label="актуальная проблема"
                                required
                            ></v-text-field>
                            <v-select
                                :items="directionsRehabilitation"
                                label="направления реабилитация "
                                v-model="directionsrehabilit"
                                required
                            ></v-select>
                            <v-row>
                              <v-col
                                  cols="12"
                                  md="4"
                              > <!-- Save -->
                                <slot name="scheduleSave" v-bind="{hasSave, save, labels, readOnly}">

                                  <v-btn
                                      class="ds-button-tall ml-3 mt-0 mb-2" depressed
                                      color="primary"

                                      @click.stop="saveSimPsiholog">

                                    <span v-html="labels.save"></span>

                                  </v-btn>

                                </slot></v-col>
                            </v-row>
                          </v-form>
                          <template>
                            <v-expansion-panels focusable>
                              <v-expansion-panel
                                  v-for="(item,i) in simpsiholog"
                                  :key="i"
                              >
                                <v-expansion-panel-header>{{item.id}} - Комментарий специалиста ({{item.created_at}})</v-expansion-panel-header>

                                <v-expansion-panel-content>
                                  <v-select
                                      :items="ageCategory"
                                      label="возрастная категория "
                                      v-model="item.agecategory"
                                      :readonly="true"
                                      required
                                  ></v-select>
                                  <v-select
                                      :items="emotionalCondition"
                                      label="эмоциональное состояние "
                                      v-model="item.emotional"
                                      :readonly="true"
                                      required
                                  ></v-select>
                                  <v-select
                                      :items="personalCharacteristics"
                                      label="личностные характеристики "
                                      v-model="item.personalcharacteristics"
                                      :readonly="true"
                                      required
                                  ></v-select>
                                  <v-select
                                      :items="behaviorSituation"
                                      label="поведение в ситуации стресса "
                                      v-model="item.behaviorsituation"
                                      :readonly="true"
                                      required
                                  ></v-select>

                                  <v-text-field
                                      v-model="item.behaviorDesc"
                                      :counter="200"
                                      :readonly="true"
                                      label="поведение в ситуации стресса описание"
                                      required
                                  ></v-text-field>
                                  <v-select
                                      :items="experienceSickChild"
                                      v-model="item.experiencesickshild"
                                      label="наличие опыта воспитания больного ребенка "
                                      required
                                      :readonly="true"
                                  ></v-select>

                                  <v-select
                                      :items="availabilitySupport"
                                      v-model="item.availabilitysupport"
                                      label="наличие поддержки и помощи "
                                      required
                                      :readonly="true"
                                  ></v-select>

                                  <v-select
                                      :items="childIllness"
                                      v-model="item.childillness"
                                      label="восприятие матерью болезни ребенка "
                                      required
                                      :readonly="true"
                                  ></v-select>

                                  <v-select
                                      :items="additionalStressors"
                                      v-model="item.additionalstressors"
                                      label="дополнительные стрессоры "
                                      required
                                      :readonly="true"
                                  ></v-select>

                                  <v-text-field
                                      v-model="item.stressor"
                                      :counter="200"
                                      :readonly="true"
                                      label="Примечание (укажите какие стрессоры)"
                                      required
                                  ></v-text-field>
                                  <v-text-field
                                      v-model="item.actualtr"
                                      :counter="200"
                                      :readonly="true"
                                      label="актуальная проблема"
                                      required
                                  ></v-text-field>
                                  <v-select
                                      :items="directionsRehabilitation"
                                      label="направления реабилитация "
                                      v-model="item.directionsrehabilit"
                                      :readonly="true"
                                      required
                                  ></v-select>
                                </v-expansion-panel-content>

                              </v-expansion-panel>
                            </v-expansion-panels>
                          </template>
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
import axios from "axios";
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
      AddCard: false,
        tab: 'details',
        babycardid:null,
        defectologs:[],
        logopeds:[],
        psiholog:[],
        simpsiholog:[],

      emotional:null,
      personalcharacteristics:null,
      behaviorsituation:null,
      experiencesickshild:null,
      availabilitysupport:null,
      childillness:null,
      additionalstressors:null,
      stressor:null,
      actualtr:null,
      directionsrehabilit:null,

        emotionalcondition:null,
        motivationalsphere:null,
        socialcontacts:null,
        dopolstesor:null,
        nspecificdifficulties:null,
        specificdifficulties:null,
        actualtrabl:null,
        directionsrehabilitation:null,
        formofwork:null,
        parentingattitude:null,

        agecategory:null,
        //date: this.calendarEvent.start.format("Y-MM-DD"),
        card:false,
        defect:false,
        famili:false,
        logos:false,
        psiho:false,

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

        psihozak:"",
        stadijaList:["З","Р","О","П"],
        stadija:"",
        tiajestList:["З","Л","С","Т"],
        tiajest:"",
        dnList:["Д","Н"],
        zabjadn:"",
        narzrendn:"",
        narsluhdn:"",
        genetnasdn:"",
        porkdn:"",
        zapnsdn:"",

        drList:["Д","Р"],
        dr:"",
        sikrange:"",
        firstdiagnoz:"",
        lastdiagnoz:"",
        dadtel:"",
        dadfio:"",
        momtel:"",
        momfio:"",
        desc:"",
        consaltfio:"",
        servicetype:"",
        finsrcList:["ВМП","ПМУ","ОМС"],
        finsrc:"",
        ibn:"",
        city:"",
        Otdelenije:"",
        age:"",

        mamf:"",
        mami:"",
        mamo:"",

        dadf:"",
        dadi:"",
        dado:"",

        kidf:"",
        kidi:"",
        kido:"",

        OtdelenijeList:["ОПРДВ","ОПНД","ОЗПТ","ОДВЛ (ВИП)","ОСЗТ","У(ОКМП)","КДЦ" ],
        parentingAttitude:["личностно-ориентированная","на обучение", "на лечение", "отстраненная"],
        formOfWork:["мониторинг", "информирование", "психообразование", "игровая терапия", "арт-терапия", "включение в продуктивную деятельность", "групповая терапия", "помощь в формировании ближайших жизненных перспектив"],
        specificDifficulties:["трудности адаптации к ситуации госпитализации", "фиксация на психофизическом дискомфорте", "конфликтное самоотношение", "негативный образ телесного Я", "трудности адаптации к новым социальным условиям в ситуации манифестации болезни", "сужение деятельности и общения в ситуации длительного хронического заболевания", "низкая комлаентность", "страхи медицинских процедур"],
        nspecificDifficulties:["несформированность норм и правил поведения", "недостаточная произвольность ЭВС", "повышенная внутриличностная конфликтность", "снижение учебной мотивации", "проблемы самоопредения", "возрастные кризисы", "трудности адаптация к школе"],
        SocialContacts:["широкий круг общения", "суженный", "ограничен общением с близким"],
        MotivationalSphere:["норма", "инф", "суж", "девиант", "искаж"],

        AssociatedViolations:["дизартрия", "диз.симпт.", "заикание", "алалия", "афазия", "наруш.письма", "чтения"],
        associated:"",
        CharacteristicsSpeech:["норма", "задер.", "особ.ф.р.", "наруш.фор.р./ ОНР/системн.н.р. + уровни"],
        characteristics:"",

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
     mounted () {

        var LoginData = JSON.parse(localStorage.getItem('login'));
        this.AddCard = LoginData.user.usergroup.addCard
        axios.get('/users', {params:{username:LoginData.user.username}})
        .then(response => {
          console.log("User load");
          this.card = response.data[0].usergroup.card;
          this.defect = response.data[0].usergroup.defect;
          this.famili = response.data[0].usergroup.famili;
          this.logos = response.data[0].usergroup.logos;
          this.psiho = response.data[0].usergroup.psiho;

          //this.details.color = response.data[0].usergroup.color;
          //console.log(response);
          this.reload();
          //this.edit();
        });




    },
    methods:
        {
          saveDefect(){
            axios.post('/defectologs', {
              defIntel:this.defIntel,
              gefMind:this.gefMind,
              defAge:this.defAge,
              defSipr:this.defSipr,
              babycard: this.babycardid
            })
            .then(response => {
              this.reload();
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            console.log("Save Def")
          },
          saveLogoped(){
            axios.post('/logopeds', {
              characteristics:this.characteristics,
              associated:this.associated,
              logoactual:this.logoActual,
              babycard: this.babycardid
            })
            .then(response => {
              this.reload();
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            console.log("Save Logo")
          },
          savePsiholog(){
            axios.post('/psihologs', {
              emotionalcondition:this.emotionalcondition,
              motivationalsphere:this.motivationalsphere,
              socialcontacts:this.socialcontacts,
              dopolstesor: this.dopolstesor,
              nspecificdifficulties:this.nspecificdifficulties,
              specificdifficulties:this.specificdifficulties,
              actualtrabl:this.actualtrabl,
              directionsrehabilitation:this.directionsrehabilitation,
              formofwork:this.formofwork,
              parentingattitude:this.parentingattitude,
              babycard: this.babycardid

            })
            .then(response => {
              this.reload();
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            console.log("Save Psiholog")
          },
          saveSimPsiholog(){
            axios.post('/simpsihologs', {
              agecategory:this.agecategory,
              babycard: this.babycardid,
              emotional:this.emotional,
              personalcharacteristics:this.personalcharacteristics,
              behaviorsituation:this.behaviorsituation,
              behaviorDesc:this.behaviorDesc,
              experiencesickshild:this.experiencesickshild,
              availabilitysupport:this.availabilitysupport,
              childillness:this.childillness,
              additionalstressors:this.additionalstressors,
              stressor:this.stressor,
              actualtr:this.actualtr,
              directionsrehabilit:this.directionsrehabilit

            })
            .then(response => {
              console.log(response);
              this.reload();
            })
            .catch(function (error) {
              console.log(error);
            });
            console.log("Save SimPsiholog")
          },

          reload(){
            axios.get('/eventlists/', {
              params:{title:this.details.title,
                month:this.month,
                dayOfMonth:this.dayOfMonth}})
            .then(response => {

              console.log("Card reload");
              this.babycardid = response.data[0].babycard.id;


              console.log(response.data[0].babycard.id)

              axios.get('/babycards/'+response.data[0].babycard.id,)
                .then(resp => {
                  response = resp.data;
                  //console.log("babycards",response);
                  this.defectologs = response.defectologs;
                  this.logopeds = response.logopeds;
                  this.psiholog = response.psihologs;
                  this.simpsiholog = response.simpsihologs;
                  this.age = response.age;
                  this.Otdelenije = response.otdelenije;

                  this.date = response.date;
                  this.kidf = response.kidf;
                  this.kidi = response.kidi;
                  this.kido = response.kido;

                  this.mamf = response.mamf;
                  this.mami = response.mami;
                  this.mamo = response.mamo;
                  this.momtel = response.momtel;
                  this.dadtel = response.dadtel;

                  this.dadf = response.dadf;
                  this.dadi = response.dadi;
                  this.dado = response.dado;

                  this.city = response.city
                  this.ibn = response.ibn
                  this.finsrc = response.finsrc
                  this.servicetype = response.servicetype
                  this.consaltfio = response.consaltfio
                  this.desc = response.desc;

                  this.lastdiagnoz = response.lastdiagnoz;
                  this.firstdiagnoz = response.firstdiagnoz;
                  this.sikrange = response.sikrange;
                  this.dr = response.dr;
                  this.zapnsdn = response.zapnsdn;
                  this.porkdn = response.porkdn;
                  this.genetnasdn = response.genetnasdn;
                  this.narsluhdn = response.narsluhdn;
                  this.narzrendn = response.narzrendn;
                  this.zabjadn = response.zabjadn;
                  this.tiajest = response.tiajest;
                  this.stadija = response.stadija;
                  this.psihozak = response.psihozak;


                })
                .catch(function (error) {
                  console.log(error);
                })
            })


          },
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
              var data = {
                Title:this.details.title,
                otdelenije: this.Otdelenije,
                date:this.startDateForm,

                kidf:this.kidf,
                kidi:this.kidi,
                kido:this.kido,

                mamf:this.mamf,
                mami:this.mami,
                mamo:this.mamo,

                dadf:this.dadf,
                dadi:this.dadi,
                dado:this.dadi,
                age:this.age,
                city:this.city,
                ibn:this.ibn,
                finsrc:this.finsrc,
                servicetype:this.servicetype,
                consaltfio:this.consaltfio,
                desc:this.desc,
                momfio:this.momfio,
                momtel:this.momtel,
                dadfio:this.dadfio,
                dadtel:this.dadtel,
                lastdiagnoz:this.lastdiagnoz,
                firstdiagnoz:this.firstdiagnoz,
                sikrange:this.sikrange,
                dr:this.dr,
                zapnsdn:this.zapnsdn,
                porkdn: this.porkdn,
                genetnasdn:this.genetnasdn,
                narsluhdn:this.narsluhdn,
                narzrendn:this.narzrendn,
                zabjadn:this.zabjadn,
                tiajest:this.tiajest,
                stadija:this.stadija,
                psihozak:this.psihozak

              }

              axios.put('/babycards/'+this.babycardid, data)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              })
              .then(function () {
                // always executed
              });

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
