# 🧮 Smart Price Calculator

Uma aplicação de alta precisão desenvolvida para facilitar o processo de venda em loja, permitindo o cálculo instantâneo de preços parcelados com base em entradas variadas, taxas de juros progressivas e impostos sobre encargos financeiros.

## 🚀 Funcionalidades

- **Cálculo de Entrada Flexível:** Abatimento automático do valor pago via PIX/Dinheiro.
- **Tabela de Juros Dinâmica:** Aplicação de taxas conforme o número de parcelas (até 21x).
- **Cálculo de Imposto Oculto:** Aplicação automática de 8% de imposto sobre o valor bruto dos juros.
- **Interface Minimalista:** Design focado em usabilidade móvel para agilidade no atendimento.

## 📐 Lógica Matemática

O sistema utiliza uma abordagem de precisão para garantir que centavos não sejam perdidos em arredondamentos de ponto flutuante. A fórmula mestre aplicada é:

$$V_{final} = (V_{v} - V_{e}) \times (1 + i \times 1.08)$$

Onde:
- $V_{final}$ = Valor total a ser parcelado.
- $V_{v}$ = Valor do produto à vista.
- $V_{e}$ = Valor da entrada.
- $i$ = Taxa de juros da parcela selecionada.

## 📊 Tabela de Juros Aplicada

| Parcelas | Juros (%) |
| :--- | :--- |
| 2 - 6x | 5% |
| 7 - 9x | 9% |
| 10 - 12x | 12% |
| 13 - 15x | 15% |
| 16 - 18x | 18% |
| 19 - 21x | 21% |

## 🛠️ Tecnologias Recomendadas

- **React / Next.js** (Framework)
- **Tailwind CSS** (Estilização)
- **Decimal.js** (Precisão Financeira)
- **Vercel** (Hospedagem)

---
Desenvolvido para otimização de fluxo de caixa e transparência em vendas internas.