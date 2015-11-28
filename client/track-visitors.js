var visitor = function() {

};

visitor.prototype._init = function() {
    var instance = this;
    if(!instance.data){
      instance.data = {};
    }
    var visit = {};


    if(Session.get('TrackVisit')){
      instance.data._id = Session.get('TrackVisit')._id;
      instance.data.token = Session.get('TrackVisit').token;
    }

    Tracker.autorun(function(){
      if(Meteor.status().connected){
        if(Session.get('TrackVisit')){
          visit = {
            _id: Session.get('TrackVisit')._id,
            token: Session.get('TrackVisit').token
          }
          var subscription = Meteor.connection.subscribe('trackVisitorsByIdAndToken', visit);
          if (subscription.ready()) {
            var visitorDetails = TrackVisitors.findOne({_id: visit._id});
            if(!visitorDetails){
              Session.setPersistent('TrackVisit', null);
            } else {
              Meteor.call('identify', visit, function(error, result){
                if(result._id){
                  instance.data = result;
                } else {
                  Session.setPersistent('TrackVisit', null);
                }
              });
            }
          }
        } else {
          instance._createSession();
        }
      }
      
    });
};

visitor.prototype.updateInfo = function(data){
  Meteor.call('updateInfo', data, function(error, result){

  });
}

visitor.prototype._createSession = function() {
  Meteor.call('createSession', function(error, result){
      Session.setPersistent('TrackVisit', result);
  });
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