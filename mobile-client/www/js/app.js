var connection = new autobahn.Connection({url: 'ws://192.168.88.249:8080/ws', realm: 'realm1'});
var app = angular.module("PubSubAngApp", []);

app.controller("PublishingCtrl", function($scope) {
    $scope.model = { message: "Hello World" };

    $scope.clickMe = function(outgoingMsg) {
        if (connection.session) {
           connection.session.publish("com.myapp.mytopic1", [outgoingMsg]);
           console.log("event published!");
        } else {
           console.log("cannot publish: no session");
        }
    };
});

app.controller("ReceivingCtrl", ['$scope', function($scope) {
    $scope.model = { message: "Nothing..." };

    $scope.showMe = function(incomingMsg) {
        $scope.model.message = incomingMsg;
    };
}]);


// "onopen" handler will fire when WAMP session has been established ..
connection.onopen = function (session) {

   console.log("session established!");

   // our event handler we will subscribe on our topic
   //
   function onevent1(args, kwargs) {
      console.log("got event:", args, kwargs);
      var scope = angular.element(document.getElementById('Receiver')).scope();
      scope.$apply(function() {
          scope.showMe(args[0]);
      });
   }

   // subscribe to receive events on a topic ..
   //
   session.subscribe('com.myapp.mytopic1', onevent1).then(
      function (subscription) {
         console.log("ok, subscribed with ID " + subscription.id);
      },
      function (error) {
         console.log(error);
      }
   ); 
};


// "onclose" handler will fire when connection was lost ..
connection.onclose = function (reason, details) {
   console.log("connection lost", reason);
}


// initiate opening of WAMP connection ..
connection.open();

// // Ionic Starter App
// 
// // angular.module is a global place for creating, registering and retrieving Angular modules
// // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// // the 2nd parameter is an array of 'requires'
// // 'starter.services' is found in services.js
// // 'starter.controllers' is found in controllers.js
// angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
// 
// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//     // for form inputs)
//     if(window.cordova && window.cordova.plugins.Keyboard) {
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//     }
//     if(window.StatusBar) {
//       // org.apache.cordova.statusbar required
//       StatusBar.styleDefault();
//     }
//   });
// })
// 
// .config(function($stateProvider, $urlRouterProvider) {
// 
//   // Ionic uses AngularUI Router which uses the concept of states
//   // Learn more here: https://github.com/angular-ui/ui-router
//   // Set up the various states which the app can be in.
//   // Each state's controller can be found in controllers.js
//   $stateProvider
// 
//     // setup an abstract state for the tabs directive
//     .state('tab', {
//       url: "/tab",
//       abstract: true,
//       templateUrl: "templates/tabs.html"
//     })
// 
//     // Each tab has its own nav history stack:
// 
//     .state('tab.dash', {
//       url: '/dash',
//       views: {
//         'tab-dash': {
//           templateUrl: 'templates/tab-dash.html',
//           controller: 'DashCtrl'
//         }
//       }
//     })
// 
//     .state('tab.friends', {
//       url: '/friends',
//       views: {
//         'tab-friends': {
//           templateUrl: 'templates/tab-friends.html',
//           controller: 'FriendsCtrl'
//         }
//       }
//     })
//     .state('tab.friend-detail', {
//       url: '/friend/:friendId',
//       views: {
//         'tab-friends': {
//           templateUrl: 'templates/friend-detail.html',
//           controller: 'FriendDetailCtrl'
//         }
//       }
//     })
// 
//     .state('tab.account', {
//       url: '/account',
//       views: {
//         'tab-account': {
//           templateUrl: 'templates/tab-account.html',
//           controller: 'AccountCtrl'
//         }
//       }
//     })
// 
//   // if none of the above states are matched, use this as the fallback
//   $urlRouterProvider.otherwise('/tab/dash');
// 
// });
// 
