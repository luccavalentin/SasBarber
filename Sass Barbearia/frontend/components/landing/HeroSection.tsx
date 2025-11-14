'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, TrendingUp, Users, Zap, Calendar, DollarSign, BarChart3 } from 'lucide-react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

const weeklyData = [
  { name: 'Seg', value: 4200, appointments: 12 },
  { name: 'Ter', value: 3800, appointments: 10 },
  { name: 'Qua', value: 4500, appointments: 14 },
  { name: 'Qui', value: 5200, appointments: 16 },
  { name: 'Sex', value: 6800, appointments: 22 },
  { name: 'Sáb', value: 7800, appointments: 26 },
  { name: 'Dom', value: 7200, appointments: 24 },
];

const appointmentsData = [
  { time: '08:00', client: 'João Silva', service: 'Corte + Barba', price: 'R$ 45', status: 'confirmed', photo: '👨' },
  { time: '09:30', client: 'Maria Santos', service: 'Corte Premium', price: 'R$ 60', status: 'confirmed', photo: '👩' },
  { time: '11:00', client: 'Pedro Costa', service: 'Completo', price: 'R$ 85', status: 'confirmed', photo: '👨‍🦱' },
  { time: '14:30', client: 'Ana Lima', service: 'Corte Feminino', price: 'R$ 70', status: 'pending', photo: '👩‍🦰' },
  { time: '16:00', client: 'Carlos Souza', service: 'Corte + Barba', price: 'R$ 45', status: 'pending', photo: '👨‍💼' },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [timeOfDay, setTimeOfDay] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  
  // Removido efeitos de parallax que fazem a página sumir durante scroll
  // const scrollY = useMotionValue(0);
  // const y = useTransform(scrollY, [0, 1000], ['0%', '50%']);
  // const opacity = useTransform(scrollY, [0, 1000], [1, 0]);
  // const scale = useTransform(scrollY, [0, 500], [1, 0.95]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 400 };
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], ['-2%', '2%']), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ['-5deg', '5deg']), springConfig);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ['5deg', '-5deg']), springConfig);

  useEffect(() => {
    setIsMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Bom dia');
    else if (hour < 18) setTimeOfDay('Boa tarde');
    else setTimeOfDay('Boa noite');

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      mouseX.set(xPercent);
      mouseY.set(yPercent);
      setMousePosition({ x: clientX, y: clientY });
    };

    // Removido listener de scroll que causava efeito de sumir durante scroll
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

    // Throttle mousemove para melhor performance
    let mouseTicking = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!mouseTicking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    // Removido: window.addEventListener('scroll', handleScroll, { passive: true });
    // Removido: handleScroll();
    
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      // Removido: window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-deep-navy via-[#050a1a] to-black"
    >
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              background: [
                'radial-gradient(circle at 20% 30%, rgba(212,175,55,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 70%, rgba(114,47,55,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.3) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </div>

        {/* Advanced Particles System */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50, 0],
              x: [0, (Math.random() - 0.5) * 50, 0],
              opacity: [0, 1, 0.5, 1, 0],
              scale: [0, 1.5, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Floating Light Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/15 rounded-full blur-3xl blur-optimized pointer-events-none"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-burgundy/15 rounded-full blur-3xl blur-optimized pointer-events-none"
          animate={{
            scale: [1, 1.6, 1],
            x: [0, -180, 0],
            y: [0, -120, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Animated Grid with Perspective */}
        <div className="absolute inset-0 opacity-[0.15] perspective-1000">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(212,175,55,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212,175,55,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        // Removido style que causa efeito de sumir durante scroll
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-cream space-y-10"
          >
            {/* Badge with Real-time Data */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-4 bg-gradient-to-r from-gold/25 via-gold/15 to-transparent backdrop-blur-xl border border-gold/50 px-8 py-4 rounded-2xl shadow-2xl shadow-gold/30 group"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                <div className="h-6 w-px bg-gold/40"></div>
              </motion.div>
              <div className="text-left">
                <div className="text-gold font-black text-lg">4.9/5</div>
                <div className="text-xs text-metallic-silver">2.368 avaliações</div>
              </div>
              <motion.div
                className="flex -space-x-3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[1,2,3,4,5].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.3, zIndex: 10, rotate: 360 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-gold via-yellow-500 to-gold border-2 border-deep-navy shadow-xl"
                  />
                ))}
              </motion.div>
            </motion.div>
            
            {/* Headline with Split Text Animation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-8"
            >
              <div className="text-sm text-metallic-silver uppercase tracking-widest font-semibold">
                {timeOfDay}! Sistema Completo para Barbearias
              </div>
              <h1 className="text-7xl lg:text-8xl xl:text-9xl font-black leading-[1.05] tracking-tight">
                {['Gerencie', 'Controle', 'Transforme'].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="block"
                  >
                    {word}{' '}
                    <motion.span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold"
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
                      sua Barbearia
                    </motion.span>
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, type: 'spring' }}
                  className="text-gold block text-6xl lg:text-7xl xl:text-8xl mt-4"
                >
                  como um Império
                </motion.span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-2xl lg:text-3xl text-metallic-silver leading-relaxed max-w-2xl font-light"
              >
                Sistema completo que{' '}
                <span className="text-gold font-semibold relative inline-block">
                  transforma barbearias
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 bg-gold/50"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.2, duration: 1 }}
                  />
                </span>{' '}
                em negócios prósperos com tecnologia de ponta.
              </motion.p>
            </motion.div>
            
            {/* Real Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-3 gap-6 py-8 border-y border-cream/15 bg-gradient-to-r from-cream/8 via-cream/5 to-cream/8 backdrop-blur-xl rounded-3xl px-8 shadow-2xl border-x border-cream/10"
            >
              {[
                { value: '500+', label: 'Barbearias Ativas', icon: Users, color: 'from-green-400 to-emerald-500' },
                { value: '-87%', label: 'Redução Falhas', icon: Zap, color: 'from-blue-400 to-cyan-500' },
                { value: '24/7', label: 'Suporte Ativo', icon: Zap, color: 'from-purple-400 to-pink-500' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + i * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.1, y: -8 }}
                  className="text-center relative group"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity`}
                  ></motion.div>
                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-3 shadow-lg`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="text-4xl lg:text-5xl font-black text-gold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs text-metallic-silver uppercase tracking-wider font-semibold">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-5 pt-6"
            >
              <Link href="/auth/register" className="group relative">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-gradient-to-r from-gold via-yellow-500 to-gold text-black font-black py-7 px-14 rounded-3xl text-xl transition-all duration-300 shadow-2xl shadow-gold/50 overflow-hidden w-full sm:w-auto"
                >
                  <motion.span
                    className="relative z-10 flex items-center gap-4 justify-center"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Começar Agora
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
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
              <Link href="#demo">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-cream/40 hover:border-gold text-cream hover:text-gold font-bold py-7 px-12 rounded-3xl text-xl transition-all duration-300 backdrop-blur-xl bg-cream/10 hover:bg-gold/20 w-full sm:w-auto shadow-xl"
                >
                  Ver Demonstração
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
              className="flex items-center gap-8 pt-6 text-sm text-metallic-silver flex-wrap"
            >
              {[
                { icon: Check, text: 'Acesso imediato após pagamento' },
                { icon: Check, text: 'Pagamento 100% seguro' },
                { icon: Check, text: 'Suporte especializado' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + i * 0.1 }}
                  whileHover={{ scale: 1.1, x: 5 }}
                  className="flex items-center gap-3 group"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.3 }}
                    transition={{ duration: 0.5 }}
                    className="w-6 h-6 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center group-hover:bg-gold transition-colors"
                  >
                    <item.icon className="w-4 h-4 text-gold group-hover:text-black transition-colors" />
                  </motion.div>
                  <span className="text-base font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right - Realistic Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            style={{ x, rotateY, rotateX }}
            className="relative lg:mt-0 mt-12 perspective-1000"
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gold/30 blur-3xl rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Realistic Dashboard Container */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-br from-dark-charcoal via-deep-navy to-black rounded-3xl overflow-hidden border border-gold/30 shadow-2xl backdrop-blur-2xl transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glassmorphism Header */}
              <div className="bg-gradient-to-r from-deep-navy/95 via-dark-charcoal/95 to-deep-navy/95 backdrop-blur-2xl border-b border-gold/20 px-8 py-5 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                </div>
                <div className="text-xs text-metallic-silver font-mono bg-cream/10 px-4 py-2 rounded-full border border-cream/20 backdrop-blur-sm">
                  dashboard.sasbarber.com
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-metallic-silver">Online</span>
                </div>
              </div>
              
              {/* Realistic Dashboard Content */}
              <div className="p-8 space-y-8 bg-gradient-to-b from-deep-navy/50 to-dark-charcoal/50">
                {/* Real Metrics Cards */}
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { label: 'Faturamento Hoje', value: 'R$ 2.450', change: '+23%', trend: 'up', icon: DollarSign },
                    { label: 'Agendamentos', value: '18', change: 'Hoje', trend: 'neutral', icon: Calendar },
                  ].map((metric, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-gradient-to-br from-deep-navy/90 to-dark-charcoal/90 backdrop-blur-xl rounded-2xl p-6 border border-gold/20 shadow-2xl relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-xs text-metallic-silver uppercase tracking-wide">{metric.label}</div>
                          <metric.icon className="w-5 h-5 text-gold/50" />
                        </div>
                        <div className="text-3xl font-black text-gold mb-2">{metric.value}</div>
                        <div className="flex items-center gap-2 text-xs">
                          {metric.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-green-400" />}
                          <span className={metric.trend === 'up' ? 'text-green-400 font-semibold' : 'text-metallic-silver'}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Real Chart */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                  className="bg-gradient-to-br from-deep-navy/90 to-dark-charcoal/90 backdrop-blur-xl rounded-2xl p-6 border border-gold/20 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-xs text-metallic-silver uppercase tracking-wide font-semibold">Performance Semanal</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gold"></div>
                      <span className="text-xs text-metallic-silver">Faturamento</span>
                    </div>
                  </div>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData}>
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#D4AF37" 
                          strokeWidth={3}
                          fill="url(#colorGradient)"
                          animationDuration={2000}
                        />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fill: '#C0C0C0', fontSize: 11 }}
                          axisLine={{ stroke: '#444' }}
                        />
                        <YAxis 
                          tick={{ fill: '#C0C0C0', fontSize: 11 }}
                          axisLine={{ stroke: '#444' }}
                          tickFormatter={(value) => `R$${value/1000}k`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
                
                {/* Real Appointments List */}
                <div className="space-y-3">
                  <div className="text-xs text-metallic-silver uppercase tracking-wide font-semibold mb-4">Próximos Agendamentos</div>
                  {appointmentsData.map((apt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 + i * 0.1 }}
                      whileHover={{ x: 8, scale: 1.02 }}
                      className="flex items-center gap-5 p-4 bg-gradient-to-r from-deep-navy/80 to-transparent rounded-xl border border-cream/10 hover:border-gold/40 transition-all backdrop-blur-sm group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center text-xl border border-gold/30">
                          {apt.photo}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-cream mb-1">{apt.client}</div>
                          <div className="text-xs text-metallic-silver">{apt.service}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono font-bold text-gold mb-1">{apt.time}</div>
                          <div className="text-xs text-metallic-silver">{apt.price}</div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.3 }}
                          className={`w-3.5 h-3.5 rounded-full ${
                            apt.status === 'confirmed' 
                              ? 'bg-green-400 shadow-lg shadow-green-400/50' 
                              : 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
                          } animate-pulse`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          className="absolute -top-10 -right-10 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-cream p-7 rounded-3xl shadow-2xl border-2 border-gold/40 backdrop-blur-xl z-20"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-4"
          >
            <TrendingUp className="w-10 h-10 text-gold" />
            <div>
                  <div className="text-3xl font-black">500+</div>
                  <div className="text-xs text-white/90 font-semibold">Barbearias Ativas</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.7, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.15, rotate: -5 }}
          className="absolute -bottom-10 -left-10 bg-gradient-to-br from-deep-navy to-dark-charcoal text-cream p-6 rounded-3xl shadow-2xl border-2 border-gold/40 backdrop-blur-xl z-20"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-4"
          >
            <Users className="w-8 h-8 text-gold" />
            <div>
              <div className="text-2xl font-black">528+</div>
              <div className="text-xs text-metallic-silver">Barbearias Confiam</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Advanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs text-metallic-silver uppercase tracking-widest font-semibold">Role para explorar</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-7 h-12 border-2 border-gold/50 rounded-full flex justify-center p-2 backdrop-blur-sm bg-cream/5"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-4 bg-gold rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
