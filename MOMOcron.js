const SendDiscord = require("./SendDiscord");

function MOMOcron() {
  // load .env
  require("dotenv").config();
  const momoUrl = process.env.MOMO_URL;
  const discordUrl = process.env.DISCORD_URL;

  // dayjs library
  const dayjs = require("dayjs");
  require("dayjs/locale/vi");
  dayjs.locale("vi");

  var currentTime = dayjs().format("HH:mm:ss | dddd, DD/MM/YYYY");

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
        SendDiscord(
          "MOMO lỗi",
          "15080644",
          JSON.stringify(error) + "\n" + currentTime
        );
        console.log(JSON.stringify(error));
      });
  };

  getSessionMomo();
}

module.exports = MOMOcron;
