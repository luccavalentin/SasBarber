'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedStars } from '@/components/ui/AnimatedStars';

interface Message {
  text: string;
  sender: 'lucca' | string;
  time: string;
  minutesAfterStart: number;
  useTypingEffect?: boolean; // Novo campo para ativar efeito de digitação
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  barbearia: string;
  city: string;
  rating: number;
  messages: Message[];
  startHour: number;
  startMinute: number;
  battery: number;
  connectionType: 'wifi' | '4g' | '5g';
  avatarUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    role: 'Barbeiro',
    barbearia: 'Estilo Clássico',
    city: 'São Paulo, SP',
    rating: 5,
    startHour: 14,
    startMinute: 45,
    battery: 67,
    connectionType: '4g',
    avatarUrl: 'https://randomuser.me/api/portraits/men/44.jpg',
    messages: [
      {
        text: 'Opa, Carlos! Tudo certo meu irmão? Passando só pra ver como tá sua evolução com o sistema. Se precisar de suporte, tamo por aqui sempre 😊',
        sender: 'lucca',
        time: '14:45',
        minutesAfterStart: 0,
      },
      {
        text: 'Fala mano! Tá ótimo por aqui viu. Cara... nem tenho o que falar kkkk.',
        sender: 'carlos',
        time: '14:50',
        minutesAfterStart: 5,
      },
      {
        text: 'Sério? Conta aí uai! rs',
        sender: 'lucca',
        time: '14:53',
        minutesAfterStart: 8,
      },
      {
        text: 'Sisteminha caiu com uma luva! Me economizou puta tempo e dor de cabeça velho! Antes eu vivia esquecendo horário, cruzava agenda de um cliente com outro, mó transtorno. Perdia cliente direto 😊 Agora tá tudo redondinho. Meus horários tão certinhos e vejo tudo que entra e sai. Meu filho até brincou falando que virei "empresário" kkkk.',
        sender: 'carlos',
        time: '14:57',
        minutesAfterStart: 12,
        useTypingEffect: true,
      },
      {
        text: 'Meu amigo 😊 que satisfação ler isso! Demaisssss! 🍀 Meu objetivo é exatamente esse aí! Se você cresce e prospera, eu cresço e prospero também 😊 Nossos negócios são diferentes, mas caminhamos pelo mesmo objetivo 😊 Você quer crescer e escalar, e meu objetivo é ajudar pra que isso aconteça 😊 Quando seu negócio prospera, o meu prospera junto! Meu querido, conte comigo viu!',
        sender: 'lucca',
        time: '15:02',
        minutesAfterStart: 17,
      },
    ],
  },
  {
    id: '2',
    name: 'Ana Paula Santos',
    role: 'Barbeira',
    barbearia: 'Salão Corte & Arte',
    city: 'Rio de Janeiro, RJ',
    rating: 5,
    startHour: 11,
    startMinute: 20,
    battery: 72,
    connectionType: 'wifi',
    avatarUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
    messages: [
      {
        text: 'Oi Ana! Tudo bem?\n\nTô passando só pra acompanhar seu progresso com o sistema ❤️\n\nQualquer coisa me chama.',
        sender: 'lucca',
        time: '11:20',
        minutesAfterStart: 0,
      },
      {
        text: 'Oi meu querido!\n\nTá tudo ótimo por aqui.\n\nDe verdade… mudou muita coisa.',
        sender: 'ana',
        time: '11:25',
        minutesAfterStart: 5,
        useTypingEffect: true,
      },
      {
        text: 'Que bom! O que sentiu mais diferença?',
        sender: 'lucca',
        time: '11:28',
        minutesAfterStart: 8,
      },
      {
        text: 'Ah… eu sempre fui perdida na parte administrativa. Sempre!\n\nO sistema literalmente salvou minha vida kkk.\n\nAgora sei o lucro certinho de cada serviço.\n\nFicou tudo claro.',
        sender: 'ana',
        time: '11:35',
        minutesAfterStart: 15,
        useTypingEffect: true,
      },
    ],
  },
  {
    id: '3',
    name: 'Roberto Alves',
    role: 'Barbeiro',
    barbearia: 'Barbearia do Roberto',
    city: 'Belo Horizonte, MG',
    rating: 5,
    startHour: 16,
    startMinute: 30,
    battery: 45,
    connectionType: '4g',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    messages: [
      {
        text: 'E aí Robertão! Como tá meu parceiro?\n\nVim ver se tá curtindo o sistema nesses primeiros meses 🔥',
        sender: 'lucca',
        time: '16:30',
        minutesAfterStart: 0,
      },
      {
        text: 'Fala mano! Tá top demais.\n\nCara… já vi diferença logo de cara.',
        sender: 'roberto',
        time: '16:35',
        minutesAfterStart: 5,
      },
      {
        text: 'Boa! Em quê?',
        sender: 'lucca',
        time: '16:37',
        minutesAfterStart: 7,
      },
      {
        text: 'Eu esquecia agendamento direto kkkkk.\n\nAgora não perco mais nenhum.\n\nOs lembretes automáticos salvam minha vida.\n\nMinha esposa até falou que tô até mais tranquilo.',
        sender: 'roberto',
        time: '16:42',
        minutesAfterStart: 12,
        useTypingEffect: true,
      },
    ],
  },
  {
    id: '4',
    name: 'José Maria Costa',
    role: 'Proprietário',
    barbearia: 'Salão Moderno',
    city: 'Curitiba, PR',
    rating: 5,
    startHour: 15,
    startMinute: 10,
    battery: 89,
    connectionType: 'wifi',
    avatarUrl: 'https://randomuser.me/api/portraits/men/68.jpg',
    messages: [
      {
        text: 'Grande José! Tudo certo por aí?\n\nTô acompanhando aqui que você tá usando nas duas unidades.\n\nPassando só pra ver se tá fluindo bem.',
        sender: 'lucca',
        time: '15:10',
        minutesAfterStart: 0,
      },
      {
        text: 'Cara… tá sendo excelente.\n\nDe verdade.',
        sender: 'jose',
        time: '15:14',
        minutesAfterStart: 4,
      },
      {
        text: 'Sério? Que bom! O que ajudou mais?',
        sender: 'lucca',
        time: '15:17',
        minutesAfterStart: 7,
      },
      {
        text: 'Eu sofria pra controlar tudo.\n\nEra correria o tempo todo.\n\nAgora não…\n\nConsigo gerenciar as duas unidades de casa.\n\nRelatórios em tempo real.\n\nEra o que eu precisava.',
        sender: 'jose',
        time: '15:23',
        minutesAfterStart: 13,
      },
    ],
  },
  {
    id: '5',
    name: 'Fernando Lima',
    role: 'Barbeiro',
    barbearia: 'Estilo Masculino',
    city: 'Porto Alegre, RS',
    rating: 5,
    startHour: 10,
    startMinute: 50,
    battery: 34,
    connectionType: '4g',
    avatarUrl: 'https://randomuser.me/api/portraits/men/25.jpg',
    messages: [
      {
        text: 'Fernando! Como tá meu mano?\n\nSó passando pra ver como tá sua rotina com o sistema ✌️',
        sender: 'lucca',
        time: '10:50',
        minutesAfterStart: 0,
      },
      {
        text: 'Fala mano! Tá ótimo.\n\nFoi o melhor investimento que fiz.',
        sender: 'fernando',
        time: '10:55',
        minutesAfterStart: 5,
      },
      {
        text: 'Caramba, sério? O que mais mudou?',
        sender: 'lucca',
        time: '10:57',
        minutesAfterStart: 7,
      },
      {
        text: 'Organização total da agenda.\n\nE outra… descobri que alguns serviços que eu achava que davam lucro…\n\nNão davam nada kkkkk.\n\nAgora eu precifico certo.',
        sender: 'fernando',
        time: '11:04',
        minutesAfterStart: 14,
        useTypingEffect: true,
      },
    ],
  },
  {
    id: '6',
    name: 'Marcia Oliveira',
    role: 'Proprietária',
    barbearia: 'Salão Premium',
    city: 'Salvador, BA',
    rating: 5,
    startHour: 17,
    startMinute: 15,
    battery: 56,
    connectionType: 'wifi',
    avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
    messages: [
      {
        text: 'Oi Marcia! Tudo bem?\n\nVim ver como seus clientes estão reagindo ao sistema 🙂',
        sender: 'lucca',
        time: '17:15',
        minutesAfterStart: 0,
      },
      {
        text: 'Oi querido!\n\nEles tão amando viu.',
        sender: 'marcia',
        time: '17:19',
        minutesAfterStart: 4,
      },
      {
        text: 'Que massa! O que mais gostaram?',
        sender: 'lucca',
        time: '17:22',
        minutesAfterStart: 7,
      },
      {
        text: 'Os lembretes automáticos.\n\nReduziu muita falta!\n\nE eu finalmente sei quanto lucro tenho no dia.\n\nAntes era só chute.',
        sender: 'marcia',
        time: '17:28',
        minutesAfterStart: 13,
        useTypingEffect: true,
      },
    ],
  },
  {
    id: '7',
    name: 'Diego Moreira',
    role: 'Barbeiro',
    barbearia: 'Barbearia Corte Fino',
    city: 'Brasília, DF',
    rating: 5,
    startHour: 13,
    startMinute: 40,
    battery: 78,
    connectionType: '4g',
    avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    messages: [
      {
        text: 'Diegão! Passando só pra ver como tão as coisas aí com o sistema 💈',
        sender: 'lucca',
        time: '13:40',
        minutesAfterStart: 0,
      },
      {
        text: 'Salve mano!\n\nCara… abriu meus olhos.',
        sender: 'diego',
        time: '13:45',
        minutesAfterStart: 5,
      },
      {
        text: 'Como assim?',
        sender: 'lucca',
        time: '13:47',
        minutesAfterStart: 7,
      },
      {
        text: 'Eu era muito perdido na parte financeira.\n\nAgora vejo tudo certinho.\n\nDescobri até onde tava perdendo dinheiro sem perceber.',
        sender: 'diego',
        time: '13:53',
        minutesAfterStart: 13,
      },
    ],
  },
  {
    id: '8',
    name: 'Wellington Souza',
    role: 'Barbeiro',
    barbearia: 'Rei do Fade',
    city: 'Manaus, AM',
    rating: 5,
    startHour: 18,
    startMinute: 20,
    battery: 41,
    connectionType: '5g',
    avatarUrl: 'https://randomuser.me/api/portraits/men/56.jpg',
    messages: [
      {
        text: 'Wellington meu parceiro! Tudo suave?\n\nSó vim ver se tá rodando bem pra você ✨',
        sender: 'lucca',
        time: '18:20',
        minutesAfterStart: 0,
      },
      {
        text: 'Mano… tô impressionado kkkk.',
        sender: 'wellington',
        time: '18:25',
        minutesAfterStart: 5,
      },
      {
        text: 'Sério? Fala aí.',
        sender: 'lucca',
        time: '18:27',
        minutesAfterStart: 7,
      },
      {
        text: 'Parece que tenho uma secretária agora kkkkk.\n\nAgenda, lembrete, confirmação…\n\nTudo automático.\n\nFicou até mais profissional.',
        sender: 'wellington',
        time: '18:33',
        minutesAfterStart: 13,
      },
    ],
  },
  {
    id: '9',
    name: 'Sérgio Almeida',
    role: 'Barbeiro',
    barbearia: 'Linha Reta',
    city: 'Recife, PE',
    rating: 5,
    startHour: 14,
    startMinute: 10,
    battery: 62,
    connectionType: 'wifi',
    avatarUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
    messages: [
      {
        text: 'Sérgio! Tudo certo?\n\nTô passando pra acompanhar seu uso desses dias 👌',
        sender: 'lucca',
        time: '14:10',
        minutesAfterStart: 0,
      },
      {
        text: 'Fala irmão! Tá ótimo.\n\nVou falar a verdade…\n\nEu tinha vergonha antes kkkk.',
        sender: 'sergio',
        time: '14:15',
        minutesAfterStart: 5,
      },
      {
        text: 'Vergonha de quê?',
        sender: 'lucca',
        time: '14:17',
        minutesAfterStart: 7,
      },
      {
        text: 'Do caderno todo bagunçado kkkk.\n\nAgora é só olhar no sistema.\n\nMuito mais rápido.',
        sender: 'sergio',
        time: '14:23',
        minutesAfterStart: 13,
      },
    ],
  },
  {
    id: '10',
    name: 'Luan Santos',
    role: 'Barbeiro',
    barbearia: 'Corte Real',
    city: 'Goiânia, GO',
    rating: 5,
    startHour: 16,
    startMinute: 45,
    battery: 91,
    connectionType: '4g',
    avatarUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
    messages: [
      {
        text: 'Luanzera! Como tá mano?\n\nVim ver como tá sendo pra você nesses primeiros dias ✨',
        sender: 'lucca',
        time: '16:45',
        minutesAfterStart: 0,
      },
      {
        text: 'Fala mano!\n\nTô até assustado kkkk.',
        sender: 'luan',
        time: '16:50',
        minutesAfterStart: 5,
      },
      {
        text: 'Por quê?',
        sender: 'lucca',
        time: '16:52',
        minutesAfterStart: 7,
      },
      {
        text: 'Eu cobrava errado há anos.\n\nTudo achismo.\n\nAgora vejo o lucro real.\n\nTô ajustando tudo.',
        sender: 'luan',
        time: '16:58',
        minutesAfterStart: 13,
      },
    ],
  },
  {
    id: '11',
    name: 'Jonathan Vieira',
    role: 'Barbeiro',
    barbearia: 'Barbearia do Jhow',
    city: 'Vitória, ES',
    rating: 5,
    startHour: 12,
    startMinute: 30,
    battery: 25,
    connectionType: 'wifi',
    avatarUrl: 'https://randomuser.me/api/portraits/men/37.jpg',
    messages: [
      {
        text: 'Jhow! Tudo tranquilo?\n\nPassando pra ver se tá tudo fluindo com o sistema 🤝',
        sender: 'lucca',
        time: '12:30',
        minutesAfterStart: 0,
      },
      {
        text: 'Bicho… o que eu mais ganhei foi tempo.',
        sender: 'jonathan',
        time: '12:35',
        minutesAfterStart: 5,
      },
      {
        text: 'Como assim?',
        sender: 'lucca',
        time: '12:37',
        minutesAfterStart: 7,
      },
      {
        text: 'Eu perdia quase 1h por dia anotando coisa.\n\nAgora eu fecho o salão e vou pra casa tranquilo.',
        sender: 'jonathan',
        time: '12:44',
        minutesAfterStart: 14,
      },
    ],
  },
  {
    id: '12',
    name: 'Bruno Nascimento',
    role: 'Barbeiro',
    barbearia: '7 Vezes Barber',
    city: 'Florianópolis, SC',
    rating: 5,
    startHour: 19,
    startMinute: 5,
    battery: 38,
    connectionType: '4g',
    avatarUrl: 'https://randomuser.me/api/portraits/men/61.jpg',
    messages: [
      {
        text: 'Brunão! Beleza?\n\nVim só dar um acompanhamento e ver como tá a rotina com o sistema 💈🔥',
        sender: 'lucca',
        time: '19:05',
        minutesAfterStart: 0,
      },
      {
        text: 'Fala mano!\n\nOs clientes piraram kkkkk.',
        sender: 'bruno',
        time: '19:10',
        minutesAfterStart: 5,
      },
      {
        text: 'Com o quê?',
        sender: 'lucca',
        time: '19:12',
        minutesAfterStart: 7,
      },
      {
        text: 'Com os lembretes automáticos.\n\nQuase ninguém falta mais.\n\nE eu fiquei muito mais organizado.\n\nMudou até o clima da barbearia.',
        sender: 'bruno',
        time: '19:18',
        minutesAfterStart: 13,
      },
    ],
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function TestimonialsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    if (index > currentIndex) setDirection(1);
    else if (index < currentIndex) setDirection(-1);
    else setDirection(0);
    setCurrentIndex(index);
  };

  // Efeito "Digitando..." no status (sem alterar o texto das mensagens)
  useEffect(() => {
    const currentTestimonial = testimonials[currentIndex];
    if (!currentTestimonial) return;

    const typingIntervals: NodeJS.Timeout[] = [];
    const typingTimeouts: NodeJS.Timeout[] = [];
    let activeTypingMessage: number | null = null;

    currentTestimonial.messages.forEach((message, idx) => {
      if (message.useTypingEffect) {
        const fullText = message.text;
        let currentCharIndex = 0;
        let isDeleting = false;
        let hasCompleted = false;

        const typeMessage = () => {
          if (!hasCompleted && !isDeleting && currentCharIndex < fullText.length) {
            // Digitando - mostrar "Digitando..."
            if (activeTypingMessage !== idx) {
              activeTypingMessage = idx;
              setIsTyping(true);
            }
            currentCharIndex++;
          } else if (!hasCompleted && !isDeleting && currentCharIndex >= fullText.length) {
            // Texto completo, ocultar "Digitando..."
            hasCompleted = true;
            if (activeTypingMessage === idx) {
              setIsTyping(false);
              activeTypingMessage = null;
            }
            // Espera um pouco antes de começar a apagar
            const pauseTimeout = setTimeout(() => {
              isDeleting = true;
              hasCompleted = false;
            }, 2000); // Espera 2 segundos com texto completo
            typingTimeouts.push(pauseTimeout);
          } else if (!hasCompleted && isDeleting && currentCharIndex > 0) {
            // Apagando - mostrar "Digitando..." novamente
            if (activeTypingMessage !== idx) {
              activeTypingMessage = idx;
              setIsTyping(true);
            }
            currentCharIndex--;
          } else if (!hasCompleted && isDeleting && currentCharIndex === 0) {
            // Texto apagado, ocultar "Digitando..." e recomeçar
            isDeleting = false;
            if (activeTypingMessage === idx) {
              setIsTyping(false);
              activeTypingMessage = null;
            }
            const restartTimeout = setTimeout(() => {
              currentCharIndex = 0;
            }, 500); // Espera 0.5s antes de recomeçar
            typingTimeouts.push(restartTimeout);
          }
        };

        const interval = setInterval(typeMessage, 30); // Velocidade de digitação (30ms por caractere)
        typingIntervals.push(interval);
      }
    });

    return () => {
      typingIntervals.forEach(interval => clearInterval(interval));
      typingTimeouts.forEach(timeout => clearTimeout(timeout));
      setIsTyping(false);
    };
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000); // Reduzido de 5000ms para 8000ms (mais lento)
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-b from-dark-charcoal via-deep-navy to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-transparent backdrop-blur-sm border border-gold/30 px-6 py-3 rounded-full mb-8 shadow-lg shadow-gold/20"
          >
            <Star className="w-5 h-5 text-gold fill-gold" />
            <span className="text-gold font-bold text-sm uppercase tracking-wider">
              Depoimentos Reais
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-cream mb-6 leading-tight tracking-tight">
            O que nossos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold relative inline-block">
              clientes dizem
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1.5 bg-gold/20 rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : {}}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-metallic-silver leading-relaxed font-normal max-w-3xl mx-auto">
            Mais de <strong className="text-gold font-semibold">4.300+ clientes ativos</strong> em todo Brasil já transformaram seus negócios com o Sas Barber
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative mb-12">
          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="flex justify-center"
              >
                <div className="max-w-md w-full mx-auto">
                  {/* WhatsApp Chat Fake - Simulando Celular */}
                  <div className="relative w-full flex justify-center">
                      {/* Phone Frame */}
                      <div className="relative w-full max-w-[375px] mx-auto">
                          {/* Phone Border/Frame */}
                        <div className="relative bg-black rounded-[40px] p-2 shadow-2xl">
                          {/* Status Bar (Notch Area) */}
                          <div className="bg-black rounded-t-[32px] h-12 relative overflow-hidden">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                            {/* Status Bar Content */}
                            <div className="relative z-20 flex items-center justify-between px-6 pt-2 h-full">
                              <div className="flex items-center gap-2">
                                {/* Notification Icon for messages */}
                                <div className="relative">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                                  </svg>
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full border border-black"></div>
                                </div>
                                <div className="text-white text-xs font-semibold">{testimonials[currentIndex].messages[0].time}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                {/* Operator */}
                                <div className="text-white text-[10px] font-medium">TIM</div>
                                {/* Connection Type */}
                                {testimonials[currentIndex].connectionType === 'wifi' ? (
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                                  </svg>
                                ) : (
                                  <div className="flex items-center gap-0.5">
                                    <span className="text-white text-[9px] font-medium">{testimonials[currentIndex].connectionType.toUpperCase()}</span>
                                    {/* Signal Bars */}
                                    <div className="flex items-end gap-0.5 h-3">
                                      <div className="w-0.5 h-1 bg-white rounded-full"></div>
                                      <div className="w-0.5 h-1.5 bg-white rounded-full"></div>
                                      <div className="w-0.5 h-2 bg-white rounded-full"></div>
                                      <div className="w-0.5 h-2.5 bg-white rounded-full"></div>
                                    </div>
                                  </div>
                                )}
                                {/* Battery */}
                                <div className="flex items-center gap-1">
                                  <div className="text-white text-[10px] font-medium">{testimonials[currentIndex].battery}%</div>
                                  <div className="relative w-5 h-2.5 border border-white rounded-sm">
                                    <div className="absolute right-[-2px] top-0.5 w-0.5 h-1.5 bg-white rounded-r-sm"></div>
                                    <div className="absolute inset-0.5 bg-white rounded-sm" style={{ width: `${testimonials[currentIndex].battery}%` }}></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* WhatsApp Screen */}
                          <div className="relative bg-[#0b141a] aspect-[9/19.5] flex flex-col overflow-hidden">
                            {/* WhatsApp Header */}
                            <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3 border-b border-black/20">
                              {/* Back Arrow */}
                              <button className="text-[#8696a0]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                              {/* Profile Photo */}
                              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shadow-lg bg-gradient-to-br from-blue-600 to-blue-800">
                                <img 
                                  src={testimonials[currentIndex].avatarUrl} 
                                  alt={testimonials[currentIndex].name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    // Fallback para inicial se imagem não carregar
                                    const target = e.target as HTMLImageElement;
                                    const nameInitial = testimonials[currentIndex].name.charAt(0);
                                    target.style.display = 'none';
                                    if (!target.parentElement?.querySelector('.fallback-initial')) {
                                      const fallback = document.createElement('div');
                                      fallback.className = 'fallback-initial absolute inset-0 flex items-center justify-center text-lg text-white font-bold';
                                      fallback.textContent = nameInitial;
                                      target.parentElement?.appendChild(fallback);
                                    }
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <div className="text-white font-semibold text-sm">
                                  {testimonials[currentIndex].name}
                                  {testimonials[currentIndex].barbearia && ` - ${testimonials[currentIndex].barbearia}`}
                                </div>
                                <div className="text-xs text-[#8696a0] flex items-center gap-1">
                                  {isTyping ? (
                                    <>
                                      <span>Digitando</span>
                                      <span className="flex gap-0.5">
                                        <span className="inline-block w-1 h-1 bg-[#8696a0] rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
                                        <span className="inline-block w-1 h-1 bg-[#8696a0] rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></span>
                                        <span className="inline-block w-1 h-1 bg-[#8696a0] rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
                                      </span>
                                    </>
                                  ) : (
                                    'online'
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* WhatsApp Background Pattern */}
                            <div 
                              className="flex-1 overflow-y-auto p-3 space-y-2 relative bg-[#0b141a]"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                backgroundRepeat: 'repeat',
                              }}
                            >
                              {testimonials[currentIndex].messages.map((message, idx) => {
                                const isLucca = message.sender === 'lucca';
                                
                                return (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`flex ${isLucca ? 'justify-end' : 'justify-start'}`}
                                  >
                                    <div
                                      className={`max-w-[75%] rounded-lg ${
                                        isLucca
                                          ? 'bg-[#005c4b] text-white px-2 py-1.5'
                                          : 'bg-[#202c33] text-white px-1.5 py-1'
                                      }`}
                                      style={{
                                        borderRadius: isLucca ? '7.5px 7.5px 0 7.5px' : '7.5px 7.5px 7.5px 0',
                                      }}
                                    >
                                      <p className={`${isLucca ? 'text-xs leading-relaxed whitespace-pre-wrap' : 'text-xs whitespace-pre-line leading-tight'}`}>
                                        {message.text}
                                      </p>
                                      <div className={`text-[10px] mt-0.5 ${isLucca ? 'text-[#99beb7]' : 'text-[#8696a0]'} flex items-center gap-1 justify-end`}>
                                        <span>{message.time}</span>
                                        {isLucca && (
                                          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 16 15">
                                            <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.174.532.07l.127-.073a.419.419 0 0 0 .036-.054l3.498-4.431a.366.366 0 0 0 .063-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.174.532.07l.127-.073a.419.419 0 0 0 .036-.054l3.498-4.431a.366.366 0 0 0 .063-.512z"/>
                                          </svg>
                                        )}
                                      </div>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>

                            {/* WhatsApp Input Bar */}
                            <div className="bg-[#202c33] px-3 py-2 flex items-center gap-2 border-t border-black/20">
                              <button className="text-[#8696a0]">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                </svg>
                              </button>
                              <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-[#8696a0] text-xs">
                                Mensagem
                              </div>
                              <button className="text-[#8696a0]">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Home Indicator */}
                          <div className="bg-black rounded-b-[32px] h-8 flex items-center justify-center">
                            <div className="w-32 h-1 bg-white/30 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-deep-navy/90 to-dark-charcoal/90 backdrop-blur-xl border border-gold/20 shadow-xl hover:border-gold/40 hover:bg-gold/10 transition-all flex items-center justify-center text-gold hover:text-yellow-400 z-20"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-deep-navy/90 to-dark-charcoal/90 backdrop-blur-xl border border-gold/20 shadow-xl hover:border-gold/40 hover:bg-gold/10 transition-all flex items-center justify-center text-gold hover:text-yellow-400 z-20"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-gold'
                    : 'w-2 bg-cream/30 hover:bg-cream/50'
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-10 bg-gradient-to-r from-deep-navy/80 to-dark-charcoal/80 backdrop-blur-xl rounded-3xl p-8 border border-gold/20 shadow-2xl">
            <div className="text-left">
              <div className="text-sm text-metallic-silver mb-2 uppercase tracking-wide font-medium">Avaliação Média</div>
              <div className="flex items-center gap-3">
                <AnimatedStars rating={5} size={28} delay={0.2} repeat={true} />
                <span className="text-3xl font-black text-gold">4.9</span>
                <span className="text-metallic-silver">/ 5.0</span>
              </div>
            </div>
            <div className="h-16 w-px bg-cream/10"></div>
            <div className="text-left">
              <div className="text-sm text-metallic-silver mb-2 uppercase tracking-wide font-medium">Baseado em</div>
              <div className="text-3xl font-black text-cream">2.368 avaliações</div>
              <div className="text-xs text-metallic-silver mt-1">de barbeiros reais</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

