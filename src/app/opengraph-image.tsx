import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Harsh Gajjar, Forward Deployed Engineer building automation workflows and AI agents";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Forward Deployed Engineer",
    title: "Harsh Gajjar",
    subtitle: "Building automation workflows and AI agents on real production data.",
  });
}
