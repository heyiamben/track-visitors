var visitor = function() {

};


TrackVisit = new visitor();// Write your package code here!


Meteor.onConnection(function(connection) {
  visitor.prototype.visitorId = function() {
		visit=TrackVisitors.findOne( { connectionId: connection.id});
		if(visit._id){
			return visit._id
		} else {
			return;
		}
	};

  connection.onClose(function() {
    TrackVisitors.update( { connectionId: connection.id}, { $pull: { connectionId: connection.id}})
  });
});