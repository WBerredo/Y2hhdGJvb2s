// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "../components/Home";

const TIME_TO_REFETCH = 1000 * 60 * 60 * 24; // 24 hours

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: TIME_TO_REFETCH,
      cacheTime: TIME_TO_REFETCH,
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.body.appendChild(document.createElement("div"));
  const root = createRoot(container);
  root.render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
});
