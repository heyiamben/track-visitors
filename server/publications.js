Meteor.publish('trackVisitorsById', function(id){
	check(id, String);
	return TrackVisitors.find({_id: id}, {fields: { _id: true , "data.email": true, "data.name": true}});
});


Meteor.publish('trackVisitorsByIdAndToken', function(visitorAttributes){
	check(visitorAttributes, {
		_id: String,
		token: String
	});
	return TrackVisitors.find({_id: visitorAttributes._id, token: visitorAttributes.token}, {fields: { _id: true, token: true}});
});


Meteor.publish('currentVisitor', function(){
	return TrackVisitors.find({ connectionId: this.connection.id});
});