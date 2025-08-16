# Hydroponic Concentrate Calculator - Architecture Document

## Project Overview

This project transforms a simple proof-of-concept HTML calculator into a production-ready QWIK single-page application for calculating hydroponic concentrate mixtures based on the Master Blend formula.

## Business Requirements

### Core Functionality
- **Primary Use Case**: Calculate precise ratios of Master Blend, Epsom Salt, and Calcium Nitrate for hydroponic solutions
- **Target Users**: Hydroponic gardeners and enthusiasts who need to create concentrated nutrient solutions
- **Base Formula**: 120g Master Blend + 60g Epsom Salt + 120g Calcium Nitrate per 500ml water
- **Scaling**: Support for multiple container sizes (ml, gallons, 5-gallon containers)

### User Experience Requirements
- Single-page application with intuitive interface
- Real-time calculation as users change inputs
- Responsive design for mobile and desktop
- Clear display of results with proper units

### Deployment Requirements
- Deploy to GitHub Pages via GitHub Actions
- Static site generation for optimal performance
- Automatic deployment on main/master branch updates

## Technical Architecture

### Technology Stack
- **Framework**: QWIK 1.15.0 (chosen for optimal performance and resumability)
- **Language**: TypeScript 5.4.5 (type safety and developer experience)
- **Styling**: Tailwind CSS v4 (rapid UI development with utility classes)
- **Build Tool**: Vite 5.3.5 (fast development and optimized builds)
- **Deployment**: GitHub Pages with Static Site Generation

### Project Structure
```
src/
├── components/
│   ├── calculator/
│   │   └── concentrate-calculator.tsx    # Main calculator component
│   └── router-head/
│       └── router-head.tsx              # SEO and meta tags
├── routes/
│   └── index.tsx                        # Main page route
├── types/
│   └── calculator.ts                    # TypeScript type definitions
├── utils/
│   └── calculator.ts                    # Business logic and calculations
├── entry.ssr.tsx                       # Server-side rendering entry
├── entry.dev.tsx                       # Development entry
├── global.css                          # Global styles
└── root.tsx                            # Application root component
```

### Component Architecture

#### ConcentrateCalculator Component
**Location**: `src/components/calculator/concentrate-calculator.tsx`

**Responsibilities**:
- User input handling (container size, unit selection)
- Real-time calculation triggering
- Results display and error handling
- Responsive UI rendering

**State Management**:
- `containerSize`: Reactive signal for container size input
- `unit`: Reactive signal for volume unit selection
- `results`: Calculated amounts for each ingredient
- `error`: Error message display
- `showResults`: Controls results visibility

**Key Features**:
- Automatic calculation on input change
- Input validation with user-friendly error messages
- Support for three unit types: ml, gallon, 5-gallon
- Responsive design with Tailwind CSS

#### Calculation Engine
**Location**: `src/utils/calculator.ts`

**Core Functions**:
- `calculateMixture()`: Main calculation logic with scaling
- `validateInput()`: Input validation and error handling
- `convertToMilliliters()`: Unit conversion logic
- `formatWeight()`: Number formatting for display

**Formula Implementation**:
```typescript
const scalingFactor = newVolumeML / originalVolumeML;
const masterBlend = originalMasterBlend * scalingFactor;
const epsomSalt = originalEpsomSalt * scalingFactor;
const calciumNitrate = originalCalciumNitrate * scalingFactor;
```

### Type Definitions
**Location**: `src/types/calculator.ts`

**Key Types**:
- `VolumeUnit`: Union type for supported units ('ml' | 'gallon' | '5gallon')
- `CalculationInput`: Input parameters interface
- `CalculationResult`: Calculation output interface
- `ConcentrateFormula`: Base formula configuration
- `ValidationResult`: Input validation result

### Deployment Architecture

#### GitHub Actions Workflow
**Location**: `.github/workflows/pages.yml`

**Pipeline Stages**:
1. **Build Stage**:
   - Node.js 20 setup
   - Dependency installation (`npm ci`)
   - QWIK build process (`npm run build`)
   - Artifact upload to GitHub Pages

2. **Deploy Stage**:
   - GitHub Pages deployment
   - Static site serving from `dist/` directory

**Configuration**:
- Triggers on push to main/master branches
- Manual workflow dispatch available
- Proper permissions for Pages deployment
- Concurrent deployment protection

#### Static Site Generation
- QWIK's optimizer generates highly optimized bundles
- Automatic code splitting for minimal initial load
- Progressive hydration for optimal performance
- SEO-friendly static HTML generation

## Performance Considerations

### Bundle Optimization
- QWIK's resumability reduces JavaScript execution
- Automatic code splitting by route and component
- Tree shaking eliminates unused code
- CSS purging removes unused Tailwind classes

### Runtime Performance
- Reactive signals for efficient state updates
- Minimal DOM manipulation
- Progressive hydration only when needed
- Optimized calculation algorithms

### Loading Performance
- Static site generation for instant first paint
- Minimal critical path CSS
- Optimized asset delivery via GitHub Pages CDN
- Efficient caching strategy

## Security Considerations

### Input Validation
- Client-side input validation for user experience
- Type safety through TypeScript
- Numeric range validation for container sizes
- Unit type validation

### Deployment Security
- GitHub Actions with minimal required permissions
- No sensitive data exposure in build process
- Static site deployment reduces attack surface
- HTTPS by default via GitHub Pages

## Development Workflow

### Local Development
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Production build
npm run preview     # Preview production build
npm run lint        # Code linting
npm run fmt         # Code formatting
```

### Code Quality
- ESLint configuration with QWIK-specific rules
- Prettier for consistent code formatting
- TypeScript for compile-time error detection
- Automated linting in CI/CD pipeline

## Future Enhancement Opportunities

### Feature Extensions
1. **Reverse Calculator**: Calculate container size from ingredient amounts
2. **Recipe Variations**: Support for different nutrient formulas
3. **Batch Calculations**: Multiple container calculations
4. **Unit Preferences**: User-preferred default units
5. **Recipe History**: Local storage of previous calculations

### Technical Improvements
1. **PWA Support**: Offline capability with service worker
2. **Advanced Validation**: More sophisticated input validation
3. **Accessibility**: Enhanced screen reader support
4. **Analytics**: Usage tracking and performance monitoring
5. **Internationalization**: Multi-language support

### Integration Possibilities
1. **Nutrient Database**: Integration with nutrient information APIs
2. **Shopping Integration**: Links to ingredient suppliers
3. **Community Features**: Recipe sharing capabilities
4. **Mobile App**: React Native or Capacitor wrapper

## Risk Assessment

### Technical Risks
- **Low Risk**: QWIK framework maturity and stability
- **Low Risk**: Build and deployment process complexity
- **Low Risk**: Performance and scalability requirements

### Business Risks
- **Low Risk**: User adoption (simple, focused tool)
- **Medium Risk**: Formula accuracy (requires validation)
- **Low Risk**: Maintenance overhead (simple codebase)

### Mitigation Strategies
- Comprehensive testing of calculation accuracy
- Clear disclaimers about formula usage
- Simple, maintainable codebase structure
- Automated deployment and testing

## Success Metrics

### Technical Metrics
- Build success rate: >99%
- Page load time: <2 seconds
- Bundle size: <100KB initial
- Lighthouse score: >90

### User Experience Metrics
- Time to first interaction: <1 second
- Calculation accuracy: 100%
- Mobile responsiveness: Full support
- Error rate: <1%

### Business Metrics
- GitHub Pages uptime: >99.9%
- User feedback: Positive
- Feature completeness: 100% of requirements
- Documentation coverage: Complete

## Conclusion

This architecture provides a solid foundation for the Hydroponic Concentrate Calculator, balancing simplicity with extensibility. The QWIK framework choice ensures optimal performance while the modular structure allows for future enhancements. The automated deployment pipeline ensures reliable delivery of updates.

The implementation successfully transforms the POC into a production-ready application while maintaining the core simplicity that makes the tool valuable for hydroponic enthusiasts.