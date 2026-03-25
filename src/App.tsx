/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import React, { useState } from "react";
import { 
  Wifi, 
  Zap, 
  Tv, 
  Gamepad2, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ChevronRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowUp
} from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5581992369631"; // Using the number from the logo/user request
const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=-7.8972714,-35.1771351";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: "Mensagem enviada com sucesso! Entraremos em contato em breve." });
        setFormData({ name: "", whatsapp: "", email: "", message: "" });
      } else {
        setStatus({ type: 'error', message: data.error || "Ocorreu um erro ao enviar a mensagem." });
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setStatus({ type: 'error', message: "Erro de conexão. Tente novamente mais tarde." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-veloz-light font-sans text-slate-900">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-veloz-dark/95 backdrop-blur-sm border-b border-veloz-blue/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="text-2xl font-black tracking-tighter">
                <span className="text-veloz-accent italic">V</span>
                <span className="text-veloz-blue italic">eloz</span>
                <span className="text-veloz-accent">Net</span>
              </span>
              <div className="absolute -top-1 -right-4 text-veloz-blue">
                <Wifi size={16} />
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
            <a href="#inicio" className="hover:text-veloz-blue transition-colors">Início</a>
            <a href="#planos" className="hover:text-veloz-blue transition-colors">Planos</a>
            <a href="#servicos" className="hover:text-veloz-blue transition-colors">Serviços</a>
            <a href="#quem-somos" className="hover:text-veloz-blue transition-colors">Quem Somos</a>
            <a href="#contato" className="hover:text-veloz-blue transition-colors">Contato</a>
          </div>

          <a 
            href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Olá. Vim do website e estou interessado em adquirir um plano. Como podemos prosseguir?")}`}
            target="_blank"
            rel="noreferrer"
            className="bg-veloz-accent hover:bg-veloz-accent/90 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-veloz-accent/20"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">Atendimento</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-24 pb-16 md:pt-32 md:pb-32 overflow-hidden bg-veloz-dark group">
        <div className="absolute inset-0 opacity-30 transition-all duration-700 group-hover:opacity-40">
          <img 
            src="https://i.postimg.cc/9fWvS9Y6/Familia-conectada-e-animada-na-sala.png" 
            alt="Família feliz assistindo filme no sofá" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-veloz-dark/70 backdrop-blur-[1px] transition-colors duration-500 group-hover:bg-veloz-blue/20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-veloz-blue/20 text-veloz-blue text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-veloz-blue/30">
                100% Fibra Óptica de Verdade
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 italic">
                Rapidez e qualidade é a nossa <span className="text-veloz-accent">marca!</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto">
                Conecte sua casa com a melhor internet da região. Estabilidade para trabalhar, estudar e se divertir sem interrupções.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Olá. Vim do website e estou interessado em adquirir um plano. Como podemos prosseguir?")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-veloz-accent hover:bg-veloz-accent/90 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-lg shadow-xl shadow-veloz-accent/30"
                >
                  Assine Agora
                  <ChevronRight size={20} />
                </a>
                <div className="flex items-center justify-center gap-4 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-veloz-blue/20 flex items-center justify-center text-veloz-blue">
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Ultra Velocidade</p>
                    <p className="text-slate-400 text-xs">Planos de até 1 Giga</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-20 bg-veloz-light">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-16">
            <span className="text-veloz-accent font-bold uppercase tracking-widest text-sm mb-2 block">Nossos Planos</span>
            <h2 className="text-4xl md:text-5xl font-black text-veloz-dark mb-4 italic">
              Escolha a sua <span className="text-veloz-blue">Velocidade</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Planos sob medida para sua necessidade. Todos com tecnologia 100% fibra óptica.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { mb: "35MB", icon: <Zap size={24} />, desc: "Ideal para estudos e navegação básica" },
              { mb: "55MB", icon: <Zap size={24} />, desc: "Perfeito para redes sociais e vídeos" },
              { mb: "100MB", icon: <Zap size={24} />, featured: true, desc: "Redes sociais, streamings e home office" },
              { mb: "200MB", icon: <Zap size={24} />, desc: "Jogos online e múltiplos dispositivos" },
              { mb: "300MB", icon: <Zap size={24} />, desc: "Alta performance em qualquer atividade" }
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-3xl flex flex-col items-center text-center transition-all border ${
                  plan.featured 
                    ? "bg-veloz-dark text-white border-veloz-blue shadow-2xl scale-105 z-10" 
                    : "bg-white text-veloz-dark border-slate-100 shadow-xl"
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                  plan.featured ? "bg-veloz-blue text-veloz-dark" : "bg-veloz-light text-veloz-accent"
                }`}>
                  {plan.icon}
                </div>
                <h3 className="text-3xl font-black mb-2">{plan.mb}</h3>
                <p className={`text-sm font-bold mb-4 px-2 py-1 rounded-lg ${
                  plan.featured ? "bg-veloz-blue/20 text-veloz-blue" : "bg-veloz-light text-veloz-accent"
                }`}>
                  {plan.desc}
                </p>
                <p className={`text-xs mb-6 opacity-60`}>100% Fibra Óptica</p>
                
                <div className="mb-8">
                  <span className="text-sm font-bold block opacity-60">A partir de</span>
                  <span className="text-3xl font-black">R$ 0,00</span>
                  <span className="text-sm block opacity-60">/mês</span>
                </div>

                <ul className="space-y-3 mb-8 text-sm text-left w-full">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-veloz-blue shrink-0" />
                    <span>Instalação Grátis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-veloz-blue shrink-0" />
                    <span>Wi-Fi de Alta Performance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-veloz-blue shrink-0" />
                    <span>Suporte Prioritário</span>
                  </li>
                </ul>

                <a
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Olá, Veloz Net, Estou interessado em contratar o plano de ${plan.mb}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    plan.featured 
                      ? "bg-veloz-accent text-white hover:bg-red-700" 
                      : "bg-veloz-blue text-veloz-dark hover:bg-veloz-blue/90"
                  }`}
                >
                  <MessageCircle size={18} />
                  Orçamento
                </a>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-slate-500 font-medium bg-white inline-block px-6 py-3 rounded-full border border-slate-100 shadow-sm">
              💡 <span className="text-veloz-accent font-bold">Atenção:</span> Todos os orçamentos são realizados via <span className="text-veloz-blue font-bold">WhatsApp</span> para garantir o melhor preço da sua região.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="servicos" className="py-20 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-veloz-dark mb-4 italic">
              Feito para o que você <span className="text-veloz-accent">ama</span>
            </h2>
            <p className="text-slate-600">
              Nossa rede de fibra óptica garante a melhor experiência para todas as suas atividades online.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-veloz-light border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-veloz-dark rounded-2xl flex items-center justify-center text-veloz-blue mb-6">
                <Tv size={32} />
              </div>
              <h3 className="text-xl font-bold text-veloz-dark mb-3">Streaming 4K</h3>
              <p className="text-slate-600 mb-6">
                Assista suas séries e filmes favoritos na Netflix, Disney+ e YouTube em ultra resolução sem travamentos.
              </p>
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src="https://i.postimg.cc/Jhfd8BN0/Noite-de-cinema-e-pipoca-deliciosa.png" 
                  alt="Família assistindo filme na TV" 
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-veloz-blue/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Tv className="text-white" size={32} />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-veloz-dark text-white border border-veloz-blue/20 shadow-xl shadow-veloz-dark/10 group"
            >
              <div className="w-16 h-16 bg-veloz-blue rounded-2xl flex items-center justify-center text-veloz-dark mb-6">
                <Gamepad2 size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-veloz-blue">Gaming Pro</h3>
              <p className="text-slate-300 mb-6">
                Ping baixo e estabilidade total para seus jogos online. Domine as partidas com a conexão mais rápida.
              </p>
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src="https://i.postimg.cc/x8S7vb8L/bc9def04-4ba0-4481-bd41-caf035f8d630.png" 
                  alt="Jogo de futebol na TV representando gaming" 
                  className="w-full h-40 object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-veloz-blue/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Gamepad2 className="text-white" size={32} />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-veloz-light border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-veloz-accent rounded-2xl flex items-center justify-center text-white mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold text-veloz-dark mb-3">100% Fibra</h3>
              <p className="text-slate-600 mb-6">
                Tecnologia de ponta que leva a fibra óptica até dentro da sua casa para máxima performance.
              </p>
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src="https://i.postimg.cc/28Wy8pRK/Fibra-optica-iluminada-em-detalhe.png" 
                  alt="Cabos de fibra óptica" 
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-veloz-blue/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Zap className="text-white" size={32} />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Who We Are Section */}
      <section id="quem-somos" className="py-20 bg-veloz-light overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4"
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-veloz-accent rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-veloz-blue rounded-full opacity-20 blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop" 
                alt="Pessoa usando notebook com internet rápida" 
                className="rounded-[2rem] shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <span className="text-veloz-accent font-bold uppercase tracking-widest text-sm mb-2 block">Quem Somos</span>
              <h2 className="text-3xl md:text-4xl font-black text-veloz-dark mb-6 italic">
                Sua conexão de <span className="text-veloz-blue">confiança</span>
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                A Veloz Net nasceu com o propósito de democratizar o acesso à internet de alta qualidade. Somos especialistas em fibra óptica e focados em oferecer um atendimento humanizado e ágil.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-veloz-blue mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold text-veloz-dark">Suporte Local</h4>
                    <p className="text-sm text-slate-500">Estamos perto de você para resolver qualquer problema rapidamente.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="text-veloz-blue mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold text-veloz-dark">Conexão Segura</h4>
                    <p className="text-sm text-slate-500">Navegue com tranquilidade em uma rede moderna e protegida.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-veloz-blue mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold text-veloz-dark">Disponibilidade 24/7</h4>
                    <p className="text-sm text-slate-500">Internet que não dorme, sempre pronta para quando você precisar.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-veloz-accent">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8 italic">
            Pronto para voar com a Veloz Net?
          </h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto">
            Não perca mais tempo com internet lenta. Fale com nossos consultores agora mesmo e descubra o plano ideal para você.
          </p>
          <a 
            href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Olá. Vim do website e estou interessado em adquirir um plano. Como podemos prosseguir?")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-white text-veloz-accent px-10 py-4 rounded-2xl font-black text-xl hover:bg-veloz-dark hover:text-white transition-all shadow-2xl"
          >
            <MessageCircle size={24} />
            Chamar no WhatsApp
          </a>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black text-veloz-dark mb-8 italic">Fale <span className="text-veloz-accent">Conosco</span></h2>
              <div className="space-y-8">
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-veloz-light flex items-center justify-center text-veloz-accent shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Telefone / WhatsApp</p>
                    <p className="text-xl font-bold text-veloz-dark">(81) 99236-9631</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-veloz-light flex items-center justify-center text-veloz-blue shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">E-mail</p>
                    <p className="text-xl font-bold text-veloz-dark">velozz.nett01@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-veloz-light flex items-center justify-center text-veloz-dark shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Localização</p>
                    <p className="text-xl font-bold text-veloz-dark">Paudalho - PE</p>
                    <a 
                      href={MAPS_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-2 bg-veloz-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-veloz-accent transition-all"
                    >
                      <MapPin size={16} />
                      Como Chegar
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-veloz-light p-8 rounded-[2rem] border border-slate-200"
            >
              <h3 className="text-xl font-bold text-veloz-dark mb-6">Envie uma mensagem</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-veloz-blue/50"
                  />
                  <input 
                    type="text" 
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="WhatsApp" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-veloz-blue/50"
                  />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="E-mail" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-veloz-blue/50"
                />
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Como podemos ajudar?" 
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-veloz-blue/50"
                ></textarea>
                
                {status.type && (
                  <div className={`p-4 rounded-xl text-sm font-bold ${
                    status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {status.message}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-veloz-dark text-white font-bold py-4 rounded-xl hover:bg-veloz-dark/90 transition-all ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-6 w-12 h-12 bg-veloz-blue text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-veloz-accent transition-colors md:bottom-8"
      >
        <ArrowUp size={24} />
      </motion.button>

      {/* Footer */}
      <footer className="bg-veloz-dark text-white py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter italic">
                <span className="text-veloz-accent">V</span>
                <span className="text-veloz-blue">eloz</span>
                <span className="text-veloz-accent">Net</span>
              </span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-sm mb-2 italic">Rapidez e qualidade é a nossa marca!</p>
              <p className="text-slate-500 text-xs">© 2026 Veloz Net. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Olá. Vim do website e estou interessado em adquirir um plano. Como podemos prosseguir?")}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-bounce"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
