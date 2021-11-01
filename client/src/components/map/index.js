import React, { useState, useContext, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import { UserPositionContext } from '../../Context/UserPositionContext';
import { AttractionsContext } from '../../Context/AttractionsContext';
import nav from '../../img/location-sign-svgrepo-com.svg';
import { OnClick_Info,

 } from './style.js';



export default function Map() {
    const [selectedAttr, setSelectedAttr] = useState(null);
    const {location} = useContext(UserPositionContext);
    const {Attractions} = useContext(AttractionsContext);
    const {coordinates} = location;

    const Marker = ({ text, attr }) => {  //config marker
      return(
         <div 
             onClick={() => { setSelectedAttr(attr) }} 
             title={text} 
             style={ {cursor: 'pointer'}}
        >
            <img src={nav} style={{'maxWidth': '35px'}}/>
        </div>
      )
    };
    
    
    const MarkerInfo = () =>{
      return(
      <OnClick_Info>
          <div>
              <h2>{selectedAttr.Name}</h2>
              <p>{selectedAttr.ShortDescription}</p>
          </div>
      </OnClick_Info>
      )
    }


    const getMapOptions = () => {
      return {
        disableDefaultUI: true,
        mapTypeControl: true,
        streetViewControl: true,
        styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
      };
    };

  return (
    <GoogleMapReact
               yesIWantToUseGoogleMapApiInternals 
               bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY}}
               defaultZoom={10} 
			         center = {{lat: coordinates.lat, lng: coordinates.long}}
               defaultCenter={{lat: coordinates.lat, lng: coordinates.long}}
               options={getMapOptions} 
               onClick={() => { setSelectedAttr(null)}}
               onDrag={() => { setSelectedAttr(null)}}

    >          
    { Attractions.length && Attractions.map((attr, i) => (
         <Marker
            lat= {attr.Y}
            lng= {attr.X}
            key={i}
            text={attr.Name}
            attr={attr}
        />
    )) }

    {selectedAttr && <MarkerInfo/>} 
    
    </GoogleMapReact>
  );
}