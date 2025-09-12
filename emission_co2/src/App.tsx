import React, { useState, useEffect } from 'react';
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

type AppPage = 'location' | 'transport' | 'sydney-transport' | 'navigation';

// Location Constants
const LOCATIONS: Location[] = [
  { id: 'uq-lake', name: 'UQ Lake', icon: '🏞️' },
  { id: 'city-hall', name: 'City Hall', icon: '🏛️' },
  { id: 'sydney-opera', name: 'Sydney Opera House', icon: '🎭' }
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
        time: '64 min',
        distance: '4.7 km',
        co2: '0g CO₂',
        isRecommended: true
      },
      {
        name: 'Alternative Route',
        time: '67 min',
        distance: '4.9 km',
        co2: '0g CO₂',
        isRecommended: false
      }
    ]
  },
  cycling: {
    name: 'Cycling',
    icon: '🚴',
    co2: '0g CO₂',
    color: '#3b82f6',
    routes: [
      {
        name: 'Recommended Route',
        time: '22 min',
        distance: '6.4 km',
        co2: '0g CO₂',
        isRecommended: true
      },
      {
        name: 'Direct Route',
        time: '20 min',
        distance: '5.5 km',
        co2: '0g CO₂',
        isRecommended: false
      }
    ]
  },
  driving: {
    name: 'Driving',
    icon: '🚗',
    co2: '1200g CO₂',
    color: '#ef4444',
    routes: [
      {
        name: 'Recommended Route',
        time: '11 min',
        distance: '6.1 km',
        co2: '1200g CO₂',
        isRecommended: true
      },
      {
        name: 'Alternative Route',
        time: '11 min',
        distance: '6.3 km',
        co2: '1260g CO₂',
        isRecommended: false
      }
    ]
  },
  bus: {
    name: 'Bus',
    icon: '🚌',
    co2: '630g CO₂',
    color: '#f59e0b',
    routes: [
      {
        name: 'Recommended Route',
        time: '22 min',
        distance: '6.3 km',
        co2: '630g CO₂',
        isRecommended: true
      },
      {
        name: 'Fast Route',
        time: '18 min',
        distance: '7.5 km',
        co2: '750g CO₂',
        isRecommended: false
      }
    ]
  },
  train: {
    name: 'Train',
    icon: '🚇',
    co2: '450g CO₂',
    color: '#8b5cf6',
    routes: [
      {
        name: 'Recommended Route',
        time: '41 min',
        distance: '7.5 km',
        co2: '450g CO₂',
        isRecommended: true
      },
      {
        name: 'Alternative Route',
        time: '47 min',
        distance: '7.5 km',
        co2: '450g CO₂',
        isRecommended: false
      }
    ]
  },
  plane: {
    name: 'Plane',
    icon: '✈️',
    co2: '-',
    color: '#06b6d4',
    routes: []
  }
};

// Sydney Routes (City Hall to Sydney Opera House)
const SYDNEY_TRANSPORT_MODES: Record<string, TransportMode> = {
  walking: {
    name: 'Walking',
    icon: '🚶',
    co2: '0g CO₂',
    color: '#22c55e',
    routes: [
      {
        name: 'Recommended Route',
        time: '8 days 13 hours',
        distance: '907 km',
        co2: '0g CO₂',
        isRecommended: true
      }
    ]
  },
  cycling: {
    name: 'Cycling',
    icon: '🚴',
    co2: '0g CO₂',
    color: '#3b82f6',
    routes: [
      {
        name: 'Recommended Route',
        time: '2 days 9 hours',
        distance: '1060 km',
        co2: '0g CO₂',
        isRecommended: true
      }
    ]
  },
  bus: {
    name: 'Bus',
    icon: '🚌',
    co2: '-',
    color: '#f59e0b',
    routes: []
  },
  train: {
    name: 'Train',
    icon: '🚇',
    co2: '46kg CO₂',
    color: '#8b5cf6',
    routes: [
      {
        name: 'Recommended Route',
        time: '14 hours 43 min',
        distance: '920 km',
        co2: '46kg CO₂',
        isRecommended: true
      }
    ]
  },
  driving: {
    name: 'Driving',
    icon: '🚗',
    co2: '193kg CO₂',
    color: '#ef4444',
    routes: [
      {
        name: 'Recommended Route',
        time: '11 hours 51 min',
        distance: '963 km',
        co2: '193kg CO₂',
        isRecommended: true
      }
    ]
  },
  plane: {
    name: 'Plane',
    icon: '✈️',
    co2: '240kg CO₂',
    color: '#06b6d4',
    routes: [
      {
        name: 'Recommended Route',
        time: '1 hour 30 min',
        distance: '907 km',
        co2: '240kg CO₂',
        isRecommended: true
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
  
  const currentMode = currentPage === 'sydney-transport' ? SYDNEY_TRANSPORT_MODES[selectedMode] : TRANSPORT_MODES[selectedMode];
  const currentRoute = currentMode.routes && currentMode.routes.length > 0 
    ? (currentMode.routes[selectedRoute] || currentMode.routes[0])
    : null;
  
  // Reset selected route when mode changes and current route is not available
  useEffect(() => {
    if (currentMode.routes.length > 0 && selectedRoute >= currentMode.routes.length) {
      setSelectedRoute(0);
    } else if (currentMode.routes.length === 0) {
      // If no routes available, reset to 0
      setSelectedRoute(0);
    }
  }, [selectedMode, currentMode.routes.length, selectedRoute]);
  
  const handleLocationSubmit = () => {
    if (fromLocation && toLocation) {
      // Check if either location is Sydney Opera House
      if (fromLocation === 'sydney-opera' || toLocation === 'sydney-opera') {
        setCurrentPage('sydney-transport');
      } else {
        setCurrentPage('transport');
      }
    }
  };
  
  const handleBackToLocation = () => {
    setCurrentPage('location');
  };
  
  const handleBackToTransport = () => {
    if (fromLocation === 'sydney-opera' || toLocation === 'sydney-opera') {
      setCurrentPage('sydney-transport');
    } else {
      setCurrentPage('transport');
    }
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
        {(currentPage === 'transport' || currentPage === 'sydney-transport' || currentPage === 'navigation') && (
          <button className="back-button-top" onClick={currentPage === 'navigation' ? handleBackToTransport : handleBackToLocation}>
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
        ) : currentPage === 'transport' || currentPage === 'sydney-transport' ? (
          <div className="transport-page">
            <div className="route-info">
              <span className="route-text">
                🗺️ {getLocationName(fromLocation)} → {getLocationName(toLocation)}
              </span>
            </div>
            
            <section className="transport-modes">
              <h2>Transportation Modes</h2>
              <div className="modes-grid">
                {/* 第一行：走路-自行车 */}
                <TransportModeCard
                  key="walking"
                  mode={currentPage === 'sydney-transport' ? SYDNEY_TRANSPORT_MODES.walking : TRANSPORT_MODES.walking}
                  isSelected={selectedMode === 'walking'}
                  onClick={() => setSelectedMode('walking')}
                />
                <TransportModeCard
                  key="cycling"
                  mode={currentPage === 'sydney-transport' ? SYDNEY_TRANSPORT_MODES.cycling : TRANSPORT_MODES.cycling}
                  isSelected={selectedMode === 'cycling'}
                  onClick={() => setSelectedMode('cycling')}
                />
                {/* 第二行：开车-公交车 */}
                <TransportModeCard
                  key="driving"
                  mode={currentPage === 'sydney-transport' ? SYDNEY_TRANSPORT_MODES.driving : TRANSPORT_MODES.driving}
                  isSelected={selectedMode === 'driving'}
                  onClick={() => setSelectedMode('driving')}
                />
                <TransportModeCard
                  key="bus"
                  mode={currentPage === 'sydney-transport' ? SYDNEY_TRANSPORT_MODES.bus : TRANSPORT_MODES.bus}
                  isSelected={selectedMode === 'bus'}
                  onClick={() => setSelectedMode('bus')}
                />
                {/* 第三行：火车-飞机 */}
                <TransportModeCard
                  key="train"
                  mode={currentPage === 'sydney-transport' ? SYDNEY_TRANSPORT_MODES.train : TRANSPORT_MODES.train}
                  isSelected={selectedMode === 'train'}
                  onClick={() => setSelectedMode('train')}
                />
                <TransportModeCard
                  key="plane"
                  mode={currentPage === 'sydney-transport' ? SYDNEY_TRANSPORT_MODES.plane : TRANSPORT_MODES.plane}
                  isSelected={selectedMode === 'plane'}
                  onClick={() => setSelectedMode('plane')}
                />
              </div>
            </section>
            
            <section className="routes-section">
              <h2>{currentMode.name} Routes</h2>
              <div className="routes-list">
                {currentMode.routes.length > 0 ? (
                  currentMode.routes.map((route, index) => (
                    <RouteCard
                      key={index}
                      route={route}
                      modeColor={currentMode.color}
                      isRecommended={route.isRecommended}
                      isSelected={selectedRoute === index}
                      onClick={() => setSelectedRoute(index)}
                    />
                  ))
                ) : (
                  <div className="no-routes-message">
                    <div className="no-routes-icon">🚫</div>
                    <div className="no-routes-text">Unable to find routes to this destination</div>
                  </div>
                )}
              </div>
            </section>
            
            <button 
              className="start-navigation-button"
              onClick={handleStartNavigation}
              disabled={currentMode.routes.length === 0}
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
                src={fromLocation === 'sydney-opera' || toLocation === 'sydney-opera' ? "/img_2452.PNG" : "/map_image.PNG"}
                alt="Navigation Map" 
                className="navigation-map"
              />
            </div>
            
            <div className="navigation-info">
              {currentRoute ? (
                <div className="current-route">
                  <h3>{currentRoute.name}</h3>
                  <div className="route-stats">
                    <span>⏱️ {currentRoute.time}</span>
                    <span>📍 {currentRoute.distance}</span>
                    <span className="co2-emission">🌱 {currentRoute.co2}</span>
                  </div>
                </div>
              ) : (
                <div className="no-route-info">
                  <h3>No route available</h3>
                  <p>Please select a different transportation mode</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;