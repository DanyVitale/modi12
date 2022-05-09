import 'mocha';
import {expect} from 'chai';
import {weatherInfo, coordinatesInfo} from '../src/index';

describe('Asynchronous function weatherInfo tests', () => {
  it('weatherInfo should get weather information', (done) => {
    weatherInfo('Tenerife, Spain', (_, data) => {
      if (data) {
        expect(data.body.location.name).to.be.equal('Tenerife');
        done();
      }
    });
  });

  it('weatherInfo should provide an error', (done) => {
    weatherInfo('12wherever', (error, _) => {
      if (error) {
        expect(error).to.be.equal('Weatherstack API error: request_failed');
        done();
      }
    });
  });
});

describe('Asynchronous function coordinatesInfo tests', () => {
  it('coordinatesInfo should get coordinates information', (done) => {
    coordinatesInfo('Barcelona, Spain', (_, data) => {
      if (data) {
        expect(data.body.features[0].center).to.be.eql([2.177432, 41.382894]);
        done();
      }
    });
  });

  it('coordinatesInfo should provide an error', (done) => {
    coordinatesInfo('12wherever', (error, _) => {
      if (error) {
        expect(error).to.be.equal('Mapbox API error: no location found');
        done();
      }
    });
  });
});