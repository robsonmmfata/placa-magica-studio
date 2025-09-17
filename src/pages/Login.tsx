import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const success = await login(email, password);
    
    if (success) {
      toast("Login realizado com sucesso!");
      navigate("/dashboard");
    } else {
      toast("Credenciais inválidas", {
        description: "Verifique seu email e senha"
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            PlaquinhaFlex
          </CardTitle>
          <CardDescription>
            Faça login para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm font-semibold mb-2">Usuários de teste:</p>
            <div className="text-xs space-y-1">
              <p><strong>Admin:</strong> admin@plaquinhaflex.com</p>
              <p><strong>Cliente:</strong> cliente@teste.com</p>
              <p><strong>Senha:</strong> 123456</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;