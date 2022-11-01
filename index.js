// dayjs library
const dayjs = require("dayjs");
require("dayjs/locale/vi");
dayjs.locale("vi");
var currentTime = dayjs().format("HH:mm:ss | dddd, DD/MM/YYYY");

const cron = require("node-cron");
const VCBcron = require("./VCBcron.js");
const MOMOcron = require("./MOMOcron.js");
const SendDiscord = require("./SendDiscord");

// SendDiscord("Khởi chạy cron", VCBcron() + MOMOcron());
VCBcron();
MOMOcron();
SendDiscord("Khởi chạy cron", 0, "");

// cron.schedule("*/4 6-18 * * *", () => {
//   //Run every 4 minutes, between 06:00 AM and 07:59 PM
//   VCBcron();
//   console.log(new Date().toString());
// });

// // cron.schedule('*/4 * * * *', () => {
// //     //Run every 4 minutes, all day
// //     VCBcron();
// //     console.log(new Date().toString())
// // })

// cron.schedule("*/30 * * * *", () => {
//   //Cron session every 30 minutes
//   MOMOcron();
//   console.log(new Date().toString());
// });
