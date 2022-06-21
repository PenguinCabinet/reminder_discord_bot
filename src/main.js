const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, "DIRECT_MESSAGES"] , partials: ["CHANNEL"] });

var machina = require('machina'); 

require('dayjs/locale/ja');
var dayjs = require('dayjs'); 
//dayjs.locale('ja') 
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault("Asia/Tokyo")


function Get_now(){
	return dayjs().tz()
}


var peg = require("pegjs");
const fs = require('fs');
const CronJob = require('cron').CronJob;

var parser = peg.generate(fs.readFileSync("./src/parser.pegjs").toString());

let text="明日　共通テスト";
text=text.replace("　"," ");
let r1=ast_to_time(parser.parse(text))["time"];

var reminder_database=[];


function ast_to_time(v){
    var time_data = Get_now()
    var S=""    
    for(let i=0;i<v.length;i++){
        if(v[i]["type"]=="add_date"){
          time_data=time_data.add(v[i]["v"], 'day')
        }
        if(v[i]["type"]=="add_hour"){
          time_data=time_data.add(v[i]["v"], 'hour')
        }
        if(v[i]["type"]=="add_minute"){
          time_data=time_data.add(v[i]["v"], 'minute')
        }
        if(v[i]["type"]=="add_second"){
          time_data=time_data.add(v[i]["v"], 'second')
        }
        
        if(v[i]["type"]=="set_date"){
          time_data=time_data.set('day',v[i]["v"])
        }
        if(v[i]["type"]=="set_hour"){
          time_data=time_data.set('hour',v[i]["v"])
          time_data=time_data.set('minute',0)
        }
        if(v[i]["type"]=="set_minute"){
          time_data=time_data.set('minute',v[i]["v"])
        }

        if(v[i]["type"]=="subject"){
          S=v[i]["v"]
        }

      }
    return {"time":time_data,"S":S}
}

function set_corn(time,S,in_mes){
  let job=new CronJob({
      //cronTime: `${time.format('s m H D M d')}`,
      cronTime:time.toDate(),
      onTick: () => {
        in_mes.channel.send(S);
      },
      start: true,
      timeZone: 'Asia/Tokyo',
    })
    job.start();
}

var Mikyuki = machina.Fsm.extend({ 
    initialState: 'asking_time',
      states: {
        'N': { 
          accelerate: function(in_mes) { 
              return {"mes":"いつ教えてほしい？",
              "next_state":"asking_time"};
          } 
        }, 
        'asking_time': { 
            accelerate: function(in_mes,in_mes_raw) { 
                try{
                  let R=ast_to_time(parser.parse(in_mes));
                  let time=R["time"]
                  let S=R["S"]
                  var R_mes=`${time.format('M月D日 HH/m') }に${S}って伝えるね`
                  set_corn(time,S,in_mes_raw)
                }catch(v){
                }
                return {"mes":R_mes,"next_state":"asking_time"};
            } 
          }, 
        }, 
}); 

let mikyuki=new Mikyuki();
  

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
    if (msg.content === '!ping') {
      msg.channel.send('Pong!')
    }
    if (msg.author.bot) return;
    let A=mikyuki.handle('accelerate',msg.content,msg); 
    msg.channel.send(A["mes"]);
    if(A["next_state"]!=null){
        mikyuki.transition(A["next_state"])
    }
})

console.log(process.env.BOT_KEY);

client.login(process.env.BOT_KEY);
