import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-foreground text-background py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-sm hover:text-accent transition-colors">
            Tenho um Código
          </button>
        </div>
        
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-wider">
            PLAQUINHA<span className="text-accent">FLEX</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="hover:text-accent transition-colors">Sobre</a>
            <a href="#" className="hover:text-accent transition-colors">Revenda</a>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-background hover:text-accent">
              <User className="w-4 h-4" />
              Entrar / Cadastrar
            </Button>
            <Button variant="ghost" size="sm" className="text-background hover:text-accent">
              <ShoppingCart className="w-4 h-4" />
              0 itens
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};