import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, LayersControl, Marker, useMap, useMapEvents, Popup } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
const random = require('random-bigint')

const { BaseLayer, Overlay } = LayersControl;

class Checkpoint {

  constructor(coordinates) {
    this.id = random(128) // 128 bits // Assign current ID and then increment
    this.coordinates = coordinates; // Expecting an array like [x, y]
    this.place = JSON.stringify(coordinates); // Stringified version of coordinates
  }
}

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

const SearchControl = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      autoComplete: true,
      autoCompleteDelay: 250,
      retainZoomLevel: false,
      showMarker: false,
      showPopup: false,
      animateZoom: true,
      searchLabel: 'Enter address',
    });


    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map, ]);

  return null;
};

const MapEventsHandler = ({ markers, setMarkers, checkpoints, setCheckpoints, fetchCheckpoints}) => {
  useMapEvents({
    dblclick: (e) => {
      fetchCheckpoints(checkpoints)
      const { lat, lng } = e.latlng;
      const newMarker = {
        position: [lat, lng],
        draggable: true,
      };
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      const newCheckpoint = new Checkpoint([lat, lng])
      setCheckpoints((checkpoint) => [...checkpoint, newCheckpoint ]);
    },
  });

  const handleMarkerDragEnd = (index, e) => {
    const newMarkers = [...markers];
    newMarkers[index].position = [e.target.getLatLng().lat, e.target.getLatLng().lng];
    setMarkers(newMarkers);

    let newCheckpoints = [...checkpoints]
    newCheckpoints[index].coordinates = [e.target.getLatLng().lat, e.target.getLatLng().lng]
    newCheckpoints[index].coordinates = [e.target.getLatLng().lat, e.target.getLatLng().lng]
    newCheckpoints[index].place = JSON.stringify([e.target.getLatLng().lat, e.target.getLatLng().lng])
    newCheckpoints[index].place = JSON.stringify([e.target.getLatLng().lat, e.target.getLatLng().lng])
    setCheckpoints(newCheckpoints);
  };

  const remove = (index, e) => {
    let newMarkers = [...markers];
    newMarkers.splice(index, 1)
    setMarkers(newMarkers);

    let newCheckpoints = [...checkpoints];
    newCheckpoints.splice(index, 1)
    setCheckpoints(newCheckpoints);
  }

  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          icon={icon}
          draggable={marker.draggable}
          eventHandlers={{
            dragend: (e) => handleMarkerDragEnd(index, e),
            dblclick: (e) => remove(index, e),
          }}
        >
          <Popup>
            <div>
              <h3>{marker.position}</h3>
              {console.log(checkpoints)}
              <p>This is a custom HTML popup for {marker.position}.</p>
              <a href="https://en.wikipedia.org/wiki/{city.name}" target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

// Main Map component
const Map = ({fetchCheckpoints}) => {
  const [markers, setMarkers] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);

  useEffect(() => {
    setCheckpoints(checkpoints)
    fetchCheckpoints(checkpoints)
  }, [checkpoints])

  return (
    <MapContainer
      center={{ lat: 40.7, lng: -74 }}
      zoom={15}
      style={{ height: "100vh", width: "fit" }}
      doubleClickZoom={false}
    >
      <LayersControl position="topright">
        {/* Base Layer: OpenStreetMap */}
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>

        {/* Base Layer: Google Satellite */}
        <BaseLayer name="Google Satellite">
          <TileLayer
            attribution='&copy; <a href="https://www.google.com/maps">Google</a>'
            url="https://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          />
        </BaseLayer>
      </LayersControl>
      {/* Add the Search Control to the map */}
      <SearchControl />
      {/* Handle map events and draggable markers */}
      <MapEventsHandler markers={markers} setMarkers={setMarkers} checkpoints={checkpoints} setCheckpoints={setCheckpoints} fetchCheckpoints={fetchCheckpoints} />
    </MapContainer>
  );
};

export default Map;
