angular
  .module('currencyManagerApp')
  .factory('currencySettingsFactory', function () {
    // const settings = []
    let settings = [
      {
        id: 1,
        country: 'United States',
        currencyCode: '',
        currencySymbol: '$',
        symbolPosition: 'start',
        delimiter: ',',
        displayCents: 'true'
      },
      {
        id: 2,
        country: 'Argentina',
        currencyCode: 'USD',
        currencySymbol: '',
        symbolPosition: 'start',
        delimiter: ',',
        displayCents: 'false'
      },
      {
        id: 3,
        country: 'Spain',
        currencyCode: '',
        currencySymbol: '€',
        symbolPosition: 'end',
        delimiter: ',',
        displayCents: 'false'
      },
      {
        id: 4,
        country: 'Germany',
        currencyCode: '',
        currencySymbol: '€',
        symbolPosition: 'start',
        delimiter: '.',
        displayCents: 'false'
      }
    ]

    let incrementor = () => {
      settings.reduce((acc, curr) => {
        return acc > curr.id ? acc : curr.id
      }, 0)
    }

    function getSettings() {
      return settings
    }

    function createSetting(data) {
      settings.push({
        ...data,
        currencyCode:
          typeof data.currencyCode === 'string'
            ? data.currencyCode.toUpperCase()
            : data.currencyCode,
        id: incrementor
      })
      incrementor++

      return true
    }

    function editSetting(id, data) {
      const index = settings.findIndex((setting) => {
        return setting.id === id
      })

      settings[index] = {
        ...settings[index],
        ...data,
        currencyCode:
          typeof data.currencyCode === 'string'
            ? data.currencyCode.toUpperCase()
            : data.currencyCode
      }

      return true
    }

    function deleteSetting(id) {
      const index = settings.findIndex((setting) => {
        return setting.id === id
      })

      settings.splice(index, 1)

      return true
    }

    function exportSettings() {
      const data = 'data:text/csv;charset=utf-8,'

      const header = [
        'Country',
        'Currency Code',
        'Currency Symbol',
        'Symbol Position',
        'Delimiter',
        'Display Cents'
      ]

      const csvContent =
        data +
        header +
        '\n' +
        settings
          .map((setting) => {
            return `${setting.country}, ${setting.currencyCode}, ${setting.currencySymbol}, ${setting.symbolPosition}, "${setting.delimiter}", ${setting.displayCents}`
          })
          .join('\n')

      link = document.getElementById('export-link')
      link.setAttribute('href', encodeURI(csvContent))
      link.setAttribute('download', 'currency-settings.csv')
    }

    return {
      getSettings: getSettings,
      createSetting: createSetting,
      editSetting: editSetting,
      deleteSetting: deleteSetting,
      exportSettings: exportSettings
    }
  })
