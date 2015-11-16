Meteor.methods({
	createSession: function(){
			
	    var session = {
			token: Random.secret(),
			submitted: new Date()
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
			Meteor.BenjaTrackVisit.init(visitor);
			return visitor;
		}
	},
	updateInfo: function(infoAttributes){
		var type=null;
		switch(infoAttributes.type){
			case 'string':
				type = String;
				break;
			case 'number':
				type = Number;
				break;
			case 'boolean':
				type = Boolean;
				break;
			default: 
				type=null;

		}
		if(!type){
			return;
		}
		
		check(infoAttributes, {
			fieldName: String,
			value: type,
			type: String
		});

		var info = {};

		info[infoAttributes.fieldName]= infoAttributes.value;

		BenjaVisitors.update({_id: Meteor.BenjaTrackVisit._id}, {$set: info});
	}

});