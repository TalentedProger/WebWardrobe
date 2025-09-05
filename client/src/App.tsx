import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WardrobePage from "@/pages/wardrobe";
import BuilderPage from "@/pages/builder";
import OutfitsPage from "@/pages/outfits";
import AddItemPage from "@/pages/add-item";
import Navigation from "@/components/navigation";

function Router() {
  return (
    <div className="max-w-md mx-auto bg-background shadow-xl min-h-screen relative">
      {/* Status Bar */}
      <div className="bg-background px-6 pt-4 pb-2">
        <div className="flex justify-between items-center text-sm text-foreground">
          <span className="font-medium">9:41</span>
          <div className="flex space-x-1">
            <div className="w-4 h-2 bg-muted rounded-sm"></div>
            <div className="w-6 h-2 bg-foreground rounded-sm"></div>
          </div>
        </div>
      </div>

      <Switch>
        <Route path="/" component={WardrobePage} />
        <Route path="/wardrobe" component={WardrobePage} />
        <Route path="/builder" component={BuilderPage} />
        <Route path="/outfits" component={OutfitsPage} />
        <Route path="/add-item" component={AddItemPage} />
      </Switch>

      <Navigation />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
