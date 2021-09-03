module.exports = ({ env }) => ({
  email: {
    provider: 'smtp',
    providerOptions: {
      host: 'smtp.timeweb.ru', //SMTP Host
      port: 465   , //SMTP Port
      secure: true,
      username: 'admin@cdcmc.ru',
      password: '!4L@mer90',
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    },
    settings: {
      from: 'admin@cdcmc.ru',
      replyTo: 'cpukiller1991@gmail.com',
    },
  },
});
