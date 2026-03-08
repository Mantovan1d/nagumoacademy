export interface Question {
  id: number;
  texto: string;
  alternativas: { label: string; texto: string }[];
  correta: string;
}

export const quizTitle = "Cross Merchandising no Supermercado";
export const videoId = "YFX-uZo9Ekk";
export const videoUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0`;
export const videoDescription =
  "Aprenda como organizar produtos complementares para aumentar as vendas e melhorar a experiência do cliente no supermercado.";
export const videoDuration = "3min 42s";

export const questions: Question[] = [
  {
    id: 1,
    texto: "O que é Cross Merchandising?",
    alternativas: [
      { label: "A", texto: "Colocar produtos aleatórios nas prateleiras" },
      { label: "B", texto: "Colocar produtos complementares próximos" },
      { label: "C", texto: "Vender apenas produtos em promoção" },
      { label: "D", texto: "Organizar produtos por preço" },
    ],
    correta: "B",
  },
  {
    id: 2,
    texto: "Qual é o principal objetivo do Cross Merchandising?",
    alternativas: [
      { label: "A", texto: "Reduzir o estoque" },
      { label: "B", texto: "Aumentar o ticket médio de compra" },
      { label: "C", texto: "Diminuir o número de funcionários" },
      { label: "D", texto: "Reduzir o espaço na gôndola" },
    ],
    correta: "B",
  },
  {
    id: 3,
    texto: "Exemplo de Cross Merchandising: queijo ralado próximo de qual produto?",
    alternativas: [
      { label: "A", texto: "Refrigerante" },
      { label: "B", texto: "Macarrão e molho de tomate" },
      { label: "C", texto: "Produtos de limpeza" },
      { label: "D", texto: "Ração para animais" },
    ],
    correta: "B",
  },
  {
    id: 4,
    texto: "O Cross Merchandising ajuda em qual aspecto da experiência do cliente?",
    alternativas: [
      { label: "A", texto: "Confundir o cliente" },
      { label: "B", texto: "Facilitar a jornada de compra" },
      { label: "C", texto: "Aumentar o tempo na fila" },
      { label: "D", texto: "Reduzir a variedade" },
    ],
    correta: "B",
  },
  {
    id: 5,
    texto: "Qual setor do supermercado mais se beneficia do Cross Merchandising?",
    alternativas: [
      { label: "A", texto: "Apenas o setor de limpeza" },
      { label: "B", texto: "Todos os setores podem se beneficiar" },
      { label: "C", texto: "Apenas o setor de frios" },
      { label: "D", texto: "Apenas o caixa" },
    ],
    correta: "B",
  },
  {
    id: 6,
    texto: "Carvão e espeto de churrasco próximos da carne é um exemplo de:",
    alternativas: [
      { label: "A", texto: "Promoção cruzada" },
      { label: "B", texto: "Cross Merchandising" },
      { label: "C", texto: "Liquidação" },
      { label: "D", texto: "Merchandising vertical" },
    ],
    correta: "B",
  },
  {
    id: 7,
    texto: "Para um bom Cross Merchandising, é essencial:",
    alternativas: [
      { label: "A", texto: "Colocar produtos sem relação juntos" },
      { label: "B", texto: "Conhecer o perfil e hábitos do consumidor" },
      { label: "C", texto: "Ignorar as tendências de consumo" },
      { label: "D", texto: "Usar apenas produtos caros" },
    ],
    correta: "B",
  },
  {
    id: 8,
    texto: "Qual ferramenta pode ajudar a identificar combinações de Cross Merchandising?",
    alternativas: [
      { label: "A", texto: "Planilha de férias" },
      { label: "B", texto: "Dados de vendas e cestas de compra" },
      { label: "C", texto: "Relatório de absenteísmo" },
      { label: "D", texto: "Manual de RH" },
    ],
    correta: "B",
  },
  {
    id: 9,
    texto: "Cross Merchandising pode aumentar as vendas em até:",
    alternativas: [
      { label: "A", texto: "1%" },
      { label: "B", texto: "5 a 10%" },
      { label: "C", texto: "40 a 50%" },
      { label: "D", texto: "Não tem impacto" },
    ],
    correta: "C",
  },
  {
    id: 10,
    texto: "Onde NÃO é recomendado aplicar Cross Merchandising?",
    alternativas: [
      { label: "A", texto: "Em pontas de gôndola" },
      { label: "B", texto: "Próximo ao caixa" },
      { label: "C", texto: "Em locais sem fluxo de clientes" },
      { label: "D", texto: "Em ilhas promocionais" },
    ],
    correta: "C",
  },
  {
    id: 11,
    texto: "Qual é a melhor forma de avaliar se o Cross Merchandising está funcionando?",
    alternativas: [
      { label: "A", texto: "Perguntar ao gerente" },
      { label: "B", texto: "Analisar o aumento nas vendas dos produtos envolvidos" },
      { label: "C", texto: "Contar os produtos na prateleira" },
      { label: "D", texto: "Verificar a temperatura da loja" },
    ],
    correta: "B",
  },
];
