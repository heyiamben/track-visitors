visitor = function() {

};

visitor.prototype.init = function(visit) {
    var instance = this;
    
    instance._id = visit._id;
    instance.token = visit.token;

};

BenjaTrackVisit = new visitor();// Write your package code here!
