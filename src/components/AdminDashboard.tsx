import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Users, ShoppingCart, TrendingUp, Eye, CheckCircle, Edit, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([
    { id: "001", customer: "Maria Silva", product: "Placa Cão 20x30cm", status: "pending", value: 55.00 },
    { id: "002", customer: "João Santos", product: "Placa Gato 10x20cm", status: "completed", value: 45.00 },
    { id: "003", customer: "Ana Costa", product: "Placa Universal 30x40cm", status: "processing", value: 65.00 },
    { id: "004", customer: "Carlos Lima", product: "Placa Cão 20x30cm", status: "completed", value: 55.00 },
  ]);

  // Mock data
  const stats = {
    totalOrders: orders.length,
    totalUsers: 89,
    totalProducts: 12,
    revenue: orders.reduce((sum, order) => sum + order.value, 0)
  };

  const handleApproveOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'processing' } : order
    ));
    toast(`Pedido #${orderId} aprovado com sucesso!`);
  };

  const handleViewOrder = (orderId: string) => {
    toast(`Visualizando detalhes do pedido #${orderId}`);
  };

  const products = [
    { id: 1, name: "Placa Cão", sales: 45, stock: 100 },
    { id: 2, name: "Placa Gato", sales: 32, stock: 85 },
    { id: 3, name: "Placa Universal", sales: 28, stock: 70 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'processing': return 'default';
      case 'completed': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">Bem-vindo, {user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">+12% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+5% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">3 modelos ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.revenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+18% em relação ao mês passado</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Pedidos Recentes</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Recentes</CardTitle>
                <CardDescription>Últimos pedidos realizados na plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">#{order.id} - {order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.product}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={getStatusColor(order.status)}>
                          {order.status === 'pending' && 'Pendente'}
                          {order.status === 'processing' && 'Processando'}
                          {order.status === 'completed' && 'Concluído'}
                        </Badge>
                        <span className="font-bold">R$ {order.value.toFixed(2)}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewOrder(order.id)}>
                            <Eye className="w-3 h-3 mr-1" />
                            Ver
                          </Button>
                          {order.status === 'pending' && (
                            <Button variant="default" size="sm" onClick={() => handleApproveOrder(order.id)}>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Aprovar
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestão de Produtos</CardTitle>
                  <CardDescription>Produtos disponíveis e suas estatísticas</CardDescription>
                </div>
                <Button onClick={() => toast("Adicionar novo produto")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Produto
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.sales} vendas • Estoque: {product.stock}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast(`Editando ${product.name}`)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast(`Gerenciando estoque de ${product.name}`)}
                        >
                          <Package className="w-3 h-3 mr-1" />
                          Estoque
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => toast(`Produto ${product.name} removido`)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export { AdminDashboard };