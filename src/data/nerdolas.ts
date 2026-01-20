import fecktonAvatar from "@/assets/avatars/feckton.png";
import therealgiAvatar from "@/assets/avatars/therealgi.png";
import carlosboludoAvatar from "@/assets/avatars/carlosboludo.png";
import laranjacAvatar from "@/assets/avatars/laranjac.png";
import happygamesAvatar from "@/assets/avatars/happygames.png";

// Placeholder for new nerdolas without custom avatars
const placeholderAvatar = "https://api.dicebear.com/7.x/pixel-art/svg?seed=";

export interface Nerdola {
  id: string;
  name: string;
  avatar: string;
  description: string;
  curiosities: string[];
  phrases: string[];
  nerdLevel: number; // 1-10
}

export const nerdolas: Nerdola[] = [
  {
    id: "feckton",
    name: "Feckt0n",
    avatar: fecktonAvatar,
    description: "O Nerdola da capital (São Paulo). Passou pela miséria, fome, Mathiensen e Zona Leste. Carrega uma personalidade explosiva, enche o saco em qualquer discussão sem sentido e acaba por cair em ragebaits facilmente.",
    curiosities: [
      "Ama One Piece",
      "Nasceu nos EUA (Não tem sequer uma memória de lá)",
      "Tem 1700+ horas de R6 (não se orgulha disso)",
      "Estuda TI (como 80% do grupo)",
      "Não tem apêndice"
    ],
    phrases: [
      "Não tenho mais comida, não tenho mais nada, terei de vender skins de CS",
      "Eu não consigo identificar meu erro, com todo respeito"
    ],
    nerdLevel: 9
  },
  {
    id: "therealgi",
    name: "The Real Gi",
    avatar: therealgiAvatar,
    description: "O cara das streams e dos gameplays épicos. Conhecido por suas reações exageradas e por nunca admitir que perdeu - 'foi lag, certeza'.",
    curiosities: [
      "Já quebrou 3 mouses de raiva",
      "Coleciona bonés de times de esports",
      "Conhece todos os atalhos do Discord"
    ],
    phrases: [
      "VAI! VAI! VAAAAAAAI!",
      "Foi lag, juro"
    ],
    nerdLevel: 8
  },
  {
    id: "carlosboludo",
    name: "Carlos Boludo",
    avatar: carlosboludoAvatar,
    description: "O meme ambulante do grupo. Sempre tem uma piadinha na ponta da língua e consegue transformar qualquer situação em um momento cômico.",
    curiosities: [
      "Já foi banido de 5 servidores por spam de memes",
      "Tem uma pasta com 10GB de memes organizados",
      "Sonha em viralizar no TikTok"
    ],
    phrases: [
      "Você viu aquele meme?",
      "KKKKKKKKKKKK"
    ],
    nerdLevel: 7
  },
  {
    id: "laranjac",
    name: "LaranjaC",
    avatar: laranjacAvatar,
    description: "O vitamin C do grupo! Sempre positivo, animado e cheio de energia. É o cara que mantém o server ativo às 3 da manhã.",
    curiosities: [
      "Já tomou 15 copos de suco de laranja em um dia",
      "Tem um canal de speedrun com 47 inscritos",
      "Dorme apenas 4 horas por noite"
    ],
    phrases: [
      "Bora jogar mais uma!",
      "Energia infinita, mano!"
    ],
    nerdLevel: 6
  },
  {
    id: "happygames",
    name: "HappyGames",
    avatar: happygamesAvatar,
    description: "O gamer mais feliz que você vai conhecer. Não importa se ganha ou perde, está sempre sorrindo. Especialista em jogos retrô e nostalgia.",
    curiosities: [
      "Coleciona cartuchos de Super Nintendo",
      "Nunca xingou em um jogo online",
      "Já zerou todos os Mario clássicos"
    ],
    phrases: [
      "GG, pessoal!",
      "O importante é se divertir!"
    ],
    nerdLevel: 8
  },
  {
    id: "lucasbelline",
    name: "Lucas Belline",
    avatar: `${placeholderAvatar}lucas-belline`,
    description: "O estrategista do grupo. Sempre pensando três jogadas à frente, seja no xadrez ou nos games competitivos. Analítico e focado.",
    curiosities: [
      "Alcançou rank Diamante em 4 jogos diferentes",
      "Tem planilhas para tudo na vida",
      "Adora explicar teorias de jogos"
    ],
    phrases: [
      "Calma, tenho um plano",
      "A matemática não mente"
    ],
    nerdLevel: 8
  },
  {
    id: "davibelline",
    name: "Davi Belline",
    avatar: `${placeholderAvatar}davi-belline`,
    description: "Irmão mais novo do Lucas, mas não menos competitivo. Especialista em speedruns e quebrar recordes impossíveis.",
    curiosities: [
      "Detém 3 recordes mundiais em speedrun",
      "Consegue jogar de olhos fechados",
      "Tem reflexos mais rápidos que um gato"
    ],
    phrases: [
      "Isso aí é fácil, olha só",
      "Novo recorde pessoal!"
    ],
    nerdLevel: 9
  },
  {
    id: "pedromendes",
    name: "Pedro Mendes",
    avatar: `${placeholderAvatar}pedro-mendes`,
    description: "O filósofo gamer. Questiona a existência enquanto joga RPG. Conhecido por suas análises profundas sobre narrativas de jogos.",
    curiosities: [
      "Já escreveu 50 páginas de análise sobre Dark Souls",
      "Coleciona livros de lore de jogos",
      "Sonha em criar seu próprio RPG"
    ],
    phrases: [
      "Mas você já parou pra pensar...",
      "A história é mais profunda do que parece"
    ],
    nerdLevel: 7
  },
  {
    id: "urbano",
    name: "Urbano",
    avatar: `${placeholderAvatar}urbano`,
    description: "O builder supremo. Se existe um modo criativo, ele domina. Especialista em Minecraft e jogos de construção.",
    curiosities: [
      "Construiu uma cidade inteira no Minecraft",
      "Tem mais de 5000 horas em jogos sandbox",
      "Já foi contratado para construir mapas custom"
    ],
    phrases: [
      "Espera, preciso só terminar essa construção",
      "Falta só mais um detalhezinho"
    ],
    nerdLevel: 8
  },
  {
    id: "daark",
    name: "Daark",
    avatar: `${placeholderAvatar}daark`,
    description: "O misterioso do grupo. Joga sempre de personagens sombrios e tem uma coleção invejável de skins raras.",
    curiosities: [
      "Nunca mostrou o rosto nas calls",
      "Tem todas as skins exclusivas de eventos",
      "Só joga depois das 22h"
    ],
    phrases: [
      "...",
      "Interessante"
    ],
    nerdLevel: 9
  },
  {
    id: "alvaro",
    name: "Alvaro",
    avatar: `${placeholderAvatar}alvaro`,
    description: "O social gamer. Conecta todo mundo e organiza as sessions. Sem ele, o grupo não jogaria junto.",
    curiosities: [
      "Admin de 15 servidores do Discord",
      "Conhece todo mundo da comunidade",
      "Nunca perde uma game night"
    ],
    phrases: [
      "Bora marcar pra hoje?",
      "Chama mais gente!"
    ],
    nerdLevel: 6
  }
];
