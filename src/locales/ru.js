export default {
    promptLabels: {
        actionRemove: 'Вы уверены, что хотите удалить это мероприятие?',
        actionExclude: 'Вы действительно хотите удалить это событие?',
        actionCancel: 'Вы уверены, что хотите отменить это мероприятие?',
        actionUncancel: 'Вы уверены, что хотите отменить отменить это мероприятие?',
        actionSetStart: 'Вы уверены, что хотите установить это вхождение первым?',
        actionSetEnd: 'Вы уверены, что хотите установить это событие как последнее?',
        actionMove: 'Вы уверены, что хотите переместить это мероприятие?',
        actionInclude: 'Вы уверены, что хотите добавить событие?',
        move: 'Вы уверены, что хотите переместить это мероприятие?',
        toggleAllDay: 'Вы уверены, что хотите изменить, будет ли это событие происходить весь день?',
        removeExistingTime: 'Вы уверены, что хотите удалить все события, произошедшие сейчас?'
    },
    placeholder: {
        noTitle: ''
    },
    colors: [
        {text: 'Red'},
        {text: 'Pink'},
        {text: 'Purple'},
        {text: 'Deep Purple'},
        {text: 'Indigo'},
        {text: 'Blue'},
        {text: 'Glue'},
        {text: 'Light Blue'},
        {text: 'Cyan'},
        {text: 'Teal'},
        {text: 'Green'},
        {text: 'Light Green'},
        {text: 'Lime'},
        {text: 'Yellow'},
        {text: 'Amber'},
        {text: 'Orange'},
        {text: 'Deep Orange'},
        {text: 'Brown'},
        {text: 'Blue Gray'},
        {text: 'Gray'},
        {text: 'Black'}
    ],
    icons: [
        {text: 'Семейный психолог'},
        {text: 'Дефектолог'},
        {text: 'Логопед'},
        {text: 'Психолог'}
    ],
    // icons: [
    //     {text: 'Модератор'},
    //     {text: 'Дефектолог'},
    //     {text: 'Логопеды'},
    //     {text: 'Психологи'},
    //     {text: "Семейный психолог"}
    // ],
    defaults: {
        dsDay: {
            formats: {
                month: 'MMM'
            }
        },
        dsCalendarApp: {

            types: [
                {label: 'День'},
                {label: 'Неделя'},
                {label: 'Месяц'},
                {label: 'Год'},
                {label: 'Расписание'},
                {label: '4 дня'}
            ],
            formats: {
                today: 'dddd, MMMM D',
                xs: 'MMM'
            },
            labels: {
                next: (type) => type ? 'Следующий ' + type.label.toLowerCase() : 'Следующий',
                prev: (type) => type ? 'Предыдущий ' + type.label.toLowerCase() : 'Предыдущий',
                moveCancel: 'Отменить переезд',
                moveSingleEvent: 'Переместить событие',
                moveOccurrence: 'Переместить только это событие',
                moveAll: 'Переместить все вхождения событий',
                moveDuplicate: 'Добавить событие',
                promptConfirm: 'Да',
                promptCancel: 'Нет',
                today: 'CЕГОДНЯ'
            }
        },
        dsAgendaEvent: {
            formats: {
                firstLine: 'ddd',
                secondLine: 'MMM Do',
                start: 'dddd, MMMM D',
                time: 'h:mm a'
            },
            labels: {
                allDay: 'Весь день',
                options: 'Параметры',
                close: 'Закрывать',
                day: ['день', 'дни'],
                days: ['день', 'дни'],
                minute: ['минута', 'минуты'],
                minutes: ['минута', 'минуты'],
                hour: ['час', 'часы'],
                hours: ['час', 'часы'],
                week: ['неделя', 'недели'],
                weeks: ['неделя', 'недели'],
                second: ['секунда', 'секунды'],
                seconds: ['секунда', 'секунды'],
                busy: 'Занятый',
                free: 'Свободный'
            }
        },
        dsCalendarEventChip: {
            formats: {
                fullDay: 'ddd MMM Do YYYY',
                timed: 'ddd MMM Do YYYY'
            }
        },
        dsCalendarEventPopover: {
            formats: {
                start: 'dddd, MMMM D',
                time: 'h:mm a'
            },
            labels: {
                allDay: 'Весь день',
                options: 'Параметры',
                close: 'Закрывать',
                day: ['день', 'дни'],
                days: ['день', 'дни'],
                minute: ['минута', 'минуты'],
                minutes: ['минута', 'минуты'],
                hour: ['час', 'часы'],
                hours: ['час', 'часы'],
                week: ['неделя', 'недели'],
                weeks: ['неделя', 'недели'],
                second: ['секунда', 'секунды'],
                seconds: ['секунда', 'секунды'],
                busy: 'Занятый',
                free: 'Свободный'
            }
        },
        dsCalendarEventCreatePopover: {
            formats: {
                start: 'dddd, MMMM D',
                time: 'h:mm a'
            },
            labels: {
                title: 'Добавить заголовок',
                allDay: 'Весь день',
                options: 'Параметры',
                close: 'Закрывать',
                day: ['день', 'дни'],
                days: ['день', 'дни'],
                minute: ['минута', 'минуты'],
                minutes: ['минута', 'минуты'],
                hour: ['час', 'часы'],
                hours: ['час', 'часы'],
                week: ['неделя', 'недели'],
                weeks: ['неделя', 'недели'],
                second: ['секунда', 'секунды'],
                seconds: ['секунда', 'секунды'],
                busy: 'Занятый',
                free: 'Свободный',
                location: 'Местоположение',
                description: 'Описание',
                calendar: 'Календарь',
            },
            busyOptions: [
                {text: 'Занятый'},
                {text: 'Свободный'}
            ]
        },
        dsSchedule: {
            labels: {
                editCustom: 'Редактировать'
            }
        },
        dsEvent: {
            labels: {
                moreActions: '...',
                cancel: 'Отменить изменения мероприятия',
                save: 'Сохранить',
                title: 'Заголовок',
                exclusions: 'Это события или промежутки времени, когда обычно происходящее событие было исключено из расписания. События здесь исключаются, если возникновение события перемещено.',
                inclusions: 'Это события или промежутки времени, когда события были добавлены вне обычного расписания. События добавляются сюда, если возникновение события перемещается. ',
                cancelled: 'Это события или промежутки времени, когда события были отменены.',
                edit: 'Изменить мероприятие',
                add: 'Добавить мероприятие',
                location: 'Добавить местоположение',
                description: 'Добавить описание',
                calendar: 'Календарь',
                tabs: {
                    details: 'Детали события',
                    forecast: 'Прогноз',
                    removed: 'Удаленный',
                    added: 'Добавлен',
                    cancelled: 'Отменено'
                }
            },
            busyOptions: [
                {text: 'Занятый'},
                {text: 'Бесплатно'}
            ]
        },
        dsScheduleActions: {
            labels: {
                remove: 'Удалить это мероприятие',
                exclude: 'Удалить это вхождение',
                cancel: 'Отменить это вхождение',
                uncancel: 'Отменить отмену',
                move: 'Переместить это вхождение',
                include: 'Добавить новое вхождение',
                setStart: 'Установить как первое вхождение',
                setEnd: 'Установить как последнее появление',
                pickerOk: 'OK',
                pickerCancel: 'Отмена'
            }
        },
        dsScheduleForecast: {
            labels: {
                prefix: 'Прогноз показывает предыдущий и следующий',
                suffix: 'наступление события в течение года.'
            }
        },
        dsScheduleFrequencyDay: {
            labels: {
                type: 'Дни'
            },
            options: [
                {text: 'Любой день'},
                {text: 'В следующие дни ...'},
                {text: 'Каждые _ дней, начиная с _'}
            ],
            types: [
                {text: 'День месяца'},
                {text: 'Последний день месяца'},
                {text: 'День года'}
            ]
        },
        dsScheduleFrequencyDayOfWeek: {
            weekdays: [
                'Воскресенье',
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота'],
            labels: {
                type: 'Дни недели'
            },
            options: [
                {text: 'В любой день недели'},
                {text: 'В следующие дни недели ...'},
                {text: 'Каждый _ будний день, начиная с _'},
                {text: 'Выходные'},
                {text: 'Будни'}
            ]
        },
        dsScheduleFrequencyMonth: {
            labels: {
                type: 'Месяцы'
            },
            months: [
                'Январь',
                'Февраль',
                'Маршировать',
                'Апреля',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь'
            ],
            options: [
                {text: 'В любой месяц'},
                {text: 'В следующие месяцы ...'},
                {text: 'Каждые _ месяцев, начиная с _'}
            ]
        },

        dsScheduleFrequencyWeek: {
            labels: {
                type: 'Недели'
            },
            options: [
                {text: 'Любую неделю'},
                {text: 'В следующие недели ...'},
                {text: 'Каждые _ недель, начиная с _'}
            ],
            types: [
                {text: 'Неделя месяца (у первой недели четверг)'},
                {text: 'Продолжительность недели месяца (начинается в первый день месяца)'},
                {text: 'Полная неделя месяца (0-я = предыдущая неделя, если таковая была)'},
                {text: 'Последняя неделя месяца (начинается в последний день месяца)'},
                {text: 'Последняя полная неделя месяца (0-я = следующая неделя, если таковая имеется)'},
                {text: 'Неделя года (у первой недели четверг)'},
                {text: 'Неделя года (начинается в первый день года)'},
                {text: 'Полная неделя года (0-я = предыдущая неделя, если таковая была)'},
                {text: 'Последняя неделя года (начинается в последний день года)'},
                {text: 'Последняя полная неделя года (0-я = следующая неделя, если таковая имеется)'}
            ]
        },

        dsScheduleFrequencyYear: {
            labels: {
                type: 'Годы'
            },
            options: [
                {text: 'В любой год'},
                {text: 'В последующие годы ...'},
                {text: 'Каждые _ лет, начиная с _'}
            ]
        },

        dsScheduleSpan: {
            labels: {
                startless: 'Начало времени',
                endless: 'Конец времени'
            },
            formats: {
                start: 'MMMM Do, YYYY',
                end: 'MMMM Do, YYYY'
            }
        },

        dsScheduleTime: {
            labels: {
                remove: 'Удалить время',
                add: 'Добавить время'
            },
            titles: {
                start: 'Начало цикла'
            }
        },

        dsScheduleTimes: {
            labels: {
                all: 'Все дни',
                minute: 'минута',
                minutes: 'минут',
                hour: 'час',
                hours: 'часы',
                day: 'день',
                days: 'дни',
                week: 'неделя',
                weeks: 'недель',
                month: 'месяц',
                months: 'месяцев',
                second: 'секунда',
                seconds: 'секунд'
            },
            titles: {
                duration: 'Продолжительность цикла'
            }
        },

        dsScheduleType: {
            formats: {
                date: 'LL'
            }
        },

        dsScheduleTypeCustomDialog: {
            labels: {
                save: 'Сохранить',
                cancel: 'Отмена'
            }
        },

        dsWeekDayHeader: {
            formats: {
                weekday: 'ddd'
            }
        },

        dsWeeksView: {
            weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
        },

        dsDaysView: {
            hours: [
                '    ', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
                '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'
            ]
        },

        dsDayPicker: {
            weekdays: ['Воскресенье','Понедельник','Вторник', 'Среда', 'Четверг','Пятница','Суббота'],
            labels: {
                prevMonth: 'Прошлый месяц',
                nextMonth: 'Следующий месяц'
            }
        }
    }
}
