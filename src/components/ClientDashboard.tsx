import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, Clock, CheckCircle, Star, Edit, Phone, MapPin, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [addressForm, setAddressForm] = useState({
    street: "Rua das Flores, 123",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567"
  });

  // Mock data
  const userOrders = [
    { 
      id: "PF001", 
      product: "Placa Identificadora Cão", 
      size: "20x30cm", 
      status: "completed", 
      date: "2024-01-15", 
      value: 55.00,
      tracking: "BR123456789BR" 
    },
    { 
      id: "PF002", 
      product: "Placa Identificadora Gato", 
      size: "10x20cm", 
      status: "processing", 
      date: "2024-01-20", 
      value: 45.00,
      tracking: "BR987654321BR" 
    },
    { 
      id: "PF003", 
      product: "Placa Universal", 
      size: "30x40cm", 
      status: "pending", 
      date: "2024-01-25", 
      value: 65.00 
    },
  ];

  const favoriteProducts = [
    { id: 1, name: "Placa Cão Premium", price: 55.00, image: "/placeholder.svg" },
    { id: 2, name: "Placa Gato Elegante", price: 45.00, image: "/placeholder.svg" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'processing': return 'default';
      case 'completed': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'processing': return <Package className="w-3 h-3" />;
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  const handleViewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleRateOrder = (order: any) => {
    setSelectedOrder(order);
    setRating(5);
    setReview("");
    setShowRatingDialog(true);
  };

  const handleSubmitRating = () => {
    toast.success(`Avaliação de ${rating} estrelas enviada com sucesso!`);
    setShowRatingDialog(false);
  };

  const handleTrackOrder = (tracking: string) => {
    window.open(`https://rastreamento.correios.com.br/app/index.php?codigo=${tracking}`, '_blank');
  };

  const handleUpdateProfile = () => {
    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }
    toast.success("Dados atualizados com sucesso!");
    setShowEditProfile(false);
  };

  const handleUpdateAddress = () => {
    if (!addressForm.street.trim() || !addressForm.zipCode.trim()) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    toast.success("Endereço atualizado com sucesso!");
    setShowAddressDialog(false);
  };

  const handleContactSupport = () => {
    const message = "Olá! Preciso de ajuda com meus pedidos.";
    const whatsappUrl = `https://wa.me/55027996860022?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Minha Conta</h1>
          <p className="text-muted-foreground">Bem-vindo, {user?.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Meus Pedidos</CardTitle>
                <CardDescription>Acompanhe o status dos seus pedidos</CardDescription>
              </CardHeader>
              <CardContent>
                {userOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Você ainda não fez nenhum pedido</p>
                    <Button onClick={() => navigate("/")}>
                      Ver Produtos
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold">Pedido #{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status === 'pending' && 'Pendente'}
                            {order.status === 'processing' && 'Em Produção'}
                            {order.status === 'completed' && 'Concluído'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="font-medium">{order.product}</p>
                            <p className="text-sm text-muted-foreground">Tamanho: {order.size}</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="font-bold text-lg">R$ {order.value.toFixed(2)}</p>
                            {order.tracking && (
                              <p className="text-xs text-muted-foreground">
                                Rastreio: {order.tracking}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex gap-2 justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewOrderDetails(order)}
                            >
                              Detalhes
                            </Button>
                            {order.status === 'completed' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleRateOrder(order)}
                              >
                                <Star className="w-3 h-3 mr-1" />
                                Avaliar
                              </Button>
                            )}
                            {order.tracking && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleTrackOrder(order.tracking)}
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Rastrear
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Address & Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Gerencie seus dados e endereços</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Dados Pessoais
                    </h4>
                    <p className="text-sm">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => setShowEditProfile(true)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Endereço Principal
                    </h4>
                    <p className="text-sm">Rua das Flores, 123</p>
                    <p className="text-sm text-muted-foreground">Bairro Centro - SP, 01234-567</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => setShowAddressDialog(true)}
                    >
                      <MapPin className="w-3 h-3 mr-1" />
                      Alterar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate("/customize")} 
                  className="w-full"
                  variant="customize"
                >
                  Personalizar Placa
                </Button>
                <Button 
                  onClick={() => navigate("/cart")} 
                  variant="outline" 
                  className="w-full"
                >
                  Ver Carrinho
                </Button>
                <Button 
                  onClick={() => navigate("/")} 
                  variant="outline" 
                  className="w-full"
                >
                  Catálogo
                </Button>
              </CardContent>
            </Card>

            {/* Favorites */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Favoritos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {favoriteProducts.map((product) => (
                    <div key={product.id} className="flex gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50" onClick={() => navigate("/customize")}>
                      <div className="w-12 h-12 bg-muted rounded flex-shrink-0 flex items-center justify-center">
                        <Star className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-sm font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate("/")}
                  >
                    Ver Todos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Suporte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">atendimento@plaquinhaflex.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-muted-foreground">(51) 3209-8027</p>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={handleContactSupport}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Fale Conosco
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Details Dialog */}
        <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes do Pedido #{selectedOrder?.id}</DialogTitle>
              <DialogDescription>Informações completas do seu pedido</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Produto</Label>
                <p className="text-sm font-medium">{selectedOrder?.product}</p>
              </div>
              <div>
                <Label>Tamanho</Label>
                <p className="text-sm">{selectedOrder?.size}</p>
              </div>
              <div>
                <Label>Status</Label>
                <Badge variant={getStatusColor(selectedOrder?.status)} className="flex items-center gap-1 w-fit">
                  {getStatusIcon(selectedOrder?.status)}
                  {selectedOrder?.status === 'pending' && 'Pendente'}
                  {selectedOrder?.status === 'processing' && 'Em Produção'}
                  {selectedOrder?.status === 'completed' && 'Concluído'}
                </Badge>
              </div>
              <div>
                <Label>Data do Pedido</Label>
                <p className="text-sm">{selectedOrder?.date && new Date(selectedOrder.date).toLocaleDateString('pt-BR')}</p>
              </div>
              {selectedOrder?.tracking && (
                <div>
                  <Label>Código de Rastreamento</Label>
                  <p className="text-sm font-mono">{selectedOrder.tracking}</p>
                </div>
              )}
              <div>
                <Label>Valor</Label>
                <p className="text-lg font-bold">R$ {selectedOrder?.value?.toFixed(2)}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowOrderDetails(false)}>Fechar</Button>
              {selectedOrder?.tracking && (
                <Button onClick={() => handleTrackOrder(selectedOrder.tracking)}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Rastrear Pedido
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rating Dialog */}
        <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Avaliar Pedido #{selectedOrder?.id}</DialogTitle>
              <DialogDescription>Conte-nos sobre sua experiência</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nota (1 a 5 estrelas)</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-2xl focus:outline-none"
                    >
                      <Star 
                        className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="review">Comentário (opcional)</Label>
                <Textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Compartilhe sua experiência com o produto..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRatingDialog(false)}>Cancelar</Button>
              <Button onClick={handleSubmitRating}>Enviar Avaliação</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Profile Dialog */}
        <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Dados Pessoais</DialogTitle>
              <DialogDescription>Atualize suas informações</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditProfile(false)}>Cancelar</Button>
              <Button onClick={handleUpdateProfile}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Address Dialog */}
        <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Atualizar Endereço</DialogTitle>
              <DialogDescription>Mantenha seu endereço de entrega atualizado</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="street">Endereço</Label>
                <Input
                  id="street"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({...addressForm, street: e.target.value})}
                  placeholder="Rua, número"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    value={addressForm.neighborhood}
                    onChange={(e) => setAddressForm({...addressForm, neighborhood: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={addressForm.zipCode}
                    onChange={(e) => setAddressForm({...addressForm, zipCode: e.target.value})}
                    placeholder="00000-000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                    maxLength={2}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddressDialog(false)}>Cancelar</Button>
              <Button onClick={handleUpdateAddress}>Salvar Endereço</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export { ClientDashboard };