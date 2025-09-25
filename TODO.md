# TODO: Ajustes na Pré-visualização da Placa 30x20 cm

## Passos do Plano Aprovado

- [ ] Criar/Atualizar TODO.md com os passos (concluído).
- [ ] Editar `src/components/CustomizationCanvas.tsx`:
  - [ ] Ajustar dimensões do oval para 30x20: largura 30% (0.30), altura 60% (0.60).
  - [ ] Mudar escala da imagem para `Math.min` (contain) para evitar overflow.
  - [ ] Ajustar bordas do oval proporcionalmente (manter strokeWidth, mas basear em novo rx/ry).
  - [ ] Aplicar mudanças na seção de imagem processada (com remoção de fundo).
  - [ ] Aplicar as mesmas mudanças na seção de fallback (sem remoção de fundo).
- [ ] Testar as mudanças: Executar o app, selecionar placa 30x20, fazer upload de foto e verificar se não transborda mais.
- [ ] Atualizar TODO.md com progresso após testes.
- [ ] Finalizar tarefa com attempt_completion se aprovado pelo usuário.
