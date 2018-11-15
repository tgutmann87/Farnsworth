var timerStart = false;
var timerLength = 1000*60*5;
var timerInterval = 1000*60*.5;
var discordTimer;
var periodicMsg;
var timerReason = "Default";
var timerEndDate = new Date("11/20/2018 8:00:00 PM");
var currentTime = new Date();


module.exports = {
	StartTimer: function(message, client)
	{
		if(timerStart == false)
		{
			timerStart = true;
			discordTimer = client.setTimeout(() => timeout(message, client), timerLength);
			periodicMsg = client.setInterval(() => interval(message, client), timerInterval);
		}
		else
			message.channel.send("Someone has already started a countdown");
	}
	
	StopTimer: function(message, client)
	{
		if(timerStart == true)
		{
			clearTimeout(discordTimer);
			clearInterval(periodicMsg);
			timerStart = false;
		}
	}	
	
	SetTimerReason: function(message, client, reason)
	{
		timerReason = reason;
	}
	
	SetTimerEndDate: function(message, client, endDate)
	{
		timerEndDate = endDate;
	}
}

function timeout(message, client)
{
	client.channels.get(message.channel.id).send({embed: {
	color: 3447003,
	author: {
	  name: "Farnsworth Countdown\n",
	  icon_url: client.user.avatarURL
	},
	
	title: "Countdown Complete!!!"
	
	}
	})
	
	clearTimeout(discordTimer);
	clearInterval(periodicMsg);
	timerStart = false;
}

function interval(message, client)
{
	currentTime = new Date();
	
	client.channels.get(message.channel.id).send({embed: {
	color: 3447003,
	author: {
	  name: "Farnsworth Countdown\n",
	  icon_url: client.user.avatarURL
	},

	title: "Countdown until: ",

		fields: [
			{
				name: "Time Left: ",
				value: timeConvert(timerEndDate - currentTime)
				//value: timeConvert(90000000)
			}
		]
	}
	})
}

function timeConvert(time)
{
  var ms = time % 1000;
  time = (time - ms) / 1000;
  var secs = time % 60;
  time = (time - secs) / 60;
  var mins = time % 60;
  time = (time - mins) /60;
  var hrs = time % 24;
  time = (time - hrs) / 24;
  var days = time % 30;
 
  return days + " Days  " + hrs + " hrs  " + mins + " mins  " + secs + " secs  ";
}