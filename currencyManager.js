const app = angular.module('currencyManagerApp', [])

app.controller(
  'currencyManagerController',
  function ($scope, currencySettingsFactory) {
    $scope.currencySettings

    $scope.currencySettings = currencySettingsFactory.getSettings()
  }
)
