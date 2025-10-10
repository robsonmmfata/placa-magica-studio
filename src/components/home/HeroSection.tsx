import { Button } from "@/components/ui/button";
import slide from "../../slide.jpg";

export const HeroSection = () => {
  const scrollToProducts = () => {
    const element = document.getElementById("products-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative overflow-hidden w-full"
      style={{
        height: "clamp(300px, 60vh, 600px)", // Altura responsiva
      }}
    >
      {/* Imagem de fundo responsiva */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${slide})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Conteúdo centralizado */}
      <div className="relative h-full flex items-end justify-center pb-6 sm:pb-10 md:pb-16 px-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md sm:max-w-lg">
          <Button
            variant="customize"
            size="lg"
            className="w-full sm:w-auto text-sm sm:text-base font-semibold"
            onClick={scrollToProducts}
          >
            VER PRODUTOS
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="border-[#193E73] text-[#193E73] hover:bg-background hover:text-primary w-full sm:w-auto text-sm sm:text-base font-semibold"
            onClick={scrollToProducts}
          >
            SAIBA MAIS
          </Button>
        </div>
      </div>
    </section>
  );
};
