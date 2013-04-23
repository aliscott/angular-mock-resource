angular.module('mockResource', []);

angular.module('mockResource').factory('MockResource', ['$q', function($q) {
  var MockResource = function(data, other) {
    var value;
    if (angular.isArray(data)) {
      value = [];
      angular.forEach(data, function(item) {
        value.push(item);
      });
    } else {
      value = {};
      angular.copy(data, value);
    }

    var deferred = $q.defer();

    value.$then = deferred.promise.then;

    deferred.resolve(
      angular.extend({
        data: data,
        status: 200,
        resource: value
      }, other || {}));
    value.$resolved = true;

    return value;
  };
  return MockResource;
}]);
