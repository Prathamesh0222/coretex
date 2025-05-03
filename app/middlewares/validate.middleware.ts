import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";

/**
 *
 * @param schema Zod Schema for validation
 * @returns A higher order function that wraps the API handler
 */

export const validate =
  <T>(schema: ZodSchema<T>) =>
  (
    handler: (
      req: NextRequest,
      context: { validatedData: T }
    ) => Promise<NextResponse>
  ) =>
  async (req: NextRequest) => {
    try {
      const data = await req.json();
      const parsedData = await schema.safeParseAsync(data);
      if (!parsedData.success) {
        return NextResponse.json({
          error: parsedData.error.errors,
          message: "Validation Failed",
          status: 400,
        });
      }

      return handler(req, { validatedData: parsedData.data });
    } catch (error) {
      console.error("Validation middleware error:", error);
      return NextResponse.json(
        { message: "Something went wrong", error },
        { status: 500 }
      );
    }
  };
