// src/components/PreviewTextLayout.tsx
import React from "react";

// ✅ imports corrigidos com caminhos absolutos compatíveis com Vite
import fotoum from "@/assets/fotoum.png";
import foto2 from "@/assets/foto2.png";
import durabilidade from "@/assets/durabilidade.png";
import correto from "@/assets/correto.png";
import altaqualidade from "@/assets/altaqualidade.png";
import nuvemsol from "@/assets/nuvemsol.png";

// ✅ componente padronizado e com export default no final
const PreviewTextLayout: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      {/* Título */}
      <h2 className="text-center text-blue-700 font-bold text-xl mb-4">
        PLACAS DE TÚMULO
        <br />
        <span className="text-sm font-normal">
          COM GRAVAÇÃO EM BAIXO RELEVO NO AÇO INOX
        </span>
      </h2>

      {/* Introdução */}
      <p className="mb-4 leading-relaxed text-sm">
        Nossas placas de túmulo contam com um dos melhores e mais ideais materiais para enfrentar
        sol, chuva e maresia. Com uma das maiores resistências e durabilidades do mercado, o nosso
        Aço Inoxidável, além de não enferrujar e proporcionar garantia eterna, conta com o processo de
        gravação química em baixo relevo com aplicação de tinta, garantindo assim como seu material,
        uma gravação extremamente duradoura na placa.
      </p>

      {/* Seção com fotos e texto */}
      <div className="flex flex-wrap items-center gap-6 mb-6">
        <img
          src={fotoum}
          alt="Gravação de foto em aço inox"
          className="w-40 rounded-lg shadow-md object-cover"
        />
        <div className="flex-1 text-sm leading-relaxed">
          <p>
            Transformamos suas lembranças em uma homenagem eterna através da gravação de fotos em aço
            inoxidável. Utilizando a tecnologia de micropontos em baixo-relevo, conseguimos reproduzir a
            imagem em preto e branco com alta definição, transmitindo toda a nitidez e emoção de uma
            fotografia impressa, porém, com uma durabilidade incomparável.
          </p>
          <p className="mt-2">
            De perto, é possível notar a delicadeza dos micropontos gravados na chapa. Quando vista
            normalmente, a foto se revela com incrível clareza e realismo, criando uma lembrança
            sofisticada e duradoura.
          </p>
        </div>
        <img
          src={foto2}
          alt="Detalhe da gravação"
          className="w-40 rounded-lg shadow-md object-cover"
        />
      </div>

      {/* Texto adicional */}
      <p className="mb-6 leading-relaxed text-sm">
        O aço inoxidável garante resistência contra o tempo, chuva e sol, preservando a qualidade da
        imagem por muitos e muitos anos. É a combinação perfeita entre beleza, elegância e
        durabilidade, para que a memória de quem você ama seja eternizada com dignidade.
      </p>

      {/* Lista de benefícios */}
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="flex items-center gap-3">
          <img
            src={altaqualidade}
            alt="Alta Qualidade"
            className="w-10 h-10 object-contain"
          />
          <span>Gravação da foto de alta qualidade</span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={durabilidade}
            alt="Durabilidade"
            className="w-10 h-10 object-contain"
          />
          <span>Durabilidade incomparável em aço inox</span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={nuvemsol}
            alt="Resistência"
            className="w-10 h-10 object-contain"
          />
          <span>Resistência às condições climáticas</span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={correto}
            alt="Acabamento"
            className="w-10 h-10 object-contain"
          />
          <span>Acabamento sofisticado e eterno</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewTextLayout;
