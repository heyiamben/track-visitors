var visitor = function() {

};

visitor.prototype._init = function() {
      var instance = this;
      Tracker.autorun(function(){
      if(Meteor.status().connected){
          instance._createSession();
      } else {
          instance._disconnect();
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
      var visitor = {
        _id: result._id,
        token: result.token,
        connected: true,
      }
      Session.setPersistent('TrackVisit', visitor);
  });
}

visitor.prototype._disconnect = function(){
  var visitor = {
    _id: Session.get('TrackVisit')._id,
    token: Session.get('TrackVisit').token,
    connected: false,
  }
  Session.setPersistent('TrackVisit', visitor);
}

visitor.prototype.test = function() {
  Meteor.call('test', function(error, result){
      console.log(result);
  });
}

TrackVisit = new visitor();// Write your package code here!

Meteor.startup(function(){
    TrackVisit._init();
});