visitor = function() {

};

visitor.prototype._init = function() {
    var instance = this;
    var visit = {};


    if(Session.get('benjaTrackVisitToken')){
      instance._id = Session.get('benjaTrackVisitToken')._id;
      instance.token = Session.get('benjaTrackVisitToken').token;
    }

    Tracker.autorun(function(){
      if(Session.get('benjaTrackVisitToken')){
        visit = {
          _id: Session.get('benjaTrackVisitToken')._id,
          token: Session.get('benjaTrackVisitToken').token
        }
        var subscription = Meteor.connection.subscribe('trackVisitorsByIdAndToken', visit);
        if (subscription.ready()) {
          var visitorDetails = BenjaVisitors.findOne({_id: visit._id});
          if(!visitorDetails){
            Session.setPersistent('benjaTrackVisitToken', null);
          } else {
            Meteor.call('identify', visit, function(error, result){
              instance._id = result._id;
              instance.token = result.token;
            });
          }
        }
      } else {
        instance._createSession();
      }
      
    });
};

visitor.prototype._createSession = function() {
  Meteor.call('createSession', function(error, result){
      Session.setPersistent('benjaTrackVisitToken', result);
  });
}

BenjaTrackVisit = new visitor();// Write your package code here!

Meteor.startup(function(){
    BenjaTrackVisit._init();
});