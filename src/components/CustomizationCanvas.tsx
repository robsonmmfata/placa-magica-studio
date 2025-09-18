import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Canvas as FabricCanvas, IText, FabricImage, Rect } from "fabric";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { removeBackground, loadImage } from "@/utils/backgroundRemoval";
import dogTag from "@/assets/dog-tag.png";
import catTag from "@/assets/cat-tag.png";
import universalTag from "@/assets/universal-tag.png";

interface CustomizationCanvasProps {
  size: string;
  onConfigChange: (config: any) => void;
}

export const CustomizationCanvas = forwardRef<any, CustomizationCanvasProps>(({ size, onConfigChange }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [text, setText] = useState("THOR");
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState("Inter");
  const [borderType, setBorderType] = useState("straight");
  const [backgroundImage, setBackgroundImage] = useState<FabricImage | null>(null);

  // Canvas dimensions based on size
  const getDimensions = (size: string) => {
    switch (size) {
      case "10x20": return { width: 200, height: 100 };
      case "20x30": return { width: 300, height: 200 };
      case "30x40": return { width: 400, height: 300 };
      default: return { width: 300, height: 200 };
    }
  };

  const dimensions = getDimensions(size);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: "#ffffff",
    });

    // Add background plate image
    const addPlateBackground = () => {
      const plateImages = {
        "10x20": dogTag,
        "20x30": catTag, 
        "30x40": universalTag
      };
      
      const plateImage = plateImages[size as keyof typeof plateImages] || catTag;
      
      FabricImage.fromURL(plateImage)
        .then((img) => {
          img.set({
            left: 0,
            top: 0,
            scaleX: dimensions.width / (img.width || 1),
            scaleY: dimensions.height / (img.height || 1),
            selectable: false,
            evented: false,
          });
          canvas.add(img);
          canvas.sendObjectToBack(img);
          setBackgroundImage(img);
          canvas.renderAll();
        })
        .catch(() => {
          // Fallback to border if image fails
          addBorder();
        });
    };

    // Add border based on type (fallback)
    const addBorder = () => {
      let borderRadius = 0;
      if (borderType === "rounded") borderRadius = 10;
      else if (borderType === "double") borderRadius = 5;

      const border = new Rect({
        left: 5,
        top: 5,
        width: dimensions.width - 10,
        height: dimensions.height - 10,
        fill: "transparent",
        stroke: "#333333",
        strokeWidth: borderType === "double" ? 4 : 2,
        rx: borderRadius,
        ry: borderRadius,
        selectable: false,
      });
      canvas.add(border);
    };

    // Add initial text
    const addText = () => {
      const textObj = new IText(text, {
        left: dimensions.width / 2,
        top: dimensions.height / 2,
        fontFamily,
        fontSize,
        fill: textColor,
        textAlign: "center",
        originX: "center",
        originY: "center",
      });
      canvas.add(textObj);
    };

    addPlateBackground();
    addText();
    canvas.renderAll();

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [size]); // Only depend on size, not borderType

  // Handle border type changes without recreating canvas
  useEffect(() => {
    if (!fabricCanvas) return;
    
    // Update existing border or add new one
    const objects = fabricCanvas.getObjects();
    const borderObjects = objects.filter(obj => obj.type === 'rect' && obj.stroke);
    
    // Remove existing borders
    borderObjects.forEach(border => fabricCanvas.remove(border));
    
    // Add new border if no background image
    if (!backgroundImage) {
      let borderRadius = 0;
      if (borderType === "rounded") borderRadius = 10;
      else if (borderType === "double") borderRadius = 5;

      const border = new Rect({
        left: 5,
        top: 5,
        width: dimensions.width - 10,
        height: dimensions.height - 10,
        fill: "transparent",
        stroke: "#333333",
        strokeWidth: borderType === "double" ? 4 : 2,
        rx: borderRadius,
        ry: borderRadius,
        selectable: false,
      });
      fabricCanvas.add(border);
    }
    fabricCanvas.renderAll();
  }, [borderType, fabricCanvas, backgroundImage, dimensions]);

  useEffect(() => {
    if (!fabricCanvas) return;

    // Find and update text objects
    const objects = fabricCanvas.getObjects();
    objects.forEach(obj => {
      if (obj.type === 'i-text' || obj.type === 'text') {
        const textObj = obj as IText;
        textObj.set({
          text: text,
          fill: textColor,
          fontSize: fontSize,
          fontFamily: fontFamily,
        });
      }
    });
    fabricCanvas.renderAll();

    // Update config for parent component
    onConfigChange({
      text,
      textColor,
      fontSize,
      fontFamily,
      borderType,
      size,
    });
  }, [text, textColor, fontSize, fontFamily, fabricCanvas, onConfigChange, borderType, size]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !fabricCanvas) return;

    try {
      toast("Processando imagem e removendo fundo...");
      
      // Load the original image
      const originalImage = await loadImage(file);
      
      try {
        // Remove background
        const processedBlob = await removeBackground(originalImage);
        const processedUrl = URL.createObjectURL(processedBlob);
        
        // Add processed image to canvas
        const fabricImg = await FabricImage.fromURL(processedUrl);
        
        // Scale image to fit nicely on the plate
        const maxSize = Math.min(dimensions.width * 0.4, dimensions.height * 0.4);
        const scale = maxSize / Math.max(fabricImg.width || 1, fabricImg.height || 1);
        
        fabricImg.set({
          left: dimensions.width / 2,
          top: dimensions.height / 2,
          scaleX: scale,
          scaleY: scale,
          originX: "center",
          originY: "center",
        });
        
        fabricCanvas.add(fabricImg);
        fabricCanvas.renderAll();
        toast("Imagem adicionada com fundo removido!");
        
        // Clean up
        URL.revokeObjectURL(processedUrl);
        
      } catch (bgError) {
        console.log("Background removal failed, using original image:", bgError);
        
        // Use original image without background removal
        const originalUrl = URL.createObjectURL(file);
        const fabricImg = await FabricImage.fromURL(originalUrl);
        
        const maxSize = Math.min(dimensions.width * 0.4, dimensions.height * 0.4);
        const scale = maxSize / Math.max(fabricImg.width || 1, fabricImg.height || 1);
        
        fabricImg.set({
          left: dimensions.width / 2,
          top: dimensions.height / 2,
          scaleX: scale,
          scaleY: scale,
          originX: "center",
          originY: "center",
        });
        
        fabricCanvas.add(fabricImg);
        fabricCanvas.renderAll();
        toast("Imagem adicionada! (Remoção de fundo não disponível)");
        
        // Clean up
        URL.revokeObjectURL(originalUrl);
      }
        
    } catch (error) {
      console.error("Error processing image:", error);
      toast("Erro ao processar imagem");
    }
  };

  const exportCanvas = () => {
    if (!fabricCanvas) return null;
    return fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1,
    });
  };

  useImperativeHandle(ref, () => ({
    exportCanvas
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Canvas Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Pré-visualização da Placa ({size}cm)</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="border border-border rounded-lg p-4 bg-background">
            <canvas ref={canvasRef} className="border border-muted rounded" />
          </div>
        </CardContent>
      </Card>

      {/* Customization Options */}
      <Card>
        <CardHeader>
          <CardTitle>Opções de Personalização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="text">Texto da Placa</Label>
            <Input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite o texto aqui"
            />
          </div>

          <div>
            <Label htmlFor="font">Fonte</Label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
                <SelectContent>
                <SelectItem value="Inter">Inter (Moderno)</SelectItem>
                <SelectItem value="Playfair Display">Playfair Display (Elegante)</SelectItem>
                <SelectItem value="Poppins">Poppins (Amigável)</SelectItem>
                <SelectItem value="Roboto">Roboto (Clássico)</SelectItem>
                <SelectItem value="Open Sans">Open Sans (Limpo)</SelectItem>
                <SelectItem value="Lato">Lato (Humanista)</SelectItem>
                <SelectItem value="Montserrat">Montserrat (Geométrico)</SelectItem>
                <SelectItem value="Nunito">Nunito (Arredondado)</SelectItem>
                <SelectItem value="Source Sans Pro">Source Sans Pro (Profissional)</SelectItem>
                <SelectItem value="Raleway">Raleway (Fino)</SelectItem>
                <SelectItem value="Ubuntu">Ubuntu (Contemporâneo)</SelectItem>
                <SelectItem value="Crimson Text">Crimson Text (Serif)</SelectItem>
                <SelectItem value="Merriweather">Merriweather (Leitura)</SelectItem>
                <SelectItem value="Oswald">Oswald (Condensado)</SelectItem>
                <SelectItem value="Dancing Script">Dancing Script (Cursiva)</SelectItem>
                <SelectItem value="Arial">Arial (Padrão)</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Helvetica">Helvetica</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fontSize">Tamanho da Fonte</Label>
            <Input
              id="fontSize"
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              min="10"
              max="50"
            />
          </div>

          <div>
            <Label htmlFor="textColor">Cor do Texto</Label>
            <Input
              id="textColor"
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="border">Tipo de Borda</Label>
            <Select value={borderType} onValueChange={setBorderType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="straight">Reta</SelectItem>
                <SelectItem value="rounded">Arredondada</SelectItem>
                <SelectItem value="double">Dupla</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="image">Upload de Imagem</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="cursor-pointer"
            />
          </div>

          <Button 
            onClick={() => {
              const dataURL = exportCanvas();
              if (dataURL) {
                toast("Preview gerado com sucesso!");
              }
            }}
            className="w-full"
            variant="outline"
          >
            Gerar Preview
          </Button>
        </CardContent>
      </Card>
    </div>
  );
});