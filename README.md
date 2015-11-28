<b>This is currently under development and is not yet ready production</b>.

This package gives each site visitor a uniqueId accessible from both the server and client side

<b>Server Side:</b><br/>
 
To get the visitor id you can call  <b>TrackVisit.visitorId(this.connection);</b> from any method or publication

<b>Usage on the Client Side:</b><br/>
To get the visitorId you can call <b>Session.get('TrackVisit')<b/><br/>
or TrackVisit._id


<b>To do:</b><br/>
- Add an expiration date to the visitor id and token
- Allow the adding of additional data about the visitor
- Remove old connectionIds on hot reloads