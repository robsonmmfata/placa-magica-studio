import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  originalPrice: number;
  currentPrice: number;
  installmentPrice: number;
  image: string;
  onCustomize: () => void;
}

export const ProductCard = ({ 
  title, 
  originalPrice, 
  currentPrice, 
  installmentPrice, 
  image, 
  onCustomize 
}: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="aspect-square mb-4 flex items-center justify-center bg-muted rounded-lg">
          <img 
            src={image} 
            alt={title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        
        <h3 className="font-bold text-primary text-center mb-3 text-sm">
          {title}
        </h3>
        
        <div className="text-center mb-4">
          <div className="text-xs text-muted-foreground line-through">
            DE: R$ {originalPrice.toFixed(2)}
          </div>
          <div className="text-lg font-bold text-foreground">
            POR R$ {currentPrice.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground">
            OU 4X DE R$ {installmentPrice.toFixed(2)}
          </div>
        </div>
        
        <Button 
          variant="customize" 
          className="w-full"
          onClick={onCustomize}
        >
          PERSONALIZE
        </Button>
      </CardContent>
    </Card>
  );
};