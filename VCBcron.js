const SendDiscord = require("./SendDiscord");

function VCBcron() {
  // load .env
  require("dotenv").config();
  var username = process.env.VCB_LOGIN_USERNAME;
  var password = process.env.VCB_LOGIN_PASSWORD;
  var accountNumber = process.env.VCB_LOGIN_ACCOUNTNUMBER;
  var vcbFetchLink = process.env.VCB_URL;

  // dayjs library
  const dayjs = require("dayjs");
  require("dayjs/locale/vi");
  dayjs.locale("vi");

  var currentTime = dayjs().format("HH:mm:ss | dddd, DD/MM/YYYY");
  const checkVCB = () => {
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
        console.log(currentTime + ": Lấy giao dịch VCB thành công: ");
        if (response.data.results.length === 0) {
          console.log("Không có giao dịch");
        } else {
          console.log(JSON.stringify(response.data.results));
        }
      })

      .catch(function (error) {
        SendDiscord(
          "Vietcombank lỗi",
          "3901184",
          currentTime + "\n" + JSON.stringify(error)
        );
        console.log(JSON.stringify(error));
      });
  };
  checkVCB();

  //test if works fine -> log "ko giao dịch" ; if api backend fail -> send discord message
}

module.exports = VCBcron;
