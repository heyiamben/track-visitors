Meteor.publish('trackVisitorsById', function(id){
	check(id, String);
	return BenjaVisitors.find({_id: id}, {fields: { _id: true}});
});

Meteor.publish('trackVisitorsByIdAndToken', function(visitorAttributes){
	check(visitorAttributes, {
		_id: String,
		token: String
	});
	return BenjaVisitors.find({_id: visitorAttributes._id, token: visitorAttributes.token});
});