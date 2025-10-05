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
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className="aspect-square mb-3 sm:mb-4 flex items-center justify-center bg-muted rounded-lg">
          <img 
            src={image} 
            alt={title}
            className="max-w-full max-h-full object-contain p-2"
          />
        </div>
        
        <h3 className="font-bold text-primary text-center mb-2 sm:mb-3 text-xs sm:text-sm">
          {title}
        </h3>
        
        <div className="text-center mb-3 sm:mb-4">
          <div className="text-[10px] sm:text-xs text-muted-foreground line-through">
            DE: R$ {originalPrice.toFixed(2)}
          </div>
          <div className="text-base sm:text-lg font-bold text-foreground">
            POR R$ {currentPrice.toFixed(2)}
          </div>
          <div className="text-[10px] sm:text-xs text-muted-foreground">
            OU 4X DE R$ {installmentPrice.toFixed(2)}
          </div>
        </div>
        
        <Button 
          variant="customize" 
          className="w-full text-xs sm:text-sm"
          onClick={onCustomize}
        >
          PERSONALIZE
        </Button>
      </CardContent>
    </Card>
  );
};