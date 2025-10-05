import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showStockDialog, setShowStockDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState({ name: "", sales: 0, stock: 0 });
  const [stockForm, setStockForm] = useState({ stock: 0 });

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
    toast.success(`Pedido #${orderId} aprovado e em produção!`);
  };

  const handleViewOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    setSelectedOrder(order);
    setShowOrderDialog(true);
  };

  const [products, setProducts] = useState([
    { id: 1, name: "Placa Cão", sales: 45, stock: 100 },
    { id: 2, name: "Placa Gato", sales: 32, stock: 85 },
    { id: 3, name: "Placa Universal", sales: 28, stock: 70 },
  ]);

  const handleAddProduct = () => {
    setProductForm({ name: "", sales: 0, stock: 0 });
    setSelectedProduct(null);
    setShowProductDialog(true);
  };

  const handleEditProduct = (product: any) => {
    setProductForm({ name: product.name, sales: product.sales, stock: product.stock });
    setSelectedProduct(product);
    setShowProductDialog(true);
  };

  const handleSaveProduct = () => {
    if (!productForm.name.trim()) {
      toast.error("Nome do produto é obrigatório");
      return;
    }

    if (selectedProduct) {
      setProducts(prev => prev.map(p => 
        p.id === selectedProduct.id ? { ...p, ...productForm } : p
      ));
      toast.success(`Produto ${productForm.name} atualizado!`);
    } else {
      const newProduct = {
        id: products.length + 1,
        ...productForm
      };
      setProducts(prev => [...prev, newProduct]);
      toast.success(`Produto ${productForm.name} adicionado!`);
    }
    setShowProductDialog(false);
  };

  const handleManageStock = (product: any) => {
    setSelectedProduct(product);
    setStockForm({ stock: product.stock });
    setShowStockDialog(true);
  };

  const handleUpdateStock = () => {
    setProducts(prev => prev.map(p => 
      p.id === selectedProduct.id ? { ...p, stock: stockForm.stock } : p
    ));
    toast.success(`Estoque de ${selectedProduct.name} atualizado para ${stockForm.stock} unidades`);
    setShowStockDialog(false);
  };

  const handleDeleteProduct = (product: any) => {
    if (confirm(`Tem certeza que deseja remover ${product.name}?`)) {
      setProducts(prev => prev.filter(p => p.id !== product.id));
      toast.success(`Produto ${product.name} removido com sucesso`);
    }
  };

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
                <Button onClick={handleAddProduct}>
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
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleManageStock(product)}
                        >
                          <Package className="w-3 h-3 mr-1" />
                          Estoque
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteProduct(product)}
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

        {/* Order Details Dialog */}
        <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes do Pedido #{selectedOrder?.id}</DialogTitle>
              <DialogDescription>Informações completas do pedido</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Cliente</Label>
                <p className="text-sm font-medium">{selectedOrder?.customer}</p>
              </div>
              <div>
                <Label>Produto</Label>
                <p className="text-sm">{selectedOrder?.product}</p>
              </div>
              <div>
                <Label>Status</Label>
                <Badge variant={getStatusColor(selectedOrder?.status)}>
                  {selectedOrder?.status === 'pending' && 'Pendente'}
                  {selectedOrder?.status === 'processing' && 'Processando'}
                  {selectedOrder?.status === 'completed' && 'Concluído'}
                </Badge>
              </div>
              <div>
                <Label>Valor</Label>
                <p className="text-lg font-bold">R$ {selectedOrder?.value?.toFixed(2)}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowOrderDialog(false)}>Fechar</Button>
              {selectedOrder?.status === 'pending' && (
                <Button onClick={() => {
                  handleApproveOrder(selectedOrder.id);
                  setShowOrderDialog(false);
                }}>
                  Aprovar Pedido
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Product Form Dialog */}
        <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProduct ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
              <DialogDescription>Preencha os dados do produto</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Produto</Label>
                <Input
                  id="name"
                  value={productForm.name}
                  onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  placeholder="Ex: Placa Cão Premium"
                />
              </div>
              <div>
                <Label htmlFor="stock">Estoque Inicial</Label>
                <Input
                  id="stock"
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({...productForm, stock: parseInt(e.target.value) || 0})}
                  placeholder="100"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowProductDialog(false)}>Cancelar</Button>
              <Button onClick={handleSaveProduct}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Stock Management Dialog */}
        <Dialog open={showStockDialog} onOpenChange={setShowStockDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Gerenciar Estoque - {selectedProduct?.name}</DialogTitle>
              <DialogDescription>Atualize a quantidade em estoque</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Estoque Atual</Label>
                <p className="text-2xl font-bold">{selectedProduct?.stock} unidades</p>
              </div>
              <div>
                <Label htmlFor="newStock">Novo Estoque</Label>
                <Input
                  id="newStock"
                  type="number"
                  value={stockForm.stock}
                  onChange={(e) => setStockForm({stock: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowStockDialog(false)}>Cancelar</Button>
              <Button onClick={handleUpdateStock}>Atualizar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export { AdminDashboard };