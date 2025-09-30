# TODO: Atualizar Customização para Placas de Identificação

## Passos Lógicos para Implementar o Plano

1. **Atualizar Estados e Configuração**
   - Adicionar novos estados no componente CustomizationCanvas.tsx: `mainTitle` (para título principal), `name` (para nome/falecido), `birthDate` (data nascimento), `address` (endereço), `phone` (telefone), `email` (email). Reutilizar `homageMessage` para mensagem adicional se necessário, mas focar nos campos principais.
   - Atualizar interface CustomizationConfig para incluir esses novos campos.
   - Atualizar getDefaultText para 'identificacao' retornar "TÍTULO PRINCIPAL".
   - Garantir que onConfigChange inclua os novos campos.

2. **Atualizar Formulário (UI de Inputs)**
   - No JSX do return, adicionar condicional para product.type === 'identificacao':
     - Input para "Título Principal" (mainTitle).
     - Input para "Nome" (name).
     - Input para "Data de Nascimento" (birthDate).
     - Textarea para "Endereço" (address, multi-line).
