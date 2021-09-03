'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */
//import dayjs from "dayjs"
const dayjs = require('dayjs');
module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }
  '* */1 * * *': async (ctx) => {
    //var reminders = await strapi.services.reminders.find();
    var curentDate = dayjs(new Date()).format("YYYY-MM-DD");

    var reminders = await strapi.query('reminders').find({"reminderDate_lte":new Date()});

    //{reminderDate_gt: new Date()}
    console.log("DATE ->",curentDate,new Date())
    reminders.forEach( async (Reminder) => {
      //console.log(Reminder.task_board.postanovshik)
      if(Reminder.task_board.postanovshik && Reminder.task_board.otvetstvenni) {

        var postanovshik = await strapi.query('user', 'users-permissions').findOne({id: Reminder.task_board.postanovshik});
        //Reminder.postanovshik
        var otvetstvenni = await strapi.query('user', 'users-permissions').findOne({id: Reminder.task_board.otvetstvenni});
        //Reminder.otvetstvenni

        var reminderDate = dayjs(Reminder.reminderDate).format("YYYY-MM-DD");
        //console.log("DATE ->",new Date())
        console.log("otvetstvenni---->",
          otvetstvenni.username,
          otvetstvenni.email)
        console.log("🚀 ~ 5sec Reminder", reminderDate,
          "postanovshik---->",
          postanovshik.username,
          postanovshik.email);

        var email = await strapi.plugins['email'].services.email.send({
          to:  otvetstvenni.email,
          //from: 'admin@admi.cdmc.ru',
          // cc: 'helenedarroze@strapi.io',
          // bcc: 'ghislainearabian@strapi.io',
          // replyTo: 'annesophiepic@strapi.io',
          subject: 'Напоминалка исполнителю',
          text: 'Hello world!',
          html: 'Hello world!',
        });

        var email1 = await strapi.plugins['email'].services.email.send({
          to: postanovshik.email,
          //from: 'admin@admi.cdmc.ru',
          // cc: 'helenedarroze@strapi.io',
          // bcc: 'ghislainearabian@strapi.io',
          // replyTo: 'annesophiepic@strapi.io',
          subject: 'Напоминалка постановщику',
          text: 'Hello world!',
          html: 'Hello world!',
        });
        var deleteReminder = await strapi.query('reminders').delete({id:Reminder.id})
        console.log("del rem",deleteReminder,"email",email)
      }
    })

  },
};
