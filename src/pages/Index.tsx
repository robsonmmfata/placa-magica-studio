import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tumuloProducts, homenagemProducts, identificacaoProducts } from "@/data/products";

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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-background">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-accent">CASA DAS</span><br />
                <span className="text-background">PLACAS</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Placas de identificação, túmulo e homenagem em aço inox
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
                  Personalize sua<br />
                  <span className="text-accent text-5xl">PLACA!</span>
                </h2>
                <div className="flex justify-center gap-4 mb-6">
                  <ChevronLeft className="w-8 h-8 text-accent cursor-pointer" />
                  <div className="flex flex-wrap gap-2 justify-center">
                    {/* Placeholder for product images */}
                    <div className="w-24 h-24 bg-background/20 rounded-lg"></div>
                    <div className="w-24 h-24 bg-background/20 rounded-lg"></div>
                    <div className="w-24 h-24 bg-background/20 rounded-lg"></div>
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
              <div className="text-sm font-semibold text-foreground">PRAZO DE ENTREGA</div>
              <div className="text-xs text-muted-foreground">3 A 5 DIAS ÚTEIS</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-foreground">PARCELE EM ATÉ</div>
              <div className="text-xs text-muted-foreground">4X SEM JUROS</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-foreground">GRAVAÇÃO A LASER</div>
              <div className="text-xs text-muted-foreground">ALTA QUALIDADE</div>
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
          
          <Tabs defaultValue="tumulo" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="tumulo">Placas de Túmulo</TabsTrigger>
              <TabsTrigger value="homenagem">Placas de Homenagem</TabsTrigger>
              <TabsTrigger value="identificacao">Placas de Identificação</TabsTrigger>
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
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Receba nossa Newsletter</h3>
            <p className="mb-6 opacity-90">
              Faça parte de promoções exclusivas, e fique de olho em todas novidades da Casa das Placas.
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
<footer className="py-12 bg-secondary text-secondary-foreground">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h4 className="font-bold mb-4">Categorias:</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-accent transition-colors">Placas de Túmulo</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">Placas de Homenagem</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">Placas de Identificação</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold mb-4">Produtos:</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-accent transition-colors">Aço Inox Escovado</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">Gravação a Laser</a></li>
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
          <div>vendas@casadasplacas.ind.br</div>
          <div>Segunda à Sexta:</div>
          <div>8h às 18h</div>
        </div>
      </div>
    </div>
    
    

    {/* Copyright */}
    <div className="border-t border-secondary-foreground/20 mt-6 pt-6 text-center text-sm">
    {/* Logo centralizada */}
    <div className="mt-8 flex justify-center">
      <img 
        src="/logo.png" 
        alt="Casa das Placas" 
        className="h-12 object-contain"
      />
      <span className="text-2xl font-bold" style={{ color: "#087BB1" }}>
        Casa das Placas
      </span>
    </div>
      <p>COMPRA SEGURA. A Casa das Placas garante segurança em suas informações pessoais e financeiras.</p>
      <p className="mt-2">Copyright Desde 2016 a 2025. Todos os direitos reservados - Casa das Placas</p>
    </div>
  </div>
</footer>


    </div>
  );
};

export default Index;
