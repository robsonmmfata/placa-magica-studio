import { useNavigate } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  tumuloProducts,
  homenagemProducts,
  identificacaoProducts,
} from "@/data/products";

export const ProductsSection = () => {
  const navigate = useNavigate();

  const handleCustomize = (productId: string) => {
    navigate(`/customize?product=${productId}`);
  };

  return (
    <section id="products-section" className="py-8 sm:py-12 md:py-16">
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
            <TabsTrigger value="tumulo" className="text-xs sm:text-sm">
              Placas de Túmulo
            </TabsTrigger>
            <TabsTrigger value="homenagem" className="text-xs sm:text-sm">
              Placas de Homenagem
            </TabsTrigger>
            <TabsTrigger value="identificacao" className="text-xs sm:text-sm">
              Placas de Identificação
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tumulo">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
  );
};
