const dayjs = require("dayjs");
require("dayjs/locale/vi");
dayjs.locale("vi");
const SendDiscord = require("./SendDiscord");

// console.log(today);

const checkVCB = () => {
  var today = dayjs().format("DD/MM/YYYY");
  const axios = require("axios");
  var data = JSON.stringify({
    begin: today,
    end: today,
    username: "0938568040",
    password: "UFTNG9uzq$zu%4bUNMau",
    accountNumber: "0071001027650",
  });

  let config = {
    method: "post",
    url: "http://vcb.hophamlam.com/Vietcombank-new/index.php/api",
    headers: {
      "Content-Type": "text/plain",
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      //   console.log(JSON.stringify(response.data));
      // if (response.data.results == 0) return console.log("nice")      else console.log("đéo");
      response.data.results !== 0
        ? console.log("có giao dịch trong ngày")
        : console.log("ĐÉO có tiền");
      for (let i = 0; i < response.data.results.length; i++) {
        // console.log(typeof response.data.results[i].PCTime);
        // 200 = 2 phút
        var timestamp = dayjs().format("HH:mm:ss | dddd, DD/MM/YYYY");
        console.log(timestamp);
        if (
          parseInt(response.data.results[i].PCTime) >
          parseInt(dayjs().format("HHmmss")) - 200
        ) {
          console.log("có nè: " + JSON.stringify(response.data.results[i]));
          SendDiscord(
            "có giao dịch Vietcombank",
            "3901184",
            timestamp + "\n" + JSON.stringify(response.data.results[i])
          );
        } else {
          return;
        }
      }
    })

    .catch((error) => {
      console.log(error);
    });
};

checkVCB();
// console.log(dayjs().format("HHmmss"));

const cron = require("node-cron");
cron.schedule("*/2 6-18 * * *", () => {
  //Run every 4 minutes, between 06:00 AM and 07:59 PM
  checkVCB();
});

// if (checkVCB().results !== 0) return "nice";
// else "test";
