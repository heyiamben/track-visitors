var visitor = function() {

};

visitor.prototype._init = function() {
      var instance = this;
      //var subscription = Meteor.subscribe('currentVisitor');
      if(!Session.get('TrackVisit')){
        var visitor = {
          _id: 'noneyet',
          token: 'noneyet',
        }
      } else {
        var visitor = {
          _id: Session.get('TrackVisit')._id,
          token: Session.get('TrackVisit').token,
        }
      }
      Session.setPersistent('TrackVisit', visitor);
      Tracker.autorun(function(){
        if(Meteor.status().connected){
          instance._createSession();
        } else {
          instance._disconnect();
        }
      });
      Tracker.autorun(function(){
        Meteor.subscribe('currentVisitor');
        var visitor = TrackVisitors.findOne({connectionId: Session.get('currentConnectionId')});
        if(visitor){
          Session.setPersistent('TrackVisit', visitor);
        }
      });
};

visitor.prototype.updateInfo = function(data){
  Meteor.call('updateInfo', data, function(error, result){

  });
}

visitor.prototype._createSession = function() {
  var visit = { exists: false };
  if(Session.get('TrackVisit')){
    visit._id = Session.get('TrackVisit')._id;
    visit.token = Session.get('TrackVisit').token
    visit.exists = true;
  }
  Meteor.call('createSession', visit,  function(error, result){
      Session.set('currentConnectionId', Meteor.default_connection._lastSessionId )
      Session.set('TrackVisitConnected', true);
  });
}

visitor.prototype._disconnect = function(){
  var visitor = {
    _id: Session.get('TrackVisit')._id,
    token: Session.get('TrackVisit').token
  }
  Session.set('TrackVisitConnected', false);
}

visitor.prototype.test = function() {
  Meteor.call('test', function(error, result){
      console.log(result);
  });
}

TrackVisit = new visitor();// Write your package code here!

Meteor.startup(function(){
    Session.set('TrackVisitConnected', false);
    TrackVisit._init();
});