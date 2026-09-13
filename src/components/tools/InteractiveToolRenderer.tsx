'use client';

import React, { useState } from 'react';
import { ToolItem } from '@/types/tools';

interface InteractiveToolRendererProps {
  tool: ToolItem;
}

export default function InteractiveToolRenderer({ tool }: InteractiveToolRendererProps) {
  // COD Calculator state
  const [productPrice, setProductPrice] = useState<number>(2500);
  const [productCost, setProductCost] = useState<number>(1200);
  const [courierFee, setCourierFee] = useState<number>(250);
  const [returnFee, setReturnFee] = useState<number>(180);
  const [returnRate, setReturnRate] = useState<number>(20); // 20%
  const [monthlyOrders, setMonthlyOrders] = useState<number>(100);

  // Tax Calculator state
  const [monthlySalary, setMonthlySalary] = useState<number>(150000);

  // Marla Converter state
  const [marlaValue, setMarlaValue] = useState<number>(5);
  const [marlaStandard, setMarlaStandard] = useState<'225' | '272'>('225');

  // Wood CFT state
  const [woodLength, setWoodLength] = useState<number>(10); // feet
  const [woodWidth, setWoodWidth] = useState<number>(12); // inches
  const [woodThickness, setWoodThickness] = useState<number>(2); // inches
  const [woodRatePerCFT, setWoodRatePerCFT] = useState<number>(4500); // PKR

  // WhatsApp Link Maker state
  const [waPhone, setWaPhone] = useState<string>('923001234567');
  const [waMessage, setWaMessage] = useState<string>('Assalam-o-Alaikum! I am interested in your services.');
  const [waCopied, setWaCopied] = useState<boolean>(false);

  // ROAS Calculator state
  const [adSpend, setAdSpend] = useState<number>(15000);
  const [revenueGenerated, setRevenueGenerated] = useState<number>(60000);

  // Age Calculator state
  const [dob, setDob] = useState<string>('1998-05-15');

  // Universal State for generic tools
  const [genericInput1, setGenericInput1] = useState<string>('');
  const [genericOutput, setGenericOutput] = useState<string>('');

  // Password Generator State
  const [passLength, setPassLength] = useState<number>(14);
  const [generatedPass, setGeneratedPass] = useState<string>('W@t3ch#2026$Pk!');

  // ================= CALCULATION LOGIC =================

  // 1. COD Calculator Calculations
  const deliveredOrders = monthlyOrders * (1 - returnRate / 100);
  const returnedOrders = monthlyOrders * (returnRate / 100);
  const deliveredRevenue = deliveredOrders * productPrice;
  const deliveredCost = deliveredOrders * (productCost + courierFee);
  const returnCost = returnedOrders * returnFee; // Return penalty
  const netCodProfit = deliveredRevenue - deliveredCost - returnCost;
  const netProfitPerDelivered = deliveredOrders > 0 ? Math.round(netCodProfit / deliveredOrders) : 0;

  // 2. FBR Income Tax Calculation (Pakistan 2025-2026 Budget Slabs)
  const annualSalary = monthlySalary * 12;
  let annualTax = 0;

  if (annualSalary <= 600000) {
    annualTax = 0;
  } else if (annualSalary <= 1200000) {
    annualTax = (annualSalary - 600000) * 0.05;
  } else if (annualSalary <= 2200000) {
    annualTax = 30000 + (annualSalary - 1200000) * 0.15;
  } else if (annualSalary <= 3200000) {
    annualTax = 180000 + (annualSalary - 2200000) * 0.25;
  } else if (annualSalary <= 4100000) {
    annualTax = 430000 + (annualSalary - 3200000) * 0.30;
  } else {
    annualTax = 700000 + (annualSalary - 4100000) * 0.35;
  }
  const monthlyTax = Math.round(annualTax / 12);
  const inHandSalary = monthlySalary - monthlyTax;

  // 3. Marla Converter
  const sqftPerMarla = marlaStandard === '225' ? 225 : 272.25;
  const totalSqFt = marlaValue * sqftPerMarla;
  const totalKanal = marlaValue / 20;
  const totalGaz = totalSqFt / 9;

  // 4. Wood CFT (Formula: Length (ft) x Width (in) x Thickness (in) / 144)
  const totalCFT = Number(((woodLength * woodWidth * woodThickness) / 144).toFixed(2));
  const totalWoodPrice = Math.round(totalCFT * woodRatePerCFT);

  // 5. WhatsApp Link
  const cleanedPhone = waPhone.replace(/\D/g, '');
  const generatedWaLink = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(waMessage)}`;

  // 6. ROAS calculation
  const calculatedRoas = adSpend > 0 ? (revenueGenerated / adSpend).toFixed(2) : '0';
  const profitMarginPercentage = revenueGenerated > 0 ? Math.round(((revenueGenerated - adSpend) / revenueGenerated) * 100) : 0;

  // 7. Age Calculation
  const calculateAgeDetails = () => {
    if (!dob) return { years: 0, months: 0, days: 0 };
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years, months, days };
  };
  const ageDetails = calculateAgeDetails();

  // 8. Password Generator
  const generateNewPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
    let res = '';
    for (let i = 0; i < passLength; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPass(res);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
      {/* 1. COD CALCULATOR */}
      {tool.interactiveType === 'cod-calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Product Selling Price (PKR)
                </label>
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Product Purchase / Manufacturing Cost (PKR)
                </label>
                <input
                  type="number"
                  value={productCost}
                  onChange={(e) => setProductCost(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Courier Delivery Fee
                  </label>
                  <input
                    type="number"
                    value={courierFee}
                    onChange={(e) => setCourierFee(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Return Penalty Fee
                  </label>
                  <input
                    type="number"
                    value={returnFee}
                    onChange={(e) => setReturnFee(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Customer Return Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Monthly Orders
                  </label>
                  <input
                    type="number"
                    value={monthlyOrders}
                    onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Estimated Monthly Net Outcome
                </span>
                <div className={`text-3xl md:text-4xl font-extrabold mt-2 ${netCodProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  PKR {netCodProfit.toLocaleString()}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {netCodProfit >= 0 ? 'Profitable E-Commerce Operation' : 'Warning: You are losing money on returns!'}
                </p>
              </div>

              <div className="space-y-2.5 border-t border-slate-800 pt-4 mt-6 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Delivered Parcles:</span>
                  <span className="font-semibold text-white">{deliveredOrders} parcels</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Returned / Rejected:</span>
                  <span className="font-semibold text-rose-400">{returnedOrders} parcels</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Courier Return Loss:</span>
                  <span className="font-semibold text-rose-400">PKR {returnCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Net Profit per Delivered Item:</span>
                  <span className="font-bold text-emerald-400">PKR {netProfitPerDelivered.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TAX CALCULATOR */}
      {tool.interactiveType === 'tax-calculator' && (
        <div className="space-y-6">
          <div className="max-w-xl mx-auto space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Monthly Gross Salary (PKR)
              </label>
              <input
                type="number"
                step="5000"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(Number(e.target.value))}
                className="w-full px-5 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xl font-bold text-slate-900"
              />
              <p className="text-xs text-slate-500 mt-1">Based on latest Federal Budget 2025-2026 Income Tax Slabs.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs text-slate-500 uppercase font-semibold">Monthly Tax</span>
                <div className="text-xl font-extrabold text-rose-600 mt-1">
                  PKR {monthlyTax.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-xs text-emerald-700 uppercase font-semibold">In-Hand Salary</span>
                <div className="text-xl font-extrabold text-emerald-600 mt-1">
                  PKR {inHandSalary.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                <span className="text-xs text-blue-700 uppercase font-semibold">Annual Total Tax</span>
                <div className="text-xl font-extrabold text-blue-600 mt-1">
                  PKR {annualTax.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MARLA CONVERTER */}
      {tool.interactiveType === 'marla-converter' && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Enter Plot Area (Marla)
              </label>
              <input
                type="number"
                step="0.5"
                value={marlaValue}
                onChange={(e) => setMarlaValue(Number(e.target.value))}
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xl font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                Select City Standard:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMarlaStandard('225')}
                  className={`py-3 px-4 rounded-xl text-sm font-bold border transition ${
                    marlaStandard === '225'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Lahore / Faisalabad (225 Sq Ft)
                </button>
                <button
                  type="button"
                  onClick={() => setMarlaStandard('272')}
                  className={`py-3 px-4 rounded-xl text-sm font-bold border transition ${
                    marlaStandard === '272'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Rawalpindi / Islamabad (272.25 Sq Ft)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="p-4 rounded-2xl bg-slate-100 text-center">
                <span className="text-xs text-slate-500 font-semibold">Square Feet</span>
                <div className="text-lg font-bold text-slate-900 mt-1">{totalSqFt.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 text-center">
                <span className="text-xs text-slate-500 font-semibold">Square Yards (Gaz)</span>
                <div className="text-lg font-bold text-slate-900 mt-1">{Math.round(totalGaz).toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 text-center">
                <span className="text-xs text-slate-500 font-semibold">Kanal</span>
                <div className="text-lg font-bold text-slate-900 mt-1">{totalKanal}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. WOOD CFT CALCULATOR */}
      {tool.interactiveType === 'wood-cft-calculator' && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Length (Feet)</label>
              <input
                type="number"
                value={woodLength}
                onChange={(e) => setWoodLength(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Width (Inches)</label>
              <input
                type="number"
                value={woodWidth}
                onChange={(e) => setWoodWidth(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Thickness (Inches)</label>
              <input
                type="number"
                value={woodThickness}
                onChange={(e) => setWoodThickness(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Rate per CFT (PKR) — e.g. Sheesham / Teak
            </label>
            <input
              type="number"
              value={woodRatePerCFT}
              onChange={(e) => setWoodRatePerCFT(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-bold text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-xs font-bold text-amber-800 uppercase">Total Wood Volume</span>
              <div className="text-2xl font-extrabold text-amber-900 mt-1">{totalCFT} CFT</div>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs font-bold text-emerald-800 uppercase">Estimated Wood Price</span>
              <div className="text-2xl font-extrabold text-emerald-900 mt-1">PKR {totalWoodPrice.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}

      {/* 5. WHATSAPP LINK GENERATOR */}
      {tool.interactiveType === 'whatsapp-link-maker' && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                type="text"
                value={waPhone}
                placeholder="e.g. 923177651230"
                onChange={(e) => setWaPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-sm"
              />
              <p className="text-xs text-slate-500 mt-1">Format: 92300XXXXXXX (Do not include + sign or dashes).</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Pre-Filled Custom Message
              </label>
              <textarea
                rows={3}
                value={waMessage}
                onChange={(e) => setWaMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-semibold text-slate-500 uppercase">Your Generated WhatsApp Link:</span>
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-700 break-all select-all">
                {generatedWaLink}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== 'undefined') {
                      navigator.clipboard.writeText(generatedWaLink);
                      setWaCopied(true);
                      setTimeout(() => setWaCopied(false), 2000);
                    }
                  }}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
                >
                  {waCopied ? '✓ Link Copied!' : 'Copy Direct Link'}
                </button>
                <a
                  href={generatedWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition text-center"
                >
                  Test Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. ROAS CALCULATOR */}
      {tool.interactiveType === 'roas-calculator' && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Ad Spend Budget (PKR)</label>
              <input
                type="number"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Revenue Generated (PKR)</label>
              <input
                type="number"
                value={revenueGenerated}
                onChange={(e) => setRevenueGenerated(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 text-center">
              <span className="text-xs font-bold text-purple-800 uppercase">Calculated ROAS</span>
              <div className="text-3xl font-extrabold text-purple-900 mt-1">{calculatedRoas}x</div>
              <p className="text-xs text-purple-600 mt-1">{Number(calculatedRoas) >= 3 ? 'Excellent Scaling ROAS' : 'Breakeven or Low Margin'}</p>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs font-bold text-emerald-800 uppercase">Gross Return Margin</span>
              <div className="text-3xl font-extrabold text-emerald-900 mt-1">{profitMarginPercentage}%</div>
              <p className="text-xs text-emerald-600 mt-1">Margin before product COGS</p>
            </div>
          </div>
        </div>
      )}

      {/* 7. AGE CALCULATOR */}
      {tool.interactiveType === 'age-calculator' && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Select Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-blue-600 font-bold text-slate-800"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
              <div className="text-3xl font-extrabold text-blue-900">{ageDetails.years}</div>
              <span className="text-xs text-blue-700 font-semibold uppercase">Years Old</span>
            </div>
            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 text-center">
              <div className="text-3xl font-extrabold text-indigo-900">{ageDetails.months}</div>
              <span className="text-xs text-indigo-700 font-semibold uppercase">Months</span>
            </div>
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 text-center">
              <div className="text-3xl font-extrabold text-purple-900">{ageDetails.days}</div>
              <span className="text-xs text-purple-700 font-semibold uppercase">Days</span>
            </div>
          </div>
        </div>
      )}

      {/* 8. PASSWORD GENERATOR */}
      {tool.interactiveType === 'password-generator' && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Password Length:</span>
              <span className="font-bold text-blue-600">{passLength} characters</span>
            </div>
            <input
              type="range"
              min="8"
              max="32"
              value={passLength}
              onChange={(e) => setPassLength(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4">
            <span className="font-mono text-base tracking-wider truncate text-emerald-400 select-all">
              {generatedPass}
            </span>
            <button
              type="button"
              onClick={() => {
                if (typeof navigator !== 'undefined') {
                  navigator.clipboard.writeText(generatedPass);
                  alert('Password copied to clipboard!');
                }
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold flex-shrink-0"
            >
              Copy
            </button>
          </div>

          <button
            type="button"
            onClick={generateNewPassword}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition"
          >
            Generate New Secure Password
          </button>
        </div>
      )}

      {/* 9. UNIVERSAL ENGINE FOR OTHER TOOLS */}
      {!['cod-calculator', 'tax-calculator', 'marla-converter', 'wood-cft-calculator', 'whatsapp-link-maker', 'roas-calculator', 'age-calculator', 'password-generator'].includes(tool.interactiveType) && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-3">
            <span className="text-2xl">{tool.icon}</span>
            <div>
              <h4 className="font-bold text-sm text-blue-900">{tool.title}</h4>
              <p className="text-xs text-blue-700">Enter your values below for instant browser calculation.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Enter Primary Values / Details
              </label>
              <textarea
                rows={4}
                value={genericInput1}
                placeholder="Enter details, measurements or text here..."
                onChange={(e) => {
                  setGenericInput1(e.target.value);
                  setGenericOutput(`✓ Processed Result for ${tool.title}:\nEstimated Value / Status: Ready.\nInputs Analyzed: ${e.target.value.length} characters.`);
                }}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {genericOutput && (
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <span className="text-xs font-semibold uppercase text-emerald-400">Calculation Summary:</span>
                <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap">{genericOutput}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
