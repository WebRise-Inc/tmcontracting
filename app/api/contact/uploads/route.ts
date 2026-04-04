import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextRequest, NextResponse } from "next/server"

import {
  CAREER_UPLOAD_LIMITS,
  QUOTE_UPLOAD_LIMITS,
  getCareerAllowedContentTypes,
  getQuoteAllowedContentTypes,
  isCareerUploadField,
  isQuoteUploadField,
  type ContactUploadPayload,
} from "@/lib/contact-file-upload"

function parseUploadPayload(clientPayload: string | null): ContactUploadPayload {
  if (!clientPayload) {
    throw new Error("Missing upload payload")
  }

  const payload = JSON.parse(clientPayload) as unknown

  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid upload payload")
  }

  const { kind, fieldName } = payload as { kind?: unknown; fieldName?: unknown }

  if (kind === "career" && typeof fieldName === "string" && isCareerUploadField(fieldName)) {
    return { kind, fieldName }
  }

  if (kind === "quote" && typeof fieldName === "string" && isQuoteUploadField(fieldName)) {
    return { kind, fieldName }
  }

  throw new Error("Unsupported upload payload")
}

function validateUploadPathname(pathname: string, payload: ContactUploadPayload) {
  const expectedPrefix = payload.kind === "career" ? "careers/" : "quotes/"

  if (!pathname.startsWith(expectedPrefix)) {
    throw new Error("Invalid upload pathname")
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as HandleUploadBody

    const jsonResponse = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const payload = parseUploadPayload(clientPayload)

        validateUploadPathname(pathname, payload)

        if (payload.kind === "career") {
          return {
            allowedContentTypes: getCareerAllowedContentTypes(payload.fieldName),
            maximumSizeInBytes: CAREER_UPLOAD_LIMITS[payload.fieldName],
          }
        }

        return {
          allowedContentTypes: getQuoteAllowedContentTypes(),
          maximumSizeInBytes: QUOTE_UPLOAD_LIMITS[payload.fieldName],
        }
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error("[tm] Contact upload error:", error)
    return NextResponse.json({ error: "Failed to prepare upload" }, { status: 400 })
  }
}
