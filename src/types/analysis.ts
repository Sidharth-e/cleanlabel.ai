import { z } from "zod";

export const IngredientSchema = z.object({
  name: z.string(),
  type: z.enum(["natural", "chemical", "unknown"]),
  description: z.string(),
  riskLevel: z.enum(["safe", "low", "medium", "high"]),
});

export const AlternativeSchema = z.object({
  name: z.string(),
  description: z.string(),
  link: z.string().optional(),
});

export const AnalysisResultSchema = z.object({
  productName: z.string(),
  ingredients: z.array(IngredientSchema),
  score: z.number().min(0).max(100),
  summary: z.string(),
  alternatives: z.array(AlternativeSchema),
});

export type Ingredient = z.infer<typeof IngredientSchema>;
export type Alternative = z.infer<typeof AlternativeSchema>;
export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
