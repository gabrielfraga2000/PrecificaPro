# 🧮 PrecificaPro - Calculadora de Vendas Inteligente

**PrecificaPro** é um Web App (SPA) de alta precisão desenvolvido para auxiliar vendedores em lojas físicas a calcular, em tempo real, o valor final de vendas parceladas que envolvem entradas e juros progressivos.

O foco da aplicação é entregar o **valor exato a ser digitado na maquininha de cartão**, eliminando erros humanos e inconsistências de arredondamento que resultam em prejuízo financeiro.

## 🎯 O Que o Programa Faz?

O aplicativo resolve um cenário comum de negociação:
1. O cliente quer comprar um produto de **Valor à Vista** (ex: R$ 4.000,00).
2. O cliente oferece uma **Entrada** em dinheiro ou PIX (ex: R$ 2.000,00).
3. O restante será parcelado no cartão de crédito, onde incidem:
   - **Juros Progressivos:** Quanto mais parcelas, maior a taxa.
   - **Tributação:** Uma taxa de imposto (8%) aplicada sobre o valor dos juros gerados.

O PrecificaPro calcula instantaneamente o valor da parcela e o total financiado, garantindo que a soma matemática feche perfeitamente.

## 🧠 Lógica Matemática (Alta Precisão)

Diferente de calculadoras comuns que calculam a parcela e multiplicam pelo número de meses (o que gera erros de centavos), o PrecificaPro utiliza uma abordagem **Top-Down** para garantir precisão financeira:

1. **Cálculo do Residual:** `Valor à Vista - Entrada`.
2. **Cálculo dos Juros:** Aplica-se a taxa da tabela sobre o Residual.
3. **Cálculo do Imposto:** Aplica-se 8% sobre o valor dos Juros (não sobre o principal).
4. **Total Financiado (Maquininha):** Soma-se `Residual + Juros + Imposto`. Este valor é arredondado para 2 casas decimais apenas no final.
5. **Definição da Parcela:** O Total Financiado é dividido pelo número de parcelas para referência do cliente.

$$Valor_{Maquininha} = Residual + (Residual \times Taxa_{Juros}) + (Juros \times 0.08)$$

## 🚀 Funcionalidades

- **Cálculo Híbrido:** Aceita valor total e valor de entrada (abatimento automático).
- **Entrada Sanitizada:** Campos de texto inteligentes que aceitam formatação brasileira (vírgula para decimais) e funcionam perfeitamente em teclados móveis.
- **Tabela de Juros Dinâmica:** Seleção automática da taxa baseada no número de parcelas escolhido.
- **Validação de Erros:** Impede cálculos onde a entrada é maior que o valor do produto.
- **Design Mobile-First:** Interface escura (Dark Mode), botões grandes e leitura facilitada para uso rápido em pé, no balcão da loja.

## 📊 Tabela de Juros Configurável

O sistema utiliza as seguintes faixas de juros para o cálculo:

| Parcelas | Taxa de Juros |
| :--- | :--- |
| 2x | 4,13% |
| 3x | 4,88% |
| 4x | 5,63% |
| 5x | 6,38% |
| 6x | 7,13% |
| 7x | 8,23% |
| 8x | 8,98% |
| 9x | 9,73% |
| 10x | 10,48% |
| 11x | 11,23% |
| 12x | 11,98% |
| 13x | 12,73% |
| 14x | 13,48% |
| 15x | 14,23% |
| 16x | 14,98% |
| 17x | 15,73% |
| 18x | 16,48% |
| 19x | 17,23% |
| 20x | 17,98% |
| 21x | 18,73% |

## 🛠️ Tecnologias Utilizadas

- **React 19** (Hooks e Estado)
- **TypeScript** (Segurança de tipos)
- **Tailwind CSS** (Estilização responsiva)
- **Vite** (Build tool rápida)

---
Desenvolvido para otimizar o fluxo de caixa e garantir transparência total nas vendas parceladas.