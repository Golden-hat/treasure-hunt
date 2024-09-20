import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, LayersControl, Marker, useMap, useMapEvents, Popup } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import dynamic from "next/dynamic";

const { BaseLayer } = LayersControl;

class Checkpoint {
  static id = 1;
  static order = 1;
  constructor(marker) {
    this.id = Checkpoint.id++;
    this.coordinates = marker.position;
    this.visible = false;
    this.describe = "";
    this.order = Checkpoint.order++;
    this.place = `Checkpoint`
    this.marker = marker;
  }
}

const createCustomIcon = (number) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="number-container">${number}</div>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
};

const SearchControl = () => {

  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
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
  }, [map]);

  return null;
};

const MapEventsHandler = ({ checkpoints, setCheckpoints, fetchCheckpoints, changeEnable, focus }) => {

  const map = useMap();

  const Quill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  const centerMap = (lat, lng, zoom = 15) => {
    map.setView([lat, lng], zoom);
  };

  useEffect(() => {
    centerMap(focus[0], focus[1], 18)
  }, [focus]);

  useEffect(() => {
    fetchCheckpoints(checkpoints);
  }, [checkpoints, fetchCheckpoints]);

  useMapEvents({
    dblclick: (e) => {
      if (!changeEnable) return;
      const { lat, lng } = e.latlng;
      const newMarker = { position: [lat, lng], draggable: true };
      const newCheckpoint = new Checkpoint(newMarker);
      setCheckpoints((checkpoint) => [...checkpoint, newCheckpoint]);
    },
  });

  const handleMarkerDragEnd = (index, e) => {
    const newCheckpoints = [...checkpoints];
    newCheckpoints[index].marker.position = [e.target.getLatLng().lat, e.target.getLatLng().lng];
    setCheckpoints(newCheckpoints);
  };

  const remove = (index) => {
    map.closePopup();

    let newCheckpoints = [...checkpoints];
    newCheckpoints.splice(index, 1);
    newCheckpoints.forEach(element => {
      if (element.order >= index + 1) {
        element.order = element.order - 1;
      }
    });

    setCheckpoints(newCheckpoints);
    Checkpoint.order--;
  };

  return (
    <>
      {checkpoints.map((checkpoint, index) => (
        <Marker
          key={index}
          position={checkpoint.marker.position}
          icon={createCustomIcon(checkpoints[index].order)}
          draggable={changeEnable} // Reactively update draggable based on changeEnable
          eventHandlers={{
            dragend: (e) => handleMarkerDragEnd(index, e),
          }}
        >
          <Popup
            offset={[0, -40]}
            maxWidth={600}
          >
            <div className='flex items-center justify-center flex-row mb-2 mt-4 h-fit rounded-2xl bg-[#e6e6e6] m-auto px-2 pt-4'>
              <div className='overflow-auto mb-5 w-[300px] justify-center items-center'>
                <div className='flex flex-col justify-center items-center mb-4'>
                  <h1 className='font-bold text-3xl font-caveat text-center px-6 mb-6'>Checkpoint Details</h1>
                  <div className='cursor-pointer hover:bg-[#c6c6c6] bg-[#d6d6d6] rounded-full p-20 mb-2'>
                    <img src="/add.svg" alt="Description of image" className="scale-[3]" />
                  </div>
                </div>
              </div>
              <form className="flex flex-col px-3 w-[350px]">
                <label className='font-bold mb-1'>Name of the Checkpoint:</label>
                <div className="text-xl mb-2 break-words">{checkpoint.place}</div>
                <div className="flex flex-col mb-4">
                  <label className='text-md mb-1'>Checkpoint info</label>
                  <Quill theme="snow" className="h-[200px] w-[350px] pr-6" modules={{ toolbar: false }}></Quill>
                </div>
                <button disabled={!changeEnable} onClick={(e) => {
                  e.preventDefault();
                  remove(index);
                }}
                  className='font-bold bg-transparent border-2 text-sm border-black 
                  text-black rounded-xl p-2 hover:bg-red-600
                  hover:border-red-600 hover:text-white
                  transition duration-150 mb-4'>
                  Remove Checkpoint
                </button>
              </form>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};


const Map = ({ fetchCheckpoints, changeEnable, focus }) => {
  const [checkpoints, setCheckpoints] = useState([]);

  useEffect(() => {
    fetchCheckpoints(checkpoints);
  }, [checkpoints, fetchCheckpoints]);

  return (
    <MapContainer
      center={{ lat: 39.47391, lng: -0.37966 }}
      zoom={15}
      style={{ height: "100vh", width: "fit" }}
      doubleClickZoom={false}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>
        <BaseLayer name="Google Satellite">
          <TileLayer
            attribution='&copy; <a href="https://www.google.com/maps">Google</a>'
            url="https://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          />
        </BaseLayer>
      </LayersControl>
      <SearchControl />
      <MapEventsHandler checkpoints={checkpoints} setCheckpoints={setCheckpoints} fetchCheckpoints={fetchCheckpoints} changeEnable={changeEnable} focus={focus} />
    </MapContainer>
  );
};

export default Map;
