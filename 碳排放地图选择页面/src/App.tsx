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

// Constants
const TRANSPORT_MODES: Record<string, TransportMode> = {
  walking: {
    name: 'Walking',
    icon: '🚶',
    co2: '0g CO₂',
    color: '#22c55e',
    routes: [
      {
        name: 'Recommended Route ⭐',
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
        name: 'Scenic Route ⭐',
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
        name: 'Express Route ⭐',
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
        name: 'Fastest Route ⭐',
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
interface RouteCardProps {
  route: Route;
  modeColor: string;
  isRecommended: boolean;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, modeColor, isRecommended }) => (
  <div className={`route-card ${isRecommended ? 'recommended' : ''}`}>
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
  const [selectedMode, setSelectedMode] = useState<string>('walking');
  const currentMode = TRANSPORT_MODES[selectedMode];

  return (
    <div className="app">
      <header className="app-header">
        <h1>Transportation Planning</h1>
      </header>
      
      <main className="app-main">
        <div className="route-info">
          <span className="route-text">🗺️ UQ Lake → Brisbane City Hall</span>
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
              />
            ))}
          </div>
        </section>
        
        <div className="eco-message">
          <div className="eco-title">🌍 Eco-Friendly Travel</div>
          <div className="eco-description">
            Choose low-carbon travel to protect our planet!
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;