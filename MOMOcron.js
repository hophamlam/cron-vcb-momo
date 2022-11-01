// function MOMOcron() {
// load .env
require("dotenv").config();
const momoUrl = process.env.MOMO_URL;
const discordUrl = process.env.DISCORD_URL;

// dayjs library
const dayjs = require("dayjs");
require("dayjs/locale/vi");
dayjs.locale("vi");

var currentTime = dayjs().format("HH:mm:ss | dddd, DD/MM/YYYY");

const sendMessageDiscordMOMO = (messageDiscord) => {
  const axios = require("axios");
  let data = JSON.stringify({
    embeds: [
      {
        title: "MOMO lỗi",
        color: "16711884",
        description: messageDiscord + "\n" + currentTime,
      },
    ],
  });

  let config = {
    method: "post",
    url: discordUrl,
    headers: {
      "Content-Type": "application/json",
      Cookie:
        "__cfruid=8665f2afd4aa6968b81f464ae2d4bdbfd4152cc0-1667221583; __dcfduid=0f7577621c7811edbf7cdeffafb5e155; __sdcfduid=0f7577621c7811edbf7cdeffafb5e155fa163fdf4b26c835f5b8fa76777cef0c6ea7b05755fff7e0a324e03446dc7f86",
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
    });
};

const getSessionMomo = () => {
  var axios = require("axios");
  var config = {
    method: "get",
    url: momoUrl + "/session.php",
    headers: {},
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if (response.data.message === "Thành công") {
        console.log("Cron momo session thành công");
      } else {
        sendMessageDiscordMOMO(JSON.stringify(response.data.message));
        console.log(JSON.stringify(response.data.message));
      }
    })

    .catch(function (error) {
      sendMessageDiscordMOMO(JSON.stringify(error));
      console.log(JSON.stringify(error));
    });
};

sendMessageDiscordMOMO("Khởi chạy MOMOcron ");
getSessionMomo();
// }

// module.exports = MOMOcron;
