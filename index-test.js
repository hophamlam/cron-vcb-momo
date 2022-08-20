const cron = require('node-cron');

//tk gaolamthuy
var username = '0938568040'
var password = 'UFTNG9uzq$zu%4bUNMau'
var accountNumber = '1012842851'
var vcbFetchLink = 'http://103.130.219.9:4000/api/vcb/transactions'

const date = new Date();
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
    if(response.data.transactions.length == 0) {
      console.log('Không có giao dịch')
    }
    else {
      console.log(response.data.transactions)
    }
  })

  
  .catch(function (error) {
    console.log(error);
  });



cron.schedule('*/4 * * * *', () => {
//run at every 4'

  const date = new Date();
  console.log(new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(date));

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;
  console.log(today)

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
    if(response.data.transactions.length == 0) {
      console.log('Không có giao dịch')
    }
    else {
      console.log(response.data.transactions)
    }
  })

  
  .catch(function (error) {
    console.log(error);
  });
});
