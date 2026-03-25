# UI/UX Improvements Plan

## Goal
Improve 4-GUARD WMS UI with: animations, Liquid Glass effect, and dark mode with design tokens

## Phases

### Phase 1: Animations with Framer Motion
- [x] Install @react-spring/web (physics-based animations)
- [x] Create animation components (FadeIn, SlideIn, ScaleIn, StaggerContainer, SpringCard)
- [x] Add View Transition API for page navigation
- [x] Animate KPI cards and dashboard elements
- [x] Add micro-interactions on buttons/cards

### Phase 2: Liquid Glass Effect
- [x] Add CSS variables for glass effect
- [x] Create .liquid-glass and .liquid-glass-enhanced classes
- [x] Apply to header (Shell.tsx)
- [x] Update color palette for glass effect

### Phase 3: Dark Mode with Design Tokens
- [x] Implement 3-layer token architecture (Primitive, Semantic, Component)
- [x] Create semantic tokens (surface, text, interactive)
- [x] Add data-theme="dark" support
- [x] Add ThemeToggle component
- [x] Theme toggle in header

## Current Status
- Phase 1: ✅ complete
- Phase 2: ✅ complete
- Phase 3: ✅ complete
