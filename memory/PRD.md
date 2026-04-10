# Tiger Rentank — CheckFlowUp SaaS

## Descrição
Sistema SaaS multi-módulo para gestão de checklists de operações logísticas, incluindo Transbordo, Logística Interna e Logística Externa.

## Arquitetura
- **Frontend**: HTML/CSS/JS puro (single-page application)
- **Storage**: IndexedDB (local) + localStorage para configurações
- **Backend**: FastAPI (para futuras expansões)

## Módulos
1. **Transbordo** - Checklist de operações de transbordo de cargas
2. **Logística Interna** - Movimentação e controle de equipamentos dentro da planta
3. **Logística Externa** - Atendimentos externos, certificação e inspeção
4. **Visão Geral** - Dashboard consolidado

## Implementações Realizadas (24/03/2026)

### Alterações no Módulo Transbordo
1. ✅ **Substituição da seção "Inspeção do Equipamento"** por seção **"Equipamentos"** (igual Logística Externa)
   - Campos: Nº Série, Modelo, Data Certificação, Vencimento Certif, Nº Eslinga, Data Cert Eslinga, Vencimento Eslinga, Observações, Fotos
   - Status: Aprovado, Reprovado, Pendente
   - Botão "+ Adicionar Equipamento"

2. ✅ **Remoção da opção "TROCA"** das questões de Inspeção da Carga
   - Contentores: apenas SIM, NÃO, N/A
   - IBCs/Tambores: apenas SIM, NÃO, N/A

3. ✅ **Nova seção "Modelos de Equipamentos"** na aba Configurações
   - Cadastrar novos modelos
   - Remover modelos existentes
   - Modelos aparecem no dropdown do Equipamento

## Backlog / Próximas Implementações (Atualizado para Operação Offline-First)
- P0: Transformação do site HTML em um PWA instalável com Service Worker para uso 100% offline.
- P1: Login Local e Controle de Acesso por Módulo via PIN, bloqueando perfis não-Administradores na tela inicial.
- P1: Aprimoramento da Exportação (Geração de Planilhas CSV/Excel) no Dashboard e Histórico.
- P2: Integração com cliente de Email local (abrir nativo via link dinâmico).
- **Cancelados/Pausados:** Backend com MongoDB e Sincronização multi-dispositivo não fazem mais parte do escopo atual devido à falta de investimentos na nuvem.

## Arquivos Principais
- `/app/frontend/public/app.html` - Aplicação principal (HTML único)
- `/app/backend/server.py` - API FastAPI (básica)

## Configurações (localStorage)
- `tiger_transbordo_config` - Clientes, Responsáveis, Produtos, Modelos
- `tiger_draft_*` - Rascunhos automáticos
- `tiger_theme` - Tema (dark/light)
