<b>This is currently under development and is not yet ready production</b>.

This package gives each site visitor a uniqueId accessible from both the server and client side

<b>Server Side:</b><br/>
 
To get the visitorId from inside a publication or method you can call
```javascript
TrackVisit.visitorId(this.connection);
```

<b>Usage on the Client Side:</b><br/>
To get the visitor object you can call
```javascript
Session.get('TrackVisit')
```

If you are using visitorId in a publication then you should only use template level subscriptions and it should be placed in an autorun as follows

```javascript
var instance = this;
instance.loaded = new ReactiveVar(0);
instance.autorun(function() {
	if(Session.get('TrackVisitConnected')){
		var subscription = instance.subscribe('subscriptionName', params);
		if (subscription.ready()) {
			instance.loaded.set(1);
		}
	}
});
```
This is so that the subscription will only happen after the new connectionId is attached to the current visitors document in the trackvisitors collection.

.<br/>




<b>To do:</b><br/>
- Add an expiration date to the visitor id and token
- Allow the adding of additional data about the visitor
- Remove old connectionIds on hot reloads