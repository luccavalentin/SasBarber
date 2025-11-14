'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Shield, Zap, Crown, TrendingUp, CreditCard, Lock, FileText } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  popular: boolean;
  features: string[];
  cta: string;
  icon: React.ReactNode;
  badge?: string;
  gradient: string;
}

export default function PricingSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });

  const plans: Plan[] = [
    {
      name: 'Completo',
      price: 'R$ 97',
      period: '/mês',
      description: 'Sistema completo para sua barbearia com todas as funcionalidades essenciais',
      popular: true,
      icon: <Zap className="w-6 h-6" />,
      badge: 'Plano Único',
      gradient: 'from-gold to-yellow-500',
      features: [
        'Agenda online ilimitada',
        'Cadastro completo de clientes',
        'Usuários ilimitados',
        'Controle financeiro completo',
        'Fluxo de caixa detalhado',
        'WhatsApp Business integrado',
        'Sistema de fidelidade',
        'Relatórios avançados',
        'Controle de estoque',
        'Gestão de vendas',
        'Histórico completo',
        'Suporte prioritário',
      ],
      cta: 'Começar Agora',
    },
  ];

  return (
    <section id="precos" ref={ref} className="relative py-32 bg-gradient-to-b from-white via-cream to-white overflow-hidden">
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
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #0A1428 2px, transparent 0)',
            backgroundSize: '50px 50px',
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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-transparent backdrop-blur-sm border border-gold/30 px-6 py-3 rounded-full mb-8 shadow-lg shadow-gold/20"
          >
            <span className="text-gold font-bold text-sm uppercase tracking-wider">Investimento Inteligente</span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-7xl font-black text-dark-charcoal mb-8 leading-tight">
            Escolha o plano{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold relative inline-block">
              perfeito para você
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-2 bg-gold/30 rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : {}}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
            Menos de 3 cortes por mês pagam o sistema. Retorno garantido no primeiro mês.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`relative rounded-3xl p-10 transition-all duration-500 transform ${
                plan.popular
                  ? 'bg-gradient-to-br from-deep-navy via-dark-charcoal to-deep-navy text-cream shadow-2xl border-2 border-gold scale-105'
                  : 'bg-white text-dark-charcoal shadow-xl border border-gray-200 hover:border-gold/30'
              } overflow-hidden`}
            >
              {/* Animated Background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 hover:opacity-5 transition-opacity duration-500`}
                animate={plan.popular ? {
                  opacity: [0.05, 0.1, 0.05],
                } : {}}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-gradient-to-r from-gold to-yellow-500 text-black font-black py-3 px-8 rounded-full text-sm shadow-2xl border-4 border-cream/20">
                    {plan.badge || 'MAIS POPULAR'}
                  </div>
                </motion.div>
              )}

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`inline-flex p-5 rounded-2xl mb-6 shadow-lg ${
                  plan.popular
                    ? 'bg-gold/20 text-gold border border-gold/30'
                    : 'bg-deep-navy/5 text-deep-navy'
                }`}
              >
                {plan.icon}
              </motion.div>

              {/* Plan Info */}
              <h3 className="text-2xl font-black mb-3">{plan.name}</h3>
              <p className={`mb-8 text-sm leading-relaxed ${
                plan.popular ? 'text-metallic-silver' : 'text-gray-600'
              }`}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-10 pb-10 border-b border-cream/10">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-black">{plan.price}</span>
                  <span className={`text-xl ${
                    plan.popular ? 'text-metallic-silver' : 'text-gray-500'
                  }`}>
                    {plan.period}
                  </span>
                </div>
                <div className={`text-sm ${
                  plan.popular ? 'text-metallic-silver' : 'text-gray-500'
                }`}>
                  ou R$ {parseInt(plan.price.replace('R$ ', '').replace(',00', '')) * 12}/ano (economia de 2 meses)
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + featureIndex * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center border border-gold/30 mt-0.5"
                    >
                      <Check className="w-4 h-4 text-gold" />
                    </motion.div>
                    <span className={`text-sm leading-relaxed ${
                      plan.popular ? 'text-cream' : 'text-gray-700'
                    }`}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-5 rounded-2xl font-black transition-all duration-300 shadow-xl hover:shadow-2xl text-lg ${
                    plan.popular
                      ? 'bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black shadow-gold/50'
                      : 'bg-gradient-to-r from-dark-charcoal to-deep-navy hover:from-deep-navy hover:to-dark-charcoal text-cream'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </Link>

              {/* Decorative Elements */}
              {plan.popular && (
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-deep-navy via-dark-charcoal to-deep-navy rounded-3xl p-12 text-center shadow-2xl border border-gold/30 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-burgundy/10"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            />

            <div className="relative z-10">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gold/20 rounded-full mb-8 border-2 border-gold/40"
              >
                <Shield className="w-12 h-12 text-gold" />
              </motion.div>
              
              <h3 className="text-4xl font-black text-cream mb-6">
                Pagamento 100% Seguro
              </h3>
              
              <p className="text-xl text-metallic-silver leading-relaxed max-w-3xl mx-auto font-light mb-8">
                Aceitamos todos os principais métodos de pagamento. Seus dados estão protegidos com criptografia de nível bancário.
              </p>

              {/* Payment Methods */}
              <div className="mt-10">
                <h4 className="text-xl font-bold text-cream mb-6 text-center">Métodos de Pagamento</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {/* Cartão de Crédito */}
                  <div className="flex flex-col items-center gap-2 p-4 bg-cream/5 rounded-xl border border-cream/10 hover:border-gold/30 transition-all">
                    <CreditCard className="w-8 h-8 text-gold" />
                    <span className="text-xs text-metallic-silver font-medium text-center">Cartão de Crédito</span>
                  </div>
                  
                  {/* Boleto */}
                  <div className="flex flex-col items-center gap-2 p-4 bg-cream/5 rounded-xl border border-cream/10 hover:border-gold/30 transition-all">
                    <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-6-6H6v-2h8v2z"/>
                    </svg>
                    <span className="text-xs text-metallic-silver font-medium text-center">Boleto</span>
                  </div>
                  
                  {/* PIX */}
                  <div className="flex flex-col items-center gap-2 p-4 bg-cream/5 rounded-xl border border-cream/10 hover:border-gold/30 transition-all">
                    <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                    <span className="text-xs text-metallic-silver font-medium text-center">PIX</span>
                  </div>
                  
                  {/* Kiwify */}
                  <div className="flex flex-col items-center gap-2 p-4 bg-cream/5 rounded-xl border border-cream/10 hover:border-gold/30 transition-all">
                    <div className="w-8 h-8 bg-gradient-to-br from-gold to-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-black font-black text-sm">K</span>
                    </div>
                    <span className="text-xs text-metallic-silver font-medium text-center">Kiwify</span>
                  </div>
                </div>

                {/* Bandeiras Aceitas */}
                <div className="mt-8">
                  <p className="text-sm text-metallic-silver mb-4 text-center font-medium">Bandeiras aceitas no cartão de crédito:</p>
                  <div className="flex flex-wrap justify-center items-center gap-3">
                    {[
                      { name: 'Visa', color: 'from-blue-600 to-blue-800' },
                      { name: 'Mastercard', color: 'from-red-600 to-orange-600' },
                      { name: 'Elo', color: 'from-green-600 to-green-800' },
                      { name: 'Hipercard', color: 'from-purple-600 to-pink-600' },
                      { name: 'Amex', color: 'from-indigo-600 to-blue-600' },
                      { name: 'Diners', color: 'from-gray-600 to-gray-800' },
                    ].map((bandeira) => (
                      <div key={bandeira.name} className={`px-4 py-2 bg-gradient-to-r ${bandeira.color} rounded-lg text-white text-xs font-bold shadow-lg`}>
                        {bandeira.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Segurança */}
                <div className="mt-8 flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3 text-sm text-metallic-silver">
                    <Lock className="w-5 h-5 text-gold" />
                    <span className="font-medium">Pagamento 100% Seguro</span>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-metallic-silver">
                    <span>🔒 SSL 256 bits</span>
                    <span>•</span>
                    <span>🛡️ PCI Compliant</span>
                    <span>•</span>
                    <span>🔐 Dados Criptografados</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-10 bg-white rounded-3xl p-8 shadow-2xl border border-gray-200"
          >
            <div className="text-left">
              <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Avaliação Média</div>
              <div className="flex items-center gap-3">
                <div className="flex text-gold text-2xl">
                  {'★'.repeat(5)}
                </div>
                <span className="text-3xl font-black text-dark-charcoal">4.9</span>
                <span className="text-gray-500">/ 5.0</span>
              </div>
            </div>
            <div className="h-16 w-px bg-gray-200"></div>
            <div className="text-left">
              <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Baseado em</div>
              <div className="text-3xl font-black text-dark-charcoal">2.368 avaliações</div>
            </div>
            <div className="h-16 w-px bg-gray-200"></div>
            <div className="text-left">
              <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Clientes ativos</div>
              <div className="text-3xl font-black text-gold">500+</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
