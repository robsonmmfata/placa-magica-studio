import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, IText, FabricImage, Rect } from "fabric";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface CustomizationCanvasProps {
  size: string;
  onConfigChange: (config: any) => void;
}

export const CustomizationCanvas = ({ size, onConfigChange }: CustomizationCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [text, setText] = useState("THOR");
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [borderType, setBorderType] = useState("straight");

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
      backgroundColor: "#f5f5f5",
    });

    // Add border based on type
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

    addBorder();
    addText();
    canvas.renderAll();

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [size, borderType]);

  useEffect(() => {
    if (!fabricCanvas) return;

    const textObjects = fabricCanvas.getObjects().filter(obj => obj instanceof IText);
    textObjects.forEach(obj => {
      if (obj instanceof IText) {
        obj.set({
          text,
          fill: textColor,
          fontSize,
          fontFamily,
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !fabricCanvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = new Image();
      imgElement.onload = () => {
        FabricImage.fromURL(e.target?.result as string)
          .then((fabricImg) => {
            fabricImg.scale(0.3);
            fabricImg.set({
              left: 50,
              top: 50,
            });
            fabricCanvas.add(fabricImg);
            fabricCanvas.renderAll();
            toast("Imagem adicionada com sucesso!");
          });
      };
      imgElement.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const exportCanvas = () => {
    if (!fabricCanvas) return null;
    return fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1,
    });
  };

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
                <SelectItem value="Arial">Arial</SelectItem>
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
};