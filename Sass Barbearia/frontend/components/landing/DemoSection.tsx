'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence, useTransform, useMotionValue } from 'framer-motion';
import { 
  Check, Play, Calendar, DollarSign, Users, BarChart3, ArrowRight, 
  TrendingUp, Clock, Phone, ShoppingCart, Package, Settings,
  CreditCard, FileText, Activity, ChevronLeft, ChevronRight, Monitor,
  LayoutDashboard, Menu, X
} from 'lucide-react';
import { HairScissorsIcon } from '@/components/ui/HairScissorsIcon';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, ComposedChart } from 'recharts';
import { gsap } from 'gsap';

type TabType = 'dashboard' | 'agenda' | 'financeiro' | 'clientes' | 'servicos' | 'estoque' | 'vendas';

const financialData = [
  { month: 'Jan', revenue: 18500, expenses: 12000, profit: 6500 },
  { month: 'Fev', revenue: 22000, expenses: 13000, profit: 9000 },
  { month: 'Mar', revenue: 24500, expenses: 12500, profit: 12000 },
  { month: 'Abr', revenue: 28000, expenses: 14000, profit: 14000 },
  { month: 'Mai', revenue: 32000, expenses: 15000, profit: 17000 },
  { month: 'Jun', revenue: 38000, expenses: 16000, profit: 22000 },
];

const servicesData = [
  { name: 'Corte + Barba', value: 35, revenue: 13500, color: '#D4AF37' },
  { name: 'Corte Premium', value: 25, revenue: 7500, color: '#C0A040' },
  { name: 'Completo', value: 20, revenue: 8000, color: '#A68B28' },
  { name: 'Outros', value: 20, revenue: 6000, color: '#8B7500' },
];

const clientActivityData = [
  { day: 'Seg', active: 45, new: 3, revenue: 2650 },
  { day: 'Ter', active: 52, new: 5, revenue: 3080 },
  { day: 'Qua', active: 48, new: 4, revenue: 2820 },
  { day: 'Qui', active: 58, new: 7, revenue: 3420 },
  { day: 'Sex', active: 72, new: 12, revenue: 4240 },
  { day: 'Sáb', active: 85, new: 15, revenue: 5010 },
  { day: 'Dom', active: 78, new: 8, revenue: 4600 },
];

const appointmentSchedule = [
  { time: '08:00', client: 'João Silva', service: 'Corte + Barba', barber: 'Carlos', status: 'confirmed', phone: '(11) 98765-4321' },
  { time: '09:30', client: 'Maria Santos', service: 'Corte Premium', barber: 'Ana', status: 'confirmed', phone: '(11) 97654-3210' },
  { time: '11:00', client: 'Pedro Costa', service: 'Completo', barber: 'Carlos', status: 'confirmed', phone: '(11) 96543-2109' },
  { time: '13:30', client: 'Ana Lima', service: 'Corte Feminino', barber: 'Ana', status: 'pending', phone: '(11) 95432-1098' },
  { time: '15:00', client: 'Carlos Souza', service: 'Corte + Barba', barber: 'João', status: 'confirmed', phone: '(11) 94321-0987' },
  { time: '16:30', client: 'Roberto Alves', service: 'Barba', barber: 'Carlos', status: 'pending', phone: '(11) 93210-9876' },
];

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'agenda', label: 'Agendamentos', icon: Calendar },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
  { id: 'servicos', label: 'Serviços', icon: HairScissorsIcon },
  { id: 'estoque', label: 'Estoque', icon: Package },
  { id: 'vendas', label: 'Vendas', icon: ShoppingCart },
];

export default function DemoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);
  
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
    //       if (sectionRef.current) {
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
    if (inView && chartRef.current && isMounted) {
      const elements = chartRef.current.children;
      gsap.from(Array.from(elements), {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, [inView, activeTab, isMounted]);

  // Auto-rotate tabs com deslize para esquerda
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const tabs: TabType[] = ['dashboard', 'agenda', 'clientes', 'financeiro', 'servicos', 'estoque', 'vendas'];
        const currentIndex = tabs.indexOf(prev);
        const nextIndex = (currentIndex + 1) % tabs.length;
        setDirection('left'); // Sempre desliza para esquerda
        return tabs[nextIndex];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [inView]);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Agendamentos Hoje', value: '18', change: '+23%', color: 'from-blue-500 to-cyan-500' },
          { label: 'Faturamento Mês', value: 'R$ 38K', change: '+24%', color: 'from-gold to-yellow-500' },
          { label: 'Clientes Ativos', value: '528', change: '+12%', color: 'from-green-500 to-emerald-500' },
          { label: 'Ticket Médio', value: 'R$ 58', change: '+5%', color: 'from-purple-500 to-pink-500' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-deep-navy/80 rounded-xl p-4 border border-cream/10"
          >
            <p className="text-xs text-metallic-silver mb-1">{stat.label}</p>
            <p className="text-xl font-black text-cream">{stat.value}</p>
            <span className="text-xs text-green-400 font-bold">{stat.change}</span>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-48 bg-deep-navy/60 rounded-xl p-4 border border-gold/20">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={financialData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: '#C0C0C0', fontSize: 10 }} axisLine={{ stroke: '#444' }} />
            <YAxis tick={{ fill: '#C0C0C0', fontSize: 10 }} axisLine={{ stroke: '#444' }} />
            <Tooltip 
              contentStyle={{ 
                background: '#2C2C2C', 
                border: '1px solid #D4AF37', 
                borderRadius: '8px',
                color: '#F5F5F5'
              }}
              formatter={(value: any) => `R$ ${value.toLocaleString('pt-BR')}`}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#D4AF37" 
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: '#10B981', r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Appointments */}
      <div>
        <h3 className="text-sm text-metallic-silver uppercase mb-3 font-semibold">Próximos Agendamentos</h3>
        <div className="space-y-2">
          {appointmentSchedule.slice(0, 3).map((apt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-3 bg-deep-navy/80 rounded-xl border border-cream/10"
            >
              <div className="w-12 text-center">
                <div className="text-xs text-metallic-silver mb-1">{apt.time}</div>
                <Clock className="w-4 h-4 text-gold mx-auto" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-cream">{apt.client}</div>
                <div className="text-xs text-metallic-silver">{apt.service} • {apt.barber}</div>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                apt.status === 'confirmed' ? 'bg-green-400' : 'bg-yellow-400'
              } animate-pulse`} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAgenda = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-cream">Agenda de Hoje</h3>
        <span className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full border border-gold/20">
          {appointmentSchedule.length} agendamentos
        </span>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {appointmentSchedule.map((apt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 p-4 bg-deep-navy/80 rounded-xl border border-cream/10 hover:border-gold/40 transition-all"
          >
            <div className="w-16 text-center flex-shrink-0">
              <div className="text-xs text-metallic-silver mb-1">{apt.time}</div>
              <Clock className="w-5 h-5 text-gold mx-auto" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-cream mb-1">{apt.client}</div>
              <div className="text-xs text-metallic-silver mb-1">{apt.service} • {apt.barber}</div>
              <div className="text-xs text-metallic-silver flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {apt.phone}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                apt.status === 'confirmed' 
                  ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                  : 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
              }`}>
                {apt.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderClientes = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[
          { label: 'Total', value: '528', color: 'from-blue-500 to-cyan-500' },
          { label: 'Ativos', value: '485', color: 'from-green-500 to-emerald-500' },
          { label: 'Novos', value: '54', color: 'from-gold to-yellow-500' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-deep-navy/80 rounded-xl p-4 border border-cream/10 text-center"
          >
            <p className="text-xs text-metallic-silver mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-gold">{stat.value}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="h-64 bg-deep-navy/60 rounded-xl p-4 border border-gold/20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={clientActivityData}>
            <XAxis dataKey="day" tick={{ fill: '#C0C0C0', fontSize: 11 }} axisLine={{ stroke: '#444' }} />
            <YAxis tick={{ fill: '#C0C0C0', fontSize: 11 }} axisLine={{ stroke: '#444' }} />
            <Tooltip 
              contentStyle={{ 
                background: '#2C2C2C', 
                border: '1px solid #D4AF37', 
                borderRadius: '8px',
                color: '#F5F5F5'
              }}
            />
            <Bar dataKey="active" fill="#D4AF37" radius={[8, 8, 0, 0]} />
            <Bar dataKey="new" fill="#10B981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { name: 'João Silva', visits: 24, total: 1420, status: 'ativo' },
          { name: 'Maria Santos', visits: 18, total: 1080, status: 'ativo' },
          { name: 'Pedro Costa', visits: 12, total: 720, status: 'ativo' },
          { name: 'Ana Lima', visits: 8, total: 480, status: 'inativo' },
        ].map((client, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-deep-navy/80 rounded-xl border border-cream/10"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-cream text-sm">{client.name}</h4>
              <span className={`w-2 h-2 rounded-full ${
                client.status === 'ativo' ? 'bg-green-400' : 'bg-red-400'
              }`} />
            </div>
            <div className="text-xs text-metallic-silver space-y-1">
              <div>Visitas: {client.visits}</div>
              <div>Total: R$ {client.total}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderFinanceiro = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Receita Total', value: 'R$ 38K', change: '+24%', color: 'text-green-400' },
          { label: 'Despesas', value: 'R$ 16K', change: '-5%', color: 'text-red-400' },
          { label: 'Saldo Final', value: 'R$ 22K', change: '+47%', color: 'text-gold' },
          { label: 'Margem', value: '58%', change: '+8%', color: 'text-gold' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-deep-navy/80 rounded-xl p-4 border border-cream/10"
          >
            <p className="text-xs text-metallic-silver mb-1">{stat.label}</p>
            <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
            <span className="text-xs text-green-400 font-bold">{stat.change}</span>
          </motion.div>
        ))}
      </div>

      <div className="h-64 bg-deep-navy/60 rounded-xl p-4 border border-gold/20">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={financialData}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: '#C0C0C0', fontSize: 11 }} axisLine={{ stroke: '#444' }} />
            <YAxis tick={{ fill: '#C0C0C0', fontSize: 11 }} axisLine={{ stroke: '#444' }} />
            <Tooltip 
              contentStyle={{ 
                background: '#2C2C2C', 
                border: '1px solid #D4AF37', 
                borderRadius: '8px',
                color: '#F5F5F5'
              }}
              formatter={(value: any) => `R$ ${value.toLocaleString('pt-BR')}`}
            />
            <Area type="monotone" dataKey="revenue" stroke="#22C55E" strokeWidth={2} fill="url(#revenueGrad)" />
            <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} fill="url(#expenseGrad)" />
            <Area type="monotone" dataKey="profit" stroke="#D4AF37" strokeWidth={2} fill="url(#profitGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderServicos = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {servicesData.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-deep-navy/80 rounded-xl border border-cream/10"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-cream text-sm">{service.name}</h4>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }} />
            </div>
            <div className="text-2xl font-black text-gold mb-1">{service.value}%</div>
            <div className="text-xs text-metallic-silver">R$ {service.revenue.toLocaleString('pt-BR')}</div>
            <div className="w-full bg-deep-navy/60 rounded-full h-2 mt-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${service.value}%` }}
                transition={{ delay: i * 0.1 + 0.3, duration: 1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: service.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-64 bg-deep-navy/60 rounded-xl p-4 border border-gold/20 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={servicesData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              stroke="#0A1428"
              strokeWidth={3}
            >
              {servicesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                background: '#2C2C2C', 
                border: '1px solid #D4AF37', 
                borderRadius: '8px',
                color: '#F5F5F5'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderEstoque = () => (
    <div className="space-y-4">
      {[
        { name: 'Shampoo Premium', stock: 15, min: 20, status: 'baixo', color: 'red' },
        { name: 'Pomada Modeladora', stock: 42, min: 30, status: 'ok', color: 'green' },
        { name: 'Gel Fixador', stock: 28, min: 25, status: 'ok', color: 'green' },
        { name: 'Tinta para Barba', stock: 8, min: 15, status: 'baixo', color: 'red' },
        { name: 'Toalhas Descartáveis', stock: 150, min: 100, status: 'ok', color: 'green' },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center justify-between p-4 bg-deep-navy/80 rounded-xl border border-cream/10"
        >
          <div className="flex-1">
            <h4 className="font-bold text-cream text-sm mb-1">{item.name}</h4>
            <div className="flex items-center gap-4 text-xs text-metallic-silver">
              <span>Estoque: {item.stock}</span>
              <span>Mínimo: {item.min}</span>
            </div>
            <div className="w-full bg-deep-navy/60 rounded-full h-2 mt-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((item.stock / item.min) * 100, 100)}%` }}
                transition={{ delay: i * 0.1 + 0.3, duration: 1 }}
                className={`h-full rounded-full ${
                  item.status === 'baixo' ? 'bg-red-500' : 'bg-green-500'
                }`}
              />
            </div>
          </div>
          <span className={`px-3 py-1 rounded-lg text-xs font-bold ml-4 ${
            item.status === 'baixo' 
              ? 'bg-red-500/20 text-red-400 border border-red-400/30' 
              : 'bg-green-500/20 text-green-400 border border-green-400/30'
          }`}>
            {item.status === 'baixo' ? 'Repor' : 'OK'}
          </span>
        </motion.div>
      ))}
    </div>
  );

  const renderVendas = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Vendas Hoje', value: 'R$ 1.240', change: '+18%' },
          { label: 'Vendas Mês', value: 'R$ 38K', change: '+24%' },
          { label: 'Ticket Médio', value: 'R$ 58', change: '+5%' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-deep-navy/80 rounded-xl p-4 border border-cream/10 text-center"
          >
            <p className="text-xs text-metallic-silver mb-1">{stat.label}</p>
            <p className="text-xl font-black text-gold mb-1">{stat.value}</p>
            <span className="text-xs text-green-400 font-bold">{stat.change}</span>
          </motion.div>
        ))}
      </div>

      <div className="space-y-2">
        {[
          { id: '#001', client: 'João Silva', service: 'Corte + Barba', value: 45, status: 'pago', time: '08:00' },
          { id: '#002', client: 'Maria Santos', service: 'Corte Premium', value: 35, status: 'pago', time: '09:30' },
          { id: '#003', client: 'Pedro Costa', service: 'Completo', value: 60, status: 'pago', time: '11:00' },
          { id: '#004', client: 'Ana Lima', service: 'Corte Feminino', value: 50, status: 'pendente', time: '13:30' },
        ].map((sale, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-4 bg-deep-navy/80 rounded-xl border border-cream/10"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-500 rounded-xl flex items-center justify-center text-deep-navy font-black text-sm">
                {sale.time}
              </div>
              <div>
                <div className="font-bold text-cream text-sm">{sale.client}</div>
                <div className="text-xs text-metallic-silver">{sale.service} • {sale.id}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-black text-gold">R$ {sale.value}</div>
                <span className={`text-xs px-2 py-1 rounded-lg font-bold ${
                  sale.status === 'pago' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {sale.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderScreenContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'agenda':
        return renderAgenda();
      case 'clientes':
        return renderClientes();
      case 'financeiro':
        return renderFinanceiro();
      case 'servicos':
        return renderServicos();
      case 'estoque':
        return renderEstoque();
      case 'vendas':
        return renderVendas();
      default:
        return renderDashboard();
    }
  };

  return (
    <section id="demo" ref={ref} className="relative py-40 bg-gradient-to-b from-dark-charcoal via-deep-navy to-black text-cream overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15),transparent_70%)]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
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

      <motion.div 
        // Removido style que causa efeito de sumir durante scroll
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
        ref={sectionRef}
      >
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
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/25 via-gold/15 to-transparent backdrop-blur-xl border border-gold/40 px-8 py-4 rounded-2xl mb-10 shadow-xl shadow-gold/30"
          >
            <span className="text-gold font-bold text-sm uppercase tracking-wider">
              Demonstração Completa - Todas as Telas Reais
            </span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black mb-8 leading-tight">
            Veja todas as telas{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold relative inline-block">
              em ação
              <motion.span
                className="absolute -bottom-3 left-0 w-full h-2 bg-gold/40 rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : {}}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-metallic-silver leading-relaxed font-light">
            Navegue por todas as funcionalidades do sistema. Telas completas, reais e funcionais.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Interactive Preview Area - TELA COMPLETA */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative group"
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gold/30 blur-3xl rounded-full blur-optimized pointer-events-none"
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

            {/* Realistic Dashboard Preview - TELA COMPLETA */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative bg-gradient-to-br from-dark-charcoal via-deep-navy to-black rounded-3xl overflow-hidden border border-gold/30 shadow-2xl backdrop-blur-2xl"
            >
              {/* Browser Header */}
              <div className="bg-gradient-to-r from-deep-navy/95 via-dark-charcoal/95 to-deep-navy/95 backdrop-blur-2xl border-b border-gold/20 px-6 py-4 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                </div>
                <div className="text-xs text-metallic-silver font-mono bg-cream/10 px-3 py-1.5 rounded-full border border-cream/20">
                  dashboard.sasbarber.com
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-metallic-silver">Online</span>
                </div>
              </div>

              {/* Main Layout with Sidebar */}
              <div className="flex">
                {/* Sidebar */}
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-deep-navy/90 border-r border-gold/20 p-4"
                    >
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-gold to-yellow-500 rounded-lg flex items-center justify-center text-deep-navy font-black">
                          S
                          </div>
                        <span className="text-lg font-black text-cream">Sas Barber</span>
                      </div>
                      <nav className="space-y-2">
                      {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <motion.button
                            key={item.id}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(item.id as TabType)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                              isActive
                                ? 'bg-gradient-to-r from-gold to-yellow-500 text-deep-navy shadow-lg'
                                : 'text-metallic-silver hover:text-cream hover:bg-cream/10'
                            }`}
                          >
                            {typeof Icon === 'function' ? <Icon className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                            <span>{item.label}</span>
                          </motion.button>
                        );
                      })}
                      </nav>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Content */}
                <div className="flex-1 p-6 space-y-6 bg-gradient-to-b from-deep-navy/50 to-dark-charcoal/50 min-h-[600px]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-black text-cream capitalize">{activeTab}</h2>
                      <p className="text-sm text-metallic-silver">
                        {activeTab === 'dashboard' && 'Visão geral do seu negócio'}
                        {activeTab === 'agenda' && 'Gerencie todos os agendamentos'}
                        {activeTab === 'clientes' && 'Gestão completa de clientes'}
                        {activeTab === 'financeiro' && 'Controle financeiro completo'}
                        {activeTab === 'servicos' && 'Catálogo de serviços'}
                        {activeTab === 'estoque' && 'Controle de produtos e estoque'}
                        {activeTab === 'vendas' && 'Histórico de vendas'}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                      className="p-2 bg-deep-navy/60 border border-cream/10 rounded-lg text-cream hover:bg-cream/10 transition-all"
                    >
                      {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </motion.button>
                      </div>

                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeTab}
                      custom={direction}
                      initial={{ opacity: 0, x: direction === 'left' ? 300 : -300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction === 'left' ? -300 : 300 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      ref={chartRef}
                    >
                      {renderScreenContent()}
                    </motion.div>
                </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 1 }}
            className="space-y-8"
          >
            {/* Navigation Buttons */}
            <div className="flex flex-wrap gap-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                <motion.button
                    key={item.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const tabs: TabType[] = ['dashboard', 'agenda', 'clientes', 'financeiro', 'servicos', 'estoque', 'vendas'];
                      const currentIndex = tabs.indexOf(activeTab);
                      const nextIndex = tabs.indexOf(item.id as TabType);
                      setDirection(nextIndex > currentIndex ? 'left' : 'right');
                      setActiveTab(item.id as TabType);
                    }}
                  className={`px-6 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 ${
                      isActive
                        ? 'bg-gradient-to-r from-gold to-yellow-500 text-deep-navy shadow-xl scale-105'
                      : 'bg-cream/10 text-metallic-silver hover:bg-cream/20 border border-cream/20'
                  }`}
                >
                    {typeof Icon === 'function' ? <Icon className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    <span>{item.label}</span>
                </motion.button>
                );
              })}
            </div>

            {/* Feature Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-3xl lg:text-4xl font-black mb-4 bg-gradient-to-r from-cream to-metallic-silver bg-clip-text text-transparent capitalize">
                    {activeTab === 'dashboard' && 'Dashboard Executivo'}
                    {activeTab === 'agenda' && 'Agenda Inteligente'}
                    {activeTab === 'clientes' && 'Gestão de Clientes Premium'}
                    {activeTab === 'financeiro' && 'Controle Financeiro Completo'}
                    {activeTab === 'servicos' && 'Catálogo de Serviços'}
                    {activeTab === 'estoque' && 'Controle de Estoque'}
                    {activeTab === 'vendas' && 'Histórico de Vendas'}
                  </h3>
                  <p className="text-lg text-metallic-silver leading-relaxed font-light">
                    {activeTab === 'dashboard' && 'Visão geral completa do seu negócio com métricas em tempo real, gráficos interativos e insights valiosos para tomada de decisão.'}
                    {activeTab === 'agenda' && 'Sistema completo de agendamentos com visualização semanal, diária e mensal. Confirmação automática, lembretes e gestão inteligente de horários.'}
                    {activeTab === 'clientes' && 'CRM completo com histórico detalhado de cada cliente, análise de comportamento, sistema de fidelidade e comunicação personalizada.'}
                    {activeTab === 'financeiro' && 'Controle financeiro total com fluxo de caixa em tempo real, contas a pagar e receber, relatórios de lucratividade e integração bancária.'}
                    {activeTab === 'servicos' && 'Catálogo completo de serviços com preços, duração, barbeiros responsáveis e análise de vendas por serviço.'}
                    {activeTab === 'estoque' && 'Gestão completa de produtos e estoque com alertas automáticos, controle de entradas e saídas e relatórios de movimentação.'}
                    {activeTab === 'vendas' && 'Histórico completo de vendas com filtros avançados, relatórios detalhados e análise de performance por período.'}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-4 pt-4">
                  {(
                    activeTab === 'dashboard' ? [
                      'Métricas em tempo real',
                      'Gráficos interativos',
                      'Alertas e notificações',
                      'Customização completa',
                    ] :
                    activeTab === 'agenda' ? [
                      'Visualização múltipla (dia/semana/mês)',
                      'Drag & drop para reorganização',
                      'Lembretes automáticos via WhatsApp',
                      'Bloqueio inteligente de horários',
                    ] :
                    activeTab === 'clientes' ? [
                      'Histórico completo de cada cliente',
                      'Sistema de fidelidade integrado',
                      'Análise de comportamento',
                      'Campanhas personalizadas',
                    ] :
                    activeTab === 'financeiro' ? [
                      'Fluxo de caixa em tempo real',
                      'Contas a pagar e receber',
                      'Relatórios de lucratividade',
                      'Integração com bancos',
                    ] :
                    activeTab === 'servicos' ? [
                      'Catálogo completo de serviços',
                      'Análise de vendas por serviço',
                      'Gestão de preços',
                      'Relatórios de performance',
                    ] :
                    activeTab === 'estoque' ? [
                      'Alertas automáticos de estoque',
                      'Controle de entrada e saída',
                      'Histórico de movimentação',
                      'Relatórios de reposição',
                    ] :
                    [
                      'Histórico completo de vendas',
                      'Filtros avançados',
                      'Análise de performance',
                      'Exportação de relatórios',
                    ]
                  ).map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 8, scale: 1.02 }}
                      className="flex items-start gap-4 group"
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.3 }}
                        transition={{ duration: 0.5 }}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center border border-gold/40 mt-0.5 group-hover:bg-gold transition-colors"
                      >
                        <Check className="w-5 h-5 text-gold group-hover:text-deep-navy transition-colors" />
                      </motion.div>
                      <span className="text-metallic-silver group-hover:text-cream transition-colors flex-1 text-base leading-relaxed">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-6">
                  <Link href="/auth/register">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-deep-navy font-black py-6 px-12 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-gold/50 flex items-center gap-3 w-full sm:w-auto"
                    >
                      Experimentar Todas as Funcionalidades
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
