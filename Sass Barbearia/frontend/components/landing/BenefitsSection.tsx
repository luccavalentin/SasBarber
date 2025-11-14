'use client';

import React from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Users, MessageSquare, BarChart3, Zap, Shield, TrendingUp, CheckCircle } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
  color: string;
  gradient: string;
}

export default function BenefitsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const benefits: Benefit[] = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Agenda Inteligente',
      description: 'Sistema automatizado que elimina 80% das falhas. Lembretes via WhatsApp e SMS, sincronização em tempo real.',
      metric: '-80% Falhas',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-600/20 to-cyan-600/20',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Controle Financeiro Total',
      description: 'Dashboard em tempo real com fluxo de caixa, análise de rentabilidade e previsões financeiras inteligentes.',
      metric: 'Controle Total',
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-600/20 to-emerald-600/20',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Gestão de Clientes Premium',
      description: 'CRM completo com histórico detalhado, análise comportamental, fidelidade e comunicação personalizada.',
      metric: '3x Mais Volta',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-600/20 to-pink-600/20',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'WhatsApp Business Integrado',
      description: 'Comunicação direta, confirmação automática de agendamentos e campanhas de marketing personalizadas.',
      metric: '+60% Resposta',
      color: 'from-green-600 to-green-700',
      gradient: 'from-green-700/20 to-green-800/20',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Relatórios Avançados',
      description: 'Análise profunda de performance, serviços mais vendidos, barbeiros com maior ticket e tendências de mercado.',
      metric: 'Insights Valiosos',
      color: 'from-orange-500 to-red-500',
      gradient: 'from-orange-600/20 to-red-600/20',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Automação Completa',
      description: 'Reduza trabalho manual em 70%. Notificações automáticas, cobrança recorrente e relatórios programados.',
      metric: '70% Menos Trabalho',
      color: 'from-yellow-500 to-amber-500',
      gradient: 'from-yellow-600/20 to-amber-600/20',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Segurança Enterprise',
      description: 'Dados protegidos com criptografia de ponta a ponta, backups automáticos e conformidade total com LGPD.',
      metric: '100% Seguro',
      color: 'from-indigo-500 to-blue-500',
      gradient: 'from-indigo-600/20 to-blue-600/20',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Crescimento Escalável',
      description: 'Sistema que cresce com seu negócio. De uma unidade a uma rede completa de barbearias.',
      metric: 'Escalável',
      color: 'from-teal-500 to-cyan-500',
      gradient: 'from-teal-600/20 to-cyan-600/20',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-cream via-white to-cream relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gold/5 via-transparent to-burgundy/5"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #0A1428 2px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-transparent backdrop-blur-sm border border-gold/30 px-6 py-3 rounded-full mb-8 shadow-lg shadow-gold/20"
          >
            <CheckCircle className="w-5 h-5 text-gold" />
            <span className="text-gold font-bold text-sm uppercase tracking-wider">
              Recursos Poderosos
            </span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-7xl font-black text-black mb-8 leading-tight">
            Tudo que sua barbearia precisa para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold relative inline-block">
              dominar o mercado
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-2 bg-gold/20 rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : {}}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
            Ferramentas profissionais desenvolvidas especificamente para barbearias modernas 
            que querem crescer de forma sustentável e lucrativa.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5,
              }}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon with Animation */}
                <motion.div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${benefit.color} text-white mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {benefit.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-black text-black mb-4 group-hover:text-deep-navy transition-colors">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed text-sm min-h-[80px]">
                  {benefit.description}
                </p>

                {/* Metric Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-gold/10 text-gold font-bold py-2.5 px-5 rounded-full text-sm border border-gold/30 backdrop-blur-sm shadow-md"
                >
                  <TrendingUp className="w-4 h-4" />
                  {benefit.metric}
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-gold/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-transparent to-gold/5 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-10 bg-gradient-to-r from-deep-navy via-dark-charcoal to-deep-navy rounded-3xl p-10 shadow-2xl border border-gold/20 backdrop-blur-xl max-w-4xl mx-auto"
          >
            <div className="text-left flex-1">
              <div className="text-3xl font-black text-cream mb-3">
                Pronto para transformar sua barbearia?
              </div>
              <div className="text-metallic-silver text-lg">
                Acesso imediato após o pagamento. Sistema completo e profissional.
              </div>
            </div>
            <Link href="/auth/register" className="hidden lg:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-black py-5 px-10 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-gold/50 text-lg"
              >
                Começar Agora
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
