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

  const ipfsPattern = /^Qm[a-zA-Z0-9]{44,}$/;
  if (ipfsPattern.test(`Qm${text}`) || ipfsPattern.test(text)) {
    return "file";
  }

  return "text";
}

export function formatError(error?: Error) {
  if (!error?.message) {
    if (typeof error === "object" && (error as any).code === 4001) {
      return undefined;
    }
    error = Object.assign(new Error("Unknown error"), error);
  }
  const message = error?.message;
  if (typeof message === "string") {
    if (
      message.includes("User denied") ||
      message.includes("User rejected") ||
      message.includes("Rejected by user") ||
      // eslint-disable-next-line prettier/prettier
      message.includes("\"Request rejected\"") ||
      message.includes("user rejected transaction") ||
      message.includes("not configured for connector")
    ) {
      return undefined;
    } else if (message.toLowerCase().includes("fee is to low")) {
      return new Error("Transaction fee was to low. Try again.");
    } else if (message === "Network Error" || message === "Failed to fetch ()" || message.includes("noNetwork")) {
      return new Error("Network error. Check your internet connection and try again.");
    }
  }
  return error;
}
