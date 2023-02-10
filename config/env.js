// const env = {
//   database: "test",
//   username: "boardactive",
//   password: "boardactive",
//   host: "localhost", //192.168.103.148
//   dialect: "postgres",
//   port:1100
// };

// module.exports = { env };

module.exports = {
  HOST: "localhost",
  USER: "boardactive",
  PASSWORD: "boardactive",
  DB: "carloan",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
