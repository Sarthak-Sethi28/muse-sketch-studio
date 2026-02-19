import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import Gallery from "./pages/Gallery";
import Portfolio from "./pages/Portfolio";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/"            element={<Navigate to="/home" replace />} />
          <Route path="/home"        element={<HomePage />} />
          <Route path="/design"      element={<Index />} />
          <Route path="/gallery"     element={<Gallery />} />
          <Route path="/portfolio"   element={<Portfolio />} />
          <Route path="/blog"        element={<BlogPage />} />
          <Route path="/blog/:slug"  element={<BlogPostPage />} />
          <Route path="/about"       element={<AboutPage />} />
          <Route path="*"            element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
