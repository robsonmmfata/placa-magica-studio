// Product data for Casa das Placas
import placaTumulo30x20 from "@/assets/placa-tumulo-30x20.jpg";
import placaHomenagem16x12 from "@/assets/placa-homenagem-16x12.jpg";
import placaHomenagem24x16 from "@/assets/placa-homenagem-24x16.jpg";
import placaIdentificacao40x50 from "@/assets/placa-identificacao-40x50.jpg";
import placaHomenagem15x10 from "@/assets/placa-homenagem-15x10.jpg";
import placaHomenagem20x15 from "@/assets/placa-homenagem-20x15.jpg";
import placaHomenagem30x20 from "@/assets/placa-homenagem-30x20.jpg";
import placaTumulo30x12 from "@/assets/placa-tumulo-30x12.jpg";
import placaTumulo35x12 from "@/assets/placa-tumulo-35x12.jpg";

export interface Product {
  id: string;
  title: string;
  type: 'tumulo' | 'homenagem' | 'identificacao';
  size: string;
  originalPrice: number;
  currentPrice: number;
  installmentPrice: number;
  image: string;
  description?: string;
  maxNames?: number;
}

export const tumuloProducts: Product[] = [
  {
    id: "tumulo-35x12",
    title: "PLACA DE TÚMULO 35X12CM EM AÇO INOX",
    type: "tumulo",
    size: "35x12",
    originalPrice: 280.00,
    currentPrice: 220.00,
    installmentPrice: 55.00,
    image: placaTumulo35x12,
    description: "Gravação em baixo relevo com aplicação de tinta automotiva, com foto. Ideal para 01 nome.",
    maxNames: 1
  },
  {
    id: "tumulo-35x20",
    title: "PLACA DE TÚMULO 35X20CM EM AÇO INOX",
    type: "tumulo",
    size: "35x20",
    originalPrice: 450.00,
    currentPrice: 380.00,
    installmentPrice: 95.00,
    image: placaTumulo30x20,
    description: "Gravação em baixo relevo com aplicação de tinta automotiva, com foto. Até 02 nomes.",
    maxNames: 2
  },
  {
    id: "tumulo-30x20",
    title: "PLACA DE TÚMULO 30X20CM (A4) EM AÇO INOX",
    type: "tumulo",
    size: "30x20",
    originalPrice: 350.00,
    currentPrice: 290.00,
    installmentPrice: 72.50,
    image: placaTumulo30x12,
    description: "Gravação em baixo relevo com aplicação de tinta automotiva, com foto. Ideal para 01 nome.",
    maxNames: 1
  },
  {
    id: "tumulo-35x30",
    title: "PLACA DE TÚMULO 35X30CM EM AÇO INOX",
    type: "tumulo",
    size: "35x30",
    originalPrice: 650.00,
    currentPrice: 570.00,
    installmentPrice: 142.50,
    image: placaTumulo30x20,
    description: "Gravação em baixo relevo com aplicação de tinta automotiva, com foto. Até 03 nomes.",
    maxNames: 3
  },
  {
    id: "tumulo-35x50",
    title: "PLACA DE TÚMULO 35X50CM EM AÇO INOX",
    type: "tumulo",
    size: "35x50",
    originalPrice: 1100.00,
    currentPrice: 950.00,
    installmentPrice: 237.50,
    image: placaTumulo30x20,
    description: "Gravação em baixo relevo com aplicação de tinta automotiva, com foto. Até 05 nomes.",
    maxNames: 5
  }
];

export const homenagemProducts: Product[] = [
  {
    id: "homenagem-15x10",
    title: "PLACA DE HOMENAGEM 15X10CM EM AÇO INOX ESCOVADO",
    type: "homenagem",
    size: "15x10",
    originalPrice: 250.00,
    currentPrice: 210.00,
    installmentPrice: 52.50,
    image: placaHomenagem15x10,
    description: "Gravação em baixo relevo. Acompanha estojo aveludado GRÁTIS!"
  },
  {
    id: "homenagem-18x13",
    title: "PLACA DE HOMENAGEM 18X13CM EM AÇO INOX ESCOVADO",
    type: "homenagem",
    size: "18x13",
    originalPrice: 290.00,
    currentPrice: 240.00,
    installmentPrice: 60.00,
    image: placaHomenagem16x12,
    description: "Gravação em baixo relevo. Acompanha estojo aveludado GRÁTIS!"
  },
  {
    id: "homenagem-20x15",
    title: "PLACA DE HOMENAGEM 20X15CM EM AÇO INOX ESCOVADO",
    type: "homenagem",
    size: "20x15",
    originalPrice: 320.00,
    currentPrice: 270.00,
    installmentPrice: 67.50,
    image: placaHomenagem20x15,
    description: "Gravação em baixo relevo. Acompanha estojo aveludado GRÁTIS!"
  },
  {
    id: "homenagem-24x16",
    title: "PLACA DE HOMENAGEM 24X16CM EM AÇO INOX ESCOVADO",
    type: "homenagem",
    size: "24x16",
    originalPrice: 360.00,
    currentPrice: 300.00,
    installmentPrice: 75.00,
    image: placaHomenagem24x16,
    description: "Gravação em baixo relevo. Acompanha estojo aveludado GRÁTIS!"
  },
  {
    id: "homenagem-30x20",
    title: "PLACA DE HOMENAGEM 30X20CM EM AÇO INOX ESCOVADO",
    type: "homenagem",
    size: "30x20",
    originalPrice: 400.00,
    currentPrice: 330.00,
    installmentPrice: 82.50,
    image: placaHomenagem30x20,
    description: "Gravação em baixo relevo. Acompanha estojo aveludado GRÁTIS!"
  }
];

export const identificacaoProducts: Product[] = [
  {
    id: "identificacao-40x50",
    title: "PLACA DE IDENTIFICAÇÃO 40X50CM EM AÇO INOX",
    type: "identificacao",
    size: "40x50",
    originalPrice: 800.00,
    currentPrice: 650.00,
    installmentPrice: 162.50,
    image: placaIdentificacao40x50,
    description: "Gravação em baixo relevo profissional. Ideal para inaugurações e obras."
  }
];

export const allProducts = [
  ...tumuloProducts,
  ...homenagemProducts,
  ...identificacaoProducts
];