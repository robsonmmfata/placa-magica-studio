import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Canvas as FabricCanvas, IText, FabricImage, Rect, Circle } from "fabric";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { removeBackground, loadImage } from "@/utils/backgroundRemoval";
import { Product } from "@/data/products";
import placaLisa30x20 from "@/assets/placa-lisa-30x20.png";
import placaLisa35x12 from "@/assets/placa-lisa-35x12.png";
import placaLisa35x12Alt from "@/assets/placa-lisa-35x12-alt.png";

interface CustomizationCanvasProps {
  product: Product;
  onConfigChange: (config: any) => void;
}

export const CustomizationCanvas = forwardRef<any, CustomizationCanvasProps>(({ product, onConfigChange }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [text, setText] = useState(getDefaultText(product));
  const textColor = "#000000";
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState("Inter");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");

  function getDefaultText(product: Product): string {
    switch (product.type) {
      case 'tumulo':
        return "Nome do Falecido";
      case 'homenagem':
        return "Nome ou Título";
      case 'identificacao':
        return "Título da Placa";
      default:
        return "Texto da Placa";
    }
  }

  const getDimensions = (size: string) => {
    const [width, height] = size.split('x').map(Number);
    const scale = Math.min(400 / width, 300 / height);
    return { 
      width: width * scale, 
      height: height * scale 
    };
  };

  const dimensions = getDimensions(product.size);

  const getTemplateImage = () => {
    if (product.type !== 'tumulo') return product.image;
    switch (product.size) {
      case '35x12':
        return placaLisa35x12Alt || placaLisa35x12;
      case '30x20':
      case '35x20':
      case '35x30':
      case '35x50':
        return placaLisa30x20;
      default:
        return placaLisa35x12;
    }
  };

  const buildDatesString = () => {
    const star = '★';
    const cross = '✝';
    const b = birthDate ? birthDate : '';
    const d = deathDate ? deathDate : '';
    if (!b && !d) return '';
    return `${star} ${b}    ${cross} ${d}`.trim();
  };

  const addDecorativeBorder = (canvas: FabricCanvas) => {
    const borderWidth = 3;
    const cornerSize = 15;
    
    // Bordas principais
    const topBorder = new Rect({
      left: borderWidth,
      top: borderWidth,
      width: dimensions.width - (borderWidth * 2),
      height: borderWidth,
      fill: '#333',
      selectable: false,
      evented: false,
    });
    
    const bottomBorder = new Rect({
      left: borderWidth,
      top: dimensions.height - (borderWidth * 2),
      width: dimensions.width - (borderWidth * 2),
      height: borderWidth,
      fill: '#333',
      selectable: false,
      evented: false,
    });
    
    const leftBorder = new Rect({
      left: borderWidth,
      top: borderWidth,
      width: borderWidth,
      height: dimensions.height - (borderWidth * 2),
      fill: '#333',
      selectable: false,
      evented: false,
    });
    
    const rightBorder = new Rect({
      left: dimensions.width - (borderWidth * 2),
      top: borderWidth,
      width: borderWidth,
      height: dimensions.height - (borderWidth * 2),
      fill: '#333',
      selectable: false,
      evented: false,
    });

    // Cantos decorativos
    const corners = [
      { x: cornerSize, y: cornerSize }, // top-left
      { x: dimensions.width - cornerSize, y: cornerSize }, // top-right
      { x: cornerSize, y: dimensions.height - cornerSize }, // bottom-left
      { x: dimensions.width - cornerSize, y: dimensions.height - cornerSize }, // bottom-right
    ];

    corners.forEach((corner, index) => {
      const cornerDecor = new Rect({
        left: corner.x - (cornerSize/2),
        top: corner.y - (cornerSize/2),
        width: cornerSize,
        height: cornerSize,
        fill: 'transparent',
        stroke: '#333',
        strokeWidth: 2,
        angle: 45,
        selectable: false,
        evented: false,
      });
      canvas.add(cornerDecor);
    });

    canvas.add(topBorder, bottomBorder, leftBorder, rightBorder);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: "#f5f5f5",
    });

    FabricImage.fromURL(getTemplateImage())
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
        
        // Adicionar molduras decorativas apenas para placas de túmulo
        if (product.type === 'tumulo') {
          addDecorativeBorder(canvas);
        }
        
        canvas.renderAll();
      });

    const textObj = new IText(text, {
      left: product.type === 'tumulo' ? dimensions.width * 0.6 : dimensions.width / 2,
      top: product.type === 'tumulo' ? dimensions.height * 0.35 : dimensions.height / 2,
      fontFamily,
      fontSize,
      fill: textColor,
      textAlign: "center",
      originX: "center",
      originY: "center",
    });
    (textObj as any).data = { type: 'name' };
    canvas.add(textObj);

    const datesObj = new IText(buildDatesString(), {
      left: product.type === 'tumulo' ? dimensions.width * 0.6 : dimensions.width / 2,
      top: product.type === 'tumulo' ? dimensions.height * 0.65 : Math.min(dimensions.height - 20, (dimensions.height / 2) + (fontSize * 1.2)),
      fontFamily,
      fontSize: Math.max(14, fontSize - 4),
      fill: textColor,
      textAlign: "center",
      originX: "center",
      originY: "center",
    });
    (datesObj as any).data = { type: 'dates' };
    canvas.add(datesObj);
    canvas.renderAll();

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [product]);

  useEffect(() => {
    if (!fabricCanvas) return;

    const objects = fabricCanvas.getObjects();
    objects.forEach(obj => {
      if (obj.type === 'i-text' || obj.type === 'text') {
        const t = obj as IText & { data?: any };
        const dtype = (t as any).data?.type;
        if (dtype === 'name') {
          t.set({ text, fill: textColor, fontSize, fontFamily });
          t.set({ 
            left: product.type === 'tumulo' ? dimensions.width * 0.6 : dimensions.width / 2, 
            top: product.type === 'tumulo' ? dimensions.height * 0.35 : dimensions.height / 2 
          });
        } else if (dtype === 'dates') {
          t.set({ text: buildDatesString(), fill: textColor, fontSize: Math.max(14, fontSize - 4), fontFamily });
          t.set({ 
            left: product.type === 'tumulo' ? dimensions.width * 0.6 : dimensions.width / 2, 
            top: product.type === 'tumulo' ? dimensions.height * 0.65 : Math.min(dimensions.height - 20, (dimensions.height / 2) + (fontSize * 1.2)) 
          });
        }
      }
    });
    fabricCanvas.renderAll();

    onConfigChange({
      text,
      title,
      description,
      birthDate,
      deathDate,
      textColor: "#000000",
      fontSize,
      fontFamily,
      productType: product.type,
      productId: product.id,
    });
  }, [text, title, description, birthDate, deathDate, fontSize, fontFamily, fabricCanvas, onConfigChange, product]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !fabricCanvas) return;

    try {
      toast("Processando imagem...");
      
      const originalImage = await loadImage(file);
      
      try {
        const processedBlob = await removeBackground(originalImage);
        const processedUrl = URL.createObjectURL(processedBlob);
        
        const fabricImg = await FabricImage.fromURL(processedUrl);
        const maxSize = Math.min(dimensions.width * 0.25, dimensions.height * 0.4);
        const scale = maxSize / Math.max(fabricImg.width || 1, fabricImg.height || 1);
        
        // Para placas de túmulo, posicionar à esquerda; para outras, centralizar
        const leftPos = product.type === 'tumulo' ? dimensions.width * 0.25 : dimensions.width * 0.2;
        const topPos = product.type === 'tumulo' ? dimensions.height * 0.5 : dimensions.height * 0.3;
        
        fabricImg.set({
          left: leftPos,
          top: topPos,
          scaleX: scale,
          scaleY: scale,
          originX: "center",
          originY: "center",
          clipPath: product.type === 'tumulo' ? new Circle({
            radius: maxSize / 2,
            originX: 'center',
            originY: 'center',
          }) : undefined,
        });
        
        fabricCanvas.add(fabricImg);
        fabricCanvas.renderAll();
        toast("Foto adicionada!");
        
        URL.revokeObjectURL(processedUrl);
      } catch (bgError) {
        const originalUrl = URL.createObjectURL(file);
        const fabricImg = await FabricImage.fromURL(originalUrl);
        
        const maxSize = Math.min(dimensions.width * 0.25, dimensions.height * 0.4);
        const scale = maxSize / Math.max(fabricImg.width || 1, fabricImg.height || 1);
        
        // Para placas de túmulo, posicionar à esquerda; para outras, centralizar
        const leftPos = product.type === 'tumulo' ? dimensions.width * 0.25 : dimensions.width * 0.2;
        const topPos = product.type === 'tumulo' ? dimensions.height * 0.5 : dimensions.height * 0.3;
        
        fabricImg.set({
          left: leftPos,
          top: topPos,
          scaleX: scale,
          scaleY: scale,
          originX: "center",
          originY: "center",
          clipPath: product.type === 'tumulo' ? new Circle({
            radius: maxSize / 2,
            originX: 'center',
            originY: 'center',
          }) : undefined,
        });
        
        fabricCanvas.add(fabricImg);
        fabricCanvas.renderAll();
        toast("Imagem adicionada!");
        
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
      <Card>
        <CardHeader>
          <CardTitle>Pré-visualização da Placa ({product.size}cm)</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="border border-border rounded-lg p-4 bg-background">
            <canvas ref={canvasRef} className="border border-muted rounded" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Opções de Personalização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {product.type === 'homenagem' && (
            <div>
              <Label htmlFor="title">Título da Homenagem</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Homenagem, Reconhecimento..."
              />
            </div>
          )}

          <div>
            <Label htmlFor="text">
              {product.type === 'tumulo' ? 'Nome do Falecido' : 
               product.type === 'homenagem' ? 'Nome Principal' : 
               'Texto da Placa'}
            </Label>
            <Input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite o nome aqui"
            />
          </div>

          {product.type === 'tumulo' && (
            <>
              <div>
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="DD/MM/AAAA"
                />
              </div>
              
              <div>
                <Label htmlFor="deathDate">Data de Falecimento</Label>
                <Input
                  id="deathDate"
                  value={deathDate}
                  onChange={(e) => setDeathDate(e.target.value)}
                  placeholder="DD/MM/AAAA"
                />
              </div>
            </>
          )}

          {product.type === 'homenagem' && (
            <div>
              <Label htmlFor="description">Descrição da Homenagem</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição detalhada da homenagem..."
                rows={3}
              />
            </div>
          )}

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
                <SelectItem value="Arial">Arial (Padrão)</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
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
            <Label htmlFor="image">Upload de Foto</Label>
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
                const w = window.open();
                if (w) {
                  w.document.write(`<img src="${dataURL}" alt="Preview da placa" style="max-width:100%" />`);
                }
                toast("Preview gerado com sucesso!");
              } else {
                toast("Não foi possível gerar o preview");
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