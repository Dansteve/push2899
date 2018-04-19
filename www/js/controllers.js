'use strict';
app
.controller('TabCtrl', ['$scope', '$state', 'strings', function($scope, $state, strings) {
}])

.controller('SplashCtrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicPlatform', '$ionicPopup', '$ionicHistory', '$cordovaToast', '$localStorage', function($rootScope, $scope, $http, $state, config, strings, $ionicPlatform, $ionicPopup, $ionicHistory, $cordovaToast, $localStorage) {

  $scope.Login = strings.Login;
  $scope.JoinNow = strings.JoinNow;

  $scope.goBack = function() {
    $ionicHistory.backView().go();
  }

  $ionicPlatform.registerBackButtonAction(function(event) {
      console.log($state.current.name);
      if($state.current.name == "tab.splash") {
        $ionicPopup.confirm({
          title: strings.titleExit,
          template: '<center>'+strings.messageExit+'</center>',
          okType: "button-light",
          okText: strings.yesText,
          cancelType: "button-assertive",
          cancelText: strings.noText,
        }).then(function(res) {
          if (res) {
            ionic.Platform.exitApp();
          }
        })
      }
      else {
        navigator.app.backHistory();
      }
    }, 100);


    var CheckInternetConnection = function() {
      if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
          $state.go('tab.nointernet');
          $ionicLoading.hide();
        }
      }
    }

    var id_auth = localStorage.getItem("id_auth");

    CheckInternetConnection();
 
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){

      if(!id_auth) {
        $state.go('tab.splash');
      }else{
        $state.go('tab.home');
      }
        
      })

    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      $state.go('tab.nointernet');
      $ionicLoading.hide();
    })

        $scope.doLogout=function(){

      localStorage.removeItem('checked_auth');
      localStorage.removeItem('status_auth');
      localStorage.removeItem('id_auth');

      $ionicHistory.nextViewOptions({
        disableAnimate:true,
        disableBack:true
      })

      $state.go('tab.splash',{},{location:"replace",reload:true});

    }

  }])

.controller('LoginCtrl', ['$scope', '$ionicModal', '$timeout', '$ionicPopup', '$http', '$state', '$ionicHistory', 'config', 'strings', '$localStorage', '$sessionStorage', function($scope, $ionicModal, $timeout, $ionicPopup, $http, $state, $ionicHistory, config, strings, $localStorage, $sessionStorage) {
    
    $scope.welcome = strings.welcome;
    $scope.remPass = strings.remPass;
    $scope.formEmail = strings.formEmail;
    $scope.formPassword = strings.formPassword;
    $scope.forget = strings.forget;
    $scope.AccCreate = strings.AccCreate;
    $scope.Login = strings.Login;

    $scope.insertinvited = function(user) {
    if(user.isChecked) {
        localStorage.setItem('checked_auth', true);
    } else {
        localStorage.setItem('checked_auth', false);
          
    }
    }

    $scope.deschequear = function(){
      if($scope.estachecked_auth == 'true'){
        localStorage.setItem('checked_auth', false);
    }
    }

    $scope.username = localStorage.email_auth;

    if($scope.username == null){
    localStorage.setItem('checked_auth', false);
    };

    $scope.loginData={};

    $scope.doLogin=function(){
      var user_email=$scope.loginData.username;
      var user_password=$scope.loginData.password;

      if(user_email && user_password){
          var str = config.urlBase+"controller/data_login.php?username="+user_email+"&password="+user_password;
          $http.get(str)
            .success(function(response){

                $scope.admin=response.records;

                sessionStorage.setItem('status_auth',true);
                localStorage.setItem('id_auth',$scope.admin.user_id);
                localStorage.setItem('email_auth',$scope.admin.user_email);
                localStorage.setItem('password_auth',$scope.admin.user_password);

                $ionicHistory.nextViewOptions({
                  disableAnimate:true,
                  disableBack:true
                })


                $state.go('tab.home',{},{location:"replace",reload:true});

            })
            .error(function(){

          $ionicPopup.alert({
          title: strings.passWrongtitle,
          template: '<center>'+strings.passWrongtext+'</center>',
          okType: "button-assertive",
          okText: strings.passWrongbutton,
        })

            });

      }else{

      }

    }

}])


.controller('SignupCtrl', ['$scope', '$http', '$state', '$ionicHistory', 'config', 'strings', '$ionicLoading', function($scope, $http, $state, $ionicHistory, config, strings, $ionicLoading) {
    
    $scope.titleCreate = strings.titleCreate;
    $scope.formEmail = strings.formEmail;
    $scope.formPassword = strings.formPassword;
    $scope.JoinNow = strings.JoinNow;
    $scope.AccReady = strings.AccReady;
    $scope.Login = strings.Login;

    $scope.gender = strings.gender;
    $scope.name = strings.name;
    $scope.male = strings.male;
    $scope.female = strings.female;
    $scope.age = strings.age;
    $scope.height = strings.height;
    $scope.weight = strings.weight;
    $scope.goal = strings.goal;
    $scope.goalA = strings.goalA;
    $scope.goalB = strings.goalB;
    $scope.goalC = strings.goalC;

    $scope.user = {
      user_name : '',
      user_gender : '',
      user_age : '',
      user_height : '',
      user_weight : '',
      user_goal : '',   
      user_email : '',
      user_password : ''
    };

    $scope.saveusers = function (){

    var urlSignup = config.urlBase+'controller/new_user.php';
    $http.post(urlSignup, $scope.user)
    .then(
    function(response){
      $ionicLoading.show({ template: strings.SuccAcc, noBackdrop: true, duration: 5000});
      $state.go('tab.login',{},{location:"replace",reload:true});
    },

    function(response){
      /* if account already exists or database not connected*/
      $ionicLoading.show({ template: strings.ErrAcc, noBackdrop: true, duration: 5000});
    }
      ); 
};

}])

.controller('NoInternetCtrl', ['$scope', '$state', 'strings', '$ionicPlatform', '$ionicHistory', '$ionicPopup', function($scope, $state, strings, $ionicPlatform, $ionicHistory, $ionicPopup) {

  $scope.conMess = strings.conMess;
  $scope.conSubMess = strings.conSubMess;
  $scope.conTry = strings.conTry;

    $ionicPlatform.registerBackButtonAction(function(event) {
      console.log($state.current.name);
      if($state.current.name == "tab.nointernet") {
        $ionicPopup.confirm({
          title: strings.titleExit,
          template: '<center>'+strings.messageExit+'</center>',
          okType: "button-light",
          okText: strings.yesText,
          cancelType: "button-assertive",
          cancelText: strings.noText,
        }).then(function(res) {
          if (res) {
            ionic.Platform.exitApp();
          }
        })
      }
      else {
        navigator.app.backHistory();
      }
    }, 100);

  }])

.controller('HomeCtrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicPlatform', '$ionicPopup', '$ionicHistory', '$cordovaToast', '$localStorage', function($rootScope, $scope, $http, $state, config, strings, $ionicPlatform, $ionicPopup, $ionicHistory, $cordovaToast, $localStorage) {


  $scope.workouts = strings.workouts;
  $scope.exercises = strings.exercises;
  $scope.recipes = strings.recipes;
  $scope.blog = strings.blog;
  $scope.account = strings.account;
  $scope.settings = strings.settings;

  $scope.goBack = function() {
    $ionicHistory.backView().go();
  }

  $ionicPlatform.registerBackButtonAction(function(event) {
      console.log($state.current.name);
      if($state.current.name == "tab.home") {
        $ionicPopup.confirm({
          title: strings.titleExit,
          template: '<center>'+strings.messageExit+'</center>',
          okType: "button-light",
          okText: strings.yesText,
          cancelType: "button-assertive",
          cancelText: strings.noText,
        }).then(function(res) {
          if (res) {
            ionic.Platform.exitApp();
          }
        })
      }
      else {
        navigator.app.backHistory();
      }
    }, 100);


    var CheckInternetConnection = function() {
      if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
          $state.go('tab.nointernet');
          $ionicLoading.hide();
        }
      }
    }

    var id_auth = localStorage.getItem("id_auth");

    CheckInternetConnection();
 
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){

      if(!id_auth) {
        $state.go('tab.splash');
      }else{
        $state.go('tab.splash');
      }
        
      })

    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      $state.go('tab.nointernet');
      $ionicLoading.hide();
    })

        $scope.doLogout=function(){

      localStorage.removeItem('checked_auth');
      localStorage.removeItem('status_auth');
      localStorage.removeItem('id_auth');

      $ionicHistory.nextViewOptions({
        disableAnimate:true,
        disableBack:true
      })

      $state.go('tab.splash',{},{location:"replace",reload:true});

    }

  }])

.controller('ExercisesCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

$scope.browseby = strings.browseby;
$scope.levels = strings.levels;
$scope.levelsEx = strings.levelsEx;
$scope.equipments = strings.equipments;
$scope.equipmentsSub = strings.equipmentsSub;
$scope.bodyparts = strings.bodyparts;
$scope.bodypartsSub = strings.bodypartsSub;


}])

.controller('DetailsCtrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$sce', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $sce) {

  $scope.exerciseTitle = strings.exercise;
  $scope.reps = strings.reps;
  $scope.sets = strings.sets;
  $scope.rest = strings.restDe;
  $scope.tipsTitle = strings.tips;
  $scope.instructionsTitle = strings.instructions;
  $scope.skLevel = strings.skLevel;
  $scope.Yneed = strings.Yneed;
  $scope.mInvolved = strings.mInvolved;

$ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';

  $scope.exercises = [];
  $http.get(config.urlBase+'json/data_exercises.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.data = data.exercises[$state.params.id];
      $scope.exercises = data.exercises;
      $rootScope.videoExercise = $scope.data.exercise_video;
      $scope.coverExercise = $scope.imagesfolder+'/'+$scope.data.exercise_image;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 3000 }); 

    })

            $scope.config = {
              sources: [
                {src: $sce.trustAsResourceUrl($rootScope.videoExercise), type: "video/mp4"}
              ],
              tracks: [
                {
                  src: "",
                }
              ],
              inline: "true",
              theme: "lib/videogular-themes-default/videogular.css",
              plugins: {
                poster: ""
              }
            };

    $ionicModal.fromTemplateUrl('tips.html', function($ionicModal) {
        $scope.tips = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

    $ionicModal.fromTemplateUrl('instructions.html', function($ionicModal) {
        $scope.instructions = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 
    
  }])

.controller('MEDetailsCtrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$sce', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $sce) {


$scope.exerciseTitle = strings.exercise;
  $scope.reps = strings.reps;
  $scope.sets = strings.sets;
  $scope.rest = strings.restDe;
  $scope.tipsTitle = strings.tips;
  $scope.instructionsTitle = strings.instructions;
  $scope.skLevel = strings.skLevel;
  $scope.Yneed = strings.Yneed;
  $scope.mInvolved = strings.mInvolved;

  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';

  $scope.exercises_bodyparts = [];
  $http.get(config.urlBase+'json/data_exercises_bodyparts.php')
    .success(function(data, status, headers,config){
      console.log('data exercises_bodyparts success');
      $scope.data = data.exercises_bodyparts[$state.params.id];
      $scope.exercises_bodyparts = data.exercises_bodyparts;
      $rootScope.videoExercise = $scope.data.exercise_video;
      $scope.coverExercise = $scope.imagesfolder+'/'+$scope.data.exercise_image;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises_bodyparts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 3000 }); 

    })

            $scope.config = {
              sources: [
                {src: $sce.trustAsResourceUrl($rootScope.videoExercise), type: "video/mp4"}
              ],
              tracks: [
                {
                  src: "",
                }
              ],
              theme: "lib/videogular-themes-default/videogular.css",
              plugins: {
                poster: ""
              }
            };

    $ionicModal.fromTemplateUrl('tips.html', function($ionicModal) {
        $scope.tips = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

    $ionicModal.fromTemplateUrl('instructions.html', function($ionicModal) {
        $scope.instructions = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

  }])

.controller('BlogCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $scope.blog = strings.blog;
  $scope.recentArt = strings.recentArt;
  $scope.categories = strings.categories;


  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.posts = [];
  $http.get(config.urlBase+'json/data_posts.php')
    .success(function(data, status, headers,config){
      console.log('data posts success');
      $scope.posts = data.posts;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data posts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  $scope.tags = [];
  $http.get(config.urlBase+'json/data_tags.php')
    .success(function(data, status, headers,config){
      console.log('data tags success');
      $scope.tags = data.tags;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data tags error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    }) 

}])

.controller('WorkoutsCtrl', ['$scope', '$http', '$state', 'config', 'strings', function($scope, $http, $state, config, strings) {

$scope.browseby = strings.browseby;
$scope.goals = strings.goals;
$scope.levels = strings.levels;
$scope.goalSub = strings.goalSub;
$scope.levelSub = strings.levelSub;


}])

.controller('DetDay1Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$sce', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $sce) {

  $scope.exerciseTitle = strings.exercise;
  $scope.reps = strings.reps;
  $scope.sets = strings.sets;
  $scope.rest = strings.restDe;
  $scope.tipsTitle = strings.tips;
  $scope.instructionsTitle = strings.instructions;
  $scope.skLevel = strings.skLevel;
  $scope.Yneed = strings.Yneed;
  $scope.mInvolved = strings.mInvolved;

$ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';

  $scope.exercises = [];
  $http.get(config.urlBase+'json/data_day1.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.data = data.exercises[$state.params.id];
      $scope.exercises = data.exercises;
      $rootScope.idExercise = $scope.data.exercise_id;
      $rootScope.videoExercise = $scope.data.exercise_video;
      $scope.coverExercise = $scope.imagesfolder+'/'+$scope.data.exercise_image;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 3000 }); 

    })

           $scope.config = {
              sources: [
                {src: $sce.trustAsResourceUrl($rootScope.videoExercise), type: "video/mp4"}
              ],
              tracks: [
                {
                  src: "",
                }
              ],
              theme: "lib/videogular-themes-default/videogular.css",
              plugins: {
                poster: ""
              }
            };

    $ionicModal.fromTemplateUrl('tips.html', function($ionicModal) {
        $scope.tips = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

    $ionicModal.fromTemplateUrl('instructions.html', function($ionicModal) {
        $scope.instructions = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

$scope.bodypart = [];
  $http.get(config.urlBase+'json/data_bodypart.php?exercise='+$rootScope.idExercise)
    .success(function(data, status, headers,config){
      console.log('data bodypart success');
      $scope.bodypart = data.bodypart;
    })
    .error(function(data, status, headers,config){
      console.log('Data bodypart error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })
    
  }])

.controller('DetDay2Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$sce', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $sce) {

  $scope.exerciseTitle = strings.exercise;
  $scope.reps = strings.reps;
  $scope.sets = strings.sets;
  $scope.rest = strings.restDe;
  $scope.tipsTitle = strings.tips;
  $scope.instructionsTitle = strings.instructions;
  $scope.skLevel = strings.skLevel;
  $scope.Yneed = strings.Yneed;
  $scope.mInvolved = strings.mInvolved;

$ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';

  $scope.exercises = [];
  $http.get(config.urlBase+'json/data_day2.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.data = data.exercises[$state.params.id];
      $scope.exercises = data.exercises;
      $rootScope.idExercise = $scope.data.exercise_id;
      $rootScope.videoExercise = $scope.data.exercise_video;
      $scope.coverExercise = $scope.imagesfolder+'/'+$scope.data.exercise_image;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 3000 }); 

    })

           $scope.config = {
              sources: [
                {src: $sce.trustAsResourceUrl($rootScope.videoExercise), type: "video/mp4"}
              ],
              tracks: [
                {
                  src: "",
                }
              ],
              theme: "lib/videogular-themes-default/videogular.css",
              plugins: {
                poster: ""
              }
            };

    $ionicModal.fromTemplateUrl('tips.html', function($ionicModal) {
        $scope.tips = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

    $ionicModal.fromTemplateUrl('instructions.html', function($ionicModal) {
        $scope.instructions = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

$scope.bodypart = [];
  $http.get(config.urlBase+'json/data_bodypart.php?exercise='+$rootScope.idExercise)
    .success(function(data, status, headers,config){
      console.log('data bodypart success');
      $scope.bodypart = data.bodypart;
    })
    .error(function(data, status, headers,config){
      console.log('Data bodypart error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })
    
  }])

.controller('DetDay3Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$sce', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $sce) {

  $scope.exerciseTitle = strings.exercise;
  $scope.reps = strings.reps;
  $scope.sets = strings.sets;
  $scope.rest = strings.restDe;
  $scope.tipsTitle = strings.tips;
  $scope.instructionsTitle = strings.instructions;
  $scope.skLevel = strings.skLevel;
  $scope.Yneed = strings.Yneed;
  $scope.mInvolved = strings.mInvolved;

$ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';

  $scope.exercises = [];
  $http.get(config.urlBase+'json/data_day3.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.data = data.exercises[$state.params.id];
      $scope.exercises = data.exercises;
      $rootScope.idExercise = $scope.data.exercise_id;
      $rootScope.videoExercise = $scope.data.exercise_video;
      $scope.coverExercise = $scope.imagesfolder+'/'+$scope.data.exercise_image;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 3000 }); 

    })

           $scope.config = {
              sources: [
                {src: $sce.trustAsResourceUrl($rootScope.videoExercise), type: "video/mp4"}
              ],
              tracks: [
                {
                  src: "",
                }
              ],
              theme: "lib/videogular-themes-default/videogular.css",
              plugins: {
                poster: ""
              }
            };

    $ionicModal.fromTemplateUrl('tips.html', function($ionicModal) {
        $scope.tips = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

    $ionicModal.fromTemplateUrl('instructions.html', function($ionicModal) {
        $scope.instructions = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

$scope.bodypart = [];
  $http.get(config.urlBase+'json/data_bodypart.php?exercise='+$rootScope.idExercise)
    .success(function(data, status, headers,config){
      console.log('data bodypart success');
      $scope.bodypart = data.bodypart;
    })
    .error(function(data, status, headers,config){
      console.log('Data bodypart error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })
    
  }])

.controller('DetDay4Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$sce', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $sce) {

  $scope.exerciseTitle = strings.exercise;
  $scope.reps = strings.reps;
  $scope.sets = strings.sets;
  $scope.rest = strings.restDe;
  $scope.tipsTitle = strings.tips;
  $scope.instructionsTitle = strings.instructions;
  $scope.skLevel = strings.skLevel;
  $scope.Yneed = strings.Yneed;
  $scope.mInvolved = strings.mInvolved;

$ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';

  $scope.exercises = [];
  $http.get(config.urlBase+'json/data_day4.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.data = data.exercises[$state.params.id];
      $scope.exercises = data.exercises;
      $rootScope.idExercise = $scope.data.exercise_id;
      $rootScope.videoExercise = $scope.data.exercise_video;
      $scope.coverExercise = $scope.imagesfolder+'/'+$scope.data.exercise_image;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 3000 }); 

    })

           $scope.config = {
              sources: [
                {src: $sce.trustAsResourceUrl($rootScope.videoExercise), type: "video/mp4"}
              ],
              tracks: [
                {
                  src: "",
                }
              ],
              theme: "lib/videogular-themes-default/videogular.css",
              plugins: {
                poster: ""
              }
            };

    $ionicModal.fromTemplateUrl('tips.html', function($ionicModal) {
        $scope.tips = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

    $ionicModal.fromTemplateUrl('instructions.html', function($ionicModal) {
        $scope.instructions = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

$scope.bodypart = [];
  $http.get(config.urlBase+'json/data_bodypart.php?exercise='+$rootScope.idExercise)
    .success(function(data, status, headers,config){
      console.log('data bodypart success');
      $scope.bodypart = data.bodypart;
    })
    .error(function(data, status, headers,config){
      console.log('Data bodypart error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })
    
  }])

.controller('DetDay5Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$sce', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $sce) {

  $scope.exerciseTitle = strings.exercise;
  $scope.reps = strings.reps;
  $scope.sets = strings.sets;
  $scope.rest = strings.restDe;
  $scope.tipsTitle = strings.tips;
  $scope.instructionsTitle = strings.instructions;
  $scope.skLevel = strings.skLevel;
  $scope.Yneed = strings.Yneed;
  $scope.mInvolved = strings.mInvolved;

$ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';

  $scope.exercises = [];
  $http.get(config.urlBase+'json/data_day5.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.data = data.exercises[$state.params.id];
      $scope.exercises = data.exercises;
      $rootScope.idExercise = $scope.data.exercise_id;
      $rootScope.videoExercise = $scope.data.exercise_video;
      $scope.coverExercise = $scope.imagesfolder+'/'+$scope.data.exercise_image;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 3000 }); 

    })

           $scope.config = {
              sources: [
                {src: $sce.trustAsResourceUrl($rootScope.videoExercise), type: "video/mp4"}
              ],
              tracks: [
                {
                  src: "",
                }
              ],
              theme: "lib/videogular-themes-default/videogular.css",
              plugins: {
                poster: ""
              }
            };

    $ionicModal.fromTemplateUrl('tips.html', function($ionicModal) {
        $scope.tips = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

    $ionicModal.fromTemplateUrl('instructions.html', function($ionicModal) {
        $scope.instructions = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

$scope.bodypart = [];
  $http.get(config.urlBase+'json/data_bodypart.php?exercise='+$rootScope.idExercise)
    .success(function(data, status, headers,config){
      console.log('data bodypart success');
      $scope.bodypart = data.bodypart;
    })
    .error(function(data, status, headers,config){
      console.log('Data bodypart error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })
    
  }])

.controller('DetDay6Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$sce', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $sce) {

  $scope.exerciseTitle = strings.exercise;
  $scope.reps = strings.reps;
  $scope.sets = strings.sets;
  $scope.rest = strings.restDe;
  $scope.tipsTitle = strings.tips;
  $scope.instructionsTitle = strings.instructions;
  $scope.skLevel = strings.skLevel;
  $scope.Yneed = strings.Yneed;
  $scope.mInvolved = strings.mInvolved;

$ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';

  $scope.exercises = [];
  $http.get(config.urlBase+'json/data_day6.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.data = data.exercises[$state.params.id];
      $scope.exercises = data.exercises;
      $rootScope.idExercise = $scope.data.exercise_id;
      $rootScope.videoExercise = $scope.data.exercise_video;
      $scope.coverExercise = $scope.imagesfolder+'/'+$scope.data.exercise_image;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 3000 }); 

    })

           $scope.config = {
              sources: [
                {src: $sce.trustAsResourceUrl($rootScope.videoExercise), type: "video/mp4"}
              ],
              tracks: [
                {
                  src: "",
                }
              ],
              theme: "lib/videogular-themes-default/videogular.css",
              plugins: {
                poster: ""
              }
            };

    $ionicModal.fromTemplateUrl('tips.html', function($ionicModal) {
        $scope.tips = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

    $ionicModal.fromTemplateUrl('instructions.html', function($ionicModal) {
        $scope.instructions = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

$scope.bodypart = [];
  $http.get(config.urlBase+'json/data_bodypart.php?exercise='+$rootScope.idExercise)
    .success(function(data, status, headers,config){
      console.log('data bodypart success');
      $scope.bodypart = data.bodypart;
    })
    .error(function(data, status, headers,config){
      console.log('Data bodypart error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })
    
  }])

.controller('DetDay7Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$sce', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $sce) {

  $scope.exerciseTitle = strings.exercise;
  $scope.reps = strings.reps;
  $scope.sets = strings.sets;
  $scope.rest = strings.restDe;
  $scope.tipsTitle = strings.tips;
  $scope.instructionsTitle = strings.instructions;
  $scope.skLevel = strings.skLevel;
  $scope.Yneed = strings.Yneed;
  $scope.mInvolved = strings.mInvolved;

$ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';

  $scope.exercises = [];
  $http.get(config.urlBase+'json/data_day7.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.data = data.exercises[$state.params.id];
      $scope.exercises = data.exercises;
      $rootScope.idExercise = $scope.data.exercise_id;
      $rootScope.videoExercise = $scope.data.exercise_video;
      $scope.coverExercise = $scope.imagesfolder+'/'+$scope.data.exercise_image;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 3000 }); 

    })

           $scope.config = {
              sources: [
                {src: $sce.trustAsResourceUrl($rootScope.videoExercise), type: "video/mp4"}
              ],
              tracks: [
                {
                  src: "",
                }
              ],
              theme: "lib/videogular-themes-default/videogular.css",
              plugins: {
                poster: ""
              }
            };

    $ionicModal.fromTemplateUrl('tips.html', function($ionicModal) {
        $scope.tips = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

    $ionicModal.fromTemplateUrl('instructions.html', function($ionicModal) {
        $scope.instructions = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

$scope.bodypart = [];
  $http.get(config.urlBase+'json/data_bodypart.php?exercise='+$rootScope.idExercise)
    .success(function(data, status, headers,config){
      console.log('data bodypart success');
      $scope.bodypart = data.bodypart;
    })
    .error(function(data, status, headers,config){
      console.log('Data bodypart error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })
    
  }])

.controller('Day1Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $scope.day = strings.day;
  $scope.rest = strings.rest;
  $scope.restPro = strings.restPro;
  $scope.restText = strings.restText;

  $scope.imagesfolder = config.urlBase+'images';
  $scope.workouts = [];
  $http.get(config.urlBase+'json/data_workouts.php')
    .success(function(data, status, headers,config){
      console.log('data workouts success');
      $scope.data = data.workouts[$state.params.did];
      $rootScope.dataworkoutid = $scope.data.workout_id;
      $scope.workouts = data.workouts;
    })
    .error(function(data, status, headers,config){
      console.log('Data workouts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })


$scope.exercises = [];
  $http.get(config.urlBase+'json/data_day1.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.exercises = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

$scope.rests = [];
  $http.get(config.urlBase+'json/data_day1.php?wid='+$rootScope.dataworkoutid)
    .success(function(data, status, headers,config){
      console.log('data rests success');
      $scope.rests = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data rests error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('Day2Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout) {

$scope.day = strings.day;
  $scope.rest = strings.rest;
  $scope.restPro = strings.restPro;
  $scope.restText = strings.restText;

  $scope.imagesfolder = config.urlBase+'images';
  $scope.workouts = [];
  $http.get(config.urlBase+'json/data_workouts.php')
    .success(function(data, status, headers,config){
      console.log('data workouts success');
      $scope.data = data.workouts[$state.params.did];
      $rootScope.dataworkoutid = $scope.data.workout_id;
      $scope.workouts = data.workouts;
    })
    .error(function(data, status, headers,config){
      console.log('Data workouts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })


$scope.exercises = [];
  $http.get(config.urlBase+'json/data_day2.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.exercises = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

$scope.rests = [];
  $http.get(config.urlBase+'json/data_day2.php?wid='+$rootScope.dataworkoutid)
    .success(function(data, status, headers,config){
      console.log('data rests success');
      $scope.rests = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data rests error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('Day3Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout) {

$scope.day = strings.day;
  $scope.rest = strings.rest;
  $scope.restPro = strings.restPro;
  $scope.restText = strings.restText;

  $scope.imagesfolder = config.urlBase+'images';
  $scope.workouts = [];
  $http.get(config.urlBase+'json/data_workouts.php')
    .success(function(data, status, headers,config){
      console.log('data workouts success');
      $scope.data = data.workouts[$state.params.did];
      $rootScope.dataworkoutid = $scope.data.workout_id;
      $scope.workouts = data.workouts;
    })
    .error(function(data, status, headers,config){
      console.log('Data workouts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })


$scope.exercises = [];
  $http.get(config.urlBase+'json/data_day3.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.exercises = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

$scope.rests = [];
  $http.get(config.urlBase+'json/data_day3.php?wid='+$rootScope.dataworkoutid)
    .success(function(data, status, headers,config){
      console.log('data rests success');
      $scope.rests = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data rests error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('Day4Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout) {

$scope.day = strings.day;
  $scope.rest = strings.rest;
  $scope.restPro = strings.restPro;
  $scope.restText = strings.restText;

  $scope.imagesfolder = config.urlBase+'images';
  $scope.workouts = [];
  $http.get(config.urlBase+'json/data_workouts.php')
    .success(function(data, status, headers,config){
      console.log('data workouts success');
      $scope.data = data.workouts[$state.params.did];
      $rootScope.dataworkoutid = $scope.data.workout_id;
      $scope.workouts = data.workouts;
    })
    .error(function(data, status, headers,config){
      console.log('Data workouts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })


$scope.exercises = [];
  $http.get(config.urlBase+'json/data_day4.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.exercises = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

$scope.rests = [];
  $http.get(config.urlBase+'json/data_day4.php?wid='+$rootScope.dataworkoutid)
    .success(function(data, status, headers,config){
      console.log('data rests success');
      $scope.rests = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data rests error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('Day5Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout) {

$scope.day = strings.day;
  $scope.rest = strings.rest;
  $scope.restPro = strings.restPro;
  $scope.restText = strings.restText;

  $scope.imagesfolder = config.urlBase+'images';
  $scope.workouts = [];
  $http.get(config.urlBase+'json/data_workouts.php')
    .success(function(data, status, headers,config){
      console.log('data workouts success');
      $scope.data = data.workouts[$state.params.did];
      $rootScope.dataworkoutid = $scope.data.workout_id;
      $scope.workouts = data.workouts;
    })
    .error(function(data, status, headers,config){
      console.log('Data workouts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })


$scope.exercises = [];
  $http.get(config.urlBase+'json/data_day5.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.exercises = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

$scope.rests = [];
  $http.get(config.urlBase+'json/data_day5.php?wid='+$rootScope.dataworkoutid)
    .success(function(data, status, headers,config){
      console.log('data rests success');
      $scope.rests = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data rests error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('Day6Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout) {

$scope.day = strings.day;
  $scope.rest = strings.rest;
  $scope.restPro = strings.restPro;
  $scope.restText = strings.restText;

  $scope.imagesfolder = config.urlBase+'images';
  $scope.workouts = [];
  $http.get(config.urlBase+'json/data_workouts.php')
    .success(function(data, status, headers,config){
      console.log('data workouts success');
      $scope.data = data.workouts[$state.params.did];
      $rootScope.dataworkoutid = $scope.data.workout_id;
      $scope.workouts = data.workouts;
    })
    .error(function(data, status, headers,config){
      console.log('Data workouts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })


$scope.exercises = [];
  $http.get(config.urlBase+'json/data_day6.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.exercises = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

$scope.rests = [];
  $http.get(config.urlBase+'json/data_day6.php?wid='+$rootScope.dataworkoutid)
    .success(function(data, status, headers,config){
      console.log('data rests success');
      $scope.rests = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data rests error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('Day7Ctrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout) {

$scope.day = strings.day;
  $scope.rest = strings.rest;
  $scope.restPro = strings.restPro;
  $scope.restText = strings.restText;

  $scope.imagesfolder = config.urlBase+'images';
  $scope.workouts = [];
  $http.get(config.urlBase+'json/data_workouts.php')
    .success(function(data, status, headers,config){
      console.log('data workouts success');
      $scope.data = data.workouts[$state.params.did];
      $rootScope.dataworkoutid = $scope.data.workout_id;
      $scope.workouts = data.workouts;
    })
    .error(function(data, status, headers,config){
      console.log('Data workouts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })


$scope.exercises = [];
  $http.get(config.urlBase+'json/data_day7.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.exercises = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

$scope.rests = [];
  $http.get(config.urlBase+'json/data_day7.php?wid='+$rootScope.dataworkoutid)
    .success(function(data, status, headers,config){
      console.log('data rests success');
      $scope.rests = data.exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data rests error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('SWLevelCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.levels = [];
  $http.get(config.urlBase+'json/data_levels.php')
    .success(function(data, status, headers,config){
      console.log('data levels success');
      $scope.data = data.levels[$state.params.id];
      $scope.levels = data.levels;
    })
    .error(function(data, status, headers,config){
      console.log('Data levels error');
    })

  $scope.workouts = [];
  $http.get(config.urlBase+'json/data_workouts.php')
    .success(function(data, status, headers,config){
      console.log('data workouts success');
      $scope.workouts = data.workouts;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data workouts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('WGoalCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.goals = [];
  $http.get(config.urlBase+'json/data_goals.php')
    .success(function(data, status, headers,config){
      console.log('data goals success');
      $scope.data = data.goals[$state.params.id];
      $scope.goals = data.goals;
    })
    .error(function(data, status, headers,config){
      console.log('Data goals error');
    })

  $scope.workouts = [];
  $http.get(config.urlBase+'json/data_workouts.php')
    .success(function(data, status, headers,config){
      console.log('data workouts success');
      $scope.workouts = data.workouts;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data workouts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('WDetailsCtrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', 'WorkoutsService', '$ionicModal', function($rootScope, $scope, $http, $state, config, strings, $ionicLoading, $timeout, WorkoutsService, $ionicModal) {

  $scope.workoutTitle = strings.workout;
  $scope.level = strings.level;
  $scope.goal = strings.goal;
  $scope.Mon = strings.Mon;
  $scope.Tue = strings.Tue;
  $scope.Wed = strings.Wed;
  $scope.Thu = strings.Thu;
  $scope.Fri = strings.Fri;
  $scope.Sat = strings.Sat;
  $scope.Sun = strings.Sun;

  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.workouts = [];
  $http.get(config.urlBase+'json/data_workouts.php')
    .success(function(data, status, headers,config){
      console.log('data workouts success');
      $scope.data = data.workouts[$state.params.id];
      $scope.workouts = data.workouts;
      $rootScope.dataworkoutid = $scope.data.workout_id;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data workouts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

 $scope.addTofavorite = function(data){
    $ionicLoading.show({ template: strings.saved, noBackdrop: true, duration: 1000 });
    WorkoutsService.favorite(data);
  };

  }])

.controller('GoalsCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $scope.goalsTitle = strings.goals;
  
  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.goals = [];
  $http.get(config.urlBase+'json/data_goals.php')
    .success(function(data, status, headers,config){
      console.log('data goals success');
      $scope.goals = data.goals;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data goals error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('BodypartsCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $scope.bodypartsTitle = strings.bodyparts;
  
  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.bodyparts = [];
  $http.get(config.urlBase+'json/data_bodyparts.php')
    .success(function(data, status, headers,config){
      console.log('data bodyparts success');
      $scope.bodyparts = data.bodyparts;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data bodyparts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])


.controller('CategoryCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  
  $scope.cookTime = strings.cookTime;
  $scope.servings = strings.servings;

  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true  });

  $scope.imagesfolder = config.urlBase+'images';


  $scope.categories = [];
  $http.get(config.urlBase+'json/data_categories.php')
    .success(function(data, status, headers,config){
      console.log('data categories success');
      $scope.data = data.categories[$state.params.id];
      $scope.categories = data.categories;
    })
    .error(function(data, status, headers,config){
      console.log('Data categories error');
    })

  $scope.diets = [];
  $http.get(config.urlBase+'json/data_diets.php')
    .success(function(data, status, headers,config){
      console.log('data diets success');
      $scope.diets = data.diets;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data diets error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('DietsCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $scope.recipes = strings.recipes;
  $scope.cookTime = strings.cookTime;
  $scope.servings = strings.servings;
  $scope.featRecipes = strings.featRecipes;
  $scope.cal = strings.cal;

  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.diets = [];
  $http.get(config.urlBase+'json/data_diets.php')
    .success(function(data, status, headers,config){
      console.log('data diets success');
      $scope.diets = data.diets;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data diets error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  $scope.categories = [];
  $http.get(config.urlBase+'json/data_categories.php')
    .success(function(data, status, headers,config){
      console.log('data categories success');
      $scope.categories = data.categories;
    })
    .error(function(data, status, headers,config){
      console.log('Data categories error');
    })

  }])

.controller('PostCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$ionicPlatform', '$cordovaSocialSharing', function($scope, $http, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $ionicPlatform, $cordovaSocialSharing) {

  $scope.blog = strings.blog;
  $scope.commentsTitle = strings.comments;
  $scope.commentReview = strings.commentReview;
  $scope.addComment = strings.addComment;
  $scope.shareTitle = strings.shareRecipe;
  $scope.commentTitle = strings.comment;
  $scope.yourComment = strings.yourComment;
  $scope.commentLimit = strings.commentLimit;


  
  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.posts = [];
  $http.get(config.urlBase+'json/data_posts.php')
    .success(function(data, status, headers,config){
      console.log('data posts success');
      $scope.data = data.posts[$state.params.id];
      $scope.posts = data.posts;
      $scope.titlePost = $scope.data.post_title;
      $scope.idPost = $scope.data.post_id;
      $scope.imagePost = $scope.data.post_image;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data posts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

$scope.comentarios = [];
  var urlstr = config.urlBase+"json/data_comments.php";
  $http.get(urlstr)
  .success(function(data, status, headers,config){
      console.log('Data comentarios success');
      $scope.comentarios = data.comentarios;
      $ionicLoading.hide();
  })
  .error(function(data, status, headers,config){
      console.log('Data comentarios error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 });
  })

    $ionicModal.fromTemplateUrl('share.html', function($ionicModal) {
        $scope.share = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

    $ionicModal.fromTemplateUrl('comment.html', function($ionicModal) {
        $scope.comment = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

  var isIOS = ionic.Platform.isIOS();
  var isAndroid = ionic.Platform.isAndroid();

  $ionicPlatform.ready(function() { 
    if (isIOS) {
      $scope.appUrl = config.appstoreAppUrl+config.appstoreAppId;
    }
    if (isAndroid) {
      $scope.appUrl = config.playstoreAppUrl+config.playstoreAppId;
    }
  });

   $scope.shareViaTwitter = function() {
    var twitter = 'https://twitter.com/home?status='+$scope.appUrl;
    window.open(encodeURI(twitter), '_system');
  };

  $scope.shareViaGoogle = function() {
    var google = 'https://plus.google.com/share?url='+$scope.appUrl;
    window.open(encodeURI(google), '_system');
  };

   $scope.shareViaFacebook = function() {
    var facebook = 'https://www.facebook.com/sharer/sharer.php?u='+$scope.appUrl;
    window.open(encodeURI(facebook), '_system');
  };

  $scope.shareViaWhatsApp = function() {
    $cordovaSocialSharing.shareViaWhatsApp($scope.titlePost, $scope.imagesfolder+'/'+$scope.imagePost, $scope.appUrl);
  };

 $scope.OtherShare=function(){
     window.plugins.socialsharing.share(strings.shareMess, null, null, $scope.appUrl);
  }

$scope.comment={};

    $scope.sendComment=function(){
    $ionicLoading.show({ template: strings.sentSuccess, noBackdrop: true, duration: 5000 });

    var user = localStorage.getItem("id_auth");
    var content = $scope.comment.content;

      if(user){
          var urlComment = config.urlBase+"controller/new_comment.php?user="+user+"&post="+$scope.idPost+"&content="+content;
          $http.get(urlComment)
            .success(function(){
            $ionicLoading.show({ template: strings.sentSuccess, noBackdrop: true, duration: 2500 });
            $scope.comment.hide()             
            })
            .error(function(){   
            $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 3000 });        
            });

      }else{
      }
    }

  }])

.controller('PTagCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$ionicPlatform', '$cordovaSocialSharing', function($scope, $http, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $ionicPlatform, $cordovaSocialSharing) {

  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.posts = [];
  $http.get(config.urlBase+'json/data_posts.php')
    .success(function(data, status, headers,config){
      console.log('data posts success');
      $scope.posts = data.posts;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data posts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 
    })

  $scope.tags = [];
  $http.get(config.urlBase+'json/data_tags.php')
    .success(function(data, status, headers,config){
      console.log('data tags success');
      $scope.data = data.tags[$state.params.id];
      $scope.tags = data.tags;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data tags error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 
    })

  }])


.controller('RecipeCtrl', ['$scope', '$http', 'RecipesService', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$ionicPlatform', '$cordovaSocialSharing', function($scope, $http, RecipesService, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $ionicPlatform, $cordovaSocialSharing) {

  $scope.cookTime = strings.cookTime;
  $scope.servings = strings.servings;
  $scope.singleRecipe = strings.singleRecipe;
  $scope.calories = strings.calories;
  $scope.protein = strings.protein;
  $scope.fat = strings.fat;
  $scope.carbs = strings.carbs;
  $scope.readMore = strings.readMore;
  $scope.ingredients = strings.ingredients;
  $scope.directions = strings.directions;
  $scope.description = strings.description;
  $scope.shareRecipe = strings.shareRecipe;



  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.diets = [];
  $http.get(config.urlBase+'json/data_diets.php')
    .success(function(data, status, headers,config){
      console.log('data diets success');
      $scope.data = data.diets[$state.params.id];
      $scope.diets = data.diets;
      $scope.titleDiet = $scope.data.diet_title;
      $scope.imageDiet = $scope.data.diet_image;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data diets error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

    $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $ionicModal.fromTemplateUrl('share.html', function($ionicModal) {
        $scope.share = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }); 

  var isIOS = ionic.Platform.isIOS();
  var isAndroid = ionic.Platform.isAndroid();

  $ionicPlatform.ready(function() { 
    if (isIOS) {
      $scope.appUrl = config.appstoreAppUrl+config.appstoreAppId;
    }
    if (isAndroid) {
      $scope.appUrl = config.playstoreAppUrl+config.playstoreAppId;
    }
  });

   $scope.shareViaTwitter = function() {
    var twitter = 'https://twitter.com/home?status='+$scope.appUrl;
    window.open(encodeURI(twitter), '_system');
  };

  $scope.shareViaGoogle = function() {
    var google = 'https://plus.google.com/share?url='+$scope.appUrl;
    window.open(encodeURI(google), '_system');
  };

   $scope.shareViaFacebook = function() {
    var facebook = 'https://www.facebook.com/sharer/sharer.php?u='+$scope.appUrl;
    window.open(encodeURI(facebook), '_system');
  };

  $scope.shareViaWhatsApp = function() {
    $cordovaSocialSharing.shareViaWhatsApp($scope.titleDiet, $scope.imagesfolder+'/'+$scope.imageDiet, $scope.appUrl);
  };

 $scope.OtherShare=function(){
     window.plugins.socialsharing.share(strings.shareMess, null, null, $scope.appUrl);
  }

 $scope.addTofavorite = function(data){
    $ionicLoading.show({ template: strings.saved, noBackdrop: true, duration: 1000 });
    RecipesService.favorite(data);
  };

  }])


.controller('EquipmentsCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $scope.equipmentsTitle = strings.equipments;

  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.equipments = [];
  $http.get(config.urlBase+'json/data_equipments.php')
    .success(function(data, status, headers,config){
      console.log('data equipments success');
      $scope.equipments = data.equipments;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data equipments error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('MuscleCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.bodyparts = [];
  $http.get(config.urlBase+'json/data_bodyparts.php')
    .success(function(data, status, headers,config){
      console.log('data bodyparts success');
      $scope.data = data.bodyparts[$state.params.id];
      $scope.bodyparts = data.bodyparts;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data bodyparts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  $scope.exercises_bodyparts = [];
  $http.get(config.urlBase+'json/data_exercises_bodyparts.php')
    .success(function(data, status, headers,config){
      console.log('data exercises_bodyparts success');
      $scope.exercises_bodyparts = data.exercises_bodyparts;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises_bodyparts error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])


.controller('WLevelsCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $scope.levelsTitle = strings.levels;
  
  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.levels = [];
  $http.get(config.urlBase+'json/data_levels.php')
    .success(function(data, status, headers,config){
      console.log('data levels success');
      $scope.levels = data.levels;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data levels error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 });
    })

  }])


.controller('SELevelCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.levels = [];
  $http.get(config.urlBase+'json/data_levels.php')
    .success(function(data, status, headers,config){
      console.log('data levels success');
      $scope.data = data.levels[$state.params.id];
      $scope.levels = data.levels;
    })
    .error(function(data, status, headers,config){
      console.log('Data levels error');
    })

  $scope.exercises = [];
  $http.get(config.urlBase+'json/data_exercises.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.exercises = data.exercises;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('MachineCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.equipments = [];
  $http.get(config.urlBase+'json/data_equipments.php')
    .success(function(data, status, headers,config){
      console.log('data equipments success');
      $scope.data = data.equipments[$state.params.id];
      $scope.equipments = data.equipments;
    })
    .error(function(data, status, headers,config){
      console.log('Data equipments error');
    })

  $scope.exercises = [];
  $http.get(config.urlBase+'json/data_exercises.php')
    .success(function(data, status, headers,config){
      console.log('data exercises success');
      $scope.exercises = data.exercises;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 }); 

    })

  }])

.controller('ELevelsCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

    $scope.levelsTitle = strings.levels;

    $ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';

  $scope.levels = [];
  $http.get(config.urlBase+'json/data_levels.php')
    .success(function(data, status, headers,config){
      console.log('data levels success');
      $scope.levels = data.levels;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data levels error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 });
    })

  }])

.controller('ForgetCtrl', ['$scope', '$ionicModal', '$timeout', '$ionicPopup', '$http', '$state', '$ionicHistory', 'config', 'strings', '$ionicLoading', function($scope, $ionicModal, $timeout, $ionicPopup, $http, $state, $ionicHistory, config, strings, $ionicLoading) {
    
    $scope.formEmail = strings.formEmail;
    $scope.titleforget = strings.titleforget;
    $scope.forgetText = strings.forgetText;
    $scope.sendNow = strings.sendNow;
    $scope.succForget = strings.succForget;
    $scope.forgetErr = strings.forgetErr;
    $scope.Login = strings.Login;

    $scope.loginData={};

    $scope.doLogin=function(){
    var user_email=$scope.loginData.username;

      if(user_email){
          var str = config.urlBase+"controller/data_forget.php?username="+user_email;
          $http.get(str)
            .success(function(){
            $scope.success.show();                  
            })
            .error(function(){   
            $ionicLoading.show({ template: $scope.forgetErr, noBackdrop: true, duration: 5000 });           
            });

      }else{
      }
    }

$scope.cancelar = function(){
$scope.success.hide();
$state.go('tab.login',{},{location:"replace",reload:true});
}

    $ionicModal.fromTemplateUrl('success.html', function($ionicModal) {
        $scope.success = $ionicModal;
    }, {
        scope: $scope,
        hardwareBackButtonClose: false,
        animation: 'slide-in-up'
    }); 

$ionicHistory.nextViewOptions({
disableAnimate:true,
disableBack:true
})

}])

.controller('ContactCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$timeout', '$ionicLoading', function($scope, $http, $state, config, strings, $timeout, $ionicLoading) {

    $scope.contactEmail = strings.contactEmail;
    $scope.contactPhone = strings.contactPhone;
    $scope.contactWebsite = strings.contactWebsite;
    $scope.contactAddress = strings.contactAddress;
    $scope.contactTitle = strings.contactTitle;
    $scope.FormcontactSend = strings.FormcontactSend;



    $scope.openEmail = function(email) {
      window.open(encodeURI('mailto:'+$scope.contactEmail), '_system');
    }

    $scope.openWeb = function(website) {
      window.open(encodeURI($scope.contactWebsite), '_system');
    }

    $scope.openMap = function(map) {
      window.open(encodeURI('https://www.google.es/maps/place/'+$scope.contactAddress), '_system');
    }

    $scope.contact={};

    $scope.sendForm=function(){
    $ionicLoading.show({ template: strings.sentSuccess, noBackdrop: true, duration: 5000 });

    var user_id = localStorage.getItem("id_auth");
    var user_name = $scope.contact.name;
    var user_email = $scope.contact.email;
    var user_message = $scope.contact.message;

      if(user_email){
          var urlContact = config.urlBase+"controller/contact.php?user_id="+user_id+"&user_name="+user_name+"&user_email="+user_email+"&user_message="+user_message;
          $http.get(urlContact)
            .success(function(){
            $ionicLoading.show({ template: strings.sentSuccess, noBackdrop: true, duration: 2000 });
            $state.go('tab.settings',{},{location:"replace",reload:true});             
            })
            .error(function(){   
            $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 4000 });        
            });

      }else{
      }
    }


}])

.controller('SettingsCtrl', ['$scope', '$http', 'RecipesService', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$ionicPlatform', function($scope, $http, RecipesService, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $ionicPlatform) {

$scope.settingsTitle = strings.settings;
$scope.aboutusTitle = strings.aboutusTitle;
$scope.contactTitle = strings.contactTitle;
$scope.termsTitle = strings.termsTitle;
$scope.privacyTitle = strings.privacyTitle;
$scope.rateapp = strings.rateapp;




$scope.strings = [];
  var urlstr = config.urlBase+"json/data_strings.php";
  $http.get(urlstr)
  .success(function(data, status, headers,config){
      console.log('Data strings success');
      $scope.strings = data.strings;
  })
  .error(function(data, status, headers,config){
      console.log('Data strings error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 });
  })

    $ionicModal.fromTemplateUrl('about.html', function($ionicModal) {
        $scope.about = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $ionicModal.fromTemplateUrl('policy.html', function($ionicModal) {
        $scope.policy = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $ionicModal.fromTemplateUrl('terms.html', function($ionicModal) {
        $scope.terms = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

  var isIOS = ionic.Platform.isIOS();
  var isAndroid = ionic.Platform.isAndroid();

  $ionicPlatform.ready(function() { 
    if (isIOS) {
      $scope.appUrl = config.appstoreAppUrl+config.appstoreAppId;
      $scope.openMarket = function(market) {
      window.open(encodeURI($scope.appUrl), '_system');
      }
    }
    if (isAndroid) {
      $scope.appUrl = config.playstoreAppUrl+config.playstoreAppId;
      $scope.openMarket = function(market) {
      window.open(encodeURI($scope.appUrl), '_system');
      }
    }
  });

}])


.controller('EditCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$localStorage', '$ionicLoading', function($scope, $http, $state, config, strings, $localStorage, $ionicLoading) {


}])


.controller('AccountCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$ionicHistory', '$localStorage', 'RecipesService', 'WorkoutsService', function($scope, $http, $state, config, strings, $ionicLoading, $ionicHistory, $localStorage, RecipesService, WorkoutsService) {

$ionicLoading.show({
    template: strings.loading,
    noBackdrop: true
});

$scope.account = strings.account;
$scope.athlete = strings.athlete;
$scope.goal = strings.goal;
$scope.gender = strings.gender;
$scope.workouts = strings.workouts;
$scope.recipes = strings.recipes;
$scope.empty = strings.empty;

$scope.id_auth = localStorage.getItem("id_auth");
$scope.email_auth = localStorage.getItem("email_auth");

  $scope.users = [];
  $scope.imagesfolder = config.urlBase+'images';
  var urlstr = config.urlBase+"json/data_user.php?user="+$scope.email_auth;
  $http.get(urlstr)
  .success(function(data, status, headers,config){
      console.log('Data users success');
      $scope.users = data.users;
      $ionicLoading.hide();
  })
  .error(function(data, status, headers,config){
      console.log('Data users error');
      $ionicLoading.show({ template: strings.errorWrong, noBackdrop: true, duration: 5000 });
  })

    $scope.$on('$ionicView.enter',function(){
      $scope.dietsFavorites =  RecipesService.favorite();
      $ionicLoading.hide();
    });
    
    $scope.$on('$ionicView.enter',function(){
      $scope.workoutsFavorites =  WorkoutsService.favorite();
      $ionicLoading.hide();
    });

    $scope.removefavoriteRecipe = function(id) {
       $scope.dietsFavorites =  RecipesService.favorite(id);
    };

    $scope.removefavoriteWorkout = function(id) {
       $scope.workoutsFavorites =  WorkoutsService.favorite(id);
    };

        $scope.doLogout=function(){

      localStorage.removeItem('checked_auth');
      localStorage.removeItem('status_auth');
      localStorage.removeItem('id_auth');

      $ionicHistory.nextViewOptions({
        disableAnimate:true,
        disableBack:true
      })

      $state.go('tab.splash',{},{location:"replace",reload:true});

    }

}])