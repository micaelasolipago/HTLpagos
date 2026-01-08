
import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowRight, 
  Plus, 
  Banknote, 
  Receipt, 
  Info,
  CheckCircle,
  Clock,
  Zap,
  UploadCloud,
  X
} from 'lucide-react';
import { User, Country, LocalBill } from '../types';
import { validateReceiptOCR } from '../services/geminiService';

const MOCK_BILLS: LocalBill[] = [
  // Fixed: Added missing 'status' property to satisfy the LocalBill interface requirements.
  { id: 'bill-001', category: 'Electricity', amount: 45000, currency: 'ARS', country: Country.ARGENTINA, description: 'Edesur - Vencimiento 15/06', expirationDate: '2024-06-15', status: 'pending' },
  { id: 'bill-002', category: 'Internet', amount: 12500, currency: 'ARS', country: Country.ARGENTINA, description: 'Fibertel - Hogar', expirationDate: '2024-06-12', status: 'pending' },
  { id: 'bill-003', category: 'Water', amount: 8200, currency: 'ARS', country: Country.ARGENTINA, description: 'AySA - Bimestre 3', expirationDate: '2024-06-20', status: 'pending' },
];

const WalletView: React.FC<{ user: User }> = ({ user }) => {
  const [selectedBill, setSelectedBill] = useState<LocalBill | null>(null);
  const [step, setStep] = useState<'list' | 'upload' | 'verifying' | 'success'>('list');
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePayBill = (bill: LocalBill) => {
    setSelectedBill(bill);
    setStep('upload');
  };

  const simulateUpload = async () => {
    setIsVerifying(true);
    setStep('verifying');
    
    // Simulating OCR with Gemini
    // In a real app, you'd get base64 from file input
    const mockImage = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
    const result = await validateReceiptOCR(mockImage, selectedBill?.amount || 0);
    
    setTimeout(() => {
      setIsVerifying(false);
      setStep('success');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Balance Card */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <p className="text-slate-400 text-sm font-medium">Billetera Solipago</p>
              <h3 className="text-4xl font-bold mt-2">$ {user.walletBalance.toLocaleString()}</h3>
              <p className="text-emerald-400 text-xs font-bold mt-1">Crédito para reservas internacionales</p>
              
              <div className="mt-8 pt-8 border-t border-slate-800 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-500 text-[10px] uppercase font-bold">Saldo Pendiente</p>
                  <p className="text-lg font-bold text-slate-300">$120.40</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase font-bold">Bonos Ganados</p>
                  <p className="text-lg font-bold text-emerald-400">$45.00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-emerald-700 mb-3">
              <Zap size={20} className="fill-emerald-500" />
              <h4 className="font-bold">Potencia tu Saldo</h4>
            </div>
            <p className="text-xs text-emerald-600 leading-relaxed mb-4">
              Paga facturas locales de otros usuarios de la comunidad y recibe una <strong>bonificación del 1%</strong> directa en tu saldo internacional.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
              <CheckCircle size={12} /> Sin comisiones bancarias
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {step === 'list' && (
            <>
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Oportunidades de Compensación</h3>
                  <p className="text-sm text-slate-500">Facturas locales en {user.country} disponibles para pago.</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">Vencimiento cercano</span>
                </div>
              </div>
              <div className="flex-1 p-8 space-y-4">
                {MOCK_BILLS.map((bill) => (
                  <div key={bill.id} className="group p-4 border border-slate-100 rounded-2xl hover:border-emerald-200 hover:bg-emerald-50/30 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                        <Receipt size={24} className="text-slate-400 group-hover:text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{bill.description}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock size={12} /> Vence {bill.expirationDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{bill.currency} ${bill.amount.toLocaleString()}</p>
                        <p className="text-[10px] text-emerald-600 font-bold uppercase">+ $ {(bill.amount * 0.01).toFixed(2)} Bono</p>
                      </div>
                      <button 
                        onClick={() => handlePayBill(bill)}
                        className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 'upload' && (
            <div className="p-8 h-full flex flex-col items-center justify-center text-center">
              <button onClick={() => setStep('list')} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <UploadCloud size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Cargar Comprobante</h3>
              <p className="text-slate-500 max-w-sm mb-8">
                Has seleccionado el pago de <strong>{selectedBill?.description}</strong> por <strong>${selectedBill?.amount} {selectedBill?.currency}</strong>.
              </p>
              
              <div className="w-full max-w-md border-2 border-dashed border-slate-200 rounded-3xl p-12 mb-8 hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer">
                <input type="file" className="hidden" id="receipt-upload" />
                <label htmlFor="receipt-upload" className="cursor-pointer">
                  <Plus size={32} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm font-medium text-slate-600">Seleccionar archivo PDF o Imagen</p>
                  <p className="text-xs text-slate-400 mt-1">Soporta JPG, PNG y PDF</p>
                </label>
              </div>

              <button 
                onClick={simulateUpload}
                className="w-full max-w-md py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 transition-all"
              >
                Validar con IA Solipago
              </button>
            </div>
          )}

          {step === 'verifying' && (
            <div className="p-8 h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin mb-8"></div>
              <h3 className="text-2xl font-bold mb-2">Validando Transacción</h3>
              <p className="text-slate-500">Nuestro motor OCR está verificando el monto y la autenticidad del comprobante...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="p-8 h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">¡Validación Exitosa!</h3>
              <p className="text-slate-500 mb-8">
                El comprobante por <strong>${selectedBill?.amount} {selectedBill?.currency}</strong> ha sido verificado. El crédito se reflejará en tu cuenta internacional en breve.
              </p>
              <div className="bg-slate-50 p-6 rounded-2xl w-full max-w-sm mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-500 text-sm">Crédito Base</span>
                  <span className="font-bold">$ 45.00 USD</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span className="text-sm font-bold">Bono Compensación (+1%)</span>
                  <span className="font-bold">+ $ 0.45 USD</span>
                </div>
              </div>
              <button 
                onClick={() => setStep('list')}
                className="w-full max-w-md py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all"
              >
                Volver a la Billetera
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletView;
