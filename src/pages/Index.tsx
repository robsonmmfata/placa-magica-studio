import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dogTag from "@/assets/dog-tag.png";
import catTag from "@/assets/cat-tag.png";
import universalTag from "@/assets/universal-tag.png";

const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const products = [
    {
      id: 1,
      title: "PLACA IDENTIFICADORA PARA CÃES EM AÇO INOX",
      originalPrice: 75.00,
      currentPrice: 55.00,
      installmentPrice: 13.75,
      image: dogTag,
    },
    {
      id: 2,
      title: "PLACA IDENTIFICADORA PARA GATOS EM AÇO INOX", 
      originalPrice: 75.00,
      currentPrice: 55.00,
      installmentPrice: 13.75,
      image: catTag,
    },
    {
      id: 3,
      title: "PLACA IDENTIFICADORA UNIFLEX IDEAL PARA TODOS OS PÚBLICOS EM AÇO INOX",
      originalPrice: 75.00,
      currentPrice: 55.00,
      installmentPrice: 13.75,
      image: universalTag,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-background">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-accent">COM UMA</span><br />
                <span className="text-background">ÚNICA AÇÃO,</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Você garante a proteção do seu pet!
              </p>
              <div className="flex gap-4">
                <Button variant="customize" size="lg">
                  VER PRODUTOS
                </Button>
                <Button variant="outline" size="lg" className="border-background text-background hover:bg-background hover:text-primary">
                  SAIBA MAIS
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="text-center text-background">
                <h2 className="text-3xl font-bold mb-4">
                  Dê para ele uma<br />
                  <span className="text-accent text-5xl">PLAQUINHAFLEX!</span>
                </h2>
                <div className="flex justify-center gap-4 mb-6">
                  <ChevronLeft className="w-8 h-8 text-accent cursor-pointer" />
                  <div className="flex flex-wrap gap-2 justify-center">
                    {/* Placeholder for product images */}
                    <div className="w-24 h-24 bg-background/20 rounded-full"></div>
                    <div className="w-24 h-24 bg-background/20 rounded-full"></div>
                    <div className="w-24 h-24 bg-background/20 rounded-full"></div>
                  </div>
                  <ChevronRight className="w-8 h-8 text-accent cursor-pointer" />
                </div>
                <div className="text-lg font-bold">
                  100% PERSONALIZÁVEL<br />
                  FRETE GRÁTIS PARA TODO O BRASIL
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-sm font-semibold text-foreground">PAGAMENTO</div>
              <div className="text-xs text-muted-foreground">INSTANTÂNEO COM PIX</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-foreground">DOS CORREIOS DIRETO PARA</div>
              <div className="text-xs text-muted-foreground">VOCÊ COM SEDEX E PAC</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-foreground">PARCELE EM ATÉ</div>
              <div className="text-xs text-muted-foreground">4X SEM JUROS</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-foreground">TODAS AS PLAQUINHAS</div>
              <div className="text-xs text-muted-foreground">SÃO GRAVADAS A LASER</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              ESCOLHA SEU MODELO<br />
              E FAÇA DO SEU JEITO
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                originalPrice={product.originalPrice}
                currentPrice={product.currentPrice}
                installmentPrice={product.installmentPrice}
                image={product.image}
                onCustomize={() => navigate("/customize")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Receba nossa Newsletter</h3>
            <p className="mb-6 opacity-90">
              Faça parte de promoções exclusivas, e fique de olho em todas novidades da PlaquinhaFlex.
            </p>
            
            <div className="flex gap-4 max-w-md mx-auto">
              <Input
                placeholder="Seu Nome"
                className="bg-background text-foreground"
              />
              <Input
                type="email"
                placeholder="Seu Melhor E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background text-foreground"
              />
              <Button variant="customize">
                CADASTRAR
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Categorias:</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-accent transition-colors">Plaquinhas para Pets</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Plaquinhas:</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-accent transition-colors">Pets</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Outros:</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-accent transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Revenda</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Parceria</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contatos:</h4>
              <div className="text-sm space-y-2">
                <div>atendimento@plaquinhaflex.com.br</div>
                <div>Segunda à Sexta:</div>
                <div>8h às 12h - 13h às 18h</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm">
            <p>COMPRA SEGURA. A PlaquinhaFlex garante segurança em suas informações pessoais e financeiras.</p>
            <p className="mt-2">Copyright 2024. Todos os direitos reservados - 2024</p>
            <p>CNPJ: 34.517.799/0001-00</p>
            <p>(51) 3209-8027</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
