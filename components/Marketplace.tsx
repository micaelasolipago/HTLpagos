
import React from 'react';
import { Star, MapPin, Heart, Zap, Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { Property, Country, User } from '../types';

const MOCK_PROPERTIES: Property[] = [
  { id: 'p1', title: 'Penthouse de Lujo - Santiago', location: 'Las Condes, Chile', country: Country.CHILE, pricePerNight: 125, imageUrl: 'https://picsum.photos/seed/p1/800/600', rating: 4.9 },
  { id: 'p2', title: 'Casa Boutique con Pileta', location: 'Punta del Este, Uruguay', country: Country.URUGUAY, pricePerNight: 210, imageUrl: 'https://picsum.photos/seed/p2/800/600', rating: 4.8 },
  { id: 'p3', title: 'Modern Loft near Miraflores', location: 'Lima, Peru', country: Country.PERU, pricePerNight: 85, imageUrl: 'https://picsum.photos/seed/p3/800/600', rating: 4.7 },
  { id: 'p4', title: 'Cabaña Alpina Moderna', location: 'Bariloche, Argentina', country: Country.ARGENTINA, pricePerNight: 150, imageUrl: 'https://picsum.photos/seed/p4/800/600', rating: 4.95 },
  { id: 'p5', title: 'Studio Central', location: 'Asunción, Paraguay', country: Country.PARAGUAY, pricePerNight: 65, imageUrl: 'https://picsum.photos/seed/p5/800/600', rating: 4.6 },
  { id: 'p6', title: 'Residencia en Valle Sagrado', location: 'Cusco, Peru', country: Country.PERU, pricePerNight: 110, imageUrl: 'https://picsum.photos/seed/p6/800/600', rating: 4.9 },
];

const MarketplaceView: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Encuentra tu próximo destino</h2>
          <p className="text-slate-500">Paga con tu saldo Solipago y ahorra un 2% en comisiones internacionales.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="¿A dónde vas?" 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-600 hover:bg-slate-50">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {MOCK_PROPERTIES.map((property) => (
          <div key={property.id} className="group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm border border-slate-100">
              <img 
                src={property.imageUrl} 
                alt={property.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-slate-900 hover:bg-white transition-colors">
                <Heart size={18} />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase rounded-lg shadow-lg flex items-center gap-1">
                  <Zap size={10} fill="white" /> Solipago Match
                </span>
                <span className="px-3 py-1 bg-slate-900/60 backdrop-blur text-white text-[10px] font-bold uppercase rounded-lg">
                  {property.country}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{property.title}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin size={14} /> {property.location}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold">
                <Star size={14} className="text-amber-500 fill-amber-500" />
                {property.rating}
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
              <div>
                <span className="text-lg font-bold">${property.pricePerNight}</span>
                <span className="text-slate-500 text-sm"> / noche</span>
              </div>
              <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                AHORRA $ {(property.pricePerNight * 0.02).toFixed(2)} USD
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceView;
