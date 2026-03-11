import { z } from 'zod';

/**
 * TITAN Shield: Input Validation Schemas
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
