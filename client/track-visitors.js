var visitor = function() {

};

visitor.prototype._init = function() {
    var instance = this;
    if(!instance.data){
      instance.data = {};
    }
    var visit = {};


    if(Session.get('benjaTrackVisitToken')){
      instance.data._id = Session.get('benjaTrackVisitToken')._id;
      instance.data.token = Session.get('benjaTrackVisitToken').token;
    }

    Tracker.autorun(function(){
      if(Meteor.status().connected){
        if(Session.get('benjaTrackVisitToken')){
          visit = {
            _id: Session.get('benjaTrackVisitToken')._id,
            token: Session.get('benjaTrackVisitToken').token
          }
          var subscription = Meteor.connection.subscribe('trackVisitorsByIdAndToken', visit);
          if (subscription.ready()) {
            var visitorDetails = BenjaVisitors.findOne({_id: visit._id});
            console.log(visitorDetails);
            if(!visitorDetails){
              Session.setPersistent('benjaTrackVisitToken', null);
            } else {
              Meteor.call('identify', visit, function(error, result){
                //console.log(result);
                if(result._id){
                  //console.log(result);
                  instance.data = result;
                } else {
                  Session.setPersistent('benjaTrackVisitToken', null);
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
      Session.setPersistent('benjaTrackVisitToken', result);
  });
}

BenjaTrackVisit = new visitor();// Write your package code here!

Meteor.startup(function(){
    BenjaTrackVisit._init();
});