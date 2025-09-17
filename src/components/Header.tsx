import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <h1 className="text-xl font-bold text-primary">PlaquinhaFlex</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors">Início</a>
            <a href="/customize" className="text-foreground hover:text-primary transition-colors">Personalizar</a>
            <a href="#produtos" className="text-foreground hover:text-primary transition-colors">Produtos</a>
            <a href="#contato" className="text-foreground hover:text-primary transition-colors">Contato</a>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center max-w-md flex-1 mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <User className="w-4 h-4 mr-2" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => navigate("/login")}>
                <User className="w-4 h-4 mr-2" />
                Entrar
              </Button>
            )}
            
            <Button variant="ghost" size="sm" className="relative" onClick={() => navigate("/cart")}>
              <ShoppingCart className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <nav className="flex flex-col space-y-3 pt-4">
              <a href="/" className="text-foreground hover:text-primary transition-colors">Início</a>
              <a href="/customize" className="text-foreground hover:text-primary transition-colors">Personalizar</a>
              <a href="#produtos" className="text-foreground hover:text-primary transition-colors">Produtos</a>
              <a href="#contato" className="text-foreground hover:text-primary transition-colors">Contato</a>
              
              {isAuthenticated ? (
                <div className="pt-2 border-t space-y-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    {user?.name}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")} className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              )}
              
              <div className="lg:hidden pt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar produtos..."
                    className="pl-10 pr-4"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};