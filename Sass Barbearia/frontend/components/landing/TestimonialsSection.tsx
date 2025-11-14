'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  barbearia: string;
  city: string;
  photo: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    role: 'Barbeiro e Proprietário',
    barbearia: 'Barbearia Estilo Clássico',
    city: 'São Paulo, SP',
    photo: '👨‍🦱',
    rating: 5,
    text: 'Antes do Sas Barber, eu perdia cliente por esquecimento de horário e não sabia quanto realmente faturava. Hoje, tudo está organizado. Consigo ver cada centavo que entra e sai. Meu filho até elogiou a organização!'
  },
  {
    id: '2',
    name: 'Ana Paula Santos',
    role: 'Proprietária',
    barbearia: 'Corte & Arte',
    city: 'Rio de Janeiro, RJ',
    photo: '👩',
    rating: 5,
    text: 'Sou barbeira há 15 anos e sempre tive dificuldade com a parte administrativa. O sistema veio pra salvar minha vida. Agora eu sei exatamente quanto cada serviço me dá de lucro. Mudou minha vida profissional completamente.'
  },
  {
    id: '3',
    name: 'Roberto Alves',
    role: 'Barbeiro',
    barbearia: 'Barbearia do Roberto',
    city: 'Belo Horizonte, MG',
    photo: '👨',
    rating: 5,
    text: 'Comecei usar tem 3 meses e já vi a diferença. Não perco mais agendamento, os clientes recebem lembrete automaticamente pelo WhatsApp. Minha esposa até comentou que estou mais tranquilo porque não preciso mais ficar anotando tudo em papel.'
  },
  {
    id: '4',
    name: 'José Maria Costa',
    role: 'Proprietário',
    barbearia: 'Salão Moderno',
    city: 'Curitiba, PR',
    photo: '👨‍💼',
    rating: 5,
    text: 'Tenho duas unidades e precisava de algo que centralizasse tudo. O Sas Barber permitiu que eu gerencie ambas de casa. Vejo relatórios em tempo real, sei qual unidade está performando melhor. É exatamente o que eu precisava.'
  },
  {
    id: '5',
    name: 'Fernando Lima',
    role: 'Barbeiro',
    barbearia: 'Estilo Masculino',
    city: 'Porto Alegre, RS',
    photo: '👨‍🦰',
    rating: 5,
    text: 'O melhor investimento que fiz. Não só organizou minha agenda, mas me mostrou coisas que eu não sabia sobre meu próprio negócio. Descobri que alguns serviços que eu achava que davam lucro, na verdade não davam. Agora tomo decisões melhores.'
  },
  {
    id: '6',
    name: 'Marcia Oliveira',
    role: 'Proprietária',
    barbearia: 'Barbearia Premium',
    city: 'Salvador, BA',
    photo: '👩‍💼',
    rating: 5,
    text: 'Meus clientes adoram receber lembretes automáticos. Diminuiu muito as faltas. E eu finalmente consegui organizar as finanças direito. Antes, no final do mês eu não sabia se tinha lucro ou prejuízo. Agora sei dia a dia.'
  }
];

export default function TestimonialsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

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
          className="text-center mb-16 max-w-4xl mx-auto"
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
          
          <h2 className="text-5xl lg:text-7xl font-black text-cream mb-8 leading-tight">
            O que nossos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold relative inline-block">
              clientes dizem
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-2 bg-gold/20 rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : {}}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-metallic-silver leading-relaxed font-light">
            Mais de <strong className="text-gold font-semibold">2.368 barbeiros</strong> já transformaram seus negócios com o Sas Barber
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-deep-navy/90 to-dark-charcoal/90 backdrop-blur-xl rounded-2xl p-6 border border-gold/20 shadow-2xl hover:border-gold/40 transition-all relative overflow-hidden group"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-gold" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-cream leading-relaxed mb-6 text-sm relative z-10 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-cream/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center text-2xl border-2 border-gold/30 flex-shrink-0">
                  {testimonial.photo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-cream text-sm mb-1">{testimonial.name}</div>
                  <div className="text-xs text-metallic-silver truncate">{testimonial.role}</div>
                  <div className="text-xs text-gold truncate">{testimonial.barbearia}</div>
                  <div className="text-xs text-metallic-silver">{testimonial.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
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
                <div className="flex text-gold text-2xl">
                  {'★'.repeat(5)}
                </div>
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

