/**
 * Todo o conteúdo do site fica aqui. Para trocar fotos, nomes ou textos,
 * edite este arquivo — os componentes leem tudo daqui.
 *
 * Fotos: coloque os arquivos em /public/images/... e preencha o campo `src`
 * (ex.: src: "/images/trabalhos/corte-01.jpg"). Enquanto `src` estiver vazio,
 * o site mostra um espaço reservado no mesmo formato.
 */

export const brand = {
  name: "Fabrício Pereira Barber Club",
  short: "Fabrício Pereira",
  city: "Araguari – MG",
  instagram: "https://www.instagram.com/fabriciopereirabarberclub",
  instagramHandle: "@fabriciopereirabarberclub",
  rating: "4,9",
  reviewsCount: 197,
  followers: "1.900+",
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Fabr%C3%ADcio+Pereira+Barber+Club+I+Araguari",
};

export type DayHours = { open: string; close: string } | null;

/** Índice 0 = domingo … 6 = sábado */
export const unitOneHours: DayHours[] = [
  null,
  { open: "13:00", close: "20:00" },
  { open: "09:00", close: "20:00" },
  { open: "09:00", close: "20:00" },
  { open: "09:00", close: "20:00" },
  { open: "08:00", close: "20:00" },
  { open: "08:00", close: "20:00" },
];

export const weekdayNames = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export type Unit = {
  id: "unidade-1" | "unidade-2";
  name: string;
  label: string;
  street: string;
  district: string;
  cityLine: string;
  phoneDisplay: string;
  /** Número no formato internacional, só dígitos (usado no wa.me) */
  whatsapp: string;
  mapsUrl: string;
  embedQuery: string;
  hours: DayHours[] | null;
};

export const units: Unit[] = [
  {
    id: "unidade-1",
    name: "Barber Club I",
    label: "Unidade Centro",
    street: "R. Dom Silvério, 78",
    district: "Rosário (Centro)",
    cityLine: "Araguari – MG · 38440-060",
    phoneDisplay: "(34) 99647-9537",
    whatsapp: "5534996479537",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=R.+Dom+Silv%C3%A9rio,+78+-+Ros%C3%A1rio,+Araguari+-+MG,+38440-060",
    embedQuery: "R. Dom Silvério, 78 - Rosário, Araguari - MG, 38440-060",
    hours: unitOneHours,
  },
  {
    id: "unidade-2",
    name: "Barber Club II",
    label: "Unidade Miranda",
    street: "Av. Minas Gerais, 635",
    district: "Miranda",
    cityLine: "Araguari – MG · 38440-207",
    phoneDisplay: "(34) 99153-9904",
    whatsapp: "5534991539904",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Av.+Minas+Gerais,+635+-+Miranda,+Araguari+-+MG,+38440-207",
    embedQuery: "Av. Minas Gerais, 635 - Miranda, Araguari - MG, 38440-207",
    hours: null,
  },
];

export const mainUnit = units[0];

export type Service = {
  id: string;
  name: string;
  description: string;
  /** Aceita escolher entre hora marcada e ordem de chegada */
  modes: boolean;
};

export const services: Service[] = [
  {
    id: "corte",
    name: "Corte de cabelo",
    description:
      "Degradê, social, navalhado ou na tesoura. A gente conversa antes e corta do jeito que você pediu.",
    modes: true,
  },
  {
    id: "barba",
    name: "Barba",
    description:
      "Desenho, toalha quente e acabamento na navalha. Contorno alinhado com o formato do rosto.",
    modes: true,
  },
  {
    id: "infantil",
    name: "Corte infantil",
    description:
      "Paciência de sobra com os pequenos. Corte caprichado sem pressa, no tempo da criança.",
    modes: false,
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha na navalha",
    description:
      "Limpeza e alinhamento discretos, para completar o visual sem exagero.",
    modes: false,
  },
];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  src?: string;
  instagram?: string;
};

export const team: TeamMember[] = [
  {
    id: "fabricio",
    name: "Fabrício Pereira",
    role: "Fundador e barbeiro",
    bio: "À frente do Barber Club, cuida de cada corte como se fosse o primeiro. Também é quem ensina a nova geração no curso Fast Barber's.",
    src: "", // ex.: "/images/equipe/fabricio.jpg"
  },
  {
    id: "barbeiro-2",
    name: "Nome do barbeiro",
    role: "Barbeiro",
    bio: "Especialista em degradê e acabamento na navalha. Atendimento atento, do primeiro pente ao último detalhe.",
    src: "", // ex.: "/images/equipe/barbeiro-2.jpg"
  },
];

export type GalleryItem = {
  src?: string;
  alt: string;
};

/** Fotos verticais (4:5). Para trocar, coloque em /public/images/trabalhos/ */
export const gallery: GalleryItem[] = [
  { src: "/images/trabalhos/degrade-risco.jpg", alt: "Degradê navalhado com risco lateral" },
  { src: "/images/trabalhos/infantil-topete.jpg", alt: "Corte infantil com topete" },
  { src: "/images/trabalhos/mid-fade-topete.jpg", alt: "Mid fade com topete penteado" },
  { src: "/images/trabalhos/social-barba.jpg", alt: "Corte social com barba alinhada" },
  { src: "/images/trabalhos/low-fade-barba.jpg", alt: "Low fade com barba degradê" },
  { src: "/images/trabalhos/infantil-tesoura.jpg", alt: "Corte infantil na tesoura" },
  { src: "/images/trabalhos/degrade-alto.jpg", alt: "Degradê alto com topete" },
  { src: "/images/trabalhos/textura-volume.jpg", alt: "Corte com textura e volume no topo" },
];

export const heroImage = { src: "", alt: "Fabrício Pereira atendendo na barbearia" };
export const aboutImage = { src: "", alt: "Interior da unidade Centro" };
export const courseImage = {
  src: "", // ex.: "/images/curso/fast-barbers.jpg"
  alt: "Instrutores do curso Fast Barber's",
};

export const course = {
  name: "Fast Barber's",
  title: "Curso de barbeiro para iniciantes",
  pitch:
    "Aprenda a cortar cabelo do zero e comece a ganhar dinheiro como barbeiro. Turma pequena, cadeira de verdade e acompanhamento de quem vive a profissão todo dia.",
  bullets: [
    { title: "Para iniciantes", text: "Não precisa saber nada. Você começa segurando a máquina do jeito certo." },
    { title: "Aulas práticas", text: "Mais tempo cortando do que assistindo. Prática com modelos reais." },
    { title: "Método passo a passo", text: "Do degradê básico ao acabamento na navalha, em etapas claras." },
  ],
  whatsapp: "5534996479537",
  phoneDisplay: "(34) 99647-9537",
};

export type Review = {
  author: string;
  meta: string;
  when: string;
  text: string;
};

export const reviews: Review[] = [
  {
    author: "Alysson Duarte",
    meta: "Local Guide",
    when: "há 11 meses",
    text: "Acertou no corte de cabelo e na barba, ficando do jeito que queria. Poucos barbeiros fazem isso.",
  },
  {
    author: "Rafaela Nunes",
    meta: "Local Guide",
    when: "há 4 anos",
    text: "Fabrício é excelente! Atende meu marido e meus dois filhos pequenos. Fico admirada com a paciência dele com as crianças e com a perfeição do corte.",
  },
  {
    author: "Edson Veríssimo",
    meta: "Local Guide",
    when: "há 4 anos",
    text: "Local agradável, climatizado, som ambiente no volume certo! Profissionais competentes, atualizados, serviço de qualidade! Recomendo!",
  },
  {
    author: "Esdras Nery da Rocha",
    meta: "Local Guide",
    when: "há 2 anos",
    text: "A equipe do Fabrício é excelente, tem atendimento com horário marcado ou por chegada e tem preço justo.",
  },
  {
    author: "Tiago Guimarães",
    meta: "Google",
    when: "há 1 ano",
    text: "Ambiente agradável, ótimo atendimento combinando com um bom preço além de profissionais dedicados, parabéns e sucesso.",
  },
  {
    author: "Leidiane Santos",
    meta: "Local Guide",
    when: "há 5 anos",
    text: "Atendimento de excelente qualidade. Prestação de serviço rápido, lugar limpo e organizado.",
  },
  {
    author: "Gean Souza",
    meta: "Google",
    when: "há 7 anos",
    text: "Excelente profissional, ótimo atendimento. Local de dar aquele tapa no visual e tomar aquela cerveja bem gelada.",
  },
];

export const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#equipe", label: "Equipe" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#curso", label: "Curso" },
  { href: "#unidades", label: "Unidades" },
];
