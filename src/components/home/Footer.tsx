import bgFooter from "../../assets/bgfooter.png";
import logoicone from "../../assets/logoicone.png";

export const Footer = () => {
  const footerSections = [
    {
      title: "Categorias:",
      links: [
        { text: "Placas de Túmulo", href: "#" },
        { text: "Placas de Homenagem", href: "#" },
        { text: "Placas de Identificação", href: "#" },
      ],
    },
    {
      title: "Produtos:",
      links: [
        { text: "Aço Inox Escovado", href: "#" },
        { text: "Gravação a Laser", href: "#" },
      ],
    },
    {
      title: "Outros:",
      links: [
        { text: "Sobre", href: "#" },
        { text: "Revenda", href: "#" },
        { text: "Parceria", href: "#" },
      ],
    },
  ];

  return (
    <footer
      className="py-8 sm:py-10 md:py-12 bg-secondary text-secondary-foreground"
      style={{
        backgroundImage: `url(${bgFooter})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold mb-4 text-sm sm:text-base">{section.title}</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="hover:text-accent transition-colors">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-bold mb-4 text-sm sm:text-base">Contatos:</h4>
            <div className="text-xs sm:text-sm space-y-2">
              <div>casadasplacas.orcamento@gmail.com</div>
              <div>(27)3386-3216</div>
              <div>Segunda à Sexta:</div>
              <div>8h às 18h</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary-foreground/20 mt-6 pt-6 text-center text-xs sm:text-sm">
          <div className="mt-4 sm:mt-8 flex flex-col justify-center items-center gap-2">
            <img
              src={logoicone}
              alt="Casa das Placas"
              className="h-10 sm:h-12 object-contain"
            />
            <span className="text-xl sm:text-2xl font-bold" style={{ color: "#FFF7F7FF" }}>
              Casa das Placas
            </span>
            <span className="text-xl sm:text-2xl font-bold" style={{ color: "#FFF7F7FF" }}>
              Comunicação Visual
            </span>
          </div>
          <p className="mt-3 sm:mt-4 px-4">
            COMPRA SEGURA. A Casa das Placas garante segurança em suas
            informações pessoais e financeiras.
          </p>
          <p className="mt-2 px-4">
            Copyright Desde 2016 a 2025. Todos os direitos reservados - Casa
            das Placas
          </p>
        </div>
      </div>
    </footer>
  );
};
