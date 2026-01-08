import React, { useState } from 'react';
import { Upload, Trash2, Edit2, Plus, X, MapPin, DollarSign, Type, Home } from 'lucide-react';
import { Country } from '../types';

interface PropertyImage {
  id: string;
  url: string;
  name: string;
  size: number;
}

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  country: Country;
  pricePerNight: number;
  images: PropertyImage[];
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
}

const PropertyManagement: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 'p1',
      title: 'Hermosa Casa de Playa',
      description: 'Casa moderna con vista al mar y piscina privada',
      location: 'Punta del Este, Uruguay',
      country: Country.URUGUAY,
      pricePerNight: 200,
      bedrooms: 3,
      bathrooms: 2,
      amenities: ['WiFi', 'Piscina', 'Aire Acondicionado', 'Cocina', 'Estacionamiento'],
      images: [{ id: '1', url: 'https://picsum.photos/seed/beach1/800/600', name: 'Fachada', size: 245 }],
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    country: Country.ARGENTINA,
    pricePerNight: 0,
    bedrooms: 1,
    bathrooms: 1,
    amenities: '',
  });
  const [uploadedImages, setUploadedImages] = useState<PropertyImage[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage: PropertyImage = {
            id: Math.random().toString(),
            url: event.target?.result as string,
            name: file.name,
            size: Math.round(file.size / 1024),
          };
          setUploadedImages([...uploadedImages, newImage]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteImage = (id: string) => {
    setUploadedImages(uploadedImages.filter((img) => img.id !== id));
  };

  const handleAddProperty = () => {
    if (formData.title && formData.location && uploadedImages.length > 0) {
      const newProperty: Property = {
        id: Math.random().toString(),
        ...formData,
        amenities: formData.amenities.split(',').map((a) => a.trim()),
        images: uploadedImages,
      };

      if (editingId) {
        setProperties(properties.map((p) => (p.id === editingId ? { ...newProperty, id: p.id } : p)));
        setEditingId(null);
      } else {
        setProperties([...properties, newProperty]);
      }

      setFormData({
        title: '',
        description: '',
        location: '',
        country: Country.ARGENTINA,
        pricePerNight: 0,
        bedrooms: 1,
        bathrooms: 1,
        amenities: '',
      });
      setUploadedImages([]);
      setShowForm(false);
    }
  };

  const handleEditProperty = (property: Property) => {
    setFormData({
      title: property.title,
      description: property.description,
      location: property.location,
      country: property.country,
      pricePerNight: property.pricePerNight,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      amenities: property.amenities.join(', '),
    });
    setUploadedImages(property.images);
    setEditingId(property.id);
    setShowForm(true);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      location: '',
      country: Country.ARGENTINA,
      pricePerNight: 0,
      bedrooms: 1,
      bathrooms: 1,
      amenities: '',
    });
    setUploadedImages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Mis Propiedades</h1>
            <p className="text-slate-600 mt-2">Gestiona tus alojamientos y fotos</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg"
            >
              <Plus size={20} />
              Nueva Propiedad
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingId ? 'Editar Propiedad' : 'Crear Nueva Propiedad'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-slate-100 rounded-lg transition-all"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Título */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: Hermosa Casa de Playa"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Ubicación */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} /> Ubicación
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ej: Punta del Este, Uruguay"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* País */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">País</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value as Country })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={Country.ARGENTINA}>Argentina</option>
                  <option value={Country.CHILE}>Chile</option>
                  <option value={Country.PERU}>Peru</option>
                  <option value={Country.URUGUAY}>Uruguay</option>
                  <option value={Country.PARAGUAY}>Paraguay</option>
                </select>
              </div>

              {/* Precio */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <DollarSign size={16} /> Precio por Noche
                </label>
                <input
                  type="number"
                  value={formData.pricePerNight}
                  onChange={(e) => setFormData({ ...formData, pricePerNight: Number(e.target.value) })}
                  placeholder="200"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Dormitorios */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Dormitorios</label>
                <input
                  type="number"
                  min="1"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Baños */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Baños</label>
                <input
                  type="number"
                  min="1"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 mb-2">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe tu propiedad..."
                rows={4}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Amenidades */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 mb-2">Amenidades (separadas por comas)</label>
              <input
                type="text"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                placeholder="WiFi, Piscina, Aire Acondicionado, Cocina, Estacionamiento"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 mb-4">Fotos de la Propiedad</label>
              <div className="border-2 border-dashed border-emerald-300 rounded-xl p-8 text-center hover:bg-emerald-50 transition-all cursor-pointer relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload size={32} className="mx-auto text-emerald-500 mb-2" />
                <p className="text-slate-600 font-medium">Arrastra fotos aquí o haz clic</p>
                <p className="text-xs text-slate-500">PNG, JPG, WEBP - Hasta 10MB cada una</p>
              </div>

              {/* Image Preview */}
              {uploadedImages.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-bold text-slate-900 mb-4">Fotos Subidas ({uploadedImages.length})</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedImages.map((img) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-40 object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all rounded-lg flex items-center justify-center">
                          <button
                            onClick={() => handleDeleteImage(img.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 truncate">{img.name}</p>
                        <p className="text-xs text-slate-500">{img.size} KB</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleAddProperty}
                disabled={!formData.title || !formData.location || uploadedImages.length === 0}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white py-3 rounded-lg font-bold transition-all"
              >
                {editingId ? 'Guardar Cambios' : 'Crear Propiedad'}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 border-2 border-slate-200 text-slate-700 py-3 rounded-lg font-bold hover:bg-slate-50 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Image Carousel */}
              <div className="relative w-full h-48 bg-slate-200">
                {property.images.length > 0 && (
                  <img
                    src={property.images[0].url}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-2 right-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ${property.pricePerNight}/noche
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-slate-900 mb-1">{property.title}</h3>
                <div className="flex items-center gap-2 text-slate-600 text-sm mb-3">
                  <MapPin size={16} />
                  {property.location}
                </div>

                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{property.description}</p>

                <div className="flex gap-2 text-sm text-slate-600 mb-4">
                  <span className="bg-slate-100 px-2 py-1 rounded">🛏️ {property.bedrooms} Hab</span>
                  <span className="bg-slate-100 px-2 py-1 rounded">🚿 {property.bathrooms} Baños</span>
                  <span className="bg-slate-100 px-2 py-1 rounded">📷 {property.images.length} Fotos</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditProperty(property)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-bold transition-all"
                  >
                    <Edit2 size={16} />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold transition-all"
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {properties.length === 0 && !showForm && (
          <div className="text-center py-16">
            <Home size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600 font-medium">No tienes propiedades aún</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-emerald-600 font-bold hover:underline"
            >
              Crea tu primera propiedad
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyManagement;
