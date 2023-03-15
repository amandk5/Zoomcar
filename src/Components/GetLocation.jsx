import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";

// export default function GetLocation() {
//   // const [getCoords, setGetCoords] = useState({});

//   const { coords, isGeolocationAvailable, isGeolocationEnabled } =
//     useGeolocated({
//       positionOptions: {
//         enableHighAccuracy: false,
//       },
//       userDecisionTimeout: 5000,
//     });

//   useEffect(() => {
//     setTimeout(() => {
//       console.log(
//         "coords",
//         coords,
//         "isGeolocationAvailable",
//         isGeolocationAvailable,
//         "isGeolocationEnabled",
//         isGeolocationEnabled
//       );
//     }, 500);
//   }, []);

//   return !isGeolocationAvailable ? (
//     <div>Your browser does not support Geolocation</div>
//   ) : !isGeolocationEnabled ? (
//     <div>Geolocation is not enabled</div>
//   ) : coords ? (
//     <table>
//       <tbody>
//         <tr>
//           <td>latitude</td>
//           <td>{coords.latitude}</td>
//         </tr>
//         <tr>
//           <td>longitude</td>
//           <td>{coords.longitude}</td>
//         </tr>
//         <tr>
//           <td>altitude</td>
//           <td>{coords.altitude}</td>
//         </tr>
//         <tr>
//           <td>heading</td>
//           <td>{coords.heading}</td>
//         </tr>
//         <tr>
//           <td>speed</td>
//           <td>{coords.speed}</td>
//         </tr>
//       </tbody>
//     </table>
//   ) : (
//     <div>Getting the location data&hellip; </div>
//   );
// }
//import React and useState

//create the button
export default function GetLocation({ allowLocation }) {
  //set the state
  const [location, setLocation] = useState(null);

  useEffect(() => {
    //console log the location
    console.log(location);
  }, [location]);

  //function to get the location
  const getLocation = () => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   const { latitude, longitude } = position.coords;
    //   setLocation(`latitude: ${latitude}, longitude: ${longitude}`);
    // });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`latitude: ${latitude}, longitude: ${longitude}`);
      },
      (err) => {
        alert(
          `Browser does not support location services. Please allow location services to view your coordinates.`
        );
      }
    );
  };

  if (allowLocation) {
    getLocation();
  }

  //return the button
  return <button onClick={getLocation}>Get Location</button>;
}
