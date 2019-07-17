describe("FirstController", function() {
  beforeEach(module("myApp"));

  var $controller, $rootScope;

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  describe("$scope.grade", function() {
    it("sets listUser", function() {
      var $scope = $rootScope.$new();
      var controller = $controller("FirstController", { $scope: $scope });
      var userList = [
        {
          points: 0,
          driver: "Kimi Räikkönen",
          country: "fi",
          team: 1
        },
        {
          points: 0,
          driver: "Fernando Alonso",
          country: "es",
          team: 1
        },
        {
          points: 0,
          driver: "Nico Rosberg",
          country: "de",
          team: 2
        },
        {
          points: 0,
          driver: "Lewis Hamilton",
          country: "uk",
          team: 2
        },
        {
          points: 0,
          driver: "Sebastian Vettel",
          country: "de",
          team: 3
        },
        {
          points: 0,
          driver: "Daniel Ricciardo",
          country: "au",
          team: 3
        },
        {
          points: 0,
          driver: "Valtteri Botas",
          country: "fi",
          team: 4
        },
        {
          points: 0,
          driver: "Felipe Massa",
          country: "br",
          team: 4
        },
        {
          points: 0,
          driver: "Kevin Magnussen",
          country: "dk",
          team: 5
        },
        {
          points: 0,
          driver: "Jenson Button",
          country: "uk",
          team: 5
        }
      ];
      $scope.listUser = userList;
      expect($scope.listUser).toEqual(userList);
    });
  });
});

describe("Services", function() {
  beforeEach(module("myApp"));

  describe("dataService", function() {
    var service, $httpBackend;

    beforeEach(inject(function($injector) {
      service = $injector.get("dataService");
      $httpBackend = $injector.get("$httpBackend");

      $httpBackend.when("GET", "/api/standings.json").respond([
        {
          points: 0,
          driver: "Kimi Räikkönen",
          country: "fi",
          team: 1
        },
        {
          points: 0,
          driver: "Fernando Alonso",
          country: "es",
          team: 1
        },
        {
          points: 0,
          driver: "Nico Rosberg",
          country: "de",
          team: 2
        },
        {
          points: 0,
          driver: "Lewis Hamilton",
          country: "uk",
          team: 2
        },
        {
          points: 0,
          driver: "Sebastian Vettel",
          country: "de",
          team: 3
        },
        {
          points: 0,
          driver: "Daniel Ricciardo",
          country: "au",
          team: 3
        },
        {
          points: 0,
          driver: "Valtteri Botas",
          country: "fi",
          team: 4
        },
        {
          points: 0,
          driver: "Felipe Massa",
          country: "br",
          team: 4
        },
        {
          points: 0,
          driver: "Kevin Magnussen",
          country: "dk",
          team: 5
        },
        {
          points: 0,
          driver: "Jenson Button",
          country: "uk",
          team: 5
        }
      ]);
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("getStandings - should return 10 drivers", function() {
      var getSize = function(obj) {
        var size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };

      service.getStandings().then(function(response) {
        console.log(getSize(response));
        expect(getSize(response)).toEqual(10);
      });
      $httpBackend.flush();
    });
  });
});
