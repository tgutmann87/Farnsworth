var question;
var answers = [];
var voteStarted = false;
var voteTimer = 1000 * 60 * 5; //Millisecond countdown (ms * sec * min)

module.exports = {
	VoteQuestion: function(message, client)
	{
		//As long as the vote hasn't started the question is set
		if(!voteStarted)
		{
			question = message.content.splice(0,13);
		}
	}
	
	VoteAnswerAdd: function(message, client)
	{
		//As long as the vote hasn't started the answer will be pushed into the answer stack array
		if(!voteStarted)
		{
			answers.push(message.content.splice(0,15));
		}
	}
	
	VoteStart: function(message, client)
	{
		if(!voteStarted)
		{
			voteStarted = true;
			
		}
	}
}