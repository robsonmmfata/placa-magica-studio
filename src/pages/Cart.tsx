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
    // Formatar mensagem para WhatsApp
    let message = "*🛒 NOVO PEDIDO - Casa das Placas*\n\n";
    
    items.forEach((item, index) => {
      message += `*Produto ${index + 1}:*\n`;
      message += `📦 ${item.productName}\n`;
      message += `📏 Tamanho: ${item.size}cm\n`;
      message += `💰 Preço: R$ ${item.price.toFixed(2)}\n`;
      message += `🔢 Quantidade: ${item.quantity}\n`;
      
      // Adicionar dados de personalização se existirem
      if (item.customization) {
        message += `\n*Personalização:*\n`;
        const custom = item.customization;
        
        if (custom.text) message += `Texto: ${custom.text}\n`;
        if (custom.title) message += `Título: ${custom.title}\n`;
        if (custom.description) message += `Descrição: ${custom.description}\n`;
        if (custom.homageMessage) message += `Mensagem: ${custom.homageMessage}\n`;
        if (custom.birthDate) message += `Data Nascimento: ${custom.birthDate}\n`;
        if (custom.deathDate) message += `Data Falecimento: ${custom.deathDate}\n`;
        if (custom.textColor) message += `Cor do Texto: ${custom.textColor}\n`;
        if (custom.fontFamily) message += `Fonte: ${custom.fontFamily}\n`;
        
        // Dados de identificação
        if (custom.identificacaoTitle) message += `Título Principal: ${custom.identificacaoTitle}\n`;
        
        if (custom.identificacaoMainPerson1) {
          message += `\n*Pessoa Principal 1:*\n`;
          message += `Nome: ${custom.identificacaoMainPerson1.name || ''}\n`;
          message += `Data Nasc: ${custom.identificacaoMainPerson1.birthDate || ''}\n`;
        }
        
        if (custom.identificacaoMainPerson2) {
          message += `\n*Pessoa Principal 2:*\n`;
          message += `Nome: ${custom.identificacaoMainPerson2.name || ''}\n`;
          message += `Data Nasc: ${custom.identificacaoMainPerson2.birthDate || ''}\n`;
        }
        
        if (custom.identificacaoMainPerson3) {
          message += `\n*Pessoa Principal 3:*\n`;
          message += `Nome: ${custom.identificacaoMainPerson3.name || ''}\n`;
          message += `Data Nasc: ${custom.identificacaoMainPerson3.birthDate || ''}\n`;
        }
        
        if (custom.identificacaoLeftColumn && custom.identificacaoLeftColumn.length > 0) {
          message += `\n*Coluna Esquerda:*\n`;
          custom.identificacaoLeftColumn.forEach((entry: any, i: number) => {
            message += `${i + 1}. ${entry.name || ''} - ${entry.birthDate || ''}\n`;
          });
        }
        
        if (custom.identificacaoRightColumn && custom.identificacaoRightColumn.length > 0) {
          message += `\n*Coluna Direita:*\n`;
          custom.identificacaoRightColumn.forEach((entry: any, i: number) => {
            message += `${i + 1}. ${entry.name || ''} - ${entry.birthDate || ''}\n`;
          });
        }
        
        if (custom.identificacaoFooter) {
          message += `\nRodapé: ${custom.identificacaoFooter}\n`;
        }
      }
      
      message += `\n${'-'.repeat(30)}\n\n`;
    });
    
    message += `*💵 VALOR TOTAL: R$ ${total.toFixed(2)}*\n`;
    message += `*ou 4x de R$ ${(total / 4).toFixed(2)} sem juros*\n\n`;
    message += `✅ Frete GRÁTIS para todo Brasil\n`;
    message += `✅ Prazo: 3 a 5 dias úteis\n\n`;
    message += `_Obs: As imagens de pré-visualização serão enviadas separadamente._`;
    
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Detectar se é mobile ou desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Usar link adequado para cada plataforma
    const whatsappUrl = isMobile 
      ? `whatsapp://send?phone=55027996860022&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=55027996860022&text=${encodedMessage}`;
    
    // Redirecionar diretamente (evita bloqueio de popup)
    window.location.href = whatsappUrl;
    
    toast("Redirecionando para WhatsApp...", {
      description: "Você será redirecionado para finalizar o pedido"
    });
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