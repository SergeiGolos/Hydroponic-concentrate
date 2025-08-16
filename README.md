# 🌱 Hydroponic Concentrate Calculator

A modern web application that helps hydroponic gardeners calculate precise nutrient concentrate ratios based on proven Master Blend formulations. Calculate the exact amounts of Master Blend fertilizer, Epsom Salt, and Calcium Nitrate needed for any container size.

[![Deploy to GitHub Pages](https://github.com/SergeiGolos/Hydroponic-concentrate/actions/workflows/pages.yml/badge.svg)](https://github.com/SergeiGolos/Hydroponic-concentrate/actions/workflows/pages.yml)

## 🚀 Live Application

**Try it now:** [https://SergeiGolos.github.io/Hydroponic-concentrate/](https://SergeiGolos.github.io/Hydroponic-concentrate/)

## 📋 What This Application Does

This calculator helps hydroponic enthusiasts scale nutrient concentrate recipes based on the proven Master Blend formula. Instead of doing complex math to adjust ratios for different container sizes, simply enter your container size and get precise measurements.

### 🧪 Base Formula (500ml)

- **Master Blend**: 120g
- **Epsom Salt**: 60g
- **Calcium Nitrate**: 120g

The application automatically scales these ratios for any container size you specify.

### ✨ Key Features

- **📐 Precise Calculations**: Accurate scaling based on proven hydroponic formulations
- **📱 Multiple Units**: Support for milliliters, gallons, and 5-gallon containers
- **⚡ Real-time Results**: Instant calculation updates as you type
- **✅ Input Validation**: Smart error handling and user-friendly feedback
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎯 Clean Interface**: Professional, easy-to-use design focused on clarity

## 🛠️ Technology Stack

- **Framework**: [Qwik 1.15.0](https://qwik.dev/) - Optimized for speed and performance
- **Language**: TypeScript 5.4.5 - Type safety and better developer experience
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- **Build Tool**: [Vite 5.3.5](https://vitejs.dev/) - Fast development and optimized builds
- **Deployment**: GitHub Pages with Static Site Generation
- **CI/CD**: GitHub Actions for automated builds and deployment

## 🏗️ Project Structure

```
src/
├── components/
│   ├── calculator/
│   │   └── concentrate-calculator.tsx    # Main calculator component
│   └── router-head/
│       └── router-head.tsx              # SEO and meta tags
├── routes/
│   └── index.tsx                        # Main application page
├── types/
│   └── calculator.ts                    # TypeScript type definitions
├── utils/
│   └── calculator.ts                    # Business logic and calculations
├── entry.ssr.tsx                       # Server-side rendering entry
├── global.css                          # Global styles
└── root.tsx                            # Application root component
```

## 🚀 Getting Started

### Prerequisites

- Node.js ^18.17.0 || ^20.3.0 || >=21.0.0
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SergeiGolos/Hydroponic-concentrate.git
   cd Hydroponic-concentrate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Open in browser**

   Navigate to `http://localhost:5173/Hydroponic-concentrate/`

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server with hot reload
npm start               # Alternative development server command

# Building
npm run build           # Build for production (includes type checking and linting)
npm run build.client    # Build client-side code only
npm run build.server    # Build server-side code only
npm run build.types     # Run TypeScript type checking

# Code Quality
npm run lint            # Run ESLint on TypeScript files
npm run fmt             # Format code with Prettier
npm run fmt.check       # Check code formatting

# Preview
npm run preview         # Build and preview production build locally
```

## 📖 How to Use

1. **Enter Container Size**: Input your desired container size in the number field
2. **Select Unit**: Choose from:
   - **ml** (milliliters) - for precise small batches
   - **gallon** - for standard gallon containers
   - **5gallon** - for 5-gallon bucket systems
3. **View Results**: Get precise measurements for:
   - Master Blend fertilizer (grams)
   - Epsom Salt (grams)
   - Calcium Nitrate (grams)

### Example Calculations

| Container Size | Master Blend | Epsom Salt | Calcium Nitrate |
| -------------- | ------------ | ---------- | --------------- |
| 500ml (base)   | 120g         | 60g        | 120g            |
| 1 gallon       | 908.60g      | 454.30g    | 908.60g         |
| 5 gallons      | 4,543.00g    | 2,271.50g  | 4,543.00g       |

## 🏗️ Architecture & Performance

### Performance Features

- **⚡ Resumability**: Qwik's innovative approach to hydration for instant interactivity
- **📦 Code Splitting**: Automatic optimization and minimal bundle sizes
- **🎯 Static Generation**: Pre-rendered HTML for optimal loading performance
- **🚀 CDN Delivery**: Fast global content delivery via GitHub Pages

### Security & Validation

- **🔒 Input Validation**: Client-side validation with TypeScript type safety
- **🛡️ Error Handling**: Graceful error handling and user feedback
- **✅ Type Safety**: Full TypeScript coverage for reliability

## 🚀 Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions:

- **Triggers**: Pushes to `main` or `master` branches
- **Build Process**: Automated dependency installation, building, and deployment
- **Live URL**: [https://SergeiGolos.github.io/Hydroponic-concentrate/](https://SergeiGolos.github.io/Hydroponic-concentrate/)

### Manual Deployment

```bash
# Build for production
npm run build

# The built files will be in the dist/ directory
# Deploy the contents to your static hosting provider
```

## 🧪 From Proof of Concept to Production

This application evolved from a simple HTML proof of concept (`poc.html`) into a full-featured, production-ready web application. The transformation included:

- **Modern Framework Migration**: From vanilla JavaScript to Qwik framework
- **Type Safety**: Complete TypeScript integration
- **Enhanced UX**: Improved interface design and user experience
- **Performance Optimization**: Static site generation and code splitting
- **Automated Deployment**: CI/CD pipeline with GitHub Actions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Run tests and linting (`npm run lint && npm run build`)
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**Build fails with dependency errors**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Development server not starting**

- Ensure you're using Node.js 18+
- Check if port 5173 is available
- Try `npm start` instead of `npm run dev`

**TypeScript errors**

```bash
npm run build.types
```

### Getting Help

- 📄 Check the [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed technical documentation
- 🐞 [Open an issue](https://github.com/SergeiGolos/Hydroponic-concentrate/issues) for bugs or feature requests
- 💬 Start a [discussion](https://github.com/SergeiGolos/Hydroponic-concentrate/discussions) for questions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Qwik](https://qwik.dev/) framework
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Based on proven hydroponic Master Blend formulations
- Hosted on [GitHub Pages](https://pages.github.com/)

---

**Ready to grow better plants with precise nutrition?** [Start calculating now!](https://SergeiGolos.github.io/Hydroponic-concentrate/)
