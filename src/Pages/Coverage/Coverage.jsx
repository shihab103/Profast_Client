import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import warehouseData from "../../assets/warehouses.json";

const CoverageMap = () => {
  const centerPosition = [23.6850, 90.3563];
  const [searchText, setSearchText] = useState("");
  const markerRefs = useRef([]);

  const handleSearch = () => {
    const search = searchText.toLowerCase();
    const foundIndex = warehouseData.findIndex(district =>
      district.district.toLowerCase().includes(search)
    );

    if (foundIndex !== -1) {
      const location = warehouseData[foundIndex];
      const marker = markerRefs.current[foundIndex];
      if (marker) {
        marker.openPopup();
        mapRef.current.flyTo([location.latitude, location.longitude], 10);
      }
    } else {
      alert("District not found.");
    }
  };

  const mapRef = useRef(); // to hold the map instance

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-primary">
        We are available in 64 districts.
      </h2>

      {/* Search Box */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <input
          type="text"
          placeholder="Search by district name"
          className="input input-bordered w-full sm:max-w-xs"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* Map */}
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-xl">
        <MapContainer
          center={centerPosition}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {warehouseData.map((location, index) => (
            <Marker
              key={index}
              position={[location.latitude, location.longitude]}
              ref={(ref) => (markerRefs.current[index] = ref)}
            >
              <Popup>
                <div className="font-semibold text-primary">
                  {location.district}
                </div>
                <div className="text-sm">
                  <strong>City:</strong> {location.city} <br />
                  <strong>Region:</strong> {location.region} <br />
                  <strong>Status:</strong> {location.status} <br />
                  <strong>Covered Areas:</strong>
                  <ul className="list-disc list-inside">
                    {location.covered_area.map((area, idx) => (
                      <li key={idx}>{area}</li>
                    ))}
                  </ul>
                  <img src={location.flowchart} alt="Flowchart" className="mt-2 rounded shadow max-w-[200px]" />
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CoverageMap;
