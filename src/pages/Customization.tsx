import { useState } from "react";
import { Header } from "@/components/Header";
import { CustomizationCanvas } from "@/components/CustomizationCanvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const Customization = () => {
  const [selectedSize, setSelectedSize] = useState("20x30");
  const [currentConfig, setCurrentConfig] = useState<any>({});

  const sizes = [
    { value: "10x20", label: "10x20cm - Mini", price: 45.00 },
    { value: "20x30", label: "20x30cm - Padrão", price: 55.00 },
    { value: "30x40", label: "30x40cm - Grande", price: 65.00 },
  ];

  const getCurrentPrice = () => {
    const size = sizes.find(s => s.value === selectedSize);
    return size?.price || 55.00;
  };

  const handleAddToCart = () => {
    const orderData = {
      ...currentConfig,
      size: selectedSize,
      price: getCurrentPrice(),
      timestamp: new Date().toISOString(),
    };

    // In a real app, this would be sent to the backend
    console.log("Order Data:", orderData);
    
    toast("Produto adicionado ao carrinho com sucesso!", {
      description: `Placa ${selectedSize}cm - R$ ${getCurrentPrice().toFixed(2)}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Produtos
          </Button>
          <div className="text-sm text-muted-foreground">
            Home &gt; Pets &gt; Personalização de Placa
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            PERSONALIZE SUA PLAQUINHA
          </h1>
          <p className="text-muted-foreground">
            Configure sua placa de identificação em tempo real
          </p>
        </div>

        {/* Size Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Escolha o Tamanho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sizes.map((size) => (
                <div
                  key={size.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedSize === size.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedSize(size.value)}
                >
                  <div className="text-center">
                    <div className="font-semibold">{size.label}</div>
                    <div className="text-lg font-bold text-primary">
                      R$ {size.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customization Interface */}
        <CustomizationCanvas 
          size={selectedSize}
          onConfigChange={setCurrentConfig}
        />

        {/* Add to Cart */}
        <div className="mt-8 flex justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    R$ {getCurrentPrice().toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ou 4x de R$ {(getCurrentPrice() / 4).toFixed(2)} sem juros
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
                  ✓ Gravação a laser de alta qualidade
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