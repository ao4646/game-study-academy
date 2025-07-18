# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Game Study Academy** is a Next.js 15 web application that converts YouTube gaming videos into written articles for efficient learning. The site focuses on Elden Ring: Nightreign content and uses AI-powered article generation from YouTube video content.

**Tech Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, Supabase (PostgreSQL), Anthropic Claude SDK

## Development Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Core Architecture

### Database Schema (Supabase)
- **articles**: Main content with SEO fields, linked to videos and games
- **videos**: YouTube video metadata (video_id, title, description, channel_title, thumbnails)
- **games**: Game information (currently focused on Elden Ring: Nightreign)
- **categories**: Content categorization system

### Key API Endpoints
- `/api/generate-article` - AI-powered article generation from YouTube videos using Claude
- `/api/update-article` - Article content updates
- `/api/youtube/advanced-search` - YouTube video search functionality
- `/api/supabase-test` - Database connectivity testing

### Data Flow
1. YouTube videos are searched and imported via YouTube API
2. Claude AI generates articles from video content
3. Articles are stored in Supabase with comprehensive SEO metadata
4. Frontend displays articles with links back to original YouTube videos

### TypeScript Types
All data models are defined in `/src/types/index.ts`:
- `Article` - Main content entity with SEO fields
- `Video` - YouTube video metadata
- `Game` - Game information
- `ArticleWithRelations` - Joined data for display
- `YouTubeVideoItem` - YouTube API response format

### SEO System
Comprehensive SEO implementation in `/src/lib/metadata.ts`:
- Dynamic metadata generation for all page types
- Structured data (JSON-LD) implementation in `/src/components/StructuredData.tsx`
- Open Graph and Twitter Cards optimization
- Article-specific metadata with video thumbnails and embedded content

### File Structure
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (article generation, YouTube integration)
│   ├── articles/[id]/     # Dynamic article pages
│   ├── categories/[id]/   # Category-filtered articles
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
├── lib/                   # Utilities (metadata helpers)
└── types/                 # TypeScript definitions
```

## Development Notes

### Path Mapping
- `@/*` maps to `./src/*` for clean imports

### Content Strategy
- Gaming-focused content (red/orange theme)
- Creator-friendly approach (drives traffic back to YouTube)
- Japanese content with English tech implementation

### Environment Requirements
- Supabase project with database tables
- Anthropic Claude API key
- YouTube Data API key

### Database Relationships
- Articles belong to Videos and Games
- Videos belong to Games  
- Articles have Categories
- All entities support slug-based URLs for SEO