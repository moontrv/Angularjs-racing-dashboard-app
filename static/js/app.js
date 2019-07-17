var myapp = angular.module("myApp", ["ngRoute"]);

myapp.config([
  "$routeProvider",
  "$locationProvider",
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "static/views/mainpage.html",
        controller: "FirstController"
      })
      .when("/teams", {
        templateUrl: "static/views/teams.html",
        controller: "FirstController"
      })
      .when("/teams/:id", {
        templateUrl: "static/views/team.html",
        controller: "SingleTeamController"
      })
      .otherwise({
        redirectTo: "#/"
      });
    //$locationProvider.html5Mode(true);
  }
]);

myapp.run(function() {});

myapp.controller("FirstController", [
  "$scope",
  "$http",
  "dataService",
  function($scope, $http, dataService) {
    $scope.listUser = [];
    $scope.listUser = dataService.returnObj;

    dataService.getStandings();
    window.setInterval(function() {
      dataService.getStandings();
    }, 1000);

    $scope.message = "";
    $scope.removePerson = function(person) {
      var removePerson = $scope.listUser.indexOf(person);
      $scope.listUser.splice(removePerson, 1);
    };
    $scope.addPerson = function() {
      $scope.listUser.push({
        country: $scope.newPerson.country,
        driver: $scope.newPerson.driver,
        points: parseInt($scope.newPerson.points),
        team: parseInt($scope.newPerson.team)
      });
      $scope.newPerson.country = "";
      $scope.newPerson.driver = "";
      $scope.newPerson.points = "";
      $scope.newPerson.team = "";
    };
    $scope.goToTeamPage = function(teamID) {
      alert(teamID);
    };
  }
]);

myapp.controller("SingleTeamController", [
  "$scope",
  "$http",
  "$routeParams",
  "dataService",
  function($scope, $http, $routeParams, dataService) {
    $scope.team = [];
    $scope.listUserOfATeam = [];
    $scope.teamID = $routeParams.id;

    dataService.getStandings().then(function() {
      // function checkTeam(item) {
      //   return item.team == $routeParams.id;
      // }
      // $scope.listUserOfATeam = dataService.returnObj.filter(checkTeam);
      // console.log($scope.listUserOfATeam);

      //Subscribe to changes of dataService
      $scope.listUserOfATeam = dataService.returnObj;
    });

    var urlc = "/api/team/" + $routeParams.id + ".json";

    dataService.getATeam(urlc).then(function(data) {
      $scope.team = data;
      console.log(data);
    });
  }
]);

myapp.factory("dataService", [
  "$http",
  function($http) {
    var returnObj = [];
    var getStandings = function() {
      return $http({
        method: "GET",
        url: "/api/standings.json"
      }).then(
        function successCallback(response) {
          console.log(response.data);
          angular.copy(response.data, returnObj);
          return response.data;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    var getATeam = function(urlc) {
      return $http({
        method: "GET",
        url: urlc
      }).then(
        function successCallback(response) {
          return response.data;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    return {
      getStandings: getStandings,
      getATeam: getATeam,
      returnObj: returnObj
    };
  }
]);
