var visitor = function() {

};


BenjaTrackVisit = new visitor();// Write your package code here!


Meteor.onConnection(function(connection) {
  visitor.prototype.visitorId = function() {
		visit=BenjaVisitors.findOne( { connectionId: connection.id});
		if(visit._id){
			return visit._id
		} else {
			return;
		}
	};

  connection.onClose(function() {
    BenjaVisitors.update( { connectionId: connection.id}, { $pull: { connectionId: connection.id}})
  });
});