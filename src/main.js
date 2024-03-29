import Vue from 'vue'
import DaySpanVuetify from './plugin'
import App from './app'
import vuetify from './plugins/vuetify'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './styles/app.scss'

import fr from './locales/fr'
import en from './locales/ru'
import de from './locales/de'
import ca from './locales/ca'
import nl from './locales/nl'
import ru from './locales/en'


import {
    en as ds_en,
    fr as ds_fr,
    nl as ds_nl
  } from 'custom-dayspan'


Vue.config.productionTip = false

Vue.use(DaySpanVuetify,
    {
        data:
            {
                locales: {ru,en, fr, de, nl, ca}
            },
        methods:
            {
                getDefaultEventColor () {
                    return '#1976d2'
                }
            }
    })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    vuetify,
    render: h => h(App)
})
