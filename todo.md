Instructions
    (A) Backend (Node.js)
        Refatorar I/O de bloqueio: Substituir [`fs.readFileSync`](\backend\src\routes\items.js) por operações assíncronas não bloqueantes. @refactor #backend
        Melhorar desempenho do [`/api/stats`](\backend\src\routes\stats.js): Implementar caching, monitoramento de mudanças de arquivo ou estratégia inteligente para evitar recálculo em cada requisição. @refactor #backend
        Adicionar testes unitários (Jest) para as rotas de itens: Incluir testes para casos de sucesso e de erro. @feat #backend

    (C) Frontend (React) {c}
        Corrigir vazamento de memória em [`Items.js`](\frontend\src\pages\Items.js): Resolver o problema que ocorre se o componente for desmontado antes do fetch ser concluído. @fix #frontend
        Implementar paginação e busca: Criar uma lista paginada com busca server-side (usando o parâmetro `q`). @feat #frontend
        Melhorar desempenho da lista: Integrar virtualização (ex: `react-window`) para manter a UI fluida com grandes listas. @feat #frontend
        Polimento de UI/UX: Aprimorar estilização, acessibilidade e adicionar estados de carregamento/esqueleto. @feat #frontend

    (B) Geral {c}
        Escrever `SOLUTION.md`: Descrever a abordagem utilizada e as trade-offs. #endgame
        Garantir código idiomático e limpo com comentários quando necessário. #endgame
        Implementar tratamento de erros robusto e considerar casos de borda. #endgame
        Garantir que todos os testes passem via `npm test` (frontend e backend). #endgame

Recruter Comments {c}
    [Extra logger middleware stub for candidate to enhance. Ln 1](\backend\src\middleware\logger.js) #backend
    [Utility intentionally unused by routes (candidate should refactor) Ln 1](\backend\src\utils\stats.js) #backend
    [Clean‑up to avoid memory leak. Ln 14](\frontend\src\pages\Items.js) #frontend


