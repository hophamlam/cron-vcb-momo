const SendDiscord = require("./SendDiscord");

function MOMOcron() {
  // load .env
  require("dotenv").config();
  const momoUrl = process.env.MOMO_URL;

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
        if (response.data.message === "Thành công") {
          console.log(
            currentTime +
              ": Cron momo session thành công" +
              JSON.stringify(response.data)
          );
        } else {
          SendDiscord(
            "MOMO lỗi",
            "15080644",
            JSON.stringify(response.data.message)
          );
          console.log(JSON.stringify(response.data.message));
        }
      })

      .catch(function (error) {
        SendDiscord(
          "MOMO lỗi",
          "15080644",
          currentTime + "\n" + JSON.stringify(error)
        );
        console.log(JSON.stringify(error));
      });
  };

  getSessionMomo();
}

module.exports = MOMOcron;
