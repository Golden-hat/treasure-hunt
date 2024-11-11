import React, { useEffect, useState, useMemo, use } from "react";
import ReactDOMServer from "react-dom/server";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  useMap,
  useMapEvents,
  Popup,
} from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import "react-quill/dist/quill.snow.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import dynamic from "next/dynamic";
import MarkerClusterGroup from "react-leaflet-markercluster";

const { BaseLayer } = LayersControl;

class Checkpoint {
  static id = 1;
  static order = 1;
  constructor(marker, { description = "", order = Checkpoint.order++, name = `Checkpoint` } = {}) {
    this.id = Checkpoint.id++;
    this.description = description;
    this.order = order;
    this.name = name;
    this.marker = marker;

    // Interface and edit controls
    this.editing = false;
    this.toggleDetails = false;
    this.tempPlace = "Checkpoint";
    this.tempDescribe = "";
  }
}

class Hunt {
  constructor(name, checkpoints, id, description) {
    this.id = id;
    this.checkpoints = checkpoints;
    this.name = name;
    this.description = description;
  }
}

const SearchControl = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      autoComplete: true,
      autoCompleteDelay: 250,
      retainZoomLevel: false,
      showMarker: false,
      showPopup: false,
      animateZoom: true,
      searchLabel: "Enter address",
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

const BrowseEventHandler = ({ focus, hunts, fetchHunts, selectedHunt, fetchSelectedHunt }) => {
  const map = useMap();

  const [selected, setSelectedHunt] = useState(null);
  const [expanded, setExpandedToggle] = useState(false);

  useEffect(() => {
    const fetch_hunts = async () => {
      let aux = [];

      const res = await fetch("/api/get_hunts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const hunt_data = await res.json();

      await Promise.all(
        hunt_data.hunts.map(async (hunt_) => {
          let h = new Hunt(hunt_.name, [], hunt_.id, hunt_.description);

          const res = await fetch(`/api/get_checkpoints?id=${hunt_.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const checkpoint_data = await res.json();

          h.checkpoints = checkpoint_data.checkpoints.map((checkpoint) =>
            new Checkpoint(
              { position: [checkpoint.position_lat, checkpoint.position_lng] },
              {
                order: checkpoint.order,
                name: checkpoint.name,
                description: checkpoint.description,
              }
            )
          );
          aux.push(h);
        })
      );
      fetchHunts(aux);
    };
    fetch_hunts();
  }, []);

  const hunt_marker_design = (hunt_name) => (
    <div
      className="transform translate-x-[-50%] translate-y-[-125%] flex-col items-center justify-center"
      key={hunt_name}
    >
      <div className="overflow-hidden h-[60px] rounded-2xl bg-[#e6e6e6] border border-gray-400 px-2">
        <div className="marquee">
          <span className="marquee-text">{hunt_name}</span>
        </div>
      </div>
      <div className="rounded-b-2xl m-auto bg-[#e6e6e6] w-[150px] px-2">
        <p className="text-center text-xs font-bold ">
          Click to toggle details.
        </p>
      </div>
    </div>
  );

  const cpIcon = (number) =>
    L.divIcon({
      className: "custom-div-icon",
      html: `<div class="number-container">${number}</div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });

  const createHuntIcon = (hunt) =>
    L.divIcon({
      html: ReactDOMServer.renderToString(hunt_marker_design(hunt.name)),
      className: "custom-hunt-icon",
      iconSize: [250, 40],
      iconAnchor: [15, 42],
    });

  const Quill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const centerMap = (lat, lng, zoom = 15) => {
    map.setView([lat, lng], zoom);
  };

  useEffect(() => {
    map.closePopup();
    centerMap(focus[0], focus[1], 19);
  }, [focus]);

  useEffect(() => {
    setSelectedHunt(selectedHunt)
  }, [selectedHunt]);

  const renderCheckpoints = (hunt) => {
    const checkpoints = hunt.checkpoints.map((cp) => (
      <Marker
        key={hunt.id + cp.name}
        position={cp.marker.position}
        icon={cpIcon(cp.order)}
        draggable={false}
        zIndexOffset={1000}
        eventHandlers={{
          click: () => {},
        }}
      >
        <Popup offset={[0, -40]} maxWidth={600}>
          <div
            className={`overflow-auto w-[600px] h-[380px] rounded-2xl bg-[#e6e6e6] px-2 pt-6 ${
              expanded ? "h-auto" : "max-h-[380px]"
            }`}
          >
            <div className="flex flex-col justify-center items-center mb-4">
              <h1 className="font-caveat font-bold text-3xl text-left px-6 mb-6">
                Details of the Checkpoint
              </h1>
              <div className="cursor-pointer hover:bg-[#b6b6b6] bg-[#d6d6d6] rounded-full p-20 mb-2">
                <img
                  src="/add.svg"
                  alt="Description of image"
                  className="scale-[3]"
                />
              </div>
              <p className="text-xs mb-2">Click to add a banner!</p>
              <div className="flex flex-col items-center max-w-[80%]">
                <h1 className="font-caveat text-center text-5xl bold">
                  {cp.name}
                </h1>
              </div>
            </div>
            <Quill
              readOnly={true}
              modules={{ toolbar: false }}
              style={{
                maxHeight: !expanded? "fit-content" : "450px",
                overflowY: "auto",
                margin: "20px",
              }}
              value={cp.description}
            ></Quill>
            <button
              className="flex justify-center mx-auto mb-5 sticky bottom-2"
              onClick={() => {
                setExpandedToggle(!expanded);
              }}
            >
              {!expanded ? (
                <img
                  src="/arrow.svg"
                  alt="Description of image"
                  className="cursor-pointer scale-[1] p-2"
                />
              ) : (
                <img
                  src="/arrow.svg"
                  alt="Description of image"
                  className="rotate-180 cursor-pointer scale-[1] p-2"
                />
              )}
            </button>
          </div>
        </Popup>
      </Marker>
    ));
    return checkpoints;
  };

  return (
    <>
      {selected && renderCheckpoints(selected)}
      <MarkerClusterGroup spiderfyOnMaxZoom={false} showCoverageOnHover={false}>
        {hunts.map((hunt) =>
          ( selected === null || selected && selected.id === hunt.id ) ? (
            <div key={hunt.id}>
              <Marker
                maxClusteRadius={100}
                key={hunt.id}
                position={hunt.checkpoints[0].marker.position}
                icon={createHuntIcon(hunt)}
                draggable={false}
                eventHandlers={{
                  click: (e) => {
                    if (e.target.getPopup().isOpen()) e.target.openPopup();
                    else e.target.closePopup();
                  },
                }}
              >
                <Popup offset={[0, -140]} autoClose={false} maxWidth={600}>
                  <div
                    className={`overflow-auto w-[600px] h-[380px] rounded-2xl bg-[#e6e6e6] px-2 pt-6 ${
                      expanded ? "h-auto" : "max-h-[380px]"
                    }`}
                  >
                    <div className="flex flex-col justify-center items-center mb-4">
                      <h1 className="font-caveat font-bold text-3xl text-left px-6 mb-6">
                        Details of the hunt
                      </h1>
                      <div className="cursor-pointer hover:bg-[#b6b6b6] bg-[#d6d6d6] rounded-full p-20 mb-2">
                        <img
                          src="/add.svg"
                          alt="Description of image"
                          className="scale-[3]"
                        />
                      </div>
                      <p className="text-xs mb-2">Click to add a banner!</p>
                      <div className="flex flex-col items-center max-w-[80%]">
                        <h1 className="font-caveat text-center text-5xl bold">
                          {hunt.name}
                        </h1>
                        <h1 className="font-caveat text-center text-2xl italic bold text-gray-600">
                          By
                        </h1>
                      </div>
                    </div>
                    <Quill
                      readOnly={true}
                      modules={{ toolbar: false }}
                      style={{
                        maxHeight: expanded ? "fit-content" : "450px",
                        overflowY: "auto",
                        margin: "20px",
                      }}
                      value={hunt.description}
                    ></Quill>
                    <div className="flex flex-col mx-5">
                      <label className="text-lg mb-2">
                        Difficulty: <span className="font-bold"> </span>
                      </label>
                      <label className="text-sm">
                        On a scale from 0 to 100! The higher the number, the
                        harder the challenge.
                      </label>
                      <button
                        onClick={() => {
                          map.closePopup();
                          if (selected == null) {
                            setSelectedHunt(hunt);
                            fetchSelectedHunt(hunt);
                            map.fitBounds(
                              hunt.checkpoints.map(
                                (checkpoint) => checkpoint.marker.position
                              )
                            );
                          }
                          else{
                            setSelectedHunt(null);
                            fetchSelectedHunt(null);
                          }
                        }}
                        className="font-bold bg-transparent border-2 text-sm border-black 
                        text-black rounded-xl p-2 hover:bg-green-600
                        hover:border-green-600 hover:text-white 
                        transition duration-300 w-full px-20 mt-5 mb-5"
                      >
                        {selected === hunt ? "Hide" : "Show"} Checkpoints
                      </button>
                    </div>
                    <button
                      className="flex justify-center mx-auto mb-5 sticky bottom-2"
                      onClick={() => {
                        setExpandedToggle(!expanded);
                      }}
                    >
                      {!expanded ? (
                        <img
                          src="/arrow.svg"
                          alt="Description of image"
                          className="cursor-pointer scale-[1] p-2"
                        />
                      ) : (
                        <img
                          src="/arrow.svg"
                          alt="Description of image"
                          className="rotate-180 cursor-pointer scale-[1] p-2"
                        />
                      )}
                    </button>
                  </div>
                </Popup>
              </Marker>
            </div>
          ) : null
        )}
      </MarkerClusterGroup>
    </>
  );
};

const CreateEventsHandler = ({ checkpoints, fetchCheckpoints, focus }) => {
  const map = useMap();

  const [expanded, setExpandedToggle] = useState(false);

  const createCustomIcon = (number) =>
    L.divIcon({
      className: "custom-div-icon",
      html: `<div class="number-container">${number}</div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });

  const Quill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const centerMap = (lat, lng, zoom = 15) => {
    map.setView([lat, lng], zoom);
  };

  useEffect(() => {
    map.closePopup();
    centerMap(focus[0], focus[1], 19);
  }, [focus]);

  useEffect(() => {
    Checkpoint.order = checkpoints.length + 1;
  }, [checkpoints]);

  useMapEvents({
    dblclick: (e) => {
      map.closePopup();
      const { lat, lng } = e.latlng;
      const newMarker = { position: [lat, lng], draggable: true };
      const newCheckpoint = new Checkpoint(newMarker);
      fetchCheckpoints([...checkpoints, newCheckpoint]);
    },
  });

  const handleMarkerDragEnd = (index, e) => {
    map.closePopup();
    const newCheckpoints = [...checkpoints];
    newCheckpoints[index].marker.position = [
      e.target.getLatLng().lat,
      e.target.getLatLng().lng,
    ];
    fetchCheckpoints(newCheckpoints);
  };

  return (
    <>
      {checkpoints.map((cp, index) => (
        <Marker
          key={index}
          position={cp.marker.position}
          icon={createCustomIcon(cp.order)}
          draggable={true}
          eventHandlers={{
            dragend: (e) => handleMarkerDragEnd(index, e),
          }}
        >
          <Popup offset={[0, -40]} maxWidth={600}>
            <div
            className={`overflow-auto w-[600px] h-[380px] rounded-2xl bg-[#e6e6e6] px-2 pt-6 ${
              expanded ? "h-auto" : "max-h-[380px]"
            }`}
          >
            <div className="flex flex-col justify-center items-center mb-4">
              <h1 className="font-caveat font-bold text-3xl text-left px-6 mb-6">
                Details of the Checkpoint
              </h1>
              <div className="cursor-pointer hover:bg-[#b6b6b6] bg-[#d6d6d6] rounded-full p-20 mb-2">
                <img
                  src="/add.svg"
                  alt="Description of image"
                  className="scale-[3]"
                />
              </div>
              <p className="text-xs mb-2">Click to add a banner!</p>
              <div className="flex flex-col items-center max-w-[80%]">
                <h1 className="font-caveat text-center text-5xl bold">
                  {cp.name}
                </h1>
              </div>
            </div>
            <Quill
              readOnly={true}
              modules={{ toolbar: false }}
              style={{
                maxHeight: !expanded? "fit-content" : "450px",
                overflowY: "auto",
                margin: "20px",
              }}
              value={cp.description}
            ></Quill>
            <button
              className="flex justify-center mx-auto mb-5 sticky bottom-2"
              onClick={() => {
                setExpandedToggle(!expanded);
              }}
            >
              {!expanded ? (
                <img
                  src="/arrow.svg"
                  alt="Description of image"
                  className="cursor-pointer scale-[1] p-2"
                />
              ) : (
                <img
                  src="/arrow.svg"
                  alt="Description of image"
                  className="rotate-180 cursor-pointer scale-[1] p-2"
                />
              )}
            </button>
          </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const Map = ({
  checkpoints,
  fetchCheckpoints,
  focus,
  mode,
  hunts,
  fetchHunts,
  selectedHunt,
  fetchSelectedHunt
}) => (
  <MapContainer
    doubleClickZoom={false}
    zoom={15}
    center={[51.505, -0.09]}
    style={{ height: "100vh", width: "100%" }}
  >
    <LayersControl position="topright">
      <BaseLayer checked name="OpenStreetMap">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
      </BaseLayer>
      <BaseLayer name="Google Satellite">
        <TileLayer
          attribution='&copy; <a href="https://www.google.com/maps">Google</a>'
          url="https://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          maxZoom={21}
        />
      </BaseLayer>
    </LayersControl>

    <SearchControl />

    {mode === 0 && (
      <BrowseEventHandler
        checkpoints={checkpoints}
        fetchCheckpoints={fetchCheckpoints}
        focus={focus}
        hunts={hunts}
        fetchHunts={fetchHunts}
        selectedHunt={selectedHunt}
        fetchSelectedHunt={fetchSelectedHunt}
      />
    )}

    {mode === 1 && (
      <CreateEventsHandler
        checkpoints={checkpoints}
        fetchCheckpoints={fetchCheckpoints}
        focus={focus}
      />
    )}

  </MapContainer>
);

export default Map;
