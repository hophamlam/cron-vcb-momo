const cron = require('node-cron');

function VCBcron() {

// require('dotenv').config(); 
// var username = process.env.VCB_LOGIN_USERNAME
// var password = process.env.VCB_LOGIN_PASSWORD
// var accountNumber = process.env.VCB_LOGIN_ACCOUNTNUMBER
// var vcbFetchLink = process.env.SERVER_URL + ':' + process.env.VCB_EXTERNAL_PORT+'/api/vcb/transactions'



// console.log(username + password + accountNumber)
// console.log(vcbFetchLink)
console.log(new Date().toString())

// const sendMessageDiscord = () => {
//   var messageDiscord = "Vietcombank lỗi " + new Date();
//   var axios = require('axios');
//   var FormData = require('form-data');
//   var data = new FormData();
//   data.append('content', messageDiscord);
  
//   var config = {
//     method: 'post',
//     url: 'https://discord.com/api/webhooks/1008656290463109201/6YCO-J9pIF0EZv_4cylRueuPdvXU4KR2R9u3Rt8QmRUZrRtKKKj32qW0Fi1WAuA6DFRH',
//     headers: { 
//       'Content-Type': 'application/x-www-form-urlencoded', 
//       'Cookie': '__cfruid=be29ca0b0acd77d393277ec967425509a92b7aba-1660553750; __dcfduid=0f7577621c7811edbf7cdeffafb5e155; __sdcfduid=0f7577621c7811edbf7cdeffafb5e155fa163fdf4b26c835f5b8fa76777cef0c6ea7b05755fff7e0a324e03446dc7f86', 
//       ...data.getHeaders()
//     },
//     data : data
//   };
  
//   axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
  
// }

const checkVCB = () => {
  var username = "0938568040"
  var password = "UFTNG9uzq$zu%4bUNMau"
  var accountNumber = "1012842851"
  var vcbFetchLink = "http://103.130.219.9:4000/api/vcb/transactions"
  var date = new Date();
  console.log(new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(date));
  
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;
  
  var axios = require('axios');
  var data = JSON.stringify({
    "begin": today,
    "end": today,
    "username": username,
    "password": password,
    "accountNumber": accountNumber
  });
  
  var config = {
    method: 'post',
    url: vcbFetchLink,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    console.log("Lấy giao dịch VCB thành công")
    if(response.data.transactions.length === 0) {
      console.log('Không có giao dịch')
    }
    else {
      console.log(response.data.transactions)
    }
  })
  
  .catch(function (error) {
    // sendMessageDiscord()
    console.log(error);
  });
}

checkVCB()

//test if works fine -> log "ko giao dịch" ; if api backend fail -> send discord message

// cron.schedule('*/3 * * * *', () => {
// //Run every 4 minutes, between 06:00 AM and 07:59 PM
//   checkVCB()
//   console.log(new Date().toString())
//   // sendMessageDiscord()
// })

}

module.exports = VCBcron;