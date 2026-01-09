# Command Center - Development Roadmap

A modern command center application for organizational workspace management.

## Project Overview

**Tech Stack:**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Zustand (state management)
- next-themes (dark/light mode)
- Lucide React (icons)

**Key Features:**
- Space tiles (Creative, Production, Finance, HR, etc.)
- Apps within each space
- AI Chatbot with mocked responses
- MacBook-style sliding sidebar (calendar, todos, greeting)
- Authentication (mocked)
- Dark/Light theme support

---

## Desktop App / OS-Like Experience

**This webapp should feel like a desktop operating system, not a typical website.**

### Core Principles:
- **Fullscreen-first design**: The app must be presentable in fullscreen mode (F11 or browser fullscreen API)
- **No scrolling on main views**: Content should fit within the viewport; use grids and panels instead of scrolling pages
- **Fixed viewport layout**: Header, sidebar, and content areas should be fixed/sticky with internal scrolling only where needed
- **Immersive experience**: Minimal browser chrome visibility; feels like a native desktop application
- **Window-like interactions**: Modals and panels should feel like OS windows/drawers

### Fullscreen Features:
- **Fullscreen toggle button** in the header (Maximize icon)
- **Auto-hide header option** in fullscreen mode for maximum immersion
- **Presentation mode**: Clean view optimized for demos and presentations
- **ESC key** to exit fullscreen gracefully

### Layout Behavior:
- Use `100vh` / `100dvh` for main container height
- Overflow handling within panels, not page-level scrolling
- Responsive grid system that adapts without breaking the "app" feel
- Status bar / dock-like elements for quick access

### Assets:
- **INVNT Logo**: `/public/INVNT logo.png` (official brand logo)

---

## Development Phases

### Phase 1: Foundation & Core Setup ✅
- [x] Create Next.js project with TypeScript
- [x] Install and configure Tailwind CSS v4
- [x] Install and configure shadcn/ui
- [x] Install essential dependencies (lucide-react, next-themes, zustand)

---

### Phase 2: Theme & Design System ✅
- [x] **2.1** Set up dark/light theme provider with next-themes
- [x] **2.2** Configure CSS variables for both themes in globals.css (INVNT brand colors)
- [x] **2.3** Create theme toggle component
- [x] **2.4** Define color palette (primary, secondary, accent colors)
- [x] **2.5** Set up typography scale and font imports (Geist font family)

---

### Phase 3: Layout & Navigation Structure ✅
- [x] **3.1** Create root layout with theme provider
- [x] **3.2** Create main app shell/container component (fixed viewport, no page scroll)
- [x] **3.3** Create top navigation bar component (fixed header with fullscreen toggle)
- [x] **3.4** Create MacBook-style sliding sidebar (Sheet from right)
  - Transparent blurred background
  - Calendar section with events (mocked)
  - Todo list section (mocked)
  - Time-based greeting ("Good Morning/Afternoon/Evening" + name)
- [x] **3.5** Create fullscreen toggle component with browser Fullscreen API
- [x] **3.6** Implement keyboard shortcuts (Cmd/Ctrl+K for search, ESC for exit, etc.)

---

### Phase 4: Authentication (Mocked) ✅
- [x] **4.1** Create auth types and interfaces
- [x] **4.2** Create mock auth service with simulated delay
- [x] **4.3** Create auth store (Zustand) for user state
- [x] **4.4** Create Login page with form validation
- [x] **4.5** Create Sign Up page with form validation
- [x] **4.6** Create protected route wrapper/middleware
- [x] **4.7** Add logout functionality
- [x] **4.8** Persist auth state (localStorage mock)

---

### Phase 5: Spaces (Main Dashboard) ✅
- [x] **5.1** Define Space and App data types/interfaces
- [x] **5.2** Create mock data for all spaces:
  - Creative
  - Production
  - Finance
  - HR
  - People & Culture
  - Innovation
  - IT
  - AI
  - Offices
  - Design
  - Freelance
  - Digital
  - Wellbeing / Time Office
- [x] **5.3** Create mock data for apps within each space
- [x] **5.4** Create SpaceTile component (clickable card)
- [x] **5.5** Create SpacesGrid component (responsive grid layout)
- [x] **5.6** Create Dashboard page displaying all space tiles
- [x] **5.7** Add icons/illustrations for each space *(icons provided in public/icons/spaces/)*
- [x] **5.8** Add hover effects and animations

---

### Phase 6: Space Detail & Apps View ✅
- [x] **6.1** Create dynamic route for space detail (`/spaces/[slug]`)
- [x] **6.2** Create AppCard component with app icon/logo
- [x] **6.3** Create AppsGrid component for apps within a space
- [x] **6.4** Create Space detail page layout
- [x] **6.5** Add back navigation to dashboard
- [x] **6.6** Configure app data per space:

**Creative Apps:**
- Keynote
- MidJourney
- Leonardo AI
- Google Slides
- Adobe Firefly
- Runway
- Adobe Creative Cloud
- Stable Diffusion
- Figma

**Production Apps:**
- Sketch Up
- AutoCAD
- Event CAD
- VectorWorks

**Finance Apps:**
- Xero
- NetSuite
- SAP Concur
- ProCim

**HR Apps:**
- Easy Llama
- FAQ (replaces Zen Desk)
- Handbook

- [x] **6.7** Add app icons/logos *(icons provided in public/icons/apps/)*
- [x] **6.8** Add click handlers for apps (can open external links or show modal)
- [x] **6.9** Add search/filter functionality for apps

---

### Phase 7: AI Chatbot ✅
- [x] **7.1** Create chatbot types/interfaces
- [x] **7.2** Create mock chatbot responses database (INVNT knowledge base)
- [x] **7.3** Create mock AI service with pattern matching
- [x] **7.4** Create chat store (Zustand) for conversation state
- [x] **7.5** Create ChatMessage component
- [x] **7.6** Create ChatInput component
- [x] **7.7** Create ChatWindow component (floating/modal)
- [x] **7.8** Create ChatToggle button (floating action button)
- [x] **7.9** Add typing indicator animation
- [x] **7.10** Add message history persistence (session storage)

---

### Phase 8: Sidebar Features ✅
- [x] **8.1** Create Calendar component with mock events
- [x] **8.2** Create event types and mock event data
- [x] **8.3** Create TodoList component
- [x] **8.4** Create todo types and mock todo data
- [x] **8.5** Add todo CRUD operations (add, toggle, delete)
- [x] **8.6** Create time-based greeting logic
- [x] **8.7** Create UserGreeting component
- [x] **8.8** Style sidebar with glassmorphism effect
- [x] **8.9** Add smooth slide-in animation

---

### Phase 8.5: Screensaver Mode ✅
- [x] **8.5.1** Install React Three Fiber and Three.js
- [x] **8.5.2** Create idle detection hook with configurable timeout (2 min default)
- [x] **8.5.3** Create screensaver store for state management
- [x] **8.5.4** Create 3D Earth component with:
  - Accurate rotation speed
  - Day/night illumination based on real sun position
  - NASA Blue Marble and Black Marble textures (via CDN)
  - Custom shader for day/night terminator transition
- [x] **8.5.5** Create screensaver overlay with:
  - Time-based greeting with user name
  - Location display (auto-detected from timezone)
  - Real-time date and time (24h format)
  - Smooth fade in/out transitions
- [x] **8.5.6** Add sidebar panel with:
  - Today's schedule (calendar events)
  - Tasks list with priority indicators
  - Glassmorphism styling
  - Scrollable sections
- [x] **8.5.7** Add floating elements:
  - INVNT logo (bottom-left with subtle animation)
  - Bowie Badger orbiting the Earth
  - Starfield background
- [x] **8.5.8** Add screensaver trigger button in header
- [x] **8.5.9** Add keyboard shortcut (Cmd/Ctrl+Shift+S) for manual activation
- [x] **8.5.10** Auto-dismiss on click/keypress (mouse movement allowed)

---

### Phase 9: Data Analytics Section ✅
- [x] **9.1** Create Data section/page accessible from main navigation
- [x] **9.2** Define data types and interfaces for analytics
- [x] **9.3** Create mock analytics data:
  - Total number of attendees
  - Average attendee engagement score
  - Attendees by company industry breakdown
  - Attendees by seniority level distribution
  - Company dwell time vs sentiment score (scatter plot)
- [x] **9.4** Create analytics chart components (following theme colors):
  - **Summary Cards**: Total attendees & avg engagement score (big numbers with trend indicators)
  - **Bar/Pie Chart**: Attendees by company industry
  - **Bar/Pie Chart**: Attendees by seniority level
  - **Scatter Plot**: Company dwell time vs sentiment score
    - X-axis: Sentiment score (1-100)
    - Y-axis: Dwell time
    - Bubble size: Number of employees (up to 10k)
- [x] **9.5** Install and configure charting library (Recharts or similar)
- [x] **9.6** Style charts with theme-aware colors:
  - Primary purple (`#8B5CF6`, `#7C3AED`) for main data
  - Accent colors for different segments
  - Dark/light mode support
  - Glassmorphism card containers
- [x] **9.7** Create DataGrid layout for dashboard view
- [x] **9.8** Add Data preview panel to screensaver:
  - Key metrics summary (attendees, engagement)
  - Mini chart/sparkline visualization
  - Glassmorphism styling matching sidebar
- [x] **9.9** Add hover interactions and tooltips on charts
- [x] **9.10** Add Data tile to main spaces or header navigation

---

### Phase 10: Polish & UX Enhancements
- [ ] **9.3** Add page transitions/animations
- [ ] **9.5** Add keyboard navigation support
- [ ] **9.6** Add empty states for lists
- [ ] **9.8** Add subtle micro-interactions

---

## Folder Structure (Proposed)

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Main dashboard with spaces
│   │   └── spaces/
│   │       └── [slug]/
│   │           └── page.tsx            # Space detail with apps
│   ├── globals.css
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # Redirect to login or dashboard
├── components/
│   ├── ui/                             # shadcn components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── AppShell.tsx
│   ├── spaces/
│   │   ├── SpaceTile.tsx
│   │   └── SpacesGrid.tsx
│   ├── apps/
│   │   ├── AppCard.tsx
│   │   └── AppsGrid.tsx
│   ├── chat/
│   │   ├── ChatWindow.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   └── ChatToggle.tsx
│   ├── sidebar/
│   │   ├── CalendarSection.tsx
│   │   ├── TodoSection.tsx
│   │   └── UserGreeting.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   └── shared/
│       ├── ThemeToggle.tsx
│       └── LoadingSpinner.tsx
├── lib/
│   ├── utils.ts
│   └── constants.ts
├── data/
│   ├── spaces.ts                       # Mock spaces data
│   ├── apps.ts                         # Mock apps data
│   ├── events.ts                       # Mock calendar events
│   ├── todos.ts                        # Mock todos
│   └── chatResponses.ts                # Mock AI responses
├── services/
│   ├── auth.ts                         # Mock auth service
│   └── chat.ts                         # Mock chat service
├── stores/
│   ├── authStore.ts
│   ├── chatStore.ts
│   └── sidebarStore.ts
├── types/
│   ├── space.ts
│   ├── app.ts
│   ├── user.ts
│   ├── event.ts
│   ├── todo.ts
│   └── chat.ts
└── hooks/
    ├── useAuth.ts
    ├── useGreeting.ts
    └── useChat.ts
```

---

## Mock Data Strategy

All data will be structured to easily swap with real API calls later:

1. **Services Layer**: Each mock service returns promises with simulated delays
2. **Type Definitions**: Strict TypeScript interfaces for all data
3. **Store Pattern**: Zustand stores with async actions ready for API integration
4. **Environment Variables**: Placeholder for API keys and endpoints

---

## Design Notes

### Color Scheme (INVNT Brand)

Based on the INVNT logo featuring a 3D metallic purple triangle with glowing edges on black.

#### Dark Theme (Primary)
- **Background**: Deep black (`#000000`, `#0a0a0a`)
- **Surface/Cards**: Dark charcoal (`#111111`, `#1a1a1a`)
- **Primary Purple**: Rich violet (`#8B5CF6`, `#7C3AED`)
- **Accent Glow**: Bright magenta/purple (`#A855F7`, `#C084FC`)
- **Neon Highlight**: Electric purple (`#D946EF`, `#E879F9`)
- **Text Primary**: White (`#FFFFFF`, `#FAFAFA`)
- **Text Secondary**: Muted gray (`#A1A1AA`, `#71717A`)
- **Border**: Subtle purple tint (`rgba(139, 92, 246, 0.2)`)

#### Light Theme
- **Background**: Off-white (`#FAFAFA`, `#F5F5F5`)
- **Surface/Cards**: White (`#FFFFFF`)
- **Primary Purple**: Deep violet (`#7C3AED`, `#6D28D9`)
- **Accent**: Vivid purple (`#8B5CF6`)
- **Text Primary**: Near black (`#18181B`, `#09090B`)
- **Text Secondary**: Gray (`#52525B`, `#71717A`)
- **Border**: Light purple tint (`rgba(124, 58, 237, 0.15)`)

#### Semantic Colors
- **Success**: Emerald (`#10B981`)
- **Warning**: Amber (`#F59E0B`)
- **Error/Destructive**: Rose (`#F43F5E`)
- **Info**: Sky blue (`#0EA5E9`)

#### Gradient Accents
- **Primary Gradient**: `linear-gradient(135deg, #7C3AED, #A855F7, #D946EF)`
- **Glow Effect**: `box-shadow: 0 0 20px rgba(168, 85, 247, 0.4)`

### Typography
- Modern sans-serif (e.g., Inter, Geist, or similar)
- Clear hierarchy with distinct heading sizes

### Visual Style
- Glassmorphism for overlays/sidebar with purple tint
- Purple glow effects on interactive elements
- Subtle shadows and depth
- Smooth animations (150-300ms)
- Rounded corners (modern feel)
- Consistent spacing (8px grid)
- Dark mode as default (matches brand aesthetic)

### Assets (To Be Provided)
- **Space Icons**: Custom icons for each of the 13 spaces (Creative, Production, Finance, HR, etc.)
- **App Icons/Logos**: Icons for all apps within each space (Figma, AutoCAD, Xero, etc.)
- Placeholder icons will be used during development until custom assets are provided
