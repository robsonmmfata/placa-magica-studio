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
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Produtos
          </Button>
          <div className="text-sm text-muted-foreground">
            Home &gt; Produtos &gt; {selectedProduct.type === 'tumulo' ? 'Túmulo' : selectedProduct.type === 'homenagem' ? 'Homenagem' : 'Identificação'} &gt; Personalização
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            PERSONALIZE SUA PLACA
          </h1>
          <p className="text-muted-foreground">
            {selectedProduct.title}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
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
        <div className="mt-8 flex justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    R$ {selectedProduct.currentPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ou 4x de R$ {selectedProduct.installmentPrice.toFixed(2)} sem juros
                  </div>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  className="w-full"
                  variant="customize"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  ADICIONAR AO CARRINHO
                </Button>
                
                <div className="text-xs text-center text-muted-foreground">
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