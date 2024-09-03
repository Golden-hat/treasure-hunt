import React, { useEffect } from 'react';
import { MapContainer, TileLayer, LayersControl, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

const { BaseLayer, Overlay } = LayersControl;

const SearchControl = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar', // or 'button'
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: true,
      showPopup: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
      searchLabel: 'Enter address',
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

const Map = () => {
  const position = [51.505, -0.09]; // Default position (London)

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100vh', width:"fit" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SearchControl />
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </BaseLayer>
        <BaseLayer name="Google Satellite">
          <TileLayer
            url="https://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            attribution='&copy; Google'
          />
        </BaseLayer>
        <Overlay name="Markers">
          <Marker position={[51.505, -0.09]}>
            <Popup>Marker 1</Popup>
          </Marker>
          <Marker position={[51.515, -0.1]}>
            <Popup>Marker 2</Popup>
          </Marker>
        </Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default Map;
