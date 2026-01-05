
import React from 'react';
import { Database, Code2, ShieldCheck, Map, GitMerge, FileCheck, Layers, Cpu, Server } from 'lucide-react';

const ArchitectureDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-4xl font-bold tracking-tight text-slate-900">Documentación Técnica: Solipago v1.0</h2>
        <p className="text-lg text-slate-500 mt-2">Especificaciones de arquitectura para el ecosistema regional de pagos y propiedades.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Core Pillars */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-emerald-600">
            <Layers size={24} />
            <h3 className="text-xl font-bold">Arquitectura del Sistema</h3>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold shrink-0">B</div>
              <div>
                <p className="font-bold text-slate-900">Backend: Microservicios Distribuidos</p>
                <p className="text-sm text-slate-500">Implementado en Node.js (TypeScript) con NestJS para el motor de conciliación y Python (FastAPI) para servicios de IA/OCR.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center font-bold shrink-0">D</div>
              <div>
                <p className="font-bold text-slate-900">Persistencia: PostgreSQL + Redis</p>
                <p className="text-sm text-slate-500">PostgreSQL para transacciones financieras con cumplimiento ACID. Redis para gestión de inventario y locks de reservas en tiempo real.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold shrink-0">F</div>
              <div>
                <p className="font-bold text-slate-900">Frontend: Ecosistema Unificado</p>
                <p className="text-sm text-slate-500">React.js para el dashboard administrativo y Flutter para la aplicación móvil, compartiendo una capa de lógica de negocio (BFF).</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Fraud */}
        <section className="bg-slate-900 p-8 rounded-3xl text-white space-y-6">
          <div className="flex items-center gap-3 text-emerald-400">
            <ShieldCheck size={24} />
            <h3 className="text-xl font-bold">Protocolos Anti-Fraude</h3>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
              <p className="text-emerald-400 font-bold text-sm mb-1">Image Hashing (Perceptual)</p>
              <p className="text-xs text-slate-400">Cada comprobante genera un hash único. Si un usuario intenta subir un comprobante idéntico (aunque cambie el nombre del archivo), el sistema bloquea la transacción instantáneamente.</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
              <p className="text-emerald-400 font-bold text-sm mb-1">OCR Cross-Validation</p>
              <p className="text-xs text-slate-400">Usamos Gemini Flash para extraer texto y compararlo con la base de datos de facturas públicas locales. Si hay discrepancias en montos > 0.01%, se deriva a auditoría humana.</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
              <p className="text-emerald-400 font-bold text-sm mb-1">KYC/KYB Tiered</p>
              <p className="text-xs text-slate-400">Límites de compensación basados en el historial del usuario. Los socios locales (Partners) requieren auditoría presencial inicial.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Database Model */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 text-blue-600 mb-8">
          <Database size={24} />
          <h3 className="text-xl font-bold">Esquema de Datos (ERD Lite)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="font-bold text-slate-900 flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Entidades Core</p>
            <ul className="text-xs text-slate-500 space-y-1 ml-4 list-disc">
              <li><strong>Users:</strong> ID, Role, KycLevel, CountryCode</li>
              <li><strong>Properties:</strong> ID, OwnerID, LatLng, NightlyRate</li>
              <li><strong>Partners:</strong> ID, LegalName, TaxID, RegionConfig</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-slate-900 flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Finanzas</p>
            <ul className="text-xs text-slate-500 space-y-1 ml-4 list-disc">
              <li><strong>Wallets:</strong> ID, UserID, Balance_Intl, Balance_Local</li>
              <li><strong>Ledger:</strong> ID, WalletID, Amount, Type (Credit/Debit)</li>
              <li><strong>Escrow:</strong> ID, BookingID, Status (Locked/Released)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-slate-900 flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> Compensación</p>
            <ul className="text-xs text-slate-500 space-y-1 ml-4 list-disc">
              <li><strong>LocalBills:</strong> ID, Provider, Amount, Currency, ValidHash</li>
              <li><strong>CompensationPools:</strong> ID, Country, TotalAvailable</li>
              <li><strong>AuditQueue:</strong> ID, BillID, InspectorID, Status</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-slate-900">
          <Map size={24} />
          <h3 className="text-2xl font-bold">Estrategia de Lanzamiento (Roadmap)</h3>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
          <div className="space-y-8 ml-10">
            <div className="relative">
              <div className="absolute -left-10 top-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-sm"></div>
              <h4 className="font-bold text-slate-900">Fase 1: Corredor AR-CL (MVP)</h4>
              <p className="text-sm text-slate-500 mt-1">Implementación de cuentas puente en Buenos Aires y Santiago. Validación de motor de compensación con facturas de servicios públicos (Utilities).</p>
            </div>
            <div className="relative">
              <div className="absolute -left-10 top-1 w-4 h-4 bg-slate-200 rounded-full border-4 border-white shadow-sm"></div>
              <h4 className="font-bold text-slate-400">Fase 2: Expansión Andina (PER-BOL)</h4>
              <p className="text-sm text-slate-400 mt-1">Integración de Country Partners certificados para manejar depósitos locales en moneda nacional y supervisión de pagos de turismo en Cusco y Santa Cruz.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-10 top-1 w-4 h-4 bg-slate-200 rounded-full border-4 border-white shadow-sm"></div>
              <h4 className="font-bold text-slate-400">Fase 3: Liquidación Automática (V1.5)</h4>
              <p className="text-sm text-slate-400 mt-1">Conexión directa vía APIs con entes recaudadores nacionales para validación instantánea sin intervención humana (Zero-Trust Auditing).</p>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference Mockup */}
      <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 text-slate-900">
            <Code2 size={24} />
            <h3 className="text-xl font-bold">Endpoints Core (API v1)</h3>
          </div>
          <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded border">RESTful / gRPC</span>
        </div>
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 bg-white rounded-lg flex gap-4 border border-slate-100">
            <span className="text-emerald-600 font-bold w-12">POST</span>
            <span className="text-slate-900 font-bold">/v1/wallets/compensate</span>
            <span className="text-slate-400 ml-auto">// Ejecuta el matching de factura local</span>
          </div>
          <div className="p-3 bg-white rounded-lg flex gap-4 border border-slate-100">
            <span className="text-blue-600 font-bold w-12">GET</span>
            <span className="text-slate-900 font-bold">/v1/partners/{`{id}`}/ledger</span>
            <span className="text-slate-400 ml-auto">// Obtiene el libro mayor del socio regional</span>
          </div>
          <div className="p-3 bg-white rounded-lg flex gap-4 border border-slate-100">
            <span className="text-amber-600 font-bold w-12">PATCH</span>
            <span className="text-slate-900 font-bold">/v1/admin/audit/approve</span>
            <span className="text-slate-400 ml-auto">// Aprobación manual de auditor (Manual Override)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArchitectureDocs;
