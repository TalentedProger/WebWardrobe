# Virtual Wardrobe Mobile App

## Overview

This is a React-based mobile web application for creating and managing a virtual wardrobe with AI-powered outfit generation capabilities. Users can upload clothing items, create outfits using a visual builder, and generate stylized photos with different backgrounds and environments. The app features a modern mobile-first design with three main sections: wardrobe management, outfit construction, and outfit gallery with AI generation features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Routing**: Wouter for lightweight client-side routing in a single-page application
- **State Management**: TanStack Query (React Query) for server state management and caching, with local React state for UI interactions
- **UI Framework**: Radix UI components with shadcn/ui design system for consistent, accessible components
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Mobile-First Design**: Responsive layout optimized for mobile devices with a maximum width container

### Backend Architecture
- **Server**: Express.js with TypeScript providing RESTful API endpoints
- **Development Setup**: Vite for fast development with hot module replacement and build optimization
- **Middleware**: Custom logging and error handling for API requests

### Data Layer
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Design**: Relational model with tables for users, clothing items, outfits, and body parameters
- **Storage Strategy**: In-memory storage for development with mock data, designed for easy migration to persistent database
- **Data Types**: JSON fields for flexible outfit composition and tagging systems

### Authentication & Authorization
- **Session Management**: Placeholder user system with demo user for development
- **Security**: Prepared for session-based authentication with middleware hooks

### Component Architecture
- **Reusable Components**: Modular clothing item cards, outfit builders, and navigation components
- **State Management**: Local state for UI interactions, server state via React Query
- **Mobile Navigation**: Fixed bottom navigation with route-based active states

## External Dependencies

### Core UI Libraries
- **@radix-ui**: Comprehensive accessible component primitives for modals, dropdowns, navigation, and form controls
- **@tanstack/react-query**: Server state management with caching, background updates, and optimistic updates
- **wouter**: Lightweight routing library for single-page application navigation

### Development Tools
- **Vite**: Build tool and development server with TypeScript and React support
- **Drizzle ORM**: Type-safe database toolkit with schema migrations and query builder
- **@neondatabase/serverless**: PostgreSQL driver optimized for serverless environments

### Database & Storage
- **PostgreSQL**: Primary database for persistent data storage
- **Neon Database**: Serverless PostgreSQL hosting solution

### Styling & Design
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **shadcn/ui**: Pre-built component library built on Radix UI and Tailwind CSS
- **Lucide React**: Modern icon library with consistent design language

### Form Handling
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation for form inputs and API data
- **@hookform/resolvers**: Integration layer between React Hook Form and Zod validation

### Date & Time
- **date-fns**: Modern date utility library for formatting and manipulation

### Development Environment
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution environment for development server