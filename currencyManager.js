const app = angular.module('currencyManagerApp', [])

app.controller(
  'currencyManagerController',
  function ($scope, currencySettingsFactory) {
    $scope.selectedSetting = undefined
    $scope.formatDisplay = undefined

    $scope.editPrep = false
    $scope.editId = undefined

    $scope.currentSort = 'id'
    $scope.sortOrientationAscending = true

    $scope.currencySettings = currencySettingsFactory.getSettings()
    clearFields()

    function applySetting(price) {
      if (!$scope.selectedSetting) {
        return undefined
      }

      const stringPrice = price.toString()
      const dollarAmount = stringPrice
        .split($scope.selectedSetting.delimiter === ',' ? '.' : ',')
        .shift()
        .replaceAll(
          $scope.selectedSetting.delimiter === ',' ? '.' : ',',
          $scope.selectedSetting.delimiter
        )

      const centsAmount = stringPrice
        .split($scope.selectedSetting.delimiter === ',' ? '.' : ',')
        .pop()

      let formatString = ''

      if ($scope.selectedSetting.symbolPosition === 'start') {
        formatString += $scope.selectedSetting.currencySymbol
      }

      formatString += dollarAmount

      if ($scope.selectedSetting.displayCents) {
        formatString +=
          ($scope.selectedSetting.delimiter === ',' ? '.' : ',') + centsAmount
      }

      if ($scope.selectedSetting.symbolPosition === 'end') {
        formatString += $scope.selectedSetting.currencySymbol
      }

      if ($scope.selectedSetting.currencyCode) {
        formatString += $scope.selectedSetting.currencyCode
      }

      return formatString
    }

    function clearFields() {
      $scope.country = undefined
      $scope.currencyCode = undefined
      $scope.currencySymbol = undefined
      $scope.symbolPosition = 'start'
      $scope.delimiter = ','
      $scope.displayCents = 'true'
    }

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

    $scope.setSelectedItem = function (setting) {
      $scope.selectedSetting = setting

      $scope.formatDisplay = applySetting(
        $scope.selectedSetting &&
          ($scope.selectedSetting.delimiter === ',' ? '1,234.56' : '1.234,56')
      )
    }

    $scope.createSetting = function () {
      if (!$scope.country) {
        return
      }

      const settingData = {
        country: $scope.country,
        currencyCode: $scope.currencyCode,
        currencySymbol: $scope.currencySymbol,
        symbolPosition: $scope.symbolPosition,
        delimiter: $scope.delimiter,
        displayCents: $scope.displayCents
      }

      currencySettingsFactory.createSetting(settingData)
      clearFields()
    }

    $scope.prepEditSetting = function (id) {
      const settingData = $scope.currencySettings.find(
        (setting) => setting.id === id
      )

      if (!settingData) {
        return
      }

      $scope.editId = id

      $scope.country = settingData.country
      $scope.currencyCode = settingData.currencyCode
      $scope.currencySymbol = settingData.currencySymbol
      $scope.symbolPosition = settingData.symbolPosition
      $scope.delimiter = settingData.delimiter
      $scope.displayCents = settingData.displayCents.toString()

      $scope.editPrep = true
    }

    $scope.cancelEditSetting = function () {
      clearFields()
      $scope.editPrep = false
    }

    $scope.editSetting = function (id) {
      const settingData = {
        country: $scope.country,
        currencyCode: $scope.currencyCode,
        currencySymbol: $scope.currencySymbol,
        symbolPosition: $scope.symbolPosition,
        delimiter: $scope.delimiter,
        displayCents: $scope.displayCents
      }

      currencySettingsFactory.editSetting(id, settingData)
      clearFields()
      $scope.editPrep = false
    }

    $scope.deleteSetting = function (id) {
      currencySettingsFactory.deleteSetting(id)
    }

    $scope.exportSettings = function () {
      currencySettingsFactory.exportSettings()
    }
  }
)
