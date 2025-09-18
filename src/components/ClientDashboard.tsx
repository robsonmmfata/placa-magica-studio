import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, CheckCircle, Star, Edit, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);

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
                              onClick={() => toast(`Visualizando detalhes do pedido #${order.id}`)}
                            >
                              Detalhes
                            </Button>
                            {order.status === 'completed' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toast(`Avaliando pedido #${order.id}`)}
                              >
                                <Star className="w-3 h-3 mr-1" />
                                Avaliar
                              </Button>
                            )}
                            {order.tracking && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toast(`Rastreamento: ${order.tracking}`)}
                              >
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
                      onClick={() => {
                        setShowEditProfile(!showEditProfile);
                        toast("Funcionalidade de edição em desenvolvimento");
                      }}
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
                      onClick={() => toast("Gerenciamento de endereços em desenvolvimento")}
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
                    onClick={() => toast("Lista completa de favoritos em desenvolvimento")}
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
                  onClick={() => toast("Redirecionando para atendimento...")}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Fale Conosco
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ClientDashboard };