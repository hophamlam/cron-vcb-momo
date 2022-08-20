var cron = require('node-cron');

function MOMOcron() {
// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '../client/.env') }); 
// const momoUrl = process.env.SERVER_URL + ':' + process.env.MOMO_EXTERNAL_PORT 
const momoUrl = "http://103.130.219.9:8091"
// var currentTime = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())
// console.log(currentTime)
// console.log(momoUrl)

var messageDiscord = "MOMO lỗi"

const sendMessageDiscord = () => {
  var axios = require('axios');
  var FormData = require('form-data');
  var data = new FormData();
  data.append('content', messageDiscord);
  
  var config = {
    method: 'post',
    url: 'https://discord.com/api/webhooks/1008656290463109201/6YCO-J9pIF0EZv_4cylRueuPdvXU4KR2R9u3Rt8QmRUZrRtKKKj32qW0Fi1WAuA6DFRH',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Cookie': '__cfruid=be29ca0b0acd77d393277ec967425509a92b7aba-1660553750; __dcfduid=0f7577621c7811edbf7cdeffafb5e155; __sdcfduid=0f7577621c7811edbf7cdeffafb5e155fa163fdf4b26c835f5b8fa76777cef0c6ea7b05755fff7e0a324e03446dc7f86', 
      ...data.getHeaders()
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  
}

const getSessionMomo = ()=> {
    var axios = require('axios');
    var config = {
      method: 'get',
      url: momoUrl + '/session.php',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
        if (response.data.message === "Thành công"){
          console.log("Cron momo session thành công")
        } else {
          sendMessageDiscord()
        }
      })
    
    .catch(function (error) {
      console.log(error);
    });
    
}

const getTransactionMomo = ()=> {
    var axios = require('axios');
    var config = {
      method: 'get',
      url: momoUrl + '/transaction.php',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
        console.log("Lấy giao dịch MOMO thành công")
        var allMomoNotification = response.data.message.data.notifications
    //   console.log(JSON.stringify(allMomoNotification));
      for (let i = 0 ; i < allMomoNotification.length ; i++) {
        if (allMomoNotification[i].tranId !== 0) {
            var transactionMillisecond = allMomoNotification[i].time
            var transactionLocaleDate = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'full', timeStyle: 'long' }).format(transactionMillisecond)
            var transactionCaption = allMomoNotification[i].caption
            var transactionSender = allMomoNotification[i].sender
            var transactionMessage = transactionCaption + ' số điện thoại ' + transactionSender + ' lúc ' + transactionLocaleDate
            console.log(transactionMessage)
        } 
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

getSessionMomo()

// cron.schedule('*/30 * * * *', () => {
//   getSessionMomo()
//   var currentTime = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())
//   console.log(currentTime)
//   console.log('running every 30 minutes');
// });

// cron.schedule('*/15 * * * *', () => {
//   getTransactionMomo()
//   var currentTime = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())
//   console.log(currentTime)
//   console.log('running every 15 minute');
// });

}

module.exports = MOMOcron;