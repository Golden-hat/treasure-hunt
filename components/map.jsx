import React, { useEffect, useState, useMemo } from "react";
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
  constructor(marker) {
    this.id = Checkpoint.id++;
    this.describe = "";
    this.order = Checkpoint.order++;
    this.place = `Checkpoint`;
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

    // Interface and edit controls
    this.toggleDetails = false;
    this.toggleCheckpoints = false;
    this.expand = false;
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

const BrowseEventHandler = ({ focus, hunts, fetchHunts }) => {
  const map = useMap();

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

          h.checkpoints = checkpoint_data.checkpoints.map((checkpoint) => ({
            order: checkpoint.order,
            name: checkpoint.name,
            description: checkpoint.description,
            position: [checkpoint.position_lat, checkpoint.position_lng],
          }));
          aux.push(h);
        })
      );
      fetchHunts(aux);
    };
    fetch_hunts();
  }, []);

  const hunt_marker_design = (hunt) => (
    <div className="transform translate-x-[-50%] translate-y-[75%] flex-col items-center justify-center">
      <div className="overflow-x-auto h-[60px] rounded-2xl bg-[#e6e6e6] border border-gray-400 px-2 pt-2 ">
        <marquee
          behavior="scroll"
          direction="left"
          className="font-caveat text-center text-4xl bold"
          scrollamount="12"
        >
          {hunt.name}
        </marquee>
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
      html: ReactDOMServer.renderToString(hunt_marker_design(hunt)),
      className: "custom-hunt-icon",
      iconSize: [300, 40],
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

  const handleToggleCheckpoints = (hunt) => {
    const updatedHunts = hunts.map((h) =>
      h.id === hunt.id ? { ...h, toggleCheckpoints: !h.toggleCheckpoints } : h
    );
    fetchHunts(updatedHunts);
  };

  const handleToggleDetails = (hunt) => {
    const updatedHunts = hunts.map((h) =>
      h.id === hunt.id ? { ...h, toggleDetails: !h.toggleDetails } : h
    );

    fetchHunts(updatedHunts);
  };

  const handleExpandToggle = (hunt) => {
    const updatedHunts = hunts.map((h) =>
      h.id === hunt.id ? { ...h, expand: !h.expand } : h
    );
    fetchHunts(updatedHunts);
  };

  const renderCheckpoints = (hunt) => {
    const checkpoints = hunt.checkpoints.map((cp) => (
      <Marker
        key={cp.order}
        position={cp.position}
        icon={cpIcon(cp.order)}
        draggable={false}
        shouldCluster={false}
        zIndexOffset={1000}
        eventHandlers={{
          click: () => {
            console.log("Marker clicked!");
          },
        }}
      >
        <Popup offset={[0, -40]} maxWidth={600}>
          <div className="flex items-center justify-center flex-col mb-2 mt-4 h-fit rounded-2xl bg-[#e6e6e6] m-auto px-4 pt-4">
            <div className="overflow-auto mb-5 w-[300px] justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h1 className="font-bold text-3xl font-caveat text-center px-6 mb-6">
                  Checkpoint Details
                </h1>
                <div className="cursor-pointer hover:bg-[#c6c6c6] bg-[#d6d6d6] rounded-full p-20 mb-2">
                  <img
                    src="/add.svg"
                    alt="Description of image"
                    className="scale-[3]"
                  />
                </div>
              </div>
            </div>
            <form className="flex flex-col px-3 w-[350px]">
              <label className="font-bold mb-1">Name of the Checkpoint:</label>
              <div className="text-4xl mb-2 font-caveat break-words">
                {cp.name}
              </div>
              <label className="text-md mb-1">Checkpoint info</label>
              <Quill
                className="h-[200px] w-[350px] pr-6 mb-4"
                readOnly={true}
                modules={{ toolbar: false }}
                value={cp.description}
              ></Quill>
            </form>
          </div>
        </Popup>
      </Marker>
    ));
    return checkpoints;
  };

  return (
    <>
      {hunts.map((hunt, index) =>
        hunt.checkpoints[0] ? (
          <>
            {hunt.toggleCheckpoints && renderCheckpoints(hunt)}

            <MarkerClusterGroup
              maxClusterRadius={0}
              spiderfyOnMaxZoom={false}
              zoomToBoundsOnClick={true}
            >
              <Marker
                key={index}
                position={hunt.checkpoints[0].position}
                icon={createHuntIcon(hunt)}
                draggable={false}
                eventHandlers={{
                  click: () => {
                    handleToggleDetails(hunt);
                    console.log("Marker clicked!");
                  },
                }}
              >
                <Popup offset={[0, 20]} maxWidth={600}>
                  <div
                    className={`overflow-auto h-[380px] rounded-2xl bg-[#e6e6e6] px-2 pt-6 ${
                      hunt.expand ? "h-auto" : "max-h-[380px]"
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
                        maxHeight: !hunt.expand ? "fit-content" : "450px",
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
                          handleToggleCheckpoints(hunt);
                        }}
                        className="font-bold bg-transparent border-2 text-sm border-black 
                  text-black rounded-xl p-2 hover:bg-green-600
                  hover:border-green-600 hover:text-white 
                  transition duration-300 w-full px-20 mt-5 mb-5"
                      >
                        {hunt.toggleCheckpoints ? "Hide" : "View"} Checkpoints
                      </button>
                    </div>
                    <button
                      className="flex justify-center mx-auto mb-5 sticky bottom-2"
                      onClick={() => {
                        handleExpandToggle(hunt);
                      }}
                    >
                      {!hunt.expand ? (
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
            </MarkerClusterGroup>
          </>
        ) : null
      )}
    </>
  );
};

const CreateEventsHandler = ({ checkpoints, fetchCheckpoints, focus }) => {
  const map = useMap();

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
      {checkpoints.map((checkpoint, index) => (
        <Marker
          key={index}
          position={checkpoint.marker.position}
          icon={createCustomIcon(checkpoints[index].order)}
          draggable={true}
          eventHandlers={{
            dragend: (e) => handleMarkerDragEnd(index, e),
          }}
        >
          <Popup offset={[0, -40]} maxWidth={600}>
            <div className="flex items-center justify-center flex-col mb-2 mt-4 h-fit rounded-2xl bg-[#e6e6e6] m-auto px-4 pt-4">
              <div className="overflow-auto mb-5 w-[300px] justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-bold text-3xl font-caveat text-center px-6 mb-6">
                    Checkpoint Preview
                  </h1>
                  <div className="cursor-pointer hover:bg-[#c6c6c6] bg-[#d6d6d6] rounded-full p-20 mb-2">
                    <img
                      src="/add.svg"
                      alt="Description of image"
                      className="scale-[3]"
                    />
                  </div>
                </div>
              </div>
              <form className="flex flex-col px-3 w-[350px]">
                <label className="font-bold mb-1">
                  Name of the Checkpoint:
                </label>
                <div className="text-4xl mb-2 font-caveat break-words">
                  {checkpoint.place}
                </div>
                <label className="text-md mb-1">Checkpoint info</label>
                <Quill
                  className="h-[200px] w-[350px] pr-6 mb-4"
                  readOnly={true}
                  modules={{ toolbar: false }}
                  value={checkpoints[index].describe}
                ></Quill>
              </form>
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
