# FRNSW SIMS Digital Dashboard

A React-based digital dashboard for Fire & Rescue NSW (FRNSW) Station Inspection Management System (SIMS). Optimized for tablet and mobile use in fire stations with day-of-week detection for relevant daily tasks.

## Features

- **Day-Specific Task Management**: Automatically displays core daily tasks plus day-specific inspections
- **Three-State Task Tracking**: Mark tasks as Satisfactory, Defect, or N/A
- **Defect Reporting**: Capture serial numbers and detailed comments for defective equipment
- **Mobile-Optimized**: Large touch targets (min 48px) for easy use on tablets and mobile devices
- **FRNSW Branding**: Professional emergency services design with FRNSW red (#D21034)
- **Hose Check Sub-Form**: Dedicated page for detailed hose inspections (placeholder)

## Technology Stack

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Day.js** - Date/time handling

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Installation

1. Navigate to the project directory:
   ```bash
   cd frnsw-sims-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Deployment

### Deploy to Vercel (Recommended)

This app is configured for easy deployment to Vercel:

1. **Push to GitHub**:
   ```bash
   # If not already done
   git add .
   git commit -m "Initial commit: FRNSW SIMS Dashboard"
   git remote add origin https://github.com/YOUR_USERNAME/frnsw-sims-dashboard.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite and configure build settings
   - Click "Deploy"

3. **Your app will be live** at `https://your-project-name.vercel.app`

### Alternative: Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json` scripts:
```json
"deploy": "npm run build && gh-pages -d dist"
```

Then run:
```bash
npm run deploy
```

### Alternative: Deploy to Netlify

1. Push to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy"

## Project Structure

```
frnsw-sims-dashboard/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Station info, date, shift display
│   │   ├── TaskCard.jsx        # Individual task with status toggles
│   │   ├── DefectForm.jsx      # Serial number & comment inputs
│   │   └── Footer.jsx          # Confirmation button
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main page with all tasks
│   │   └── HoseCheck.jsx       # Hose inspection sub-form
│   ├── utils/
│   │   ├── taskMapping.js      # Task definitions by day
│   │   └── dateUtils.js        # Date formatting utilities
│   ├── constants/
│   │   └── theme.js            # Colors, sizes, station info
│   ├── App.jsx                 # Router configuration
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles and Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Daily Task Schedule

### Core Tasks (Every Day)
- Appliance
- SCBA
- Portable radios
- AC voltage detector
- Incident hydration daily
- PPE
- IT & Comms

### Day-Specific Tasks
- **Monday**: Thermal imaging camera, Hazmat
- **Tuesday**: Ladder, Rescue equipment
- **Wednesday**: Pumps, Water rescue
- **Thursday**: Generators, Lighting
- **Friday**: Medical equipment, BA Maintenance
- **Saturday**: Hose, PPV, Air tool kit
- **Sunday**: Radio maintenance, Station checks

## Usage

1. The dashboard automatically displays tasks for the current day
2. Tap each task's status button (Satisfactory/Defect/N/A)
3. If marking as Defect, fill in the Serial Number and Comment fields
4. For the Hose task, use the "Details" button for the dedicated sub-form
5. Once all tasks have a status, the "Confirm & Log SIMS" button becomes enabled
6. Tap to submit (currently shows alert, backend integration needed)

## Future Enhancements

- Backend API integration for data persistence
- User authentication with service number login
- Historical SIMS records and reporting
- PDF export functionality
- Offline Progressive Web App (PWA) capabilities
- Info sheets for each task type
- Photo attachment for defects
- Digital signature capture

## Browser Support

Optimized for modern mobile browsers:
- iOS Safari 14+
- Chrome for Android 90+
- Samsung Internet 14+

## License

© Fire & Rescue NSW - Internal Use Only

## Support

For issues or questions, contact the FRNSW IT Department.
