import { CID } from "multiformats/cid";
import type { LinkType } from "@/store/links";

export function shortenAddress(address: string, chars = 3): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-3)}`;
}

export function getByteLength(str: string) {
  const encoder = new TextEncoder();
  return encoder.encode(str).length;
}

export function textToType(text: string): LinkType {
  try {
    // Will throw an error if not a valid URL
    const url = new URL(text);
    if (url.href) return "url";
  } catch {
    // ignore
  }

  try {
    // Will throw an error if not a valid CID
    CID.parse(text);
    return "file";
  } catch {
    // ignore
  }

  return "text";
}

export function getTransactionErrorMessage(error: any) {
  if (error?.body) {
    try {
      const errorBody = JSON.parse(error.body);
      if (errorBody?.error?.message) {
        return errorBody.error.message;
      }
    } catch {
      // ignore
    }
  }
}
