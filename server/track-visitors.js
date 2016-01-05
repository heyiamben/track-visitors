var visitor = function() {

};


TrackVisit = new visitor();// Write your package code here!

visitor.prototype.visitorId = function(connection) {
	var visit=TrackVisitors.findOne({ connectionId: connection.id});
	if(visit){
		return visit._id
	} else {
		return;
	}
};

visitor.prototype.visitor = function(connection) {
	var visit=TrackVisitors.findOne({ connectionId: connection.id});
	if(visit){
		return visit;
	} else {
		return;
	}
};



Meteor.onConnection(function(connection) {
   connection.onClose(function() {
    TrackVisitors.update( { connectionId: connection.id}, { $pull: { connectionId: connection.id}})
  });
});