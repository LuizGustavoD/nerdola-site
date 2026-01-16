import fecktonAvatar from "@/assets/avatars/feckton.png";
import therealgiAvatar from "@/assets/avatars/therealgi.png";
import carlosboludoAvatar from "@/assets/avatars/carlosboludo.png";
import laranjacAvatar from "@/assets/avatars/laranjac.png";
import happygamesAvatar from "@/assets/avatars/happygames.png";

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
    description: "O nerdola original. Mestre em programação e debates sobre qual é o melhor editor de código. Defensor fervoroso do modo escuro e das mecânicas de café.",
    curiosities: [
      "Já programou 48 horas seguidas",
      "Tem mais de 1000 horas em jogos de puzzle",
      "Nunca usou modo claro na vida"
    ],
    phrases: [
      "É só um bug, relaxa",
      "Funciona na minha máquina"
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
  }
];
