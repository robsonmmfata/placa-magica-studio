export const FeaturesSection = () => {
  const features = [
    {
      title: "PAGAMENTO",
      subtitle: "INSTANTÂNEO COM PIX",
    },
    {
      title: "PRAZO DE ENTREGA",
      subtitle: "3 A 5 DIAS ÚTEIS",
    },
    {
      title: "PARCELE EM ATÉ",
      subtitle: "4X SEM JUROS",
    },
    {
      title: "GRAVAÇÃO A LASER",
      subtitle: "ALTA QUALIDADE",
    },
  ];

  return (
    <section className="py-6 sm:py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                {feature.title}
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                {feature.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
