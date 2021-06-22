<template>
  <div class="ds-expand ds-calendar-app">

    <v-navigation-drawer fixed app v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp">
      <slot name="drawerTop"></slot>

      <slot name="drawerPicker" :calendar="calendar" :picked="rebuild">
        <div class="pa-3" v-if="calendar">
          <ds-day-picker :span="calendar.span" @picked="rebuild"></ds-day-picker>
        </div>
      </slot>

      <v-btn block @click="Logout">
        Выход
      </v-btn>


      <template>
        <v-row justify="center">
          <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-if="AddCard"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
              >
               Добавить карочку ребенка
              </v-btn>
            </template>
            <v-card>
              <v-toolbar
                  dark
                  color="primary"
              >
                <v-btn
                    icon
                    dark
                    @click="dialog = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Карочка ребенка</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn
                      dark
                      text
                      @click.stop="saveCard"
                  >
                    Сохранить
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>

              <v-divider></v-divider>
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
<!--
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
-->
                <v-row>
                  <v-col
                      cols="12"
                      md="4"
                  >
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date"
                            label="Дата Рождения"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="date"
                          no-title
                          scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>

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
                    <v-select
                        :items="cityList"
                        label="Город"
                        v-model="city"
                        required
                    ></v-select>

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
                    <v-select
                        :items="ServiceList"
                        label="Вид услуги"
                        v-model="servicetype"
                        required
                    ></v-select>

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

              </v-container>
            </v-card>
          </v-dialog>
        </v-row>
      </template>

      <template>
        <v-row justify="center">
          <v-dialog
              v-model="dialogAll"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn

                  color="success"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="findCard"
              >
                Смотреть все карточки
              </v-btn>
            </template>
            <v-card>
              <v-toolbar
                  dark
                  color="success"
              >
                <v-btn
                    icon
                    dark
                    @click="dialogAll = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Карточки ребенка</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn
                      dark
                      text
                      @click.stop="resetFilter"
                  >
                   Сбросить Фильтр
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>

              <v-divider></v-divider>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      md="3"
                  >
                    <v-text-field
                        v-model="kidf"
                        @input="findCard"
                        label="Фамилия ребенка"
                        required
                    ></v-text-field>
                  </v-col>

                  <v-col
                      cols="12"
                      md="3"
                  >

                    <v-text-field
                        v-model="kidi"
                        @input="findCard"
                        label="Имя ребенка"
                        required
                    ></v-text-field>
                  </v-col>

                  <v-col
                      cols="12"
                      md="3"
                  >
                    <v-text-field
                        v-model="kido"
                        @input="findCard"
                        label="Отчество ребенка"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      md="3"
                  >
                    <v-menu
                        ref="menu"
                        v-model="menubf"
                        :close-on-content-click="false"
                        :return-value.sync="datebf"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field

                            v-model="datebf"
                            label="Дата Рождения"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="datebf"
                          no-title
                          scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menubf = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(datebf);findCard();"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>

                  </v-col>
                </v-row>


                <template>
                  <v-expansion-panels>
                    <v-expansion-panel
                        v-for="(item,i) in babycardsList"
                        :key="i"
                    >
                      <v-expansion-panel-header>
                        {{item.kidf}} {{item.kidi}} {{item.kido}}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-text-field
                                v-model="item.kidf"
                                readonly
                                label="Фамилия ребенка"
                                required
                            ></v-text-field>
                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >

                            <v-text-field
                                v-model="item.kidi"
                                readonly
                                label="Имя ребенка"
                                required
                            ></v-text-field>
                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-text-field
                                readonly
                                v-model="item.kido"
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
                                    v-model="item.date"
                                    label="Дата Рождения"
                                    prepend-icon="mdi-calendar"
                                    readonly

                            ></v-text-field>

                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-text-field
                                v-model="item.momtel"
                                readonly
                                label="Телефон Мамы"

                            ></v-text-field>
                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-text-field
                                v-model="item.age"
                                label="Возраст"
                                readonly
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-select
                                :items="item.cityList"
                                label="Город"
                                v-model="city"
                                readonly
                            ></v-select>

                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-select
                                :items="OtdelenijeList"
                                label="Отделение"
                                v-model="item.Otdelenije"
                                readonly
                            ></v-select>

                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-text-field
                                v-model="item.ibn"

                                label="№ и/б"
                                readonly
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
                                v-model="item.finsrc"
                                readonly
                            ></v-select>

                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-select
                                :items="ServiceList"
                                label="Вид услуги"
                                v-model="item.servicetype"
                                readonly
                            ></v-select>

                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-text-field
                                v-model="item.consaltfio"
                                label="ФИО консультанта"
                                readonly
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
                                v-model="item.desc"
                                hint="Hint text"
                                readonly
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
                                v-model="item.dadtel"
                                label="Телефон Папы"
                                readonly
                            ></v-text-field>

                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-text-field
                                v-model="item.firstdiagnoz"
                                label="Клинический диагноз"
                                readonly
                            ></v-text-field>

                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-text-field
                                v-model="item.lastdiagnoz"

                                label="Сопутствующий диагноз (данные анамнеза, заключение спец-та, результ. инструмен. обслед. оперативные вмеш.)"
                                readonly
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-text-field
                                v-model="item.sikrange"

                                :counter="10"
                                label="дл-ть бол-ни"
                                readonly
                            ></v-text-field>
                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-select
                                :items="drList"
                                label="Д или Р"
                                v-model="item.dr"
                                readonly
                            ></v-select>
                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-select
                                :items="dnList"
                                label="Заб.н.с. (ЦНС)"
                                v-model="item.zapnsdn"
                                readonly
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
                                v-model="item.porkdn"
                                readonly
                            ></v-select>
                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-select
                                :items="dnList"
                                label="Генет и наслед б-ни "
                                v-model="item.genetnasdn"
                                readonly
                            ></v-select>
                          </v-col>

                          <v-col
                              cols="12"
                              md="4"
                          >
                            <v-select
                                :items="dnList"
                                label="Нарушение слуха"
                                v-model="item.narsluhdn"
                                readonly
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
                                v-model="item.narzrendn"
                                readonly
                            ></v-select>
                          </v-col>

                          <v-col
                              cols="12"
                              md="3"
                          >
                            <v-select
                                :items="tiajestList"
                                label="Тяжесть б-ни"
                                v-model="item.tiajest"
                                readonly
                            ></v-select>
                          </v-col>

                          <v-col
                              cols="12"
                              md="3"
                          >
                            <v-select
                                :items="stadijaList"
                                label="Стадия б-ни"
                                v-model="item.stadija"
                                readonly
                            ></v-select>
                          </v-col>
                          <v-col
                              cols="12"
                              md="3"
                          >
                            <v-select
                                :items="dnList"
                                label="Заб-я ОДА"
                                v-model="item.zabjadn"
                                readonly
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
                                v-model="item.psihozak"
                                hint="Hint text"
                                readonly
                            ></v-textarea>

                          </v-col>

                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </template>


              </v-container>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
      <!--
      <slot name="drawerBottom"></slot>
-->
    </v-navigation-drawer>

    <v-app-bar
      app
      flat
      fixed
      class="ds-app-calendar-toolbar"
      color="white"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
    >
      <v-toolbar-title class="ml-0" :style="toolbarStyle">
        <!--      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->
        <slot name="drawerButton">
          <v-btn fab small icon @click.stop="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </slot>

        <span class="hidden-sm-and-down">
          <slot name="title" :calendar="calendar"></slot>
        </span>
      </v-toolbar-title>

      <slot name="today" v-bind="{setToday, todayDate, calendar}">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              class="ds-skinny-button"
              depressed
              :icon="$vuetify.breakpoint.smAndDown"
              @click="setToday"
            >
              <span v-if="$vuetify.breakpoint.mdAndUp">{{ labels.today }}</span>
              <v-icon v-else>{{ labels.todayIcon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ todayDate }}</span>
        </v-tooltip>
      </slot>

      <slot name="prev" v-bind="{prev, prevLabel, calendar}">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              icon
              depressed
              class="ds-light-forecolor ds-skinny-button"
              @click="prev"
            >
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
          </template>
          <span>{{ prevLabel }}</span>
        </v-tooltip>
      </slot>
      {{username}}
      <slot name="next" v-bind="{next, nextLabel, calendar}">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              icon
              depressed
              class="ds-light-forecolor ds-skinny-button"
              @click="next"
            >
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </template>

          <span>{{ nextLabel }}</span>
        </v-tooltip>
      </slot>

      <slot name="summary" v-bind="{summary, calendar}">
        <h1 class="title ds-light-forecolor">{{ summary }}</h1>
      </slot>

      <v-spacer></v-spacer>

      <slot name="view" v-bind="{currentType, types}">
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              {{ currentType.label }}
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="type in types" :key="type.id" @click="currentType = type">
              <v-list-item-content>
                <v-list-item-title>{{ type.label }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>{{ type.shortcut }}</v-list-item-action>
            </v-list-item>
          </v-list>
        </v-menu>
      </slot>

      <slot name="menuRight"></slot>
    </v-app-bar>


    <v-main class="ds-expand">
      <v-container fluid fill-height class="ds-calendar-container">
        <ds-gestures @swipeleft="next" @swiperight="prev">
          <div v-if="currentType.schedule" class="ds-expand">
            <slot
              name="calendarAppAgenda"
              v-bind="{$scopedSlots, $listeners, calendar, add, edit, viewDay}"
            >
              <ds-agenda
                v-bind="{$scopedSlots}"
                v-on="$listeners"
                :read-only="readOnly"
                :calendar="calendar"
                @add="add"
                @edit="edit"
                @view-day="viewDay"
              ></ds-agenda>
            </slot>
          </div>

          <div v-else class="ds-expand">
            <slot
              name="calendarAppCalendar"
              v-bind="{$scopedSlots, $listeners, calendar, add, addAt, edit, viewDay, handleAdd, handleMove}"
            >
              <ds-calendar
                ref="calendar"
                v-bind="{$scopedSlots}"
                v-on="$listeners"
                :calendar="calendar"
                :read-only="readOnly"
                @add="add"
                @add-at="addAt"
                @edit="edit"
                @view-day="viewDay"
                @added="handleAdd"
                @moved="handleMove"
              ></ds-calendar>
            </slot>
          </div>
        </ds-gestures>

        <slot
          name="calendarAppEventDialog"
          v-bind="{$scopedSlots, $listeners, calendar, eventFinish}"
        >
          <ds-event-dialog
            ref="eventDialog"
            v-bind="{$scopedSlots}"
            v-on="$listeners"
            :calendar="calendar"
            :read-only="readOnly"
            @saved="eventFinish"
            @actioned="eventFinish"
          ></ds-event-dialog>
        </slot>

        <slot
          name="calendarAppOptions"
          v-bind="{optionsVisible, optionsDialog, options, chooseOption}"
        >
          <v-dialog
            ref="optionsDialog"
            v-model="optionsVisible"
            v-bind="optionsDialog"
            :fullscreen="$dayspan.fullscreenDialogs"
          >
            <v-list>
              <template v-for="option in options">
                <v-list-item :key="option.text" @click="chooseOption( option )">{{ option.text }}</v-list-item>
              </template>
            </v-list>
          </v-dialog>
        </slot>

        <slot
          name="calendarAppPrompt"
          v-bind="{promptVisible, promptDialog, promptQuestion, choosePrompt}"
        >
          <v-dialog ref="promptDialog" v-model="promptVisible" v-bind="promptDialog">
            <v-card>
              <v-card-title>{{ promptQuestion }}</v-card-title>
              <v-card-actions>
                <v-btn color="primary" text @click="choosePrompt( true )">{{ labels.promptConfirm }}</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="secondary"
                  text
                  @click="choosePrompt( false )"
                >{{ labels.promptCancel }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </slot>

        <slot name="calendarAppAdd" v-bind="{allowsAddToday, addToday}">
          <v-fab-transition v-if="!readOnly">
            <v-btn
              class="ds-add-event-today"
              color="primary"
              fixed
              bottom
              right
              fab
              v-model="allowsAddToday"
              @click="addToday"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-fab-transition>
        </slot>

        <slot name="containerInside" v-bind="{events, calendar}"></slot>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import {
  Constants,
  Sorts,
  Calendar,
  Day,
  Units,
  Weekday,
  Month,
  DaySpan,
  PatternMap,
  Time,
  Op
} from "custom-dayspan";
import axios from "axios";

export default {
  name: "dsCalendarApp",

  props: {
    events: {
      type: Array
    },
    navDrawer: {
      type: Boolean,
      default: false
    },
    calendar: {
      type: Calendar,
      default() {
        return Calendar.months();
      }
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    types: {
      type: Array,
      default() {
        return this.$dsDefaults().types;
      }
    },
    allowsAddToday: {
      type: Boolean,
      default() {
        return this.$dsDefaults().allowsAddToday;
      }
    },
    formats: {
      validate(x) {
        return this.$dsValidate(x, "formats");
      },
      default() {
        return this.$dsDefaults().formats;
      }
    },
    labels: {
      validate(x) {
        return this.$dsValidate(x, "labels");
      },
      default() {
        return this.$dsDefaults().labels;
      }
    },
    styles: {
      validate(x) {
        return this.$dsValidate(x, "styles");
      },
      default() {
        return this.$dsDefaults().styles;
      }
    },
    optionsDialog: {
      validate(x) {
        return this.$dsValidate(x, "optionsDialog");
      },
      default() {
        return this.$dsDefaults().optionsDialog;
      }
    },
    promptDialog: {
      validate(x) {
        return this.$dsValidate(x, "promptDialog");
      },
      default() {
        return this.$dsDefaults().promptDialog;
      }
    }
  },

  created() {
    this.drawer = this.navDrawer
  },
  data: vm => ({
    datebf:null,
    menubf:null,
    dialogAll:false,
    AddCard: false,
    AllCard: false,
    menu:null,
    babycardsList:[],
    dialog: false,
    username:"",
    drawer: false,
    optionsVisible: false,
    options: [],
    promptVisible: false,
    promptQuestion: "",
    promptCallback: null,


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

    date: null,
    card:false,
    defect:false,
    famili:false,
    logos:false,
    psiho:false,

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
    cityList:[
      "Москва",
      "МО",
      "РФ",
      "СНГ",
      "ИГ"

    ],
    ServiceList:[
      "Конс.",
      "Занятие",
      "Группа"

    ],
    finsrcList:[
      "ВМП",
      "ВМП-ОМС",
      "ОМС",
      "ПМУ"
    ],
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

    OtdelenijeList:[
      "гастроэнтерология",
      "дерматология",
      "кардиология",
      "КДЦ","ЛОР","нефрология",
      "ОПНД","ОПРДВ","ОЗПТ","ОСЗТ",
      "психоневрология",
      "пульмонология",
      "реанимация",
      "ревматология",
      "торакальная хирургия",
      "урология","хирургия",
      "хирургия новорожденных"
    ],
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

  }),

  watch: {
    events: "applyEvents",
    calendar: "applyEvents"
  },

  computed: {
    startDateForm () {
      //"2021-03-09"
      return new Date("Y-MM-DD");
    },
    currentType: {
      get() {
        return (
          this.types.find(
            type =>
              type.type === this.calendar.type &&
              type.size === this.calendar.size
          ) || this.types[0]
        );
      },
      set(type) {
        this.rebuild(undefined, true, type);
      }
    },

    summary() {
      let small = this.$vuetify.breakpoint.xs;

      if (small) {
        return this.calendar.start.format(this.formats.xs);
      }

      let large = this.$vuetify.breakpoint.mdAndUp;

      return this.calendar.summary(false, !large, false, !large);
    },

    todayDate() {
      return this.$dayspan.today.format(this.formats.today);
    },

    nextLabel() {
      return this.labels.next(this.currentType);
    },

    prevLabel() {
      return this.labels.prev(this.currentType);
    },

    toolbarStyle() {
      let large = this.$vuetify.breakpoint.lgAndUp;

      return large ? this.styles.toolbar.large : this.styles.toolbar.small;
    },

    hasCreatePopover() {
      return !!this.$scopedSlots.eventCreatePopover;
    },

    canAddDay() {
      return (
        this.$dayspan.features.addDay &&
        !this.readOnly &&
        !this.$dayspan.readOnly
      );
    },

    canAddTime() {
      return (
        this.$dayspan.features.addTime &&
        !this.readOnly &&
        !this.$dayspan.readOnly
      );
    }
  },

  mounted() {

    //console.log("refsApp",this.$refs)
    if(localStorage.getItem('login')){
      var LoginData = JSON.parse(localStorage.getItem('login'));
      console.log(LoginData.user);
      this.AddCard = LoginData.user.usergroup.addCard
      this.$data.username = LoginData.user.username + " - " + LoginData.user.usergroup.Title;
    }

    if (!this.$dayspan.promptOpen) {
      this.$dayspan.promptOpen = (question, callback) => {
        this.promptVisible = false;
        this.promptQuestion = question;
        this.promptCallback = callback;
        this.promptVisible = true;
      };
    }
  },

  methods: {
    resetFilter (){
      this.kidf = null,
      this.kidi = null,
      this.kido = null,
      this.datebf = null
      this.findCard();
    },
    findCard () {
      var data = {
        kidf_contains:this.kidf,
        kidi_contains:this.kidi,
        kido_contains:this.kido,
        date_contains:this.datebf

      }
      console.log(this.datebf);

      axios.get('/babycards/',{params: data})
      .then(response => {
        //this.dialog=false;
        this.babycardsList = response.data;

      })
      .catch(function (error) {
        console.log(error);
      });
    },

    saveCard () {
      var data = {

        otdelenije: this.Otdelenije,
        date:this.date,

        kidf:this.kidf,
        kidi:this.kidi,
        kido:this.kido,

        mamf:this.mamf,
        mami:this.mami,
        mamo:this.mamo,

        dadf:this.dadf,
        dadi:this.dadi,
        dado:this.dadi,

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
        psihozak:this.psihozak,



      }

      axios.post('/babycards/', data)
      .then(response => {
        this.dialog=false;
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });


    },
    Logout(){

      localStorage.removeItem("login");
      localStorage.removeItem("dayspanState")
      window.location.href = '/'
    },
    setState(state) {
      state.eventSorter = state.listTimes
        ? Sorts.List([Sorts.FullDay, Sorts.Start])
        : Sorts.Start;

      this.calendar.set(state);

      this.triggerChange();
    },

    applyEvents() {
      if (this.events) {
        this.calendar.removeEvents();
        this.calendar.addEvents(this.events);
      }
    },

    isType(type, aroundDay) {
      let cal = this.calendar;

      return (
        cal.type === type.type &&
        cal.size === type.size &&
        (!aroundDay || cal.span.matchesDay(aroundDay))
      );
    },

    rebuild(aroundDay, force, forceType) {
      let type = forceType || this.currentType || this.types[2];

      if (this.isType(type, aroundDay) && !force) {
        return;
      }

      let input = {
        type: type.type,
        size: type.size,
        around: aroundDay,
        eventsOutside: true,
        preferToday: false,
        listTimes: type.listTimes,
        updateRows: type.updateRows,
        updateColumns: type.listTimes,
        fill: !type.listTimes,
        otherwiseFocus: type.focus,
        repeatCovers: type.repeat
      };

      this.setState(input);
    },

    next() {
      this.calendar.unselect().next();

      this.triggerChange();
    },

    prev() {
      this.calendar.unselect().prev();

      this.triggerChange();
    },

    setToday() {
      this.rebuild(this.$dayspan.today);
    },

    viewDay(day) {
      this.rebuild(day, false, this.types[0]);
    },

    edit(calendarEvent) {
      let eventDialog = this.$refs.eventDialog;

      eventDialog.edit(calendarEvent);
    },

    editPlaceholder(createEdit) {
      let placeholder = createEdit.calendarEvent;
      let details = createEdit.details;
      let eventDialog = this.$refs.eventDialog;
      let calendar = this.$refs.calendar;

      eventDialog.addPlaceholder(placeholder, details);
      eventDialog.$once("close", calendar.clearPlaceholder);
    },

    add(day) {
      if (!this.canAddDay) {
        return;
      }

      let eventDialog = this.$refs.eventDialog;
      let calendar = this.$refs.calendar;
      let useDialog = !this.hasCreatePopover;

      calendar.addPlaceholder(day, true, useDialog);

      if (useDialog) {
        eventDialog.add(day);
        eventDialog.$once("close", calendar.clearPlaceholder);
      }
    },

    addAt(dayHour) {
      if (!this.canAddTime) {
        return;
      }

      let eventDialog = this.$refs.eventDialog;
      let calendar = this.$refs.calendar;
      let useDialog = !this.hasCreatePopover;
      let at = dayHour.day.withHour(dayHour.hour);

      calendar.addPlaceholder(at, false, useDialog);

      if (useDialog) {
        eventDialog.addAt(dayHour.day, dayHour.hour);
        eventDialog.$once("close", calendar.clearPlaceholder);
      }
    },

    addToday() {
      if (!this.canAddDay) {
        return;
      }

      let eventDialog = this.$refs.eventDialog;
      let calendar = this.$refs.calendar;
      let useDialog = !this.hasCreatePopover || !calendar;

      let day = this.$dayspan.today;

      if (!this.calendar.filled.matchesDay(day)) {
        let first = this.calendar.days[0];
        let last = this.calendar.days[this.calendar.days.length - 1];
        let firstDistance = Math.abs(first.currentOffset);
        let lastDistance = Math.abs(last.currentOffset);

        day = firstDistance < lastDistance ? first : last;
      }

      calendar && calendar.addPlaceholder(day, true, useDialog);

      if (useDialog) {
        eventDialog.add(day);

        calendar && eventDialog.$once("close", calendar.clearPlaceholder);
      }
    },

    handleAdd(addEvent) {
      let eventDialog = this.$refs.eventDialog;
      let calendar = this.$refs.calendar;

      addEvent.handled = true;

      if (!this.hasCreatePopover) {
        if (addEvent.placeholder.fullDay) {
          eventDialog.add(addEvent.span.start, addEvent.span.days(Op.UP));
        } else {
          eventDialog.addSpan(addEvent.span);
        }

        eventDialog.$once("close", addEvent.clearPlaceholder);
      } else {
        calendar.placeholderForCreate = true;
      }
    },

    handleMove(moveEvent) {
      let calendarEvent = moveEvent.calendarEvent;
      let target = moveEvent.target;
      let targetStart = target.start;
      let sourceStart = calendarEvent.time.start;
      let schedule = calendarEvent.schedule;
      let options = [];

      moveEvent.handled = true;

      let callbacks = {
        cancel: () => {
          moveEvent.clearPlaceholder();
        },
        single: () => {
          calendarEvent.move(targetStart);
          this.eventsRefresh();
          moveEvent.clearPlaceholder();

          this.$emit("event-update", calendarEvent.event);
        },
        instance: () => {
          calendarEvent.move(targetStart);
          this.eventsRefresh();
          moveEvent.clearPlaceholder();

          this.$emit("event-update", calendarEvent.event);
        },
        duplicate: () => {
          schedule.setExcluded(targetStart, false);
          this.eventsRefresh();
          moveEvent.clearPlaceholder();

          this.$emit("event-update", calendarEvent.event);
        },
        all: () => {
          schedule.moveTime(sourceStart.asTime(), targetStart.asTime());
          this.eventsRefresh();
          moveEvent.clearPlaceholder();

          this.$emit("event-update", calendarEvent.event);
        }
      };

      options.push({
        text: this.labels.moveCancel,
        callback: callbacks.cancel
      });

      if (schedule.isSingleEvent()) {
        options.push({
          text: this.labels.moveSingleEvent,
          callback: callbacks.single
        });

        if (this.$dayspan.features.moveDuplicate) {
          options.push({
            text: this.labels.moveDuplicate,
            callback: callbacks.duplicate
          });
        }
      } else {
        if (this.$dayspan.features.moveInstance) {
          options.push({
            text: this.labels.moveOccurrence,
            callback: callbacks.instance
          });
        }

        if (this.$dayspan.features.moveDuplicate) {
          options.push({
            text: this.labels.moveDuplicate,
            callback: callbacks.duplicate
          });
        }

        if (
          this.$dayspan.features.moveAll &&
          !schedule.isFullDay() &&
          targetStart.sameDay(sourceStart)
        ) {
          options.push({
            text: this.labels.moveAll,
            callback: callbacks.all
          });
        }
      }

      this.options = options;
      this.optionsVisible = true;
    },

    chooseOption(option) {
      if (option) {
        option.callback();
      }

      this.optionsVisible = false;
    },

    choosePrompt(yes) {
      this.promptCallback(yes);
      this.promptVisible = false;
    },

    eventFinish(ev) {
      this.triggerChange();
    },

    eventsRefresh() {
      this.calendar.refreshEvents();

      this.triggerChange();
    },

    triggerChange() {
      this.$emit("change", {
        calendar: this.calendar
      });
    }
  }
};
</script>

<style lang="scss">
.ds-app-calendar-toolbar {
  .v-toolbar__content {
    border-bottom: 1px solid rgb(224, 224, 224);
  }
}

.ds-skinny-button {
  margin-left: 2px !important;
  margin-right: 2px !important;
}

.ds-expand {
  width: 100%;
  height: 100%;
}

.ds-calendar-container {
  padding: 0px !important;
  position: relative;
}

.v-btn--floating.ds-add-event-today {
  .v-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
