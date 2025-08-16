# Wheel of Gains - GitHub Copilot Development Instructions

**ALWAYS follow these instructions first and fallback to additional search and context gathering only if the information here is incomplete or found to be in error.**

Wheel of Gains is a TypeScript web application built with Qwik framework that provides a gamified workout selection experience through an interactive spinning wheel. Users can spin the wheel to randomly select workouts from various categories.

## Working Effectively

### Repository Setup & Dependencies

- Install Node.js 20+ (tested with v20.19.4): `node --version && npm --version`
- Clone and setup: `git clone https://github.com/SergeiGolos/wheel-of-gains.git && cd wheel-of-gains`
- Install dependencies: `npm install` -- takes 60 seconds. NEVER CANCEL. Expect deprecated package warnings (normal).

### Build & Development Commands

- **ALWAYS** format code before making changes: `npm run fmt` -- takes 5 seconds
- **ALWAYS** lint before committing: `npm run lint` -- takes 2 seconds
- Build for production: `npm run build` -- takes 10 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
- Development server: `npm run dev` -- takes 2 seconds to start, runs on `http://localhost:5173/wheel-of-gains/`
- Preview production build: `npm run preview` -- takes 15 seconds, runs on `http://localhost:4173/wheel-of-gains/`
- Type checking: `npm run build.types` -- included in build command
- Check formatting: `npm run fmt.check` -- takes 3 seconds

### **CRITICAL TIMING & CANCELLATION WARNINGS**

- **NEVER CANCEL** `npm install` - takes 60 seconds with normal warnings
- **NEVER CANCEL** `npm run build` - takes 10 seconds, can take up to 60 seconds with cold cache
- **NEVER CANCEL** `npm run preview` - takes 15 seconds to build and start
- Always wait for commands to complete fully before proceeding

## Validation & Testing

### Manual Validation Scenarios

- **ALWAYS test the core spinning functionality** after making changes:
  1. Start dev server: `npm run dev`
  2. Navigate to `http://localhost:5173/wheel-of-gains/`
  3. Click "SPIN" button and verify wheel animation completes
  4. Verify a workout is selected and displayed in "Your Destiny Awaits" section
  5. Test navigation between workout categories (Classic, Beginner, Intermediate, Advanced, Cardio, Strength)
  6. Verify each category loads with different workout counts

### Pre-Commit Validation

- **ALWAYS run before committing**:
  1. `npm run fmt` -- format all code
  2. `npm run lint` -- check for linting errors
  3. `npm run build` -- ensure production build succeeds
  4. Manual spin test (see above)

### CI/CD Validation

- GitHub Actions workflow builds and deploys to GitHub Pages automatically
- Build includes: TypeScript checking, client build, server build, and linting
- **Build artifacts location**: `./dist/wheel-of-gains/`
- **Live site**: https://SergeiGolos.github.io/wheel-of-gains

## Technology Stack & Architecture

### Core Technologies

- **Frontend Framework**: Qwik 1.15.0 with TypeScript
- **Styling**: Tailwind CSS v4 (latest)
- **Build Tool**: Vite 5.3.5
- **Routing**: Qwik City for file-based routing and SSR
- **Deployment**: GitHub Pages with Static Site Generation

### Node.js Requirements

- **Supported versions**: ^18.17.0 || ^20.3.0 || >=21.0.0
- **Currently tested**: v20.19.4
- **Package manager**: npm (no yarn or pnpm)

## Project Structure & Key Locations

### Primary Development Areas

```
src/
├── routes/                    # File-based routing (main development area)
│   ├── index.tsx             # Classic workout page (default)
│   ├── beginner/index.tsx    # Beginner workouts (20 workouts)
│   ├── intermediate/index.tsx # Intermediate workouts
│   ├── advanced/index.tsx    # Advanced workouts
│   ├── cardio/index.tsx      # Cardio-focused workouts
│   └── strength/index.tsx    # Strength-focused workouts
├── components/
│   ├── workout/              # Core wheel functionality
│   │   ├── workout-wheel-page.tsx  # Main page component
│   │   ├── wheel.tsx               # Canvas-based spinning wheel
│   │   ├── workout-manager.tsx     # Workout editing logic
│   │   └── previous-results.tsx    # Spin history
│   ├── ui/                   # Reusable UI components
│   ├── navigation/           # Navigation components
│   └── icons/               # SVG icon components
└── utils/
    ├── workout-collections.ts # Workout data and collections
    └── workout-utils.ts      # Utility functions, local storage
```

### Configuration Files

- **Build**: `vite.config.ts` (base URL: `/wheel-of-gains/`)
- **TypeScript**: `tsconfig.json` (ES2022, React JSX)
- **Linting**: `eslint.config.js` (ESLint 9 with Qwik plugin)
- **Formatting**: `.prettierrc.js` (Prettier with Tailwind plugin)
- **CI/CD**: `.github/workflows/pages.yml`

### Important Constants & Data

- **Workout collections**: Defined in `src/utils/workout-collections.ts`
- **Default workouts**: 11 classic workouts in main collection
- **Categories**: Classic (11), Beginner (20), Intermediate, Advanced, Cardio, Strength
- **Local storage keys**: `wheelOfGains_workouts_*` and `*_history`

## Common Development Tasks

### Adding New Workouts

1. Edit `src/utils/workout-collections.ts`
2. Add to appropriate workout string array (e.g., `classicWorkoutStrings`)
3. Test by running dev server and spinning wheel
4. **Always verify** new workouts appear in the wheel and can be selected

### Modifying Wheel Behavior

- **Main wheel component**: `src/components/workout/wheel.tsx`
- **Canvas-based rendering** with HTML5 Canvas API
- **Animation timing**: Configurable spin duration and easing
- **Always test** wheel animation and selection after changes

### Styling Changes

- **Framework**: Tailwind CSS v4 (latest syntax)
- **Global styles**: `src/global.css`
- **Component styles**: Inline Tailwind classes
- **Always run** `npm run fmt` after style changes

### Route/Page Changes

- **File-based routing** in `src/routes/`
- **Each route** uses `WorkoutWheelPage` component with different workout collections
- **Navigation** updates automatically via `src/components/navigation/workout-navigation.tsx`

## Troubleshooting & Known Issues

### Expected Warnings (Normal)

- npm install: "deprecated inflight", "deprecated glob" warnings
- Dev server: "Could not auto-determine entry point" warning
- Dev server: Manifest 404 errors (normal in dev, works in production)
- Dev server: "development mode is slower than production" message

### Build Issues

- **TypeScript errors**: Run `npm run build.types` for detailed output
- **Linting errors**: Run `npm run lint` and fix before building
- **Missing dependencies**: Ensure `npm install` completed successfully

### Performance Notes

- **Development mode**: Slower than production (normal for Qwik SSR)
- **Production build**: Static site generation creates optimized bundles
- **Build time**: 10 seconds typical, up to 60 seconds with cold cache

## Development Workflow Best Practices

### Before Starting Work

1. Ensure Node.js 20+ installed
2. Run `npm install` (wait 60 seconds)
3. Test basic functionality: `npm run dev` and spin wheel
4. Run `npm run fmt` and `npm run lint` to establish clean baseline

### During Development

1. Keep dev server running: `npm run dev`
2. Test changes frequently by spinning wheel
3. Format regularly: `npm run fmt`
4. Check for errors: `npm run lint`

### Before Committing

1. **MANDATORY**: `npm run fmt` -- format all code
2. **MANDATORY**: `npm run lint` -- zero linting errors
3. **MANDATORY**: `npm run build` -- production build must succeed
4. **MANDATORY**: Manual validation scenario (spin wheel, test navigation)

### Deployment

- **Automatic**: GitHub Actions deploys on push to main/master
- **Manual check**: Verify build succeeds in Actions tab
- **Live testing**: Test functionality on https://SergeiGolos.github.io/wheel-of-gains

## Quick Reference Commands

```bash
# Setup
npm install                # 60 seconds, expect warnings

# Development
npm run dev               # Start dev server (localhost:5173/wheel-of-gains/)
npm run fmt               # Format code (5 seconds)
npm run lint              # Check linting (2 seconds)

# Production
npm run build             # Build for production (10 seconds)
npm run preview          # Preview production build (15 seconds)

# Validation URLs
http://localhost:5173/wheel-of-gains/           # Development
http://localhost:4173/wheel-of-gains/           # Preview
https://SergeiGolos.github.io/wheel-of-gains    # Production
```

---

**Remember**: Always follow these instructions first. The commands and timings have been validated to work correctly. If you encounter issues, verify your Node.js version and that `npm install` completed successfully before exploring alternatives.
