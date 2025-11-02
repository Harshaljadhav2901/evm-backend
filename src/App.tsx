import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom"; // ⬅️ CHANGED
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter> {/* ⬅️ CHANGED */}
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Keep your custom routes here */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter> {/* ⬅️ CHANGED */}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
