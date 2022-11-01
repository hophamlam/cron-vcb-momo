const dayjs = require("dayjs");
require("dayjs/locale/vi");
dayjs.locale("vi");

console.log(dayjs().format("DD/MMMM/YYYY"));
