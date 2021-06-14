const app = angular.module('currencyManagerApp', [])

app.controller(
  'currencyManagerController',
  function ($scope, currencySettingsFactory) {
    $scope.selectedItem = undefined

    $scope.currentSort = 'id'
    $scope.sortOrientationAscending = true

    $scope.currencySettings = currencySettingsFactory.getSettings()

    $scope.sortTable = function (sortType) {
      switch (sortType) {
        case 'country':
          $scope.sortOrientationAscending
            ? ($scope.currencySettings = $scope.currencySettings.sort((a, b) =>
                a.country > b.country ? 1 : -1
              ))
            : ($scope.currencySettings = $scope.currencySettings.sort((a, b) =>
                a.country < b.country ? 1 : -1
              ))
          break
        case 'currency':
          console.log('currency')
          $scope.sortOrientationAscending
            ? ($scope.currencySettings = $scope.currencySettings.sort((a, b) =>
                a.currencyCode > b.currencyCode ? 1 : -1
              ))
            : ($scope.currencySettings = $scope.currencySettings.sort((a, b) =>
                a.currencyCode < b.currencyCode ? 1 : -1
              ))
          break
        default:
          $scope.currencySettings = $scope.currencySettings.sort(
            (a, b) => a.id - b.id
          )
          $scope.sortOrientationAscending = true
          return
      }

      $scope.sortOrientationAscending = !$scope.sortOrientationAscending
    }

    $scope.createSetting = function (data) {}

    $scope.editSetting = function (data) {}

    $scope.deleteSetting = function (id) {
      currencySettingsFactory.deleteSetting(id)
      $scope.currencySettings = currencySettingsFactory.getSettings()
    }
  }
)
