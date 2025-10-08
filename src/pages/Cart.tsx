import { Header } from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Formatar mensagem estilo bot de delivery
    let message = "━━━━━━━━━━━━━━━━━━\n";
    message += "*🏠 CASA DAS PLACAS*\n";
    message += "*📦 NOVO PEDIDO*\n";
    message += "━━━━━━━━━━━━━━━━━━\n\n";
    
    items.forEach((item, index) => {
      message += `*╔═══ PRODUTO ${index + 1} ═══╗*\n`;
      message += `📦 *${item.productName}*\n`;
      message += `📏 Tamanho: *${item.size}cm*\n`;
      message += `💰 Valor: *R$ ${item.price.toFixed(2)}*\n`;
      message += `🔢 Quantidade: *${item.quantity}x*\n`;
      message += `💵 Subtotal: *R$ ${(item.price * item.quantity).toFixed(2)}*\n`;
      
      // Adicionar dados de personalização se existirem
      if (item.customization) {
        message += `\n*🎨 PERSONALIZAÇÃO:*\n`;
        const custom = item.customization;
        
        if (custom.text) message += `• Texto: _${custom.text}_\n`;
        if (custom.title) message += `• Título: _${custom.title}_\n`;
        if (custom.description) message += `• Descrição: _${custom.description}_\n`;
        if (custom.homageMessage) message += `• Mensagem: _${custom.homageMessage}_\n`;
        if (custom.birthDate) message += `• 🎂 Nascimento: _${custom.birthDate}_\n`;
        if (custom.deathDate) message += `• 🕊️ Falecimento: _${custom.deathDate}_\n`;
        if (custom.textColor) message += `• 🎨 Cor: _${custom.textColor}_\n`;
        if (custom.fontFamily) message += `• ✍️ Fonte: _${custom.fontFamily}_\n`;
        
        // Dados de identificação
        if (custom.identificacaoTitle) message += `• 📌 Título: _${custom.identificacaoTitle}_\n`;
        
        if (custom.identificacaoMainPerson1) {
          message += `\n*👤 Pessoa Principal 1:*\n`;
          message += `  Nome: _${custom.identificacaoMainPerson1.name || 'N/A'}_\n`;
          message += `  Nascimento: _${custom.identificacaoMainPerson1.birthDate || 'N/A'}_\n`;
        }
        
        if (custom.identificacaoMainPerson2) {
          message += `\n*👤 Pessoa Principal 2:*\n`;
          message += `  Nome: _${custom.identificacaoMainPerson2.name || 'N/A'}_\n`;
          message += `  Nascimento: _${custom.identificacaoMainPerson2.birthDate || 'N/A'}_\n`;
        }
        
        if (custom.identificacaoMainPerson3) {
          message += `\n*👤 Pessoa Principal 3:*\n`;
          message += `  Nome: _${custom.identificacaoMainPerson3.name || 'N/A'}_\n`;
          message += `  Nascimento: _${custom.identificacaoMainPerson3.birthDate || 'N/A'}_\n`;
        }
        
        if (custom.identificacaoLeftColumn && custom.identificacaoLeftColumn.length > 0) {
          message += `\n*📋 Coluna Esquerda:*\n`;
          custom.identificacaoLeftColumn.forEach((entry: any, i: number) => {
            message += `  ${i + 1}. _${entry.name || 'N/A'}_ - _${entry.birthDate || 'N/A'}_\n`;
          });
        }
        
        if (custom.identificacaoRightColumn && custom.identificacaoRightColumn.length > 0) {
          message += `\n*📋 Coluna Direita:*\n`;
          custom.identificacaoRightColumn.forEach((entry: any, i: number) => {
            message += `  ${i + 1}. _${entry.name || 'N/A'}_ - _${entry.birthDate || 'N/A'}_\n`;
          });
        }
        
        if (custom.identificacaoFooter) {
          message += `\n*💬 Rodapé:* _${custom.identificacaoFooter}_\n`;
        }
      }
      
      message += `\n━━━━━━━━━━━━━━━━━━\n\n`;
    });
    
    message += `*╔═══════════════╗*\n`;
    message += `*║  💰 RESUMO DO PEDIDO  ║*\n`;
    message += `*╚═══════════════╝*\n\n`;
    message += `Subtotal: R$ ${total.toFixed(2)}\n`;
    message += `Frete: *GRÁTIS* 🎉\n`;
    message += `━━━━━━━━━━━━━━━━━━\n`;
    message += `*💵 TOTAL: R$ ${total.toFixed(2)}*\n`;
    message += `_ou 4x de R$ ${(total / 4).toFixed(2)} sem juros_\n\n`;
    message += `✅ *Frete GRÁTIS* para todo Brasil\n`;
    message += `✅ *Prazo:* 3 a 5 dias úteis\n`;
    message += `✅ *Pagamento:* PIX, Cartão ou Boleto\n\n`;
    message += `📸 _As imagens de pré-visualização dos produtos serão enviadas em seguida!_\n\n`;
    message += `Obrigado por escolher a *Casa das Placas*! 🙏`;
    
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Número correto: +55 27 99686-0022 -> 5527996860022
    const phoneNumber = "5527996860022";

    // Detectar se é mobile ou desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Criar URL do WhatsApp
    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
      : `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir em nova aba para evitar bloqueio de iframe
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    if (opened) {
      toast.success("✅ Abrindo WhatsApp...", {
        description: "Você será redirecionado para finalizar o pedido"
      });
    } else {
      toast.error("⚠️ Pop-ups bloqueados", {
        description: "Ative os pop-ups e tente novamente"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continuar Comprando
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Seu Carrinho ({items.length} itens)</CardTitle>
                {items.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearCart}>
                    Limpar Carrinho
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Seu carrinho está vazio</p>
                    <Button className="mt-4" onClick={() => navigate("/")}>
                      Ver Produtos
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                        {item.previewImage && (
                          <div className="w-20 h-20 bg-muted rounded flex-shrink-0">
                            <img 
                              src={item.previewImage} 
                              alt="Preview" 
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.productName}</h3>
                          <p className="text-sm text-muted-foreground">Tamanho: {item.size}cm</p>
                          <p className="text-lg font-bold text-primary">R$ {item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span className="text-green-600">GRÁTIS</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ou 4x de R$ {(total / 4).toFixed(2)} sem juros
                  </div>
                  
                  <Button onClick={handleCheckout} className="w-full" size="lg">
                    Finalizar Compra
                  </Button>
                  
                  <div className="text-xs text-center text-muted-foreground">
                    ✓ Compra 100% segura<br />
                    ✓ Frete grátis para todo Brasil
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;