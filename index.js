const cron = require('node-cron');

const VCBcron = require('./VCBcron.js')
const MOMOcron = require('./MOMOcron.js')

console.log(new Date().toString())
VCBcron()
MOMOcron()

cron.schedule('*/4 6-18 * * *', () => {
    //Run every 4 minutes, between 06:00 AM and 07:59 PM
    VCBcron();
    console.log(new Date().toString())
})

cron.schedule('*/30 * * * *', () => {
    //Cron session every 30 minutes
    MOMOcron();
    console.log(new Date().toString())
})