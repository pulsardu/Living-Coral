# Transportation Planner

A modern, responsive web application for planning transportation routes with real-time carbon emission tracking. Built with React, TypeScript, and Vite.

## Features

- 🚶 **Multiple Transport Modes**: Walking, Cycling, Bus, and Train options
- 🌱 **Carbon Emission Tracking**: Real-time CO₂ calculations for each route
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: CSS3 with CSS Variables
- **Development**: Hot Module Replacement (HMR)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd transportation-planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── main.tsx         # Application entry point
├── index.css        # Global styles
└── styles/
    └── globals.css  # Additional global styles
```

## Features Overview

### Transport Mode Selection
Choose from four different transportation modes, each with their own carbon footprint:
- **Walking**: 0g CO₂ - Most eco-friendly option
- **Cycling**: 15g CO₂ - Great balance of speed and sustainability  
- **Bus**: 120g CO₂ - Public transportation option
- **Train**: 85g CO₂ - Fast and relatively eco-friendly

### Route Planning
Each transport mode offers multiple route options:
- Recommended routes (marked with ⭐)
- Alternative routes for flexibility
- Detailed time and distance information
- Real-time carbon emission calculations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Built with modern web technologies
- Inspired by sustainable transportation initiatives
- Designed for accessibility and user experience
