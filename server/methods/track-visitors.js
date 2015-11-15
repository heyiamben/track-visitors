Meteor.methods({
	createSession: function(){
			
	    var session = {
			token: Random.secret()
		};
		
		var sessionId = BenjaVisitors.insert(session);

		return {
			token: session.token,
			_id: sessionId
		};
	},
	identify: function(visitorAttributes){
		check(visitorAttributes, {
			_id: String,
			token: String
		});

		visitor = BenjaVisitors.findOne({_id: visitorAttributes._id, token: visitorAttributes.token});


		if(visitor){
			BenjaTrackVisit.init(visitor);
			return {
				token: visitor.token,
				_id: visitor._id
			}
		}
	}

});