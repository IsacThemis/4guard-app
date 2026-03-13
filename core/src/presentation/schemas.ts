import { z } from 'zod';

/**
 * TITAN Shield: Input Validation Schemas
 * Uses .safeParse() so callers receive structured errors instead of thrown exceptions.
 */

export const HealthCheckSchema = z.object({});

export const RememberSchema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string().min(1, "Value is required")
});

export const RecallSchema = z.object({
  key: z.string().min(1, "Key is required")
});

export const CompareBlueprintSchema = z.object({
  blueprint_name: z.string().min(1, "Blueprint name is required")
});

// ── Safe parse helpers ─────────────────────────────────────────────────────
// Returns { success, data } | { success: false, error } — never throws.

export function safeParseRemember(args: unknown) {
  return RememberSchema.safeParse(args);
}

export function safeParseRecall(args: unknown) {
  return RecallSchema.safeParse(args);
}

export function safeParseCompareBlueprint(args: unknown) {
  return CompareBlueprintSchema.safeParse(args);
}
