function SendDiscord(titleDiscord, colorMessage, messageDiscord) {
  require("dotenv").config();
  var discordUrl = process.env.DISCORD_URL;

  const dayjs = require("dayjs");
  require("dayjs/locale/vi");
  dayjs.locale("vi");

  var currentTime = dayjs().format("HH:mm:ss | dddd, DD/MM/YYYY");

  const sendMessageDiscord = (titleDiscord, colorMessage, messageDiscord) => {
    const axios = require("axios");
    let data = JSON.stringify({
      embeds: [
        {
          title: titleDiscord,
          color: colorMessage,
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
        console.log(currentTime + ": Gửi tin nhắn Discord thành công");
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };
  return sendMessageDiscord(titleDiscord, colorMessage, messageDiscord);
}
module.exports = SendDiscord;
