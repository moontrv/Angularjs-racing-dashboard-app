// describe("Users factory", function() {
//   it("has a dummy spec to test 2 + 2", function() {
//     // An intentionally failing test. No code within expect() will never equal 4.
//     expect(2 + 2).toEqual(4);
//   });
// });
// describe("Sample test", function() {
//   it("Condition is true", function() {
//     expect("AngularJS").toBe("AngularJS");
//   });
// });

describe("Users factory", function() {
  var Users;

  var userList = [
    {
      id: "1",
      name: "Jane",
      role: "Designer",
      location: "New York",
      twitter: "gijane"
    },
    {
      id: "2",
      name: "Bob",
      role: "Developer",
      location: "New York",
      twitter: "billybob"
    },
    {
      id: "3",
      name: "Jim",
      role: "Developer",
      location: "Chicago",
      twitter: "jimbo"
    },
    {
      id: "4",
      name: "Bill",
      role: "Designer",
      location: "LA",
      twitter: "dabill"
    }
  ];
  // Load our api.users module
  beforeEach(angular.mock.module("api.users"));

  // Set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_Users_) {
    Users = _Users_;
  }));

  // A simple test to verify the Users service exists
  it("should exist", function() {
    expect(Users).toBeDefined();
  });

  // A set of tests for our Users.all() method
  describe(".all()", function() {
    // A simple test to verify the method all exists
    it("should exist", function() {
      expect(Users.all).toBeDefined();
    });
    // A test to verify that calling all() returns the array of users we hard-coded above
    it("should return a hard-coded list of users", function() {
      expect(Users.all()).toEqual(userList);
    });
  });
});
