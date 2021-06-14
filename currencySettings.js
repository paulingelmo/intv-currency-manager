angular
  .module('currencyManagerApp')
  .factory('currencySettingsFactory', function () {
    // const settings = []
    const settings = [
      {
        id: 1,
        country: 'United States',
        currencyCode: 'USD',
        currencySymbol: '$',
        symbolPosition: 'start',
        delimiter: ',',
        displayCents: true
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
        currencyCode: data.currencyCode.toUpperCase(),
        displayCents: data.displayCents === 'true' ? true : false,
        id: incrementor
      })
      incrementor++
    }

    function editSetting(id, data) {
      const index = settings.findIndex((elem) => {
        elem.id === id
      })

      settings[index] = {
        ...settings[index],
        ...data,
        currencyCode: data.currencyCode.toUpperCase(),
        displayCents: data.displayCents === 'true' ? true : false
      }
    }

    function deleteSetting(id) {
      const index = settings.findIndex((elem) => {
        elem.id === id
      })

      settings[index].pop()
    }

    return {
      getSettings: getSettings,
      createSetting: createSetting,
      editSetting: editSetting,
      deleteSetting: deleteSetting
    }
  })
