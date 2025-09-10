import React, { useState } from 'react';
import './App.css';

// Types
interface Route {
  name: string;
  time: string;
  distance: string;
  co2: string;
  isRecommended: boolean;
}

interface TransportMode {
  name: string;
  icon: string;
  co2: string;
  color: string;
  routes: Route[];
}

interface Location {
  id: string;
  name: string;
  icon: string;
}

type AppPage = 'location' | 'transport' | 'navigation';

// Location Constants
const LOCATIONS: Location[] = [
  { id: 'uq-lake', name: 'UQ Lake', icon: '🏞️' },
  { id: 'city-hall', name: 'City Hall', icon: '🏛️' }
];

// Constants
const TRANSPORT_MODES: Record<string, TransportMode> = {
  walking: {
    name: 'Walking',
    icon: '🚶',
    co2: '0g CO₂',
    color: '#22c55e',
    routes: [
      {
        name: 'Recommended Route',
        time: '45 min',
        distance: '3.2 km',
        co2: '0g CO₂',
        isRecommended: true
      },
      {
        name: 'Shortest Route',
        time: '38 min',
        distance: '2.8 km',
        co2: '0g CO₂',
        isRecommended: false
      }
    ]
  },
  cycling: {
    name: 'Cycling',
    icon: '🚴',
    co2: '15g CO₂',
    color: '#3b82f6',
    routes: [
      {
        name: 'Recommended Route',
        time: '25 min',
        distance: '4.1 km',
        co2: '15g CO₂',
        isRecommended: true
      },
      {
        name: 'Direct Route',
        time: '20 min',
        distance: '3.5 km',
        co2: '15g CO₂',
        isRecommended: false
      }
    ]
  },
  bus: {
    name: 'Bus',
    icon: '🚌',
    co2: '120g CO₂',
    color: '#f59e0b',
    routes: [
      {
        name: 'Recommended Route',
        time: '35 min',
        distance: '5.2 km',
        co2: '120g CO₂',
        isRecommended: true
      },
      {
        name: 'Local Route',
        time: '45 min',
        distance: '4.8 km',
        co2: '120g CO₂',
        isRecommended: false
      }
    ]
  },
  train: {
    name: 'Train',
    icon: '🚇',
    co2: '85g CO₂',
    color: '#8b5cf6',
    routes: [
      {
        name: 'Recommended Route',
        time: '28 min',
        distance: '6.1 km',
        co2: '85g CO₂',
        isRecommended: true
      },
      {
        name: 'Alternative Route',
        time: '32 min',
        distance: '5.8 km',
        co2: '85g CO₂',
        isRecommended: false
      }
    ]
  }
};

// Components
interface LocationSelectorProps {
  locations: Location[];
  selectedLocation: string;
  onLocationChange: (locationId: string) => void;
  label: string;
  disabled?: boolean;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  locations, 
  selectedLocation, 
  onLocationChange, 
  label,
  disabled = false 
}) => (
  <div className="location-selector">
    <label className="location-label">{label}</label>
    <select 
      className="location-dropdown"
      value={selectedLocation}
      onChange={(e) => onLocationChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">Select {label.toLowerCase()}</option>
      {locations.map((location) => (
        <option key={location.id} value={location.id}>
          {location.icon} {location.name}
        </option>
      ))}
    </select>
  </div>
);

interface RouteCardProps {
  route: Route;
  modeColor: string;
  isRecommended: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, modeColor, isRecommended, isSelected, onClick }) => (
  <div 
    className={`route-card ${isRecommended ? 'recommended' : ''} ${isSelected ? 'selected' : ''}`}
    onClick={onClick}
  >
    <div className="route-name">{route.name}</div>
    <div className="route-details">
      <span>⏱️ {route.time}</span>
      <span>📍 {route.distance}</span>
      <span className="co2-emission">🌱 {route.co2}</span>
    </div>
  </div>
);

interface TransportModeCardProps {
  mode: TransportMode;
  isSelected: boolean;
  onClick: () => void;
}

const TransportModeCard: React.FC<TransportModeCardProps> = ({ 
  mode, 
  isSelected, 
  onClick 
}) => (
  <div 
    className={`transport-mode-card ${isSelected ? 'selected' : ''}`}
    onClick={onClick}
    style={{ '--mode-color': mode.color } as React.CSSProperties}
  >
    <div className="mode-icon">{mode.icon} {mode.name}</div>
    <div className="mode-co2">{mode.co2}</div>
  </div>
);

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('location');
  const [selectedMode, setSelectedMode] = useState<string>('walking');
  const [selectedRoute, setSelectedRoute] = useState<number>(0);
  const [fromLocation, setFromLocation] = useState<string>('');
  const [toLocation, setToLocation] = useState<string>('');
  
  const currentMode = TRANSPORT_MODES[selectedMode];
  const currentRoute = currentMode.routes[selectedRoute];
  
  const handleLocationSubmit = () => {
    if (fromLocation && toLocation) {
      setCurrentPage('transport');
    }
  };
  
  const handleBackToLocation = () => {
    setCurrentPage('location');
  };
  
  const handleBackToTransport = () => {
    setCurrentPage('transport');
  };
  
  const handleStartNavigation = () => {
    setCurrentPage('navigation');
  };

  const getLocationName = (locationId: string) => {
    const location = LOCATIONS.find(loc => loc.id === locationId);
    return location ? `${location.icon} ${location.name}` : '';
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Transportation Planning</h1>
        {(currentPage === 'transport' || currentPage === 'navigation') && (
          <button className="back-button-top" onClick={currentPage === 'transport' ? handleBackToLocation : handleBackToTransport}>
            ← Back
          </button>
        )}
      </header>
      
      <main className="app-main">
        {currentPage === 'location' ? (
          <div className="location-page">
            <div className="location-header">
              <h2>Select Your Journey</h2>
              <p>Choose your departure and destination points</p>
            </div>
            
            <div className="location-selectors">
              <LocationSelector
                locations={LOCATIONS}
                selectedLocation={fromLocation}
                onLocationChange={setFromLocation}
                label="From"
              />
              
              <LocationSelector
                locations={LOCATIONS}
                selectedLocation={toLocation}
                onLocationChange={setToLocation}
                label="To"
                disabled={!fromLocation}
              />
            </div>
            
            <button 
              className="continue-button"
              onClick={handleLocationSubmit}
              disabled={!fromLocation || !toLocation}
            >
              Continue to Transport Options
            </button>
          </div>
        ) : currentPage === 'transport' ? (
          <div className="transport-page">
            <div className="route-info">
              <span className="route-text">
                🗺️ {getLocationName(fromLocation)} → {getLocationName(toLocation)}
              </span>
            </div>
            
            <section className="transport-modes">
              <h2>Transportation Modes</h2>
              <div className="modes-grid">
                {Object.entries(TRANSPORT_MODES).map(([key, mode]) => (
                  <TransportModeCard
                    key={key}
                    mode={mode}
                    isSelected={selectedMode === key}
                    onClick={() => setSelectedMode(key)}
                  />
                ))}
              </div>
            </section>
            
            <section className="routes-section">
              <h2>{currentMode.name} Routes</h2>
              <div className="routes-list">
                {currentMode.routes.map((route, index) => (
                  <RouteCard
                    key={index}
                    route={route}
                    modeColor={currentMode.color}
                    isRecommended={route.isRecommended}
                    isSelected={selectedRoute === index}
                    onClick={() => setSelectedRoute(index)}
                  />
                ))}
              </div>
            </section>
            
            <button 
              className="start-navigation-button"
              onClick={handleStartNavigation}
            >
              Start Navigation
            </button>
            
            <div className="eco-message">
              <div className="eco-title">🌍 Eco-Friendly Travel</div>
              <div className="eco-description">
                Choose low-carbon travel to protect our planet!
              </div>
            </div>
          </div>
        ) : (
          <div className="navigation-page">
            <div className="navigation-header">
              <h2>Navigation</h2>
              <p>Following your selected route</p>
            </div>
            
            <div className="map-container">
              <img 
                src="/map_image.PNG" 
                alt="Navigation Map" 
                className="navigation-map"
              />
            </div>
            
            <div className="navigation-info">
              <div className="current-route">
                <h3>{currentRoute.name}</h3>
                <div className="route-stats">
                  <span>⏱️ {currentRoute.time}</span>
                  <span>📍 {currentRoute.distance}</span>
                  <span className="co2-emission">🌱 {currentRoute.co2}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;