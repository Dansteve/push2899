'use strict';
angular.module('underscore', []) .factory('_', function() { return window._; });
var app;
app = angular.module('starter', [
  'ionic',
  'ngCordova',
  'ngStorage',
  'underscore',
  'ngLetterAvatar',
  'ngPassword',
  'ionic-cache-src',
  'ui.swiper',
  'com.2fdevs.videogular',
  'com.2fdevs.videogular.plugins.controls',
  'com.2fdevs.videogular.plugins.poster',
  'com.2fdevs.videogular.plugins.overlayplay'
  ])

.run(function($rootScope, $ionicPlatform, $http, $state, $ionicPopup, config, strings, $localStorage, $ionicHistory) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit(config.onesignalId)
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
    document.addEventListener("backbutton",CallbackFunction, false);
    }
    function CallbackFunction() {

    }

    var defaultHTTPHeaders = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json'
    };

    $http.defaults.headers.post = defaultHTTPHeaders;

});


var admobid = {};

if( /(android)/i.test(navigator.userAgent) ) {
  admobid = { // for Android
    banner: config.adBannerAndroid,
    interstitial: config.adInterAndroid
  };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
  admobid = { // for iOS
    banner: config.adBanneriOS,
    interstitial: config.adInteriOS
  };
}


function initApp() {
  if (! window.AdMob ) {/* alert( 'admob plugin not ready' );*/  return;}

  AdMob.createBanner( {
    adId: admobid.banner,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    isTesting: false,
    overlap: false,
    offsetTopBar: false,
    bgColor: 'purple'
  } );

  AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    isTesting: false,
    autoShow: true
  });
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}


var urllogin=config.urlBase+"controller/";

var email_auth=localStorage.getItem("email_auth");
var password_auth=localStorage.getItem("password_auth");


      if(email_auth && password_auth){
          var str=urllogin+"data_login.php?username="+email_auth+"&password="+password_auth;
          $http.get(str)
            .success(function(response){

            })
            .error(function(){

          $ionicPopup.alert({
          title: 'Failed Authentication',
          template: '<center>Account not found</center>',
          okType: "button-assertive",
          okText: "Try Again",
        })

      localStorage.removeItem('checked_auth');
      localStorage.removeItem('status_auth');
      localStorage.removeItem('id_auth');
      localStorage.removeItem('email_auth');
      localStorage.removeItem('password_auth');

      $ionicHistory.nextViewOptions({
        disableAnimate:true,
        disableBack:true
      })

      $state.go('tab.splash',{},{location:"replace",reload:true});
            });
      }else{
      }

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $sceDelegateProvider){

$ionicConfigProvider.tabs.position("bottom");
$ionicConfigProvider.navBar.alignTitle("center");
$sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);

$stateProvider

     .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tab.html',
      controller: 'TabCtrl'
    })

     .state('tab.nointernet', {
        url: '/nointernet',
        cache: false,
        views: {
          'tab-nointernet': {
            templateUrl: 'templates/nointernet.html',
            controller: 'NoInternetCtrl'
          }
        }
      })

     .state('tab.splash', {
        url: '/splash',
        cache: false,
        views: {
          'tab-splash': {
            templateUrl: 'templates/splash.html',
            controller: 'SplashCtrl'
          }
        }
      })

     .state('tab.login', {
        url: '/login',
        cache: false,
        views: {
          'tab-login': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          }
        }
      })

     .state('tab.signup', {
        url: '/signup',
        cache: false,
        views: {
          'tab-signup': {
            templateUrl: 'templates/signup.html',
            controller: 'SignupCtrl'
          }
        }
      })

     .state('tab.forget', {
        url: '/forget',
        cache: false,
        views: {
          'tab-forget': {
            templateUrl: 'templates/forget.html',
            controller: 'ForgetCtrl'
          }
        }
      })

     .state('tab.home', {
        url: '/home',
        cache: false,
        views: {
          'tab-home': {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
          }
        }
      })

     .state('tab.blog', {
        url: '/blog',
        cache: false,
        views: {
          'tab-blog': {
            templateUrl: 'templates/blog.html',
            controller: 'BlogCtrl'
          }
        }
      })

     .state('tab.post', {
        url: '/post/:id',
        cache: false,
        views: {
          'tab-post': {
            templateUrl: 'templates/post.html',
            controller: 'PostCtrl'
          }
        }
      })

     .state('tab.ptag', {
        url: '/ptag/:id',
        cache: false,
        views: {
          'tab-ptag': {
            templateUrl: 'templates/ptag.html',
            controller: 'PTagCtrl'
          }
        }
      })

     .state('tab.workouts', {
        url: '/workouts',
        cache: false,
        views: {
          'tab-workouts': {
            templateUrl: 'templates/workouts.html',
            controller: 'WorkoutsCtrl'
          }
        }
      })

     .state('tab.wdetails', {
        url: '/wdetails/:id',
        cache: false,
        views: {
          'tab-wdetails': {
            templateUrl: 'templates/wdetails.html',
            controller: 'WDetailsCtrl'
          }
        }
      })

     .state('tab.details', {
        url: '/details/:id',
        cache: false,
        views: {
          'tab-details': {
            templateUrl: 'templates/details.html',
            controller: 'DetailsCtrl'
          }
        }
      })

     .state('tab.machine', {
        url: '/machine/:id',
        cache: false,
        views: {
          'tab-machine': {
            templateUrl: 'templates/machine.html',
            controller: 'MachineCtrl'
          }
        }
      })

     .state('tab.medetails', {
        url: '/medetails/:id',
        cache: false,
        views: {
          'tab-medetails': {
            templateUrl: 'templates/details.html',
            controller: 'MEDetailsCtrl'
          }
        }
      })

     .state('tab.exercises', {
        url: '/exercises',
        cache: false,
        views: {
          'tab-exercises': {
            templateUrl: 'templates/exercises.html',
            controller: 'ExercisesCtrl'
          }
        }
      })

     .state('tab.goals', {
        url: '/goals',
        cache: false,
        views: {
          'tab-goals': {
            templateUrl: 'templates/goals.html',
            controller: 'GoalsCtrl'
          }
        }
      })

     .state('tab.wgoal', {
        url: '/wgoal/:id',
        cache: false,
        views: {
          'tab-wgoal': {
            templateUrl: 'templates/wgoal.html',
            controller: 'WGoalCtrl'
          }
        }
      })

     .state('tab.selevel', {
        url: '/selevel/:id',
        cache: false,
        views: {
          'tab-selevel': {
            templateUrl: 'templates/selevel.html',
            controller: 'SELevelCtrl'
          }
        }
      })

     .state('tab.elevels', {
        url: '/elevels',
        cache: false,
        views: {
          'tab-elevels': {
            templateUrl: 'templates/elevels.html',
            controller: 'ELevelsCtrl'
          }
        }
      })


     .state('tab.swlevel', {
        url: '/swlevel/:id',
        cache: false,
        views: {
          'tab-swlevel': {
            templateUrl: 'templates/swlevel.html',
            controller: 'SWLevelCtrl'
          }
        }
      })

     .state('tab.wlevels', {
        url: '/wlevels',
        cache: false,
        views: {
          'tab-wlevels': {
            templateUrl: 'templates/wlevels.html',
            controller: 'WLevelsCtrl'
          }
        }
      })

     .state('tab.bodyparts', {
        url: '/bodyparts',
        cache: false,
        views: {
          'tab-bodyparts': {
            templateUrl: 'templates/bodyparts.html',
            controller: 'BodypartsCtrl'
          }
        }
      })


     .state('tab.equipments', {
        url: '/equipments',
        cache: false,
        views: {
          'tab-equipments': {
            templateUrl: 'templates/equipments.html',
            controller: 'EquipmentsCtrl'
          }
        }
      })

     .state('tab.dcategory', {
        url: '/dcategory/:id',
        cache: false,
        views: {
          'tab-dcategory': {
            templateUrl: 'templates/dcategory.html',
            controller: 'CategoryCtrl'
          }
        }
      })

     .state('tab.diets', {
        url: '/diets',
        cache: false,
        views: {
          'tab-diets': {
            templateUrl: 'templates/diets.html',
            controller: 'DietsCtrl'
          }
        }
      })

     .state('tab.recipe', {
        url: '/recipe/:id',
        cache: false,
        views: {
          'tab-recipe': {
            templateUrl: 'templates/recipe.html',
            controller: 'RecipeCtrl'
          }
        }
      })

     .state('tab.muscle', {
        url: '/muscle/:id',
        cache: false,
        views: {
          'tab-muscle': {
            templateUrl: 'templates/muscle.html',
            controller: 'MuscleCtrl'
          }
        }
      })

     .state('tab.day1', {
        url: '/day1/:did',
        cache: false,
        views: {
          'tab-day1': {
            templateUrl: 'templates/day1.html',
            controller: 'Day1Ctrl'
          }
        }
      })

     .state('tab.day2', {
        url: '/day2/:did',
        cache: false,
        views: {
          'tab-day2': {
            templateUrl: 'templates/day2.html',
            controller: 'Day2Ctrl'
          }
        }
      })

     .state('tab.day3', {
        url: '/day3/:did',
        cache: false,
        views: {
          'tab-day3': {
            templateUrl: 'templates/day3.html',
            controller: 'Day3Ctrl'
          }
        }
      })

     .state('tab.day4', {
        url: '/day4/:did',
        cache: false,
        views: {
          'tab-day4': {
            templateUrl: 'templates/day4.html',
            controller: 'Day4Ctrl'
          }
        }
      })

     .state('tab.day5', {
        url: '/day5/:did',
        cache: false,
        views: {
          'tab-day5': {
            templateUrl: 'templates/day5.html',
            controller: 'Day5Ctrl'
          }
        }
      })

     .state('tab.day6', {
        url: '/day6/:did',
        cache: false,
        views: {
          'tab-day6': {
            templateUrl: 'templates/day6.html',
            controller: 'Day6Ctrl'
          }
        }
      })

     .state('tab.day7', {
        url: '/day7/:did',
        cache: false,
        views: {
          'tab-day7': {
            templateUrl: 'templates/day7.html',
            controller: 'Day7Ctrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        cache: false,
        views: {
          'tab-account': {
            templateUrl: 'templates/account.html',
            controller: 'AccountCtrl'
          }
        }
      })

      .state('tab.edit', {
        url: '/edit',
        cache: false,
        views: {
          'tab-account': {
            templateUrl: 'templates/edit.html',
            controller: 'EditCtrl'
          }
        }
      })

      .state('tab.settings', {
        url: '/settings',
        cache: false,
        views: {
          'tab-settings': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl'
          }
        }
      })

      .state('tab.contact', {
        url: '/contact',
        cache: false,
        views: {
          'tab-contact': {
            templateUrl: 'templates/contact.html',
            controller: 'ContactCtrl'
          }
        }
      })

     .state('tab.detday1', {
        url: '/detday1/:id',
        cache: false,
        views: {
          'tab-detday1': {
            templateUrl: 'templates/details.html',
            controller: 'DetDay1Ctrl'
          }
        }
      })

     .state('tab.detday2', {
        url: '/detday2/:id',
        cache: false,
        views: {
          'tab-detday2': {
            templateUrl: 'templates/details.html',
            controller: 'DetDay2Ctrl'
          }
        }
      })

     .state('tab.detday3', {
        url: '/detday3/:id',
        cache: false,
        views: {
          'tab-detday3': {
            templateUrl: 'templates/details.html',
            controller: 'DetDay3Ctrl'
          }
        }
      })

     .state('tab.detday4', {
        url: '/detday4/:id',
        cache: false,
        views: {
          'tab-detday4': {
            templateUrl: 'templates/details.html',
            controller: 'DetDay4Ctrl'
          }
        }
      })

     .state('tab.detday5', {
        url: '/detday5/:id',
        cache: false,
        views: {
          'tab-detday5': {
            templateUrl: 'templates/details.html',
            controller: 'DetDay5Ctrl'
          }
        }
      })

     .state('tab.detday6', {
        url: '/detday6/:id',
        cache: false,
        views: {
          'tab-detday6': {
            templateUrl: 'templates/details.html',
            controller: 'DetDay6Ctrl'
          }
        }
      })

     .state('tab.detday7', {
        url: '/detday7/:id',
        cache: false,
        views: {
          'tab-detday7': {
            templateUrl: 'templates/details.html',
            controller: 'DetDay7Ctrl'
          }
        }
      })

     // $urlRouterProvider.otherwise('/tab/home');

    var estachequeado = localStorage.getItem("checked_auth");

      if(estachequeado == 'true'){

      if (localStorage.getItem("id_auth") === null) {

        return $urlRouterProvider.otherwise('/tab/splash');

      }else{

        return $urlRouterProvider.otherwise('/tab/home');
      }

      }else{
        return $urlRouterProvider.otherwise('/tab/splash');
      }

})

.filter('openLinks', function(){
  return function(x) {
    var tree = angular.element('<div>'+x+'</div>');
    tree.find('a').attr('target', '_blank');
    return angular.element('<div>').append(tree).html();
  }
})

.filter('unique', function() {

   return function(collection, keyname) {
      var output = [],
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
})


.filter('limitext', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    })


.directive('repeatDone', function () {
   return function (scope, element, attrs) {
     if (scope.$last) { // all are rendered
       scope.$eval(attrs.repeatDone);
     }
   }
})


.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el) {
            $rootScope.hideTabs = true;
            $scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
})
