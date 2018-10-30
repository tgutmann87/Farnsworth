var question;
var answers = [];
var voteStarted = false;

module.exports = {
	VoteQuestion: function(message, client)
	{
		if(voteStarted == false)
		{
			question = message.content.splice(0,13);
		}
	}
	
	VoteAnswerAdd: function(message, client)
	{
		if(voteStarted == false)
		{
			answers.push(message.content.splice(0,15));
		}
	}
	
	VoteStart: function(message, client)
	{
	}
}