/**
 * Landlord.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  connection: 'lousyLandlordMongodbServer',
  tableName: 'landlords',
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    organization: {
      type: 'string',
      required: 'false'
    },
    city: {
      required: true,
      type: 'string'
    },
    province: {
      required: true,
      type: 'string'
    },
    phoneNumber: {
      required: false,
      type: 'string'
    }
  }
};