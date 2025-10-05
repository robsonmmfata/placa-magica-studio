import React from "react";

import fotoum from "@/assets/fotoum.png";
import durabilidade from "@/assets/durabilidade.png";
import correto from "@/assets/correto.png";
import altaqualidade from "@/assets/altaqualidade.png";
import nuvemsol from "@/assets/nuvemsol.png";

const PreviewTextLayout: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 text-gray-800">
      {/* Título */}
      <h2 className="text-center text-blue-700 font-bold text-2xl mb-6 leading-tight">
        PLACAS DE TÚMULO
        <br />
        <span className="text-sm font-normal tracking-wide">
          COM GRAVAÇÃO EM BAIXO RELEVO NO AÇO INOX
        </span>
      </h2>

      {/* Introdução */}
      <p className="mb-6 leading-relaxed text-base text-justify">
        Nossas placas de túmulo contam com um dos melhores e mais ideais materiais para enfrentar
        sol, chuva e maresia. Com uma das maiores resistências e durabilidades do mercado, o nosso
        Aço Inoxidável, além de não enferrujar e proporcionar garantia eterna, conta com o processo de
        gravação química em baixo relevo com aplicação de tinta, garantindo assim como seu material,
        uma gravação extremamente duradoura na placa.
      </p>

      {/* Seção com fotos e texto com sobreposição e linhas */}
      <div className="relative flex flex-wrap items-center gap-8 mb-8">
        <img
          src={fotoum}
          alt="Gravação de foto em aço inox"
          className="w-80 rounded-lg shadow-lg object-cover relative z-10"
        />
        <div className="flex-1 text-base leading-relaxed text-justify max-w-md">
          <p>
            Transformamos suas lembranças em uma homenagem eterna através da gravação de fotos em aço
            inoxidável. Utilizando a tecnologia de micropontos em baixo-relevo, conseguimos reproduzir a
            imagem em preto e branco com alta definição, transmitindo toda a nitidez e emoção de uma
            fotografia impressa, porém, com uma durabilidade incomparável.
          </p>
          <p className="mt-3">
            De perto, é possível notar a delicadeza dos micropontos gravados na chapa. Quando vista
            normalmente, a foto se revela com incrível clareza e realismo, criando uma lembrança
            sofisticada e duradoura.
          </p>
        </div>

        {/* Container para a imagem sobreposta e linhas */}
        
      </div>

      {/* Texto adicional */}
      <p className="mb-8 leading-relaxed text-base text-justify max-w-3xl mx-auto">
        O aço inoxidável garante resistência contra o tempo, chuva e sol, preservando a qualidade da
        imagem por muitos e muitos anos. É a combinação perfeita entre beleza, elegância e
        durabilidade, para que a memória de quem você ama seja eternizada com dignidade.
      </p>

      {/* Lista de benefícios */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-base max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <img
            src={altaqualidade}
            alt="Alta Qualidade"
            className="w-12 h-12 object-contain"
          />
          <span>Gravação da foto de alta qualidade</span>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={durabilidade}
            alt="Durabilidade"
            className="w-12 h-12 object-contain"
          />
          <span>Durabilidade incomparável em aço inox</span>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={nuvemsol}
            alt="Resistência"
            className="w-12 h-12 object-contain"
          />
          <span>Resistência às condições climáticas</span>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={correto}
            alt="Acabamento"
            className="w-12 h-12 object-contain"
          />
          <span>Acabamento sofisticado e eterno</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewTextLayout;
