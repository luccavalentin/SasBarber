'use client';

import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import DemoSection from '@/components/landing/DemoSection';
import PricingSection from '@/components/landing/PricingSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-deep-navy">
      <Header />
      <HeroSection />
      <div id="beneficios">
        <BenefitsSection />
      </div>
      <DemoSection />
      <div id="precos">
        <PricingSection />
      </div>
      <TestimonialsSection />
      <FinalCTASection />
      
      {/* Footer Profissional */}
      <footer className="bg-black border-t border-cream/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <Logo variant="compact" />
              <p className="text-metallic-silver leading-relaxed text-sm">
                Sistema completo de gestão para barbearias modernas. 
                Transforme seu negócio em um império de sucesso.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="https://linkedin.com/company/sasbarber" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-cream/5 border border-cream/10 flex items-center justify-center hover:bg-gold/20 hover:border-gold/30 transition-colors cursor-pointer">
                  <span className="text-gold font-bold">in</span>
                </Link>
                <Link href="https://facebook.com/sasbarber" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-cream/5 border border-cream/10 flex items-center justify-center hover:bg-gold/20 hover:border-gold/30 transition-colors cursor-pointer">
                  <span className="text-gold font-bold">f</span>
                </Link>
                <Link href="https://instagram.com/sasbarber" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-cream/5 border border-cream/10 flex items-center justify-center hover:bg-gold/20 hover:border-gold/30 transition-colors cursor-pointer">
                  <span className="text-gold font-bold">ig</span>
                </Link>
              </div>
            </div>

            {/* Jornada do Herói - Descoberta */}
            <div>
              <h4 className="font-bold text-cream mb-6 text-sm uppercase tracking-wide">🚀 Descoberta</h4>
              <ul className="space-y-3 text-metallic-silver">
                <li>
                  <Link href="#beneficios" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Conheça os Recursos
                  </Link>
                </li>
                <li>
                  <Link href="#demo" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Veja a Demonstração
                  </Link>
                </li>
                <li>
                  <Link href="#precos" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Confira os Preços
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Casos de Sucesso
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Últimas Atualizações
                  </Link>
                </li>
              </ul>
            </div>

            {/* Jornada do Herói - Transformação */}
            <div>
              <h4 className="font-bold text-cream mb-6 text-sm uppercase tracking-wide">⚡ Transformação</h4>
              <ul className="space-y-3 text-metallic-silver">
                <li>
                  <Link href="/sobre" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Nossa História
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Blog e Dicas
                  </Link>
                </li>
                <li>
                  <Link href="/carreiras" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Trabalhe Conosco
                  </Link>
                </li>
                <li>
                  <Link href="/parceiros" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Seja Parceiro
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Fale Conosco
                  </Link>
                </li>
              </ul>
            </div>

            {/* Jornada do Herói - Suporte */}
            <div>
              <h4 className="font-bold text-cream mb-6 text-sm uppercase tracking-wide">💪 Suporte</h4>
              <ul className="space-y-3 text-metallic-silver">
                <li>
                  <Link href="/ajuda" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Documentação
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> API e Integrações
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Status do Sistema
                  </Link>
                </li>
                <li>
                  <Link href="/comunidade" className="hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span>→</span> Nossa Comunidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal & Contact */}
          <div className="border-t border-cream/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-wrap gap-6 text-sm text-metallic-silver">
                <Link href="/termos" className="hover:text-gold transition-colors">
                  Termos de Serviço
                </Link>
                <Link href="/privacidade" className="hover:text-gold transition-colors">
                  Política de Privacidade
                </Link>
                <Link href="/cookies" className="hover:text-gold transition-colors">
                  Cookies
                </Link>
                <Link href="/seguranca" className="hover:text-gold transition-colors">
                  Segurança
                </Link>
              </div>
              <div className="text-sm text-metallic-silver">
                &copy; {new Date().getFullYear()} Sas Barber. Todos os direitos reservados.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
