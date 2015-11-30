Meteor.methods({
	createSession: function(sessionAttributes){
		var newSession = true;
		var visitor = null;

		if(sessionAttributes.exists){
			check(sessionAttributes, {
				_id: String,
				token: String,
				exists: Boolean
			});
			visitor = TrackVisitors.findOne({_id: sessionAttributes._id, token: sessionAttributes.token}, {fields: {_id:true, token: true}});
			if (visitor){
				newSession = false;
			}
		} else {
			check(sessionAttributes, {
				exists: Boolean
			});
		}

		if(newSession){
			var visitor = {
				token: Random.secret(),
				connectionId: [this.connection.id],
				submitted: new Date()
			};

			var sessionId = TrackVisitors.insert(visitor);
			if(sessionId){
				return {
					token: visitor.token,
					_id: sessionId,
					connectionId: this.connection.id
				};
			}
		} else {
			TrackVisitors.update({_id: sessionAttributes._id, token: sessionAttributes.token}, { $addToSet: {connectionId: this.connection.id}});
			return {
					token: sessionAttributes.token,
					_id: sessionAttributes._id,
					connectionId: this.connection.id
				};
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

		TrackVisitors.update({_id: TrackVisit.visitorId(this.connection)}, {$set: info});
	},
	test: function(){
		return TrackVisit.visitorId(this.connection)
	}

});