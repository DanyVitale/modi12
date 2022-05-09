// import {request} from 'http';
// const url = 'http://api.weatherstack.com/current?access_key=d0ac72be514512114fae84f3e13ab05d&query=28.48,-16.31&units=m';

// const req = request(url, (response) => {
//   let data = '';
//   response.on('data', (chunk) => {
//     data += chunk;
//   });

//   response.on('end', () => {
//     const body = JSON.parse(data);
//     console.log(body);
//   });
// });

// req.on('error', (error) => {
//   console.log(error.message);
// });

// req.end();


// PATRON CALLBACK---------------------------------------------------------------
// import * as request from 'request';

// const weatherInfo = (location: string, callback: (
//   err: string | undefined, data: request.Response | undefined) => void) => {
//   const url = `http://api.weatherstack.com/current?access_key=d0ac72be514512114fae84f3e13ab05d&query=${encodeURIComponent(location)}&units=m`;

//   request({url: url, json: true}, (error, response) => {
//     if (error) {
//       callback(`Weatherstack API is not available: ${error.message}`,
//           undefined);
//     } else if (response.body.error) {
//       callback(`Weatherstack API error: ${response.body.error.type}`,
//           undefined);
//     } else {
//       callback(undefined, response);
//     }
//   });
// };

// weatherInfo(process.argv[2], (err, data) => {
//   if (err) {
//     console.log(err);
//   } else if (data) {
//     console.log(data.body);
//   }
// });

// PATRON CALLBACK CHAINING ---------------------------------------------------
import * as request from 'request';

export const weatherInfo = (location: string, callback: (
  err: string | undefined, data: request.Response | undefined) => void) => {
  const url = `http://api.weatherstack.com/current?access_key=aeb97bf5fbae1e796215bb0be875d548&query=${encodeURIComponent(location)}&units=m`;

  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback(`Weatherstack API is not available: ${error.message}`,
          undefined);
    } else if (response.body.error) {
      callback(`Weatherstack API error: ${response.body.error.type}`,
          undefined);
    } else {
      callback(undefined, response);
    }
  });
};

export const coordinatesInfo = (location: string, callback:(
  err: string | undefined, data: request.Response | undefined) => void) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiZWR1c2VncmUiLCJhIjoiY2tubmdoMjE0MDA3ODJubndrNnBuenlteCJ9.dtIf0MrkO0Oe12ZM_I7pGw&limit=1`;

  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback(`Mapbox API is not available: ${error.message}`, undefined);
    } else if (response.body.features.length === 0) {
      callback(`Mapbox API error: no location found`, undefined);
    } else {
      callback(undefined, response);
    }
  });
};

coordinatesInfo(process.argv[2], (coordErr, coordData) => {
  if (coordErr) {
    console.log(coordErr);
  } else if (coordData) {
    const longitude: number = coordData.body.features[0].center[0];
    const latitude: number = coordData.body.features[0].center[1];
    weatherInfo(`${latitude},${longitude}`, (weatherErr, weatherData) => {
      if (weatherErr) {
        console.log(weatherErr);
      } else if (weatherData) {
        console.log(`Currently, the temperature is ` +
          `${weatherData.body.current.temperature} degrees in ` +
          `${weatherData.body.location.name}`);
      }
    });
  }
});