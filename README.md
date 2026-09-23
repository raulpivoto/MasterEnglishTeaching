# Language Lens Studio

Plano de estudos para duas metas: levar o inglês ao **C2** e se tornar um **professor de inglês de excelência** para adultos corporativos (online, grupos de 2 a 3).

## 📱 Instalar no celular

O app é um **PWA**: instala pelo navegador, abre em tela cheia pelo ícone e funciona offline.

1. **Ativar o GitHub Pages (uma vez só):** no GitHub, abra o repositório → **Settings** → **Pages** → em *Build and deployment*, escolha **Deploy from a branch**, selecione o branch `claude/english-c2-teaching-plan-xwaqp4` e a pasta `/ (root)` → **Save**. Em 1 a 2 minutos o app fica em:
   **https://raulpivoto.github.io/MasterEnglishTeaching/**
2. **Instalar:**
   - **Android (Chrome):** abra o link → menu **⋮** → **Instalar app** (ou *Adicionar à tela inicial*).
   - **iPhone (Safari):** abra o link → botão **Compartilhar** → **Adicionar à Tela de Início**.

O progresso do app fica salvo no próprio celular. Para juntar com o progresso do link do Claude, use **“Levar meu progresso para outro aparelho”** no rodapé: copie o código de um lado e cole no outro.

## 🛠️ Como atualizar

`src/studio.html` é a fonte (a mesma página publicada no Claude). Depois de editar:

```bash
python build.py   # gera index.html e muda a versão do cache em sw.js
```

## O que tem no site

| Seção | Conteúdo |
|---|---|
| Hoje | Checklist do Módulo 1, plano semanal e diagnóstico |
| Trilha | Lições estilo Duolingo: 5 unidades, 10 lições, 80 exercícios com correção automática, corações, XP, níveis, ofensiva, conquistas, Boss Fights e revisão de erros |
| Error Log | As 16 correções do texto diagnóstico e os seus próprios erros |
| Quiz | Retrieval practice com o Error Log |
| Nuance Lab | Escalas de sentido ("desencorajado", desacordo diplomático) e colocações |
| Toolkit do Professor | Context First, Live Language Doc, correction contract, recap pós-aula e mais |
| Tarefas | Parte A (6 frases) e Parte B ("chateado" + plano de eliciting) |
| Coach | Correção e tradução com nuance (disponível na versão aberta no Claude) |

## Módulos

- **Módulo 1: Precision & Nuance** (em andamento)
- Módulo 2: The Meeting (TBL, hedging, desacordo diplomático)

## Gamificação (Trilha)

| Atividade | XP |
|---|---|
| Acerto na 1ª tentativa | 10 |
| Acerto depois de errar / revisão de erro | 5 |
| Lição concluída / lição perfeita | +20 / +10 |
| Boss Fight (cada acerto) / vitória | 15 / +50 |

Meta diária: 50 XP. Meta semanal: 350 XP. A ofensiva tem 1 folga por semana.
