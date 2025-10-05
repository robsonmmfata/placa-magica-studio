import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  tumuloProducts,
  homenagemProducts,
  identificacaoProducts,
} from "@/data/products";
import { Facebook, Instagram, MessageCircle } from "lucide-react"; // ícones
import slide from "../slide.jpg"; // ajuste o caminho se necessário

const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleCustomize = (productId: string) => {
    navigate(`/customize?product=${productId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden h-[300px] sm:h-[400px] md:h-[500px]"
        style={{
          backgroundImage: `url(${slide})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Botões centralizados e responsivos */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 sm:bottom-12 md:bottom-16 flex flex-col sm:flex-row gap-3 sm:gap-4 px-4">
          <Button variant="customize" size="lg" className="w-full sm:w-auto text-sm sm:text-base">
            VER PRODUTOS
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="border-[#193E73] text-[#193E73] hover:bg-background hover:text-primary w-full sm:w-auto text-sm sm:text-base"
            onClick={() => {
              const element = document.getElementById("products-section");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            SAIBA MAIS
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 sm:py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                PAGAMENTO
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">
                INSTANTÂNEO COM PIX
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                PRAZO DE ENTREGA
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">
                3 A 5 DIAS ÚTEIS
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                PARCELE EM ATÉ
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">4X SEM JUROS</div>
            </div>
            <div className="text-center">
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                GRAVAÇÃO A LASER
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">ALTA QUALIDADE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4">
              ESCOLHA SEU MODELO
              <br />
              E FAÇA DO SEU JEITO
            </h2>
          </div>

          <Tabs defaultValue="tumulo" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="tumulo">Placas de Túmulo</TabsTrigger>
              <TabsTrigger value="homenagem">Placas de Homenagem</TabsTrigger>
              <TabsTrigger value="identificacao">
                Placas de Identificação
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tumulo">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tumuloProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    originalPrice={product.originalPrice}
                    currentPrice={product.currentPrice}
                    installmentPrice={product.installmentPrice}
                    image={product.image}
                    onCustomize={() => handleCustomize(product.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="homenagem">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {homenagemProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    originalPrice={product.originalPrice}
                    currentPrice={product.currentPrice}
                    installmentPrice={product.installmentPrice}
                    image={product.image}
                    onCustomize={() => handleCustomize(product.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="identificacao">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {identificacaoProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    originalPrice={product.originalPrice}
                    currentPrice={product.currentPrice}
                    installmentPrice={product.installmentPrice}
                    image={product.image}
                    onCustomize={() => handleCustomize(product.id)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
              Receba nossa Newsletter
            </h3>
            <p className="mb-4 sm:mb-6 opacity-90 text-sm sm:text-base">
              Faça parte de promoções exclusivas, e fique de olho em todas
              novidades da Casa das Placas.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <Input
                placeholder="Seu Nome"
                className="bg-background text-foreground text-sm sm:text-base"
              />
              <Input
                type="email"
                placeholder="Seu Melhor E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background text-foreground text-sm sm:text-base"
              />
              <Button variant="customize" className="text-sm sm:text-base">CADASTRAR</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Floating Buttons */}
      <div className="fixed right-2 sm:right-4 top-1/3 flex flex-col gap-2 sm:gap-4 z-50">
        {[
          {
            href: "https://facebook.com/casadasplacas",
            icon: <Facebook className="w-4 h-4 sm:w-6 sm:h-6" />,
            label: "Nosso Facebook",
            color: "bg-blue-600",
          },
          {
            href: "https://instagram.com/casadasplacas",
            icon: <Instagram className="w-4 h-4 sm:w-6 sm:h-6" />,
            label: "Nosso Instagram",
            color: "bg-pink-500",
          },
          {
            href: "https://wa.me/5527996860022",
            icon: <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6" />,
            label: "Nosso WhatsApp",
            color: "bg-green-500",
          },
        ].map((item, index) => (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item.color} text-white flex items-center gap-2 px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-l-full transform transition-all duration-300 group hover:pl-4 sm:hover:pl-6`}
          >
            {item.icon}
            <span className="hidden group-hover:inline text-xs sm:text-sm font-medium whitespace-nowrap">
              {item.label}
            </span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <footer className="py-8 sm:py-10 md:py-12 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h4 className="font-bold mb-4">Categorias:</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Placas de Túmulo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Placas de Homenagem
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Placas de Identificação
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Produtos:</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Aço Inox Escovado
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Gravação a Laser
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Outros:</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Revenda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Parceria
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contatos:</h4>
              <div className="text-sm space-y-2">
                <div>vendas@casadasplacas.ind.br</div>
                <div>Segunda à Sexta:</div>
                <div>8h às 18h</div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-secondary-foreground/20 mt-6 pt-6 text-center text-xs sm:text-sm">
            <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-2">
              <img
                src="/logo.png"
                alt="Casa das Placas"
                className="h-10 sm:h-12 object-contain"
              />
              <span className="text-xl sm:text-2xl font-bold" style={{ color: "#087BB1" }}>
                Casa das Placas
              </span>
            </div>
            <p className="mt-3 sm:mt-4 px-4">
              COMPRA SEGURA. A Casa das Placas garante segurança em suas
              informações pessoais e financeiras.
            </p>
            <p className="mt-2 px-4">
              Copyright Desde 2016 a 2025. Todos os direitos reservados - Casa
              das Placas
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
