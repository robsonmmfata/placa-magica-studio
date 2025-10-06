import { useEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback, useMemo } from "react";
import { Canvas as FabricCanvas, IText, FabricImage, Rect, Circle, Ellipse, Object as FabricObject } from "fabric";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { removeBackground, loadImage } from "@/utils/backgroundRemoval";
import { Product } from "@/data/products";
import placaLisa30x20 from "@/assets/personalizacao/30x20cfoto.jpg";
import placaLisa35x12 from "@/assets/personalizacao/35x12cfoto.jpg";
import placaLisa35x12Alt from "@/assets/personalizacao/35x20cfoto.jpg";
import homenagem15x10 from "@/assets/personalizacao/placahomenagem/homenagem15x10.jpg";
import homenagem18x13 from "@/assets/personalizacao/placahomenagem/homenagem18x13.jpg";
import homenagem20x15 from "@/assets/personalizacao/placahomenagem/homenagem20X15.jpg";
import homenagem24x16 from "@/assets/personalizacao/placahomenagem/homenagem24x16.jpg";
import homenagem30x20 from "@/assets/personalizacao/placahomenagem/homenagem30x20.jpg";
import placaidentificacao40x50 from "@/assets/personalizacao/placaidentificacao/placaidentificacao40x50cm.jpg";

export interface IdentificacaoEntry {
  name: string;
  role: string;
}

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
  // Campos para placa de identificação
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

interface CustomizationCanvasProps {
  product: Product;
  onConfigChange: (config: CustomizationConfig) => void;
}

interface TextObjectData {
  type: string;
}

interface ImageObjectData {
  isUserImage: boolean;
}

type TextWithData = IText & { data: TextObjectData };
type ImageWithData = FabricImage & { data: ImageObjectData };
type ClipWithPositioned = FabricObject & { absolutePositioned: boolean };

export const CustomizationCanvas = forwardRef<CanvasRef, CustomizationCanvasProps>(({ product, onConfigChange }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [text, setText] = useState(getDefaultText(product));
  const textColor = "#000000";
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState("Inter");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [homageMessage, setHomageMessage] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  
  // Estados para placa de identificação
  const [identificacaoTitle, setIdentificacaoTitle] = useState("");
  const [mainPerson1, setMainPerson1] = useState({ name: "", role: "" });
  const [mainPerson2, setMainPerson2] = useState({ name: "", role: "" });
  const [mainPerson3, setMainPerson3] = useState({ name: "", role: "" });
  const [leftColumn, setLeftColumn] = useState<IdentificacaoEntry[]>([
    { name: "", role: "" },
    { name: "", role: "" },
    { name: "", role: "" },
    { name: "", role: "" },
  ]);
  const [rightColumn, setRightColumn] = useState<IdentificacaoEntry[]>([
    { name: "", role: "" },
    { name: "", role: "" },
    { name: "", role: "" },
    { name: "", role: "" },
  ]);
  const [identificacaoFooter, setIdentificacaoFooter] = useState("");

  // Linhas editáveis para placa de identificação
  const [hrThickness, setHrThickness] = useState(2); // espessura da linha horizontal
  const [dividerThickness, setDividerThickness] = useState(2); // espessura da linha central vertical

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
    if (product.type === 'homenagem') {
      switch (product.size) {
        case '15x10':
          return homenagem15x10;
        case '18x13':
          return homenagem18x13;
        case '20x15':
          return homenagem20x15;
        case '24x16':
          return homenagem24x16;
        case '30x20':
          return homenagem30x20;
        default:
          return product.image;
      }
    } else if (product.type === 'tumulo') {
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
    } else if (product.type === 'identificacao') {
      return placaidentificacao40x50;
    } else {
      return product.image;
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

        canvas.renderAll();
      });

    let nameTop = product.type === 'tumulo' ? dimensions.height * 0.35 : dimensions.height / 2;
    let datesTop = product.type === 'tumulo' ? dimensions.height * 0.65 : Math.min(dimensions.height - 20, (dimensions.height / 2) + (fontSize * 1.2));
    let homageTop = dimensions.height * 0.75;

    if (product.type === 'tumulo' && product.size === '35x50') {
      nameTop = dimensions.height * 0.50; // Abaixo da foto menor e mais baixa
      datesTop = dimensions.height * 0.70;
      homageTop = dimensions.height * 0.80;
    }

    const textObj = new IText(text, {
      left: product.type === 'tumulo' ? dimensions.width * 0.6 : dimensions.width / 2,
      top: nameTop,
      fontFamily,
      fontSize,
      fill: textColor,
      textAlign: "center",
      originX: "center",
      originY: "center",
      selectable: true,
      evented: true,
      editable: false,
    });
    (textObj as TextWithData).data = { type: 'name' };
    canvas.add(textObj);

    const datesObj = new IText(buildDatesString(), {
      left: product.type === 'tumulo' ? dimensions.width * 0.6 : dimensions.width / 2,
      top: datesTop,
      fontFamily,
      fontSize: Math.max(14, fontSize - 4),
      fill: textColor,
      textAlign: "center",
      originX: "center",
      originY: "center",
      selectable: true,
      evented: true,
      editable: false,
    });
    (datesObj as TextWithData).data = { type: 'dates' };
    canvas.add(datesObj);

    if (product.type === 'homenagem') {
      // Title
      const titleObj = new IText(title, {
        left: dimensions.width / 2,
        top: dimensions.height * 0.25,
        fontFamily,
        fontSize: fontSize * 0.8,
        fill: textColor,
        textAlign: "center",
        originX: "center",
        originY: "center",
        selectable: true,
        evented: true,
        editable: false,
      });
      (titleObj as TextWithData).data = { type: 'title' };
      canvas.add(titleObj);

      // Description
      const descObj = new IText(description, {
        left: dimensions.width / 2,
        top: dimensions.height * 0.45,
        fontFamily,
        fontSize: fontSize * 0.7,
        fill: textColor,
        textAlign: "center",
        originX: "center",
        originY: "center",
        selectable: true,
        evented: true,
        editable: false,
      });
      (descObj as TextWithData).data = { type: 'description' };
      canvas.add(descObj);

      // Homage Message
      const messageObj = new IText(homageMessage, {
        left: dimensions.width / 2,
        top: dimensions.height * 0.65,
        fontFamily,
        fontSize: fontSize * 0.6,
        fill: textColor,
        textAlign: "center",
        originX: "center",
        originY: "center",
        selectable: true,
        evented: true,
        editable: false,
      });
      (messageObj as TextWithData).data = { type: 'homageMessage' };
      canvas.add(messageObj);
    }

    if (product.type === 'tumulo') {
      // Homage Message for Tumulo
      const tumuloMessageObj = new IText(homageMessage, {
        left: dimensions.width * 0.6,
        top: homageTop,
        fontFamily,
        fontSize: fontSize * 0.5,
        fill: textColor,
        textAlign: "center",
        originX: "center",
        originY: "center",
        selectable: true,
        evented: true,
        editable: false,
      });
      (tumuloMessageObj as TextWithData).data = { type: 'tumuloHomageMessage' };
      canvas.add(tumuloMessageObj);
    }

    // Renderização para placa de identificação
    if (product.type === 'identificacao') {
      const padding = 20;
      const baseSize = fontSize * 0.6;
      const logoAreaHeight = dimensions.height * 0.18; // área reservada para o logo/foto no topo

      // Título principal (abaixo da foto/logo)
      const titleTop = padding + logoAreaHeight + 10;
      const idTitleObj = new IText(identificacaoTitle, {
        left: dimensions.width / 2,
        top: titleTop,
        fontFamily,
        fontSize: baseSize * 1.3,
        fill: textColor,
        textAlign: "center",
        originX: "center",
        originY: "top",
        selectable: true,
        evented: true,
        editable: false,
        fontWeight: "bold",
      });
      (idTitleObj as TextWithData).data = { type: 'identificacaoTitle' };
      canvas.add(idTitleObj);

      // Linha horizontal (HR) editável logo abaixo do título
      const hrTop = titleTop + baseSize * 1.2;
      const hrRect = new Rect({
        left: padding,
        top: hrTop,
        width: dimensions.width - (padding * 2),
        height: hrThickness,
        fill: textColor,
        selectable: false,
        evented: false,
      });
      (hrRect as unknown as { data: { type: string } }).data = { type: 'identHr' };
      canvas.add(hrRect);

      // Posição inicial do conteúdo após o título e a linha horizontal
      const contentStartY = hrTop + hrThickness + 10;

      // Linha vertical divisória editável no meio (começando após o topo do conteúdo)
      const dividerLine = new Rect({
        left: dimensions.width / 2,
        top: contentStartY,
        width: dividerThickness,
        height: dimensions.height - contentStartY - padding,
        fill: textColor,
        selectable: false,
        evented: false,
      });
      (dividerLine as unknown as { data: { type: string } }).data = { type: 'identDivider' };
      canvas.add(dividerLine);

      // Primeiras 3 pessoas principais (topo esquerdo) abaixo da HR
      let currentY = contentStartY;
      [mainPerson1, mainPerson2, mainPerson3].forEach((person, idx) => {
        const personText = new IText(person.name, {
          left: padding + 5,
          top: currentY,
          fontFamily,
          fontSize: baseSize * 1.1,
          fill: textColor,
          textAlign: "left",
          originX: "left",
          originY: "top",
          selectable: true,
          evented: true,
          editable: false,
          fontWeight: "bold",
        });
        (personText as TextWithData).data = { type: `mainPerson${idx + 1}Name` };
        canvas.add(personText);
        currentY += baseSize * 1.3;

        const roleText = new IText(person.role, {
          left: padding + 5,
          top: currentY,
          fontFamily,
          fontSize: baseSize * 0.85,
          fill: textColor,
          textAlign: "left",
          originX: "left",
          originY: "top",
          selectable: true,
          evented: true,
          editable: false,
        });
        (roleText as TextWithData).data = { type: `mainPerson${idx + 1}Role` };
        canvas.add(roleText);
        currentY += baseSize * 1.1 + 5;
      });

      // Duas colunas alinhadas (mesmo Y para começar)
      const leftX = padding + 5;
      const rightX = dimensions.width / 2 + 10;

      let columnsStartY = currentY; // iniciar colunas logo após as pessoas principais

      // Coluna esquerda
      let leftY = columnsStartY;
      leftColumn.forEach((entry, idx) => {
        const nameText = new IText(entry.name, {
          left: leftX,
          top: leftY,
          fontFamily,
          fontSize: baseSize * 0.8,
          fill: textColor,
          textAlign: "left",
          originX: "left",
          originY: "top",
          selectable: true,
          evented: true,
          editable: false,
          fontWeight: "bold",
        });
        (nameText as TextWithData).data = { type: `leftColumn${idx}Name` };
        canvas.add(nameText);

        leftY += baseSize * 0.95;

        const roleText = new IText(entry.role, {
          left: leftX,
          top: leftY,
          fontFamily,
          fontSize: baseSize * 0.65,
          fill: textColor,
          textAlign: "left",
          originX: "left",
          originY: "top",
          selectable: true,
          evented: true,
          editable: false,
        });
        (roleText as TextWithData).data = { type: `leftColumn${idx}Role` };
        canvas.add(roleText);

        leftY += baseSize * 0.85 + 8;
      });

      // Coluna direita (alinhada à esquerda no mesmo Y)
      let rightY = columnsStartY;
      rightColumn.forEach((entry, idx) => {
        const nameText = new IText(entry.name, {
          left: rightX,
          top: rightY,
          fontFamily,
          fontSize: baseSize * 0.8,
          fill: textColor,
          textAlign: "left",
          originX: "left",
          originY: "top",
          selectable: true,
          evented: true,
          editable: false,
          fontWeight: "bold",
        });
        (nameText as TextWithData).data = { type: `rightColumn${idx}Name` };
        canvas.add(nameText);

        rightY += baseSize * 0.95;

        const roleText = new IText(entry.role, {
          left: rightX,
          top: rightY,
          fontFamily,
          fontSize: baseSize * 0.65,
          fill: textColor,
          textAlign: "left",
          originX: "left",
          originY: "top",
          selectable: true,
          evented: true,
          editable: false,
        });
        (roleText as TextWithData).data = { type: `rightColumn${idx}Role` };
        canvas.add(roleText);

        rightY += baseSize * 0.85 + 8;
      });

      // Rodapé
      const footerY = dimensions.height - padding - 20;
      const footerText = new IText(identificacaoFooter, {
        left: dimensions.width / 2,
        top: footerY,
        fontFamily,
        fontSize: baseSize * 0.75,
        fill: textColor,
        textAlign: "center",
        originX: "center",
        originY: "top",
        selectable: true,
        evented: true,
        editable: false,
      });
      (footerText as TextWithData).data = { type: 'identificacaoFooter' };
      canvas.add(footerText);
    }

    canvas.renderAll();

    setFabricCanvas(canvas);

    return () => {
      try {
        if (canvas && canvas.getElement()) {
          // Remove all objects from canvas first
          canvas.clear();
          // Then properly dispose
          canvas.dispose();
        }
      } catch (error) {
        // Silently catch any disposal errors
        console.log('Canvas cleanup completed');
      }
    };
  }, [product]);

  useEffect(() => {
    if (!fabricCanvas) return;

    const padding = 20;
    const baseSize = fontSize * 0.6;
    const logoAreaHeight = dimensions.height * 0.18;
    const titleTop = padding + logoAreaHeight + 10;
    const hrTop = titleTop + baseSize * 1.2;
    const contentStartY = hrTop + hrThickness + 10;
    const objects = fabricCanvas.getObjects();
    objects.forEach(obj => {
      if (obj.type === 'i-text' || obj.type === 'text') {
        const t = obj as TextWithData;
        const dtype = t.data?.type;
        if (dtype === 'name') {
          t.set({ text, fill: textColor, fontSize, fontFamily });
        } else if (dtype === 'dates') {
          t.set({ text: buildDatesString(), fill: textColor, fontSize: Math.max(14, fontSize - 4), fontFamily });
        } else if (product.type === 'homenagem') {
          if (dtype === 'title') {
            t.set({ text: title, fill: textColor, fontSize: fontSize * 0.8, fontFamily });
          } else if (dtype === 'description') {
            t.set({ text: description, fill: textColor, fontSize: fontSize * 0.7, fontFamily });
          } else if (dtype === 'homageMessage') {
            t.set({ text: homageMessage, fill: textColor, fontSize: fontSize * 0.6, fontFamily });
          }
        } else if (product.type === 'tumulo' && dtype === 'tumuloHomageMessage') {
          t.set({ text: homageMessage, fill: textColor, fontSize: fontSize * 0.5, fontFamily });
        } else if (product.type === 'identificacao') {
          const baseSize = fontSize * 0.6;
          if (dtype === 'identificacaoTitle') {
            t.set({ text: identificacaoTitle, fill: textColor, fontSize: baseSize * 1.3, fontFamily });
          } else if (dtype === 'mainPerson1Name') {
            t.set({ text: mainPerson1.name, fill: textColor, fontSize: baseSize * 1.1, fontFamily });
          } else if (dtype === 'mainPerson1Role') {
            t.set({ text: mainPerson1.role, fill: textColor, fontSize: baseSize * 0.85, fontFamily });
          } else if (dtype === 'mainPerson2Name') {
            t.set({ text: mainPerson2.name, fill: textColor, fontSize: baseSize * 1.1, fontFamily });
          } else if (dtype === 'mainPerson2Role') {
            t.set({ text: mainPerson2.role, fill: textColor, fontSize: baseSize * 0.85, fontFamily });
          } else if (dtype === 'mainPerson3Name') {
            t.set({ text: mainPerson3.name, fill: textColor, fontSize: baseSize * 1.1, fontFamily });
          } else if (dtype === 'mainPerson3Role') {
            t.set({ text: mainPerson3.role, fill: textColor, fontSize: baseSize * 0.85, fontFamily });
          } else if (dtype?.startsWith('leftColumn')) {
            const match = dtype.match(/^leftColumn(\d+)(Name|Role)$/);
            const idx = match ? parseInt(match[1], 10) : -1;
            if (idx >= 0) {
              if (match?.[2] === 'Name') {
                t.set({ text: leftColumn[idx]?.name || '', fill: textColor, fontSize: baseSize * 0.8, fontFamily });
              } else {
                t.set({ text: leftColumn[idx]?.role || '', fill: textColor, fontSize: baseSize * 0.65, fontFamily });
              }
            }
          } else if (dtype?.startsWith('rightColumn')) {
            const match = dtype.match(/^rightColumn(\d+)(Name|Role)$/);
            const idx = match ? parseInt(match[1], 10) : -1;
            if (idx >= 0) {
              if (match?.[2] === 'Name') {
                t.set({ text: rightColumn[idx]?.name || '', fill: textColor, fontSize: baseSize * 0.8, fontFamily });
              } else {
                t.set({ text: rightColumn[idx]?.role || '', fill: textColor, fontSize: baseSize * 0.65, fontFamily });
              }
            }
          } else if (dtype === 'identificacaoFooter') {
            t.set({ text: identificacaoFooter, fill: textColor, fontSize: baseSize * 0.75, fontFamily });
          }
        }
      }
    });
    fabricCanvas.renderAll();

    onConfigChange({
      text,
      title,
      description,
      homageMessage,
      birthDate,
      deathDate,
      textColor: "#000000",
      fontSize,
      fontFamily,
      productType: product.type,
      productId: product.id,
      identificacaoTitle,
      identificacaoMainPerson1: mainPerson1,
      identificacaoMainPerson2: mainPerson2,
      identificacaoMainPerson3: mainPerson3,
      identificacaoLeftColumn: leftColumn,
      identificacaoRightColumn: rightColumn,
      identificacaoFooter,
    });
  }, [text, title, description, homageMessage, birthDate, deathDate, fontSize, fontFamily, fabricCanvas, onConfigChange, product, buildDatesString, dimensions, identificacaoTitle, mainPerson1, mainPerson2, mainPerson3, leftColumn, rightColumn, identificacaoFooter]);

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

        // Para placas de túmulo, ajustar tamanho e posição para encaixar na moldura oval
        if (product.type === 'tumulo') {
          // ========== AUTO-POSICIONAMENTO DA FOTO NO OVAL ==========
          // Dimensões do oval da moldura (ajustar 1x até casar com sua arte)
          let ovalWidth = dimensions.width * 0.35;   // largura interna do oval
          let ovalHeight = dimensions.height * 0.75; // altura interna do oval
          let ovalCenterX = dimensions.width * 0.18;
          let ovalCenterY = dimensions.height * 0.5;
          if (product.size === '35x50') {
            ovalCenterY = dimensions.height * 0.25; // Posição mais alta para caber na placa
          }

          if (product.size === '30x20') {
            ovalWidth = dimensions.width * 0.32;   // Ligeiramente maior para mostrar mais da foto
            ovalHeight = dimensions.height * 0.62; // Ligeiramente maior para mostrar mais da foto
            // Posição ajustada levemente para a direita para alinhar com a moldura
            ovalCenterX = dimensions.width * 0.20;
          } else if (product.size === '35x20') {
            ovalWidth = dimensions.width * 0.28;   // Tamanho reduzido para caber melhor
            ovalHeight = dimensions.height * 0.65; // Altura ajustada para caber melhor
            // Posição levemente à direita para alinhar com a moldura
            ovalCenterX = dimensions.width * 0.22;
          } else if (product.size === '35x30') {
            ovalWidth = dimensions.width * 0.25;   // Tamanho reduzido para caber na placa
            ovalHeight = dimensions.height * 0.60; // Altura ajustada para caber verticalmente
            // Posição levemente à direita para alinhar com a moldura
            ovalCenterX = dimensions.width * 0.20;
          } else if (product.size === '35x50') {
            ovalWidth = dimensions.width * 0.18;   // Tamanho menor para caber na placa vertical
            ovalHeight = dimensions.height * 0.30; // Altura compacta reduzida para topo
            ovalCenterX = dimensions.width * 0.50; // Centralizado horizontalmente
          } else if (product.size === '35x12') {
            ovalWidth = dimensions.width * 0.20;   // Largura reduzida para oval vertical
            ovalHeight = dimensions.height * 0.70; // Altura aumentada para oval vertical
            ovalCenterX = dimensions.width * 0.15; // Posição mais à esquerda
          }

          // Calcula escala para preencher o oval (cover) - ajustado para encher o oval sem deixar espaço vazio
          const scale = Math.max(
            ovalWidth / (fabricImg.width || 1),
            ovalHeight / (fabricImg.height || 1)
          );

          // Aplica na imagem
          fabricImg.set({
            left: ovalCenterX,
            top: ovalCenterY,
            originX: "center",
            originY: "center",
            scaleX: scale,
            scaleY: scale,
            selectable: false,
            evented: false,
          });

          // ========== BORDAS DA MOLDURA DA FOTO ==========
          // Borda grossa (externa) - dourada
          const thickBorder = new Ellipse({
            rx: (ovalWidth / 2) + 3,  // +3px para borda externa
            ry: (ovalHeight / 2) + 3, // +3px para borda externa
            left: ovalCenterX,
            top: ovalCenterY,
            originX: "center",
            originY: "center",
            fill: 'transparent',
            stroke: '#0e0e0e', // Dourado
            strokeWidth: 6,     // Borda grossa
            selectable: false,
            evented: false,
          });

          // Borda fina (interna) - dourada mais escura
          const thinBorder = new Ellipse({
            rx: (ovalWidth / 2) + 1,  // +1px para borda interna
            ry: (ovalHeight / 2) + 1, // +1px para borda interna
            left: ovalCenterX,
            top: ovalCenterY,
            originX: "center",
            originY: "center",
            fill: 'transparent',
            stroke: '#0e0e0e', // Dourado mais escuro
            strokeWidth: 2,     // Borda fina
            selectable: false,
            evented: false,
          });

          // Cria clipPath oval fixo para a imagem
          const clip = new Ellipse({
            rx: ovalWidth / 2,
            ry: ovalHeight / 2,
            left: ovalCenterX,
            top: ovalCenterY,
            originX: "center",
            originY: "center",
          });
          (clip as ClipWithPositioned).absolutePositioned = true;

          // Aplica recorte na imagem
          fabricImg.clipPath = clip;

          // Marca como imagem do usuário
          (fabricImg as ImageWithData).data = { isUserImage: true };

          // Adiciona as bordas primeiro (para ficarem atrás da imagem)
          fabricCanvas.add(thickBorder);
          fabricCanvas.add(thinBorder);
        } else {
          // Para outros tipos de produto, manter o posicionamento original
          const maxSize = Math.min(dimensions.width * 0.25, dimensions.height * 0.4);
          const scale = maxSize / Math.max(fabricImg.width || 1, fabricImg.height || 1);
          const leftPos = dimensions.width * 0.2;
          const topPos = dimensions.height * 0.3;

          fabricImg.set({
            left: leftPos,
            top: topPos,
            scaleX: scale,
            scaleY: scale,
            originX: "center",
            originY: "center",
          });
        }
        
        fabricCanvas.add(fabricImg);
        fabricCanvas.renderAll();
        toast("Foto adicionada!");
        
        URL.revokeObjectURL(processedUrl);
      } catch (bgError) {
        const originalUrl = URL.createObjectURL(file);
        const fabricImg = await FabricImage.fromURL(originalUrl);

        // Para placas de túmulo, ajustar tamanho e posição para encaixar na moldura oval
        if (product.type === 'tumulo') {
          // ========== AUTO-POSICIONAMENTO DA FOTO NO OVAL (FALLBACK) ==========
          // Dimensões do oval da moldura (ajustar 1x até casar com sua arte)
          let ovalWidth = dimensions.width * 0.35;   // largura interna do oval
          let ovalHeight = dimensions.height * 0.75; // altura interna do oval
          let ovalCenterX = dimensions.width * 0.18;
          let ovalCenterY = dimensions.height * 0.5;
          if (product.size === '35x50') {
            ovalCenterY = dimensions.height * 0.25; // Posição mais alta para caber na placa
          }

          if (product.size === '30x20') {
            ovalWidth = dimensions.width * 0.32;   // Ligeiramente maior para mostrar mais da foto
            ovalHeight = dimensions.height * 0.62; // Ligeiramente maior para mostrar mais da foto
            // Posição ajustada levemente para a direita para alinhar com a moldura
            ovalCenterX = dimensions.width * 0.20;
          } else if (product.size === '35x20') {
            ovalWidth = dimensions.width * 0.28;   // Tamanho reduzido para caber melhor
            ovalHeight = dimensions.height * 0.65; // Altura ajustada para caber melhor
            // Posição levemente à direita para alinhar com a moldura
            ovalCenterX = dimensions.width * 0.22;
          } else if (product.size === '35x30') {
            ovalWidth = dimensions.width * 0.25;   // Tamanho reduzido para caber na placa
            ovalHeight = dimensions.height * 0.60; // Altura ajustada para caber verticalmente
            // Posição levemente à direita para alinhar com a moldura
            ovalCenterX = dimensions.width * 0.20;
          } else if (product.size === '35x50') {
            ovalWidth = dimensions.width * 0.18;   // Tamanho menor para caber na placa vertical
            ovalHeight = dimensions.height * 0.30; // Altura compacta reduzida para topo
            ovalCenterX = dimensions.width * 0.50; // Centralizado horizontalmente
          } else if (product.size === '35x12') {
            ovalWidth = dimensions.width * 0.20;   // Largura reduzida para oval vertical
            ovalHeight = dimensions.height * 0.70; // Altura aumentada para oval vertical
            ovalCenterX = dimensions.width * 0.15; // Posição mais à esquerda
          }

          // Calcula escala para preencher o oval (cover) - ajustado para encher o oval sem deixar espaço vazio
          const scale = Math.max(
            ovalWidth / (fabricImg.width || 1),
            ovalHeight / (fabricImg.height || 1)
          );

          // Aplica na imagem
          fabricImg.set({
            left: ovalCenterX,
            top: ovalCenterY,
            originX: "center",
            originY: "center",
            scaleX: scale,
            scaleY: scale,
            selectable: false,
            evented: false,
          });

          // ========== BORDAS DA MOLDURA DA FOTO (FALLBACK) ==========
          // Borda grossa (externa) - preta
          const thickBorder = new Ellipse({
            rx: (ovalWidth / 2) + 3,  // +3px para borda externa
            ry: (ovalHeight / 2) + 3, // +3px para borda externa
            left: ovalCenterX,
            top: ovalCenterY,
            originX: "center",
            originY: "center",
            fill: 'transparent',
            stroke: '#0e0e0e', // Preto escuro
            strokeWidth: 1.5,     // Borda grossa
            selectable: false,
            evented: false,
          });

          // Borda fina (interna) - preta mais clara
          const thinBorder = new Ellipse({
            rx: (ovalWidth / 2) + 1,  // +1px para borda interna
            ry: (ovalHeight / 2) + 1, // +1px para borda interna
            left: ovalCenterX,
            top: ovalCenterY,
            originX: "center",
            originY: "center",
            fill: 'transparent',
            stroke: '#1a1a1a', // Preto mais claro
            strokeWidth: 1,     // Borda fina
            selectable: false,
            evented: false,
          });

          // Cria clipPath oval fixo para a imagem
          const clip = new Ellipse({
            rx: ovalWidth / 2,
            ry: ovalHeight / 2,
            left: ovalCenterX,
            top: ovalCenterY,
            originX: "center",
            originY: "center",
          });
          (clip as ClipWithPositioned).absolutePositioned = true;

          // Aplica recorte na imagem
          fabricImg.clipPath = clip;

          // Marca como imagem do usuário
          (fabricImg as ImageWithData).data = { isUserImage: true };

          // Adiciona as bordas primeiro (para ficarem atrás da imagem)
          fabricCanvas.add(thickBorder);
          fabricCanvas.add(thinBorder);
        } else {
          // Para outros tipos de produto, manter o posicionamento original
          const maxSize = Math.min(dimensions.width * 0.25, dimensions.height * 0.4);
          const scale = maxSize / Math.max(fabricImg.width || 1, fabricImg.height || 1);
          const leftPos = dimensions.width * 0.2;
          const topPos = dimensions.height * 0.3;

          fabricImg.set({
            left: leftPos,
            top: topPos,
            scaleX: scale,
            scaleY: scale,
            originX: "center",
            originY: "center",
          });
        }
        
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <Card>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base md:text-lg">Pré-visualização da Placa ({product.size}cm)</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-3 sm:p-6">
          <div className="border border-border rounded-lg p-2 sm:p-4 bg-background max-w-full overflow-auto">
            <canvas ref={canvasRef} className="border border-muted rounded max-w-full h-auto" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base md:text-lg">Opções de Personalização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
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

              <div>
                <Label htmlFor="homageMessage">Mensagem de Despedida ou Homenagem</Label>
                <Textarea
                  id="homageMessage"
                  value={homageMessage}
                  onChange={(e) => setHomageMessage(e.target.value)}
                  placeholder="Mensagem personalizada de despedida ou homenagem..."
                  rows={4}
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

          {product.type === 'homenagem' && (
            <div>
              <Label htmlFor="homageMessage">Mensagem de Homenagem</Label>
              <Textarea
                id="homageMessage"
                value={homageMessage}
                onChange={(e) => setHomageMessage(e.target.value)}
                placeholder="Mensagem personalizada de homenagem..."
                rows={4}
              />
            </div>
          )}

          {product.type === 'identificacao' && (
            <>
              <div>
                <Label htmlFor="identificacaoTitle">Título Principal da Placa</Label>
                <Textarea
                  id="identificacaoTitle"
                  value={identificacaoTitle}
                  onChange={(e) => setIdentificacaoTitle(e.target.value)}
                  placeholder='Ex: CONSTRUÇÃO DE PONTE NA COMUNIDADE "BOA ESPERANÇA"'
                  rows={2}
                />
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">Pessoas Principais (topo)</h3>
                
                <div className="space-y-2">
                  <Label>Pessoa 1</Label>
                  <Input
                    value={mainPerson1.name}
                    onChange={(e) => setMainPerson1({ ...mainPerson1, name: e.target.value })}
                    placeholder="Nome completo"
                  />
                  <Input
                    value={mainPerson1.role}
                    onChange={(e) => setMainPerson1({ ...mainPerson1, role: e.target.value })}
                    placeholder="Cargo ou função"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Pessoa 2</Label>
                  <Input
                    value={mainPerson2.name}
                    onChange={(e) => setMainPerson2({ ...mainPerson2, name: e.target.value })}
                    placeholder="Nome completo"
                  />
                  <Input
                    value={mainPerson2.role}
                    onChange={(e) => setMainPerson2({ ...mainPerson2, role: e.target.value })}
                    placeholder="Cargo ou função"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Pessoa 3</Label>
                  <Input
                    value={mainPerson3.name}
                    onChange={(e) => setMainPerson3({ ...mainPerson3, name: e.target.value })}
                    placeholder="Nome completo"
                  />
                  <Input
                    value={mainPerson3.role}
                    onChange={(e) => setMainPerson3({ ...mainPerson3, role: e.target.value })}
                    placeholder="Cargo ou função"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Coluna Esquerda</h3>
                    {leftColumn.map((entry, idx) => (
                      <div key={`left-${idx}`} className="space-y-1">
                        <Input
                          value={entry.name}
                          onChange={(e) => {
                            const newColumn = [...leftColumn];
                            newColumn[idx] = { ...newColumn[idx], name: e.target.value };
                            setLeftColumn(newColumn);
                          }}
                          placeholder={`Nome ${idx + 1}`}
                          className="text-sm"
                        />
                        <Input
                          value={entry.role}
                          onChange={(e) => {
                            const newColumn = [...leftColumn];
                            newColumn[idx] = { ...newColumn[idx], role: e.target.value };
                            setLeftColumn(newColumn);
                          }}
                          placeholder="Cargo"
                          className="text-sm"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Coluna Direita</h3>
                    {rightColumn.map((entry, idx) => (
                      <div key={`right-${idx}`} className="space-y-1">
                        <Input
                          value={entry.name}
                          onChange={(e) => {
                            const newColumn = [...rightColumn];
                            newColumn[idx] = { ...newColumn[idx], name: e.target.value };
                            setRightColumn(newColumn);
                          }}
                          placeholder={`Nome ${idx + 1}`}
                          className="text-sm"
                        />
                        <Input
                          value={entry.role}
                          onChange={(e) => {
                            const newColumn = [...rightColumn];
                            newColumn[idx] = { ...newColumn[idx], role: e.target.value };
                            setRightColumn(newColumn);
                          }}
                          placeholder="Cargo"
                          className="text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="identificacaoFooter">Rodapé (Data/Informações)</Label>
                <Textarea
                  id="identificacaoFooter"
                  value={identificacaoFooter}
                  onChange={(e) => setIdentificacaoFooter(e.target.value)}
                  placeholder="Ex: Irupi/ES - Setembro de 2025 - Administração 2025/2028"
                  rows={2}
                />
              </div>
            </>
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
            <Label htmlFor="fontSize" className="text-xs sm:text-sm">Tamanho da Fonte</Label>
            <Input
              id="fontSize"
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              min="10"
              max="50"
              className="text-sm"
            />
          </div>


          <div>
            <Label htmlFor="image" className="text-xs sm:text-sm">Upload de Foto</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="cursor-pointer text-xs sm:text-sm"
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
            className="w-full text-xs sm:text-sm"
            variant="outline"
          >
            Gerar Preview
          </Button>
        </CardContent>
      </Card>
    </div>
  );
});
