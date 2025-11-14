'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import { Clock, ArrowRight, Check, TrendingUp, Zap } from 'lucide-react';

export default function FinalCTASection() {
  const [countdown, setCountdown] = useState('02:15:33');
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Removido efeitos de parallax que fazem a página sumir durante scroll
  // const scrollY = useMotionValue(0);
  // const y = useTransform(scrollY, [0, 1000], [100, -100]);
  // const opacity = useTransform(scrollY, [0, 500, 1000], [0, 1, 1]);

  useEffect(() => {
    setIsMounted(true);
    
    // Removido listener de scroll que causava efeito de sumir
    // let ticking = false;
    // const handleScroll = () => {
    //   if (!ticking) {
    //     requestAnimationFrame(() => {
    //       if (ref.current) {
    //         scrollY.set(window.scrollY);
    //       }
    //       ticking = false;
    //     });
    //     ticking = true;
    //   }
    // };

    // window.addEventListener('scroll', handleScroll, { passive: true });
    // handleScroll();
    
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 2);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setCountdown('00:00:00');
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={ref}
      className="relative py-40 bg-gradient-to-br from-deep-navy via-[#050a1a] to-black overflow-hidden"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/20 rounded-full blur-3xl blur-optimized pointer-events-none"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-burgundy/20 rounded-full blur-3xl blur-optimized pointer-events-none"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -120, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Animated Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(212,175,55,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        // Removido style que causa efeito de sumir durante scroll
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/20 via-gold/10 to-transparent backdrop-blur-md border border-gold/40 px-8 py-4 rounded-full mb-10 shadow-lg shadow-gold/30"
          >
            <span className="text-gold font-bold text-sm uppercase tracking-wider">
              Oferta Limitada de Lançamento
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-8xl font-black text-cream mb-10 leading-tight"
          >
            Pronto para{' '}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold inline-block"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% auto',
              }}
            >
              transformar
            </motion.span>
            <br />
            sua barbearia?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl lg:text-3xl text-metallic-silver mb-16 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Junte-se às <strong className="text-gold font-semibold">500+ barbearias</strong> que já transformaram
            seu negócio, organizaram seu fluxo e encantaram seus clientes com o Sas Barber.
          </motion.p>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto"
          >
            {[
              'Sistema completo e profissional',
              'Redução significativa em falhas de agendamento',
              'Gestão centralizada e eficiente',
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center gap-4 bg-gradient-to-br from-cream/10 to-cream/5 backdrop-blur-md border border-cream/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-gold/50 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center border border-gold/40"
                >
                  <Check className="w-6 h-6 text-gold" />
                </motion.div>
                <span className="text-cream text-base font-medium text-left">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Link href="/auth/register" className="group relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-gradient-to-r from-gold via-yellow-500 to-gold text-black font-black py-7 px-14 rounded-3xl text-2xl transition-all duration-300 shadow-2xl hover:shadow-gold/50 overflow-hidden w-full sm:w-auto"
              >
                <motion.span
                  className="relative z-10 flex items-center gap-4 justify-center"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Começar Agora
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-7 h-7" />
                  </motion.div>
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.button>
            </Link>
            <Link href="/auth/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-cream/30 hover:border-gold text-cream hover:text-gold font-black py-7 px-12 rounded-3xl text-xl transition-all duration-300 backdrop-blur-md bg-cream/5 hover:bg-gold/20 w-full sm:w-auto shadow-xl"
              >
                Falar com Especialista
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-10 mb-12 text-sm text-metallic-silver flex-wrap"
          >
            {[
              { icon: Check, text: 'Acesso imediato após pagamento' },
              { icon: Check, text: 'Pagamento 100% seguro' },
              { icon: Check, text: 'Suporte especializado' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-3 group"
              >
                <item.icon className="w-6 h-6 text-gold group-hover:scale-125 transition-transform" />
                <span className="text-base">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-8 bg-gradient-to-r from-black/60 via-black/40 to-black/60 backdrop-blur-xl border-2 border-gold/40 rounded-3xl p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gold/20 via-transparent to-gold/20"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            />

            <div className="relative z-10 flex items-center gap-8">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold/30 to-gold/10 rounded-2xl border-2 border-gold/40 shadow-xl"
              >
                <Clock className="w-10 h-10 text-gold" />
              </motion.div>
              
              <div className="text-left">
                <div className="text-sm text-metallic-silver mb-3 font-semibold uppercase tracking-widest">
                  Oferta por tempo limitado
                </div>
                <motion.div
                  key={countdown}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl font-black text-gold font-mono tracking-wider"
                >
                  {countdown}
                </motion.div>
              </div>
            </div>

            {/* Floating Stars */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-gold/30"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 10}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <svg className="w-4 h-4 fill-gold/30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
