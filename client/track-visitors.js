var visitor = function() {

};

visitor.prototype._init = function() {
    var instance = this;
    if(!instance.data){
      instance.data = {};
    }
    var visit = {};


    if(Session.get('benjaTrackVisit')){
      instance.data._id = Session.get('benjaTrackVisit')._id;
      instance.data.token = Session.get('benjaTrackVisit').token;
    }

    Tracker.autorun(function(){
      if(Meteor.status().connected){
        if(Session.get('benjaTrackVisit')){
          visit = {
            _id: Session.get('benjaTrackVisit')._id,
            token: Session.get('benjaTrackVisit').token
          }
          var subscription = Meteor.connection.subscribe('trackVisitorsByIdAndToken', visit);
          if (subscription.ready()) {
            var visitorDetails = BenjaVisitors.findOne({_id: visit._id});
            if(!visitorDetails){
              Session.setPersistent('benjaTrackVisit', null);
            } else {
              Meteor.call('identify', visit, function(error, result){
                if(result._id){
                  instance.data = result;
                } else {
                  Session.setPersistent('benjaTrackVisit', null);
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
      Session.setPersistent('benjaTrackVisit', result);
  });
}

BenjaTrackVisit = new visitor();// Write your package code here!

Meteor.startup(function(){
    BenjaTrackVisit._init();
});