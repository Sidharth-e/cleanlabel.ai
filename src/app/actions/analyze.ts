"use server";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { AnalysisResultSchema, AnalysisResult } from "@/types/analysis";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

const parser = StructuredOutputParser.fromZodSchema(AnalysisResultSchema);

export async function analyzeLabel(formData: FormData): Promise<AnalysisResult> {
  const file = formData.get("file") as File | null;
  const url = formData.get("url") as string | null;
  const text = formData.get("text") as string | null;

  if (!file && !url && !text) {
    throw new Error("No image, URL, or text provided");
  }

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3-flash-preview", // Use flash for speed
    maxOutputTokens: 2048,
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  let message: HumanMessage;

  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    message = new HumanMessage({
      content: [
        {
          type: "text",
          text: `Analyze this nutrition label. Extract the product name and every ingredient. 
          Research obscure chemicals and additives. 
          Score the product on a "Clean Label" scale (0-100) where 100 is perfectly natural.
          Recommend 3-5 100% natural, chemical-free alternatives.
          
          ${parser.getFormatInstructions()}`,
        },
        {
          type: "image_url",
          image_url: `data:${file.type};base64,${base64}`,
        },
      ],
    });
  } else if (url) {
    message = new HumanMessage({
      content: [
        {
          type: "text",
          text: `Fetch and analyze the product at this URL: ${url}. 
          Extract the product name and every ingredient. 
          Research obscure chemicals and additives. 
          Score the product on a "Clean Label" scale (0-100) where 100 is perfectly natural.
          Recommend 3-5 100% natural, chemical-free alternatives.
          
          ${parser.getFormatInstructions()}`,
        },
      ],
    });
  } else {
    message = new HumanMessage({
      content: [
        {
          type: "text",
          text: `Analyze these ingredients: ${text}. 
          Research obscure chemicals and additives. 
          Score the product on a "Clean Label" scale (0-100) where 100 is perfectly natural.
          Recommend 3-5 100% natural, chemical-free alternatives.
          
          ${parser.getFormatInstructions()}`,
        },
      ],
    });
  }

  const response = await model.invoke([message]);
  const parsed = await parser.parse(response.content as string);

  return parsed;
}
