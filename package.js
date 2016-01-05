Package.describe({
  name: 'benja:track-visitors',
  version: '0.0.4',
  // Brief, one-line summary of the package.
  summary: 'This package gives each site visitor a uniqueId accessible from both the server and client side',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/heyiamben/track-visitors',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  var both = ['client', 'server'];
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'mongo',
    'u2622:persistent-session@0.4.3',
    'templating',
  ]);
  api.addFiles([
     'lib/collections/visitors.js',
     'server/track-visitors.js',
     'server/methods/track-visitors.js',
     'server/publications.js'
  ], 'server');
  api.addFiles([
    'lib/collections/visitors.js',
    'client/track-visitors.js',
  ], 'client');
  api.export('TrackVisit', both);
  api.export('TrackVisitors', both);
  api.export('TrackVisitorsSubs', 'client');
});


Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
});
