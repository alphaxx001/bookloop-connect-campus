
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import BuyBooks from "./pages/BuyBooks";
import SellBooks from "./pages/SellBooks";
import ContactSeller from "./pages/ContactSeller";
import ViewDetails from "./pages/ViewDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/buy-books" element={<BuyBooks />} />
    <Route path="/sell-books" element={<SellBooks />} />
    <Route path="/contact-seller/:listingId" element={<ContactSeller />} />
    <Route path="/view-details/:listingId" element={<ViewDetails />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <div className="min-h-screen flex w-full">
              <AppRoutes />
              <Toaster />
              <Sonner />
            </div>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
