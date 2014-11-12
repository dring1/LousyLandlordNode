/**
 * Property.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    owner_id: {
      required: true,
      type: 'string'
    },
    location: {
      required: true,
      type: 'string'
    },
    comments: {
      required: false,
      type: 'array'
    }
  }
};