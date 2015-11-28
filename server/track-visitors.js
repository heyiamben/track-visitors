var visitor = function() {

};


TrackVisit = new visitor();// Write your package code here!


visitor.prototype.visitorId = function(connection) {
	visit=TrackVisitors.findOne( { connectionId: connection.id});
	if(visit._id){
		return visit._id
	} else {
		return;
	}
};


Meteor.onConnection(function(connection) {
   connection.onClose(function() {
    TrackVisitors.update( { connectionId: connection.id}, { $pull: { connectionId: connection.id}})
  });
});