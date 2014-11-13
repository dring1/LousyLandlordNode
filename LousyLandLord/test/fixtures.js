var Chance = require('chance'),
  chance = new Chance();

module.exports = {
  url: 'http://localhost:' + process.env.PORT + '/',
  landlord: {
    name: chance.name(),
    city: 'Ottawa',
    province: 'Ontario',
    organization: 'Vandelay Industries'
  },
  property: {
    location: {
      address: '1107 Aldea Avenue',
      city: 'Ottawa',
      province: 'ON',
      country: 'Canada',
      postalCode: 'K1H'
    }
  }
}