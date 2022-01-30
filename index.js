'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: "bpY469Z+z1B+d4IcHuQvp6/3E6hoZpjJbHXnveYojdmzhhlniCIfxA7KIxRMqq01TY9OsWeKUfhMg7XMHhuAS5oxwwuoR+FQhUz7TtDTGXFuXnGJgJqWY5+uTFmBUTgrqu5EnwVeqQ8EZ9H0gn9NKQdB04t89/1O/w1cDnyilFU=",
  channelSecret: "7a645eda466d07b4cbf860c211a53b8f",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});


// event handler
function handleEvent(event) {
  var echo = '';
  var big_blank = '\n\n\t\t\t';
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    //const echo = {type : 'text', text: event.type+" "+event.message.type};
    if(event.message.type == 'sticker'){
      echo = [{type : 'sticker', packageId : '6359', stickerId : '11069853'}, 
                    {type: 'text', text: '\t\t\tสวัสดี ขอบคุณที่ส่งข้อความหาเรา\nท่านสามาถพิมพ์สายรถที่ท่านต้องการเพื่อดูตารางเวลาเดินรถ'+big_blank
                     +'Hello! Thank you for messaging us. You can type bus line to see the schedules of that line.'}];
    }
  }
  // create a echoing text message
  else{
    var time = '* 07.00 เป็นต้นไป (รถจะออกจากสถานีทุก 10 นาที) และจะหยุดให้บริการเวลา 18.00';
    if(event.message.text == 'สาย 1A' ||
            event.message.text == 'สาย 1a' ||
            event.message.text == 'สาย1A' ||
            event.message.text == 'สาย1a' ||
            event.message.text == '1A' ||
            event.message.text == '1a'){
      echo = [{type: 'text', text: 'ตารางเวลาการเดินรถสาย 1A'+big_blank+time}, {type : 'text', text : 'สถานี EV (ศูนย์ประชุม) — '
      +'โรงอาหาร SC — โรงอาหาร Green — หอพักโซน A-B-C — อาคารสังคมศาสตร์/ศูนย์กีฬา — สถานี EV (เดินรถทางเดียว)'}];
      // use reply API
    }
    else if(event.message.text == 'สาย 1B' ||
            event.message.text == 'สาย 1b' ||
            event.message.text == 'สาย1B' ||
            event.message.text == 'สาย1b' ||
            event.message.text == '1B' ||
            event.message.text == '1b'){
      echo = [{type: 'text', text: 'ตารางเวลาการเดินรถสาย 1B'+big_blank+time}, {type : 'text', text : 'สถานี EV (ศูนย์ประชุม) — '
      +'อาคารสังคมศาสตร์/ศูนย์กีฬา — หอพักโซน C-B-A — โรงอาหาร Green — โรงอาหาร SC — สถานี EV (เดินรถทางเดียว)'}];
      // use reply API
    }
    else if(event.message.text == 'สาย 2' ||
            event.message.text == 'สาย2' ||
            event.message.text == '2'){
      echo = [{type: 'text', text: 'ตารางเวลาการเดินรถสาย 2'+big_blank+time}, {type : 'text', text : 'สถานี EV (ศูนย์ประชุม) — '
      +'โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ — คณะสายสุขศาสตร์ — คณะสายวิทยาศาสตร์ — โรงอาหาร Green — หอพักโซน A-B (กลับเส้นทางเดิม)'}];
      // use reply API
    }
    else if(event.message.text == 'สาย 3' ||
            event.message.text == 'สาย3' ||
            event.message.text == '3'){
      echo = [{type: 'text', text: 'ตารางเวลาการเดินรถสาย 3'+big_blank+time}, {type : 'text', text : 'สถานี TU Dome — ประตูเชียงราก 1 '
      +'— ศูนย์กีฬา/อาคารสังคมศาสตร์ — โรงอาหาร Green — หอพักโซน A-B (กลับเส้นทางเดิม)'}];
      // use reply API
    }
    else if(event.message.text == 'สาย 5' ||
            event.message.text == 'สาย5' ||
            event.message.text == '5'){
      echo = [{type: 'text', text: 'ตารางเวลาการเดินรถสาย 5'+big_blank+time}, {type : 'text', text : 'สถานี EV (ศูนย์ประชุม) — โรงอาหาร SC — '
      +'คณะสายศึกษาศาสตร์ — คณะสายวิทยาศาสตร์ — คณะสายสุขศาสตร์ — โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ (กลับเส้นทางเดิม)'}];
      // use reply API
    }
    else {
      echo = {type:'text', text:'ทางเราไม่สามารถตอบคำถามที่ท่านพิมพ์มาได้ ขออภัยในความไม่สะดวก\n\nSorry, we cannot response the message you sent.'}
    }
  }
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});