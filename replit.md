# Kmonitor - Fuel Monitoring Chat Application

## Overview

Kmonitor is a Portuguese-language fuel monitoring chat application that combines AI-powered conversational interfaces with data visualization to help users track and analyze their vehicle fuel consumption. The application features a chat-based interface where users can input fuel data through text or images, receive intelligent analysis, and view comprehensive fuel tracking insights through interactive cards and visualizations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **Build Tool**: Vite for fast development and optimized production builds
- **Design System**: Custom design guidelines focused on utility and clean data visualization

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API endpoints for vehicles, fuel records, and chat messages
- **Storage Interface**: Abstract storage interface (IStorage) with in-memory implementation for development
- **Validation**: Zod schemas for runtime type validation and data integrity
- **Development**: Hot module replacement and middleware logging for development workflow

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **ORM**: Drizzle ORM with schema-first approach for type-safe database operations
- **Schema Management**: Centralized schema definitions in shared directory with auto-generated TypeScript types
- **Development Storage**: In-memory storage implementation for rapid prototyping and testing
- **Migration**: Drizzle Kit for database schema migrations and management

### Authentication and Authorization
- **Current Implementation**: Demo user system with hardcoded user ID for development
- **Session Management**: Connect-pg-simple for PostgreSQL session storage (configured but not actively used)
- **Future-Ready**: Architecture prepared for full authentication implementation with user context

### Design and Styling
- **CSS Framework**: Tailwind CSS with custom configuration and CSS variables for theming
- **Component System**: Modular card-based components for fuel analysis, price comparison, consumption trends, and vehicle statistics
- **Typography**: System font stack with hierarchical text sizing and consistent spacing primitives
- **Color System**: HSL-based color palette with semantic color assignments for different data states
- **Responsive Design**: Mobile-first approach with breakpoint-aware components

### Chat Interface Features
- **Message Types**: Support for text messages, image uploads, and structured data inputs
- **AI Responses**: Contextual responses with embedded data visualization cards
- **Data Visualization**: Interactive cards showing fuel analysis, price comparisons, consumption trends, and vehicle statistics
- **Image Processing**: Support for dashboard image uploads with data extraction capabilities
- **Insights System**: Alert-based insights with color-coded priority levels

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver for cloud database connectivity
- **drizzle-orm** and **drizzle-zod**: Type-safe ORM with Zod integration for schema validation
- **@tanstack/react-query**: Powerful data fetching and caching library for React
- **express**: Fast, unopinionated web framework for Node.js

### UI and Design Dependencies
- **@radix-ui/***: Comprehensive set of low-level UI primitives for accessibility and functionality
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **class-variance-authority**: Utility for creating component variants with consistent styling
- **lucide-react**: Modern icon library with consistent design language

### Development and Build Tools
- **vite**: Next-generation frontend build tool with fast HMR and optimized builds
- **typescript**: Static type checking for enhanced developer experience and code quality
- **@replit/vite-plugin-runtime-error-modal**: Development error handling for Replit environment
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling

### Utility Libraries
- **date-fns**: Modern JavaScript date utility library for date formatting and manipulation
- **clsx** and **tailwind-merge**: Utility functions for conditional and merged CSS class handling
- **nanoid**: Compact URL-safe unique string ID generator for client-side operations

### Form and Validation
- **react-hook-form** and **@hookform/resolvers**: Performant forms library with validation resolvers
- **zod**: TypeScript-first schema validation library integrated throughout the application stack