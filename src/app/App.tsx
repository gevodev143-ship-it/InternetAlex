import { useState } from "react"; 
import logo from "./img/Imagen1.png";
import freefireImg from "./img/fondodefreefire.jpg";
import minecraftImg from "./img/fondominecraft.jpg";
import fondoroblox from "./img/fondoroblox.jpg";
import fondofornite from "./img/fondofornite.jpg";
import fondoclaro from "./img/fondoclaro.jpg";
import fondomovistar from "./img/fondomovistar.jpg";
import {
  Search, Menu, X, Gamepad2, Clock, Printer, CreditCard, Package,
  Wifi, Zap, Shield, MessageCircle, Star, ChevronRight, MapPin,
  Instagram, Facebook, Headphones,
} from "lucide-react";

const WA_NUMBER = "573001234567";

function waLink(product: string, price: string) {
  const text = encodeURIComponent(`Hola, quiero comprar *${product}* - ${price} COP`);
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

const waGeneral = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola, quiero hacer un pedido")}`;

const categoryCards = [
  { id: "juegos", name: "Recargas de Juegos", icon: Gamepad2, desc: "ML, Free Fire, Roblox, Minecraft" },
  { id: "horas", name: "Horas de Internet", icon: Clock, desc: "Por hora o día completo" },
  { id: "impresiones", name: "Impresiones & Escaneos", icon: Printer, desc: "B&N y color, documentos" },
  { id: "pines", name: "Pines Digitales", icon: CreditCard, desc: "Netflix, Spotify, Google Play" },
  { id: "accesorios", name: "Accesorios", icon: Headphones, desc: "Cables, auriculares y más" },
  { id: "internet", name: "Datos Móviles", icon: Wifi, desc: "Recargas para tu operador" },
];

const filterTabs = [
  { id: "all", name: "Todo" },
  { id: "juegos", name: "Juegos" },
  { id: "horas", name: "Horas" },
  { id: "impresiones", name: "Impresiones" },
  { id: "pines", name: "Pines" },
  { id: "accesorios", name: "Accesorios" },
  { id: "internet", name: "Datos" },
];

const products = [
  { id: 1, category: "juegos", name: "Fortnite — 86 Diamantes", price: "$3.000", img: fondofornite, badge: "Popular" },
  { id: 2, category: "juegos", name: "Fortnite — 565 Diamantes", price: "$15.000", img: fondofornite, badge: "Oferta" },
  { id: 3, category: "juegos", name: "Free Fire — 100 Gemas", price: "$4.000", img: freefireImg  },
  { id: 4, category: "juegos", name: "Free Fire — 520 Gemas", price: "$18.000", img: freefireImg  },
  { id: 5, category: "juegos", name: "Roblox — 400 Robux", price: "$12.000", img: fondoroblox, badge: "Nuevo" },
  { id: 6, category: "juegos", name: "Minecraft — 1.720 Minecoins", price: "$25.000", img: minecraftImg },
  { id: 7, category: "horas", name: "1 Hora de Internet", price: "$1.500", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=240&fit=crop&auto=format" },
  { id: 8, category: "horas", name: "Paquete 5 Horas", price: "$6.000", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=240&fit=crop&auto=format", badge: "Ahorra 20%" },
  { id: 9, category: "horas", name: "Día Completo — 8 Horas", price: "$9.000", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=240&fit=crop&auto=format", badge: "Mejor valor" },
  { id: 10, category: "impresiones", name: "Impresión B&N — por hoja", price: "$200", img: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=240&fit=crop&auto=format" },
  { id: 11, category: "impresiones", name: "Impresión a Color — por hoja", price: "$600", img: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=240&fit=crop&auto=format" },
  { id: 12, category: "impresiones", name: "Escaneo de Documento", price: "$500", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=240&fit=crop&auto=format" },
  { id: 13, category: "pines", name: "Netflix — 1 mes Premium", price: "$45.000", img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=240&fit=crop&auto=format", badge: "Digital" },
  { id: 14, category: "pines", name: "Spotify Premium — 1 mes", price: "$16.900", img: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=400&h=240&fit=crop&auto=format" },
  { id: 15, category: "pines", name: "Google Play — $10.000", price: "$12.000", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=240&fit=crop&auto=format" },
  { id: 16, category: "accesorios", name: "Cable USB-C 1m", price: "$8.000", img: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400&h=240&fit=crop&auto=format" },
  { id: 17, category: "accesorios", name: "Auriculares Gaming", price: "$25.000", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=240&fit=crop&auto=format" },
  { id: 18, category: "internet", name: "Recarga Claro — 1 GB", price: "$5.000", img: fondoclaro },
  { id: 19, category: "internet", name: "Recarga Movistar — 2 GB", price: "$8.000", img: fondomovistar },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    scrollTo("catalogo");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

          <button
            onClick={() => scrollTo("inicio")}
            className="flex items-center gap-2.5"
          >
          <div>
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
            <span className="font-display text-xl font-extrabold tracking-tight">
              Internet <span className="text-primary">Alex</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: "Inicio", id: "inicio" },
              { label: "Catálogo", id: "catalogo" },
              { label: "Nosotros", id: "nosotros" },
              { label: "Contacto", id: "contacto" },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#25D366]/30"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir por WhatsApp
            </a>
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border px-4 pt-4 pb-6 flex flex-col gap-3">
            {[
              { label: "Inicio", id: "inicio" },
              { label: "Catálogo", id: "catalogo" },
              { label: "Nosotros", id: "nosotros" },
              { label: "Contacto", id: "contacto" },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left text-sm font-semibold text-foreground py-2 border-b border-border last:border-0"
              >
                {label}
              </button>
            ))}
            <a
              href={waGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-bold px-4 py-3 rounded-xl mt-2"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir por WhatsApp
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center pt-16"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://scontent.flim12-1.fna.fbcdn.net/v/t39.30808-6/485793693_2303031883412365_3309254009310617980_n.jpg?stp=dst-jpg_tt6&cstp=mx1366x768&ctp=s1366x768&_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=nri9wT083dkQ7kNvwFl_eCZ&_nc_oc=AdrrpZxLOdiuCEWDlxsDDINjxTyuor8oiZQhz27w59b1k7hinUerW_PGzzGXDyRIgs0&_nc_zt=23&_nc_ht=scontent.flim12-1.fna&_nc_gid=-aCbJxE1MIFGAysJ0bpj2g&_nc_ss=7a289&oh=00_Af8BDntlVWmQIOBzMrbbIW-oswOP4J8jUQFMffUo8J1yKA&oe=6A3D3AF4)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

        {/* Ambient glow orbs */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-accent/12 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-primary text-xs font-bold mb-6 bg-primary/10 border border-primary/25 px-4 py-2 rounded-full uppercase tracking-widest">
              <Zap className="w-3 h-3" />
              Recargas instantáneas · Atención por WhatsApp
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 text-foreground">
              Tu tienda digital{" "}
              <span
                className="text-primary"
                style={{ textShadow: "0 0 40px rgba(0,180,255,0.45)" }}
              >
                al instante
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">
              Recargas de juegos, pines digitales, horas de internet y más.
              Sin complicaciones — elige tu producto y confirma por WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo("catalogo")}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-xl text-base transition-all hover:scale-105 shadow-xl shadow-primary/30 font-display"
              >
                Ver catálogo
                <ChevronRight className="w-5 h-5" />
              </button>
              <a
                href={waGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-[#25D366]/60 text-[#25D366] hover:bg-[#25D366]/10 font-bold px-8 py-4 rounded-xl text-base transition-all font-display"
              >
                <MessageCircle className="w-5 h-5" />
                Escribir por WhatsApp
              </a>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { icon: Zap, text: "Entrega en minutos" },
                { icon: Shield, text: "100% confiable" },
                { icon: Star, text: "+500 clientes felices" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="w-4 h-4 text-primary" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ─────────────────────────────────────────── */}
      <section id="categorias" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
              ¿Qué necesitas hoy?
            </h2>
            <p className="text-muted-foreground text-sm">
              Explora nuestras categorías y encuentra lo que buscas en segundos
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryCards.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="group flex flex-col items-center gap-3 p-5 bg-background border border-border rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">{cat.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{cat.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CATALOG ────────────────────────────────────────────── */}
      <section id="catalogo" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
              Catálogo de Productos
            </h2>
            <p className="text-muted-foreground text-sm">
              Haz clic en "Comprar" y te llevamos directo al chat — sin cuentas, sin esperas
            </p>
          </div>

          {/* Search + filters */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="relative max-w-md mx-auto w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap uppercase tracking-wide ${
                    activeCategory === tab.id
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-extrabold px-2.5 py-1 rounded-full font-display tracking-wide">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-foreground leading-snug mb-1.5 line-clamp-2">
                    {product.name}
                  </h3>
                  <p
                    className="text-2xl font-extrabold text-primary font-display mb-3"
                    style={{ textShadow: "0 0 20px rgba(0,180,255,0.35)" }}
                  >
                    {product.price}
                  </p>
                  <a
                    href={waLink(product.name, product.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-95 text-white text-sm font-bold py-2.5 rounded-xl transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Comprar por WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-base">No encontramos ese producto.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("all"); }}
                className="mt-3 text-primary text-sm underline underline-offset-4"
              >
                Ver todo el catálogo
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section id="como-funciona" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
              ¿Cómo funciona?
            </h2>
            <p className="text-muted-foreground text-sm">Tres pasos, sin complicaciones</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: Gamepad2,
                title: "Elige tu producto",
                desc: "Navega el catálogo, filtra por categoría y encuentra lo que necesitas. Sin registro ni contraseñas.",
              },
              {
                step: "02",
                icon: MessageCircle,
                title: "Confirma por WhatsApp",
                desc: "Haz clic en \"Comprar\" y te abrimos WhatsApp con el mensaje listo. Solo presiona enviar.",
              },
              {
                step: "03",
                icon: Zap,
                title: "Recibe al instante",
                desc: "Procesamos tu pedido en minutos. Tu recarga, pin o servicio queda listo casi de inmediato.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative flex flex-col items-center text-center gap-4 p-8 bg-background rounded-2xl border border-border overflow-hidden"
                >
                  <span className="absolute top-3 right-4 font-display text-6xl font-extrabold text-primary/8 select-none">
                    {item.step}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-primary/12 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-extrabold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY US ─────────────────────────────────────────────── */}
      <section id="nosotros" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
                ¿Por qué elegirnos?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed text-sm max-w-md">
                Somos un cibercafé local con atención personalizada. Sin bots, sin esperas,
                sin pasos complicados — solo tú y nosotros hablando directo por WhatsApp.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Zap, title: "Entrega rápida", desc: "La mayoría de recargas se procesan en menos de 5 minutos." },
                  { icon: Shield, title: "Pago seguro", desc: "Acordamos el método de pago directo, sin intermediarios ni comisiones." },
                  { icon: MessageCircle, title: "Trato humano", desc: "Hablas con una persona real, no con un sistema automatizado." },
                  { icon: Star, title: "Clientes satisfechos", desc: "Cientos de gamers confían en nosotros semana a semana." },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground mb-0.5">{item.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/15 to-accent/15 rounded-3xl blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&h=520&fit=crop&auto=format"
                alt="Personas usando computadores en cibercafé"
                className="relative w-full rounded-2xl object-cover border border-border"
                style={{ aspectRatio: "4/3" }}
              />
              <div className="absolute bottom-4 left-4 right-4 bg-background/85 backdrop-blur-md rounded-xl p-3 border border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/40">
                  <MessageCircle className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">¿Listo para tu recarga?</p>
                  <p className="text-xs text-muted-foreground">Escríbenos ahora — respondemos al instante</p>
                </div>
                <a
                  href={waGeneral}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                >
                  Ir al chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer id="contacto" className="bg-card border-t border-border pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div>
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className="font-display text-xl font-extrabold tracking-tight">
                  Internet <span className="text-primary">Alex</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Tu cibercafé de confianza. Recargas, pines, impresiones y más — todo por WhatsApp, rápido y seguro.
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    aria-label="Red social"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
                Horario de atención
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Lunes – Viernes: 8:00 am – 9:00 pm</p>
                <p>Sábados: 9:00 am – 8:00 pm</p>
                <p>Domingos: 10:00 am – 6:00 pm</p>
              </div>
            </div>

            <div>
              <p className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
                Contáctanos
              </p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <a
                  href={waGeneral}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  +51 956 125 785
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>727 Pje. Miguel Sandoval, mazamari, Satipo, Junín, Perú</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Internet Alex · Todos los derechos reservados
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ───────────────────────────────────── */}
      <a
        href={waGeneral}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/50 hover:scale-110 transition-all duration-200"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </a>
    </div>
  );
}
