import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/a-levels")({
  component: ALevelsLayout,
});

function ALevelsLayout() {
  return <Outlet />;
}
