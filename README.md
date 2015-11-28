<b>This is currently under development and is not yet ready production</b>.

This package gives each site visitor a uniqueId accessible from both the server and client side

<b>Server Side:</b><br/>
 
To get the visitor id you can call  <b>BenjaTrackVisit.visitorId();</b>

<b>Usage on the Client Side:</b><br/>
To get the visitorId you can call <b>Session.get('benjaTrackVisitToken')<b/><br/>


<b>To do:</b><br/>
- Add expiration date
- Allow the adding additional data to each visitors collection
- Remove old connectionIds on hot reloads