import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { CustomizationCanvas, type IdentificacaoEntry } from "@/components/CustomizationCanvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { allProducts, Product } from "@/data/products";

interface CustomizationConfig {
  text: string;
  title: string;
  description: string;
  homageMessage?: string;
  birthDate: string;
  deathDate: string;
  textColor: string;
  fontSize: number;
  fontFamily: string;
  productType: string;
  productId: string;
  identificacaoTitle?: string;
  identificacaoMainPerson1?: IdentificacaoEntry;
  identificacaoMainPerson2?: IdentificacaoEntry;
  identificacaoMainPerson3?: IdentificacaoEntry;
  identificacaoLeftColumn?: IdentificacaoEntry[];
  identificacaoRightColumn?: IdentificacaoEntry[];
  identificacaoFooter?: string;
}

interface CanvasRef {
  exportCanvas: () => string | null;
}

const Customization = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const [currentConfig, setCurrentConfig] = useState<Partial<CustomizationConfig>>({});
  const canvasRef = useRef<CanvasRef>(null);
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  // Get selected product
  const selectedProduct = allProducts.find(p => p.id === productId);
  
  // Redirect if no product found
  useEffect(() => {
    if (!selectedProduct) {
      navigate('/');
      return;
    }
  }, [selectedProduct, navigate]);

  if (!selectedProduct) {
    return null;
  }

  const handleAddToCart = () => {
    // Get canvas snapshot
    const previewImage = canvasRef.current?.exportCanvas?.();
    
    const cartItem = {
      productName: selectedProduct.title,
      size: selectedProduct.size,
      price: selectedProduct.currentPrice,
      quantity: 1,
      customization: currentConfig,
      previewImage: previewImage || undefined
    };

    addItem(cartItem);
    
    toast("Produto adicionado ao carrinho com sucesso!", {
      description: `${selectedProduct.title} - R$ ${selectedProduct.currentPrice.toFixed(2)}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="self-start text-xs sm:text-sm">
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Voltar aos Produtos
          </Button>
          <div className="text-xs sm:text-sm text-muted-foreground">
            Home &gt; Produtos &gt; {selectedProduct.type === 'tumulo' ? 'Túmulo' : selectedProduct.type === 'homenagem' ? 'Homenagem' : 'Identificação'} &gt; Personalização
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2">
            PERSONALIZE SUA PLACA
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {selectedProduct.title}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 px-4">
            {selectedProduct.description}
          </p>
        </div>

        {/* Customization Interface */}
        <CustomizationCanvas 
          ref={canvasRef}
          product={selectedProduct}
          onConfigChange={setCurrentConfig}
        />

        {/* Add to Cart */}
        <div className="mt-6 sm:mt-8 flex justify-center px-3 sm:px-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">
                    R$ {selectedProduct.currentPrice.toFixed(2)}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    ou 4x de R$ {selectedProduct.installmentPrice.toFixed(2)} sem juros
                  </div>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  className="w-full text-sm sm:text-base"
                  variant="customize"
                  size="lg"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  ADICIONAR AO CARRINHO
                </Button>
                
                <div className="text-[10px] sm:text-xs text-center text-muted-foreground">
                  ✓ Frete GRÁTIS para todo o Brasil<br />
                  ✓ Gravação a laser de alta qualidade<br />
                  ✓ Prazo de entrega: 3 a 5 dias úteis
                  {selectedProduct.type === 'homenagem' && <><br />✓ Acompanha estojo aveludado GRÁTIS</>}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Customization;