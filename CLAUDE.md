# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 political compass quiz application called "Teste Político 8 Valores" that evaluates users across 8 political values through 70 questions. The app is built with TypeScript, React, and Tailwind CSS.

## Core Architecture

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with dark mode support
- **UI Components**: shadcn/ui components (button, card, progress)
- **Data Layer**: Static data in `src/lib/data.ts` containing questions and political ideologies

### Key Components Structure

- `src/app/` - Next.js app router pages (home, quiz, results, instructions)
- `src/components/` - Reusable React components including shadcn/ui components
- `src/lib/` - Utility functions and static data (questions, ideologies)
- `public/imagens/` - Political value icons and images

### Core Data Models

The app uses four main TypeScript interfaces defined in `src/lib/data.ts`:

- `Question` - Quiz questions with effect scores for 4 political axes (econ, dipl, govt, scty)
- `Ideology` - Political ideologies with stats, descriptions, politicians, and books
- `Politician` - Reference to political figures with name and Wikipedia link
- `Book` - Reference to relevant books with title and link

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Code linting
npm run lint
```

## UI/Styling

- Uses shadcn/ui design system with "new-york" style
- Tailwind CSS with custom color scheme and dark mode
- Path aliases configured: `@/components`, `@/lib`, `@/hooks`
- CSS variables for theming in `src/app/globals.css`

## Application Flow

1. Home page displays 8 political values with icons
2. Instructions page explains the quiz
3. Quiz page presents 70 questions with 5-point agreement scale
4. Results page calculates and displays ideology match with sharing capabilities

## Key Features

- Dark/light theme toggle via ThemeToggleButton
- Result image generation using html2canvas
- Static generation friendly (no external API dependencies)
- Responsive design for mobile and desktop
- Portuguese language interface

## State Management

The application uses React's built-in state management (useState) for quiz progress and results. No external state management library is used.