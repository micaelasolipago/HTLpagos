
import React, { useState } from 'react';
import { Star, MapPin, Heart, Zap, Search as SearchIcon, SlidersHorizontal, Calendar } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | 'all'>('all');
  const [priceRange, setPriceRange] = useState(500);

  const filteredProperties = MOCK_PROPERTIES.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || property.country === selectedCountry;
    const matchesPrice = property.pricePerNight <= priceRange;
    return matchesSearch && matchesCountry && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 lg:bg-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Encuentra tu próximo destino</h2>
          <p className="text-slate-500 text-sm md:text-base">Reserva alojamientos en la región a los mejores precios</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Búsqueda</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Destino o propiedad..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">País</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value as Country | 'all')}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">Todos los países</option>
                <option value={Country.ARGENTINA}>Argentina</option>
                <option value={Country.CHILE}>Chile</option>
                <option value={Country.PERU}>Perú</option>
                <option value={Country.URUGUAY}>Uruguay</option>
                <option value={Country.PARAGUAY}>Paraguay</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Precio máximo: ${priceRange}/noche
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            {filteredProperties.length} alojamiento{filteredProperties.length !== 1 ? 's' : ''} encontrado{filteredProperties.length !== 1 ? 's' : ''}
          </h3>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer group"
              >
                <div className="relative w-full h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition-all">
                    <Heart size={18} className="text-slate-600" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star size={14} />
                    {property.rating}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-slate-900 line-clamp-2 mb-1">{property.title}</h3>
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-4">
                    <MapPin size={16} />
                    {property.location}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-900">${property.pricePerNight}</p>
                      <p className="text-xs text-slate-500">por noche</p>
                    </div>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold transition-all">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <SearchIcon size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600 font-medium">No se encontraron alojamientos</p>
            <p className="text-slate-500 text-sm">Intenta cambiar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceView;
