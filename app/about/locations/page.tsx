import { redirect } from "next/navigation";

/** The canonical locations hub is /locations; this legacy path defers to it. */
export default function AboutLocationsPage() {
  redirect("/locations");
}
