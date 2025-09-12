# Transportation Planner

A modern transportation planning app with carbon emission tracking, supporting both local and long-distance routes.

## Features

- **Location Selection**: Choose from UQ Lake, City Hall, and Sydney Opera House
- **Transportation Modes**: Walking, Cycling, Driving, Bus, Train, and Plane
- **Route Planning**: 
  - Local routes (UQ Lake ↔ City Hall)
  - Long-distance routes (any route involving Sydney Opera House)
- **Carbon Emission Tracking**: Real-time CO₂ emission calculations
- **Interactive Navigation**: Visual route display with maps

## Quick Start

### Option 1: Production Build (Recommended)

**For Windows:**
```cmd
start-server.bat
```

**For macOS/Linux:**
```bash
chmod +x start-server.sh
./start-server.sh
```

Then open your browser and visit: `http://localhost:8080`

### Option 2: Development Mode

**For Windows:**
```cmd
run.bat
```

**For macOS/Linux:**
```bash
chmod +x run.sh
./run.sh
```

Then open your browser and visit: `http://localhost:3001`

## Requirements

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python 3** (for production server) - [Download](https://www.python.org/downloads/)

## Project Structure

```
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # Application styles
│   └── main.tsx         # Application entry point
├── public/
│   ├── map_image.PNG    # Local route map
│   └── img_2452.PNG     # Sydney route map
├── build/               # Production build output
├── run.bat/.sh          # Development server scripts
├── start-server.bat/.sh # Production server scripts
└── package.json         # Project dependencies
```

## Route Types

### Local Routes
- **UQ Lake ↔ City Hall**
- Uses `map_image.PNG` for navigation
- Short distances and times

### Long-Distance Routes
- **Any route involving Sydney Opera House**
- Uses `img_2452.PNG` for navigation
- Extended travel times and distances
- Higher CO₂ emissions

## Transportation Modes

| Mode | Local CO₂ | Sydney CO₂ | Notes |
|------|-----------|------------|-------|
| Walking | 0g | 0g | Most eco-friendly |
| Cycling | 0g | 0g | Zero emissions |
| Driving | 1200g | 193kg | Highest local emissions |
| Bus | 630g | - | No Sydney routes |
| Train | 450g | 46kg | Good for long distances |
| Plane | - | 240kg | Fastest for Sydney |

## Troubleshooting

### Port Already in Use
If you get "Address already in use" error:
- **Windows**: Close any running Python processes
- **macOS/Linux**: Run `pkill -f "python.*http.server"`

### Build Issues
If the build fails:
1. Make sure Node.js is installed
2. Run `npm install` to install dependencies
3. Try `npm run build` manually

### Missing Images
If maps don't display:
- Check that `public/map_image.PNG` and `public/img_2452.PNG` exist
- Rebuild the project with `npm run build`

## Development

To modify the application:
1. Edit files in `src/` directory
2. Use development mode (`run.bat` or `run.sh`)
3. Changes will auto-reload in the browser
4. Build for production when ready (`npm run build`)

## License

MIT License - Transportation Planner Team