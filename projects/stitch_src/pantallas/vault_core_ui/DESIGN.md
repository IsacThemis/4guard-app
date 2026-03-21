# Design System Documentation

## 1. Overview & Creative North Star: "Architectural Fortitude"

This design system is engineered to embody the concept of **The Vault**. In a high-stakes Warehouse Management System (WMS) environment, data—SSCCs, lot numbers, and inventory levels—is the most valuable asset. This system treats the interface not as a web page, but as a high-precision industrial instrument.

The Creative North Star is **Architectural Fortitude**. We move away from the "airy" feel of generic SaaS and toward a monolithic, structured, and authoritative aesthetic. We achieve this through:
*   **Intentional Asymmetry:** Breaking the traditional grid to lead the eye toward critical saturation gauges.
*   **High-Contrast Utility:** Using the deep Naval Blue of structural navigation to frame the "Paper White" data cards, mimicking the clarity of technical blueprints.
*   **Editorial Authority:** Utilizing aggressive typography scales to distinguish between "Management Intelligence" (Large Headlines) and "Operational Data" (Dense, legible alphanumeric strings).

---

## 2. Color Philosophy & Tonal Logic

Color in this system is a tool for orientation and risk management, never decoration.

### Structural Palette
*   **Primary Navigation & Structure:** We use `primary_container` (#1a237e) for the heavy sidebar and top-level structural elements. This creates a psychological "frame" of security around the data.
*   **The Signature Surface:** The canvas uses `surface` (#f7fafc). It is clinical, clean, and professional.

### Status & Criticality
*   **Critical/Alerts:** `secondary` (#bb0112) is used sparingly but aggressively. When this color appears, it signifies a hard stop or a critical error in the vault.
*   **Status 20 (Processing):** `tertiary_container` (#532100) / Orange.
*   **Status 30 (Complete):** `on_tertiary_container` (vibrant Green-tinted roles) or custom Green tokens.

### The "No-Line" Rule
To maintain a premium, custom feel, **1px solid borders are prohibited for sectioning.** 
Boundaries must be defined through:
*   **Background Shifts:** A `surface_container_low` section sitting on a `surface` background.
*   **Nesting:** Place a `surface_container_lowest` (Pure White) card inside a `surface_container` area to create a "milled" or "carved" look.

### The "Glass & Gradient" Rule
For floating elements or active navigation states, use a subtle gradient from `primary` (#000666) to `primary_container` (#1a237e). This adds a "visual soul" and depth that prevents the interface from feeling flat and "out-of-the-box."

---

## 3. Typography: Data as the Hero

The system employs a dual-typeface strategy to balance industrial strength with alphanumeric precision.

*   **Headlines & Display (Work Sans):** Used for "Architectural" labels. This font’s wider stance and geometric construction provide the "Vault" with its structural integrity.
    *   *Display-LG:* 3.5rem (High-level warehouse metrics).
    *   *Headline-SM:* 1.5rem (Section titles).
*   **Operational Data (Inter):** Chosen for its exceptional legibility in dense alphanumeric environments (SSCC barcodes, Lot IDs).
    *   **Body-MD:** 0.875rem (Standard table data).
    *   **Label-SM:** 0.6875rem (Uppercase metadata labels).

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are replaced by **Tonal Layering**. We communicate hierarchy by "stacking" surfaces from the provided scale.

*   **The Layering Principle:** 
    *   Level 0 (Base): `surface`
    *   Level 1 (Sections): `surface_container_low`
    *   Level 2 (Active Cards): `surface_container_lowest` (#ffffff)
*   **Ambient Shadows:** For floating elements like the Notification Bell dropdown, use a shadow with a 24px blur and only 6% opacity, tinted with the `on_surface` color.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke, use `outline_variant` at **15% opacity**. Never use a high-contrast 100% opaque border.
*   **Glassmorphism:** Use `surface_bright` with a 12px backdrop-blur for the Topbar to allow the vibrant organizational colors to bleed through subtly as the user scrolls.

---

## 5. Components

### High-Contrast Cards
Cards are the "Vault Drawers" of the system. 
*   **Design:** No borders. Use `surface_container_lowest` against a `surface_container` background. 
*   **Radius:** Use `DEFAULT` (0.25rem) for a sharp, precision-engineered feel.
*   **Separation:** Forbid divider lines. Use `spacing-6` (1.3rem) of vertical white space to separate content blocks.

### Gauges (Saturation)
Gauges represent warehouse capacity. 
*   **Style:** Use a heavy stroke weight. The track uses `surface_container_high`, and the active fill uses a gradient from `tertiary_fixed` to `on_tertiary_container`.

### Data Tables
*   **Header:** `primary_container` with `on_primary` text for maximum authority.
*   **Rows:** Alternating tonal shifts (Zebra striping) using `surface_container_low`. 
*   **Data Density:** Use `spacing-2` (0.4rem) for cell padding to ensure high information density without sacrificing legibility.

### Topbar & Notification Bell
*   **Structure:** Semi-transparent `surface_container_lowest` with backdrop-blur.
*   **Active Notification:** The bell icon utilizes a `secondary` (#bb0112) dot. This is the only place where vibrant red is allowed for non-critical alerts, acting as a beacon of activity.

### Buttons
*   **Primary:** Gradient of `primary` to `primary_container`. No border. Roundedness: `md` (0.375rem).
*   **Secondary:** Ghost style. No background, only a "Ghost Border" (15% opacity `outline`).

---

## 6. Do's and Don'ts

### Do
*   **Do** use `spacing-10` or `spacing-12` for major section margins to create an editorial, "high-end" feel.
*   **Do** treat alphanumeric strings (SSCCs) with `label-md` and increased letter spacing for rapid scanning.
*   **Do** use color-blocking in the sidebar to denote different warehouse zones.

### Don't
*   **Don't** use 1px solid black or grey borders. They break the "Vault" immersion.
*   **Don't** use standard "drop shadows" on cards; stick to the tonal layering of surfaces.
*   **Don't** use the Vibrant Red for anything other than critical blocks or the active notification beacon. It must remain a "high-alarm" color.
*   **Don't** use rounded corners larger than `lg` (0.5rem). Excessively round corners feel "soft" and undermine the industrial nature of the WMS.