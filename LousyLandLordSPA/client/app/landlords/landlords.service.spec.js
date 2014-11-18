'use strict';

describe('Service: landlords', function () {

  // load the service's module
  beforeEach(module('lousyLandLordSpaApp'));

  // instantiate service
  var landlords;
  beforeEach(inject(function (_landlords_) {
    landlords = _landlords_;
  }));

  it('should do something', function () {
    expect(!!landlords).toBe(true);
  });

});
