// function VCBcron() {
// load .env
require("dotenv").config();
var username = process.env.VCB_LOGIN_USERNAME;
var password = process.env.VCB_LOGIN_PASSWORD;
var accountNumber = process.env.VCB_LOGIN_ACCOUNTNUMBER;
var vcbFetchLink = process.env.VCB_URL;
var discordUrl = process.env.DISCORD_URL;

// dayjs library
const dayjs = require("dayjs");
require("dayjs/locale/vi");
dayjs.locale("vi");

var currentTime = dayjs().format("HH:mm:ss | dddd, DD/MM/YYYY");

const sendMessageDiscordVCB = (messageDiscord) => {
  const axios = require("axios");
  let data = JSON.stringify({
    embeds: [
      {
        title: "Vietcombank lỗi",
        color: "902144",
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

const checkVCB = () => {
  var date = new Date();
  console.log(
    new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(date)
  );

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  var axios = require("axios");
  var data = JSON.stringify({
    begin: today,
    end: today,
    username: username,
    password: password,
    accountNumber: accountNumber,
  });

  var config = {
    method: "post",
    url: vcbFetchLink,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      console.log("Lấy giao dịch VCB thành công");
      if (response.data.results.length === 0) {
        console.log("Không có giao dịch");
      } else {
        console.log(JSON.stringify(response.data.results));
      }
    })

    .catch(function (error) {
      sendMessageDiscordVCB(JSON.stringify(error));
      console.log(JSON.stringify(error));
    });
};

//test if works fine -> log "ko giao dịch" ; if api backend fail -> send discord message
checkVCB();
sendMessageDiscordVCB("Khởi chạy VCBcron");
// }

// module.exports = VCBcron;
