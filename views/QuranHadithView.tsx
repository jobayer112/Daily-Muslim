
import React, { useState } from 'react';
import { getSurahDetails, getHadithDetails } from '../services/geminiService';
import { Gojol, Surah, Hadith } from '../types';
import { Search, Loader2, ChevronLeft, BookOpen, ScrollText, Quote, Music, Share2 } from 'lucide-react';

interface QuranHadithViewProps {
  gojols: Gojol[];
  surahs: Surah[];
  hadiths: Hadith[];
  setSurahs: (surahs: Surah[]) => void;
  setHadiths: (hadiths: Hadith[]) => void;
}

const QuranHadithView: React.FC<QuranHadithViewProps> = ({ gojols, surahs, hadiths, setSurahs, setHadiths }) => {
  const [activeTab, setActiveTab] = useState<'quran' | 'hadith' | 'gojol'>('quran');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);
  const [selectedGojol, setSelectedGojol] = useState<Gojol | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredSurahs = surahs.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredHadith = hadiths.filter(h => h.category.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredGojols = gojols.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSelectSurah = async (surah: Surah) => {
    setSelectedSurah(surah);
    
    // If we already have content, use it (Fast Load)
    if (surah.content) {
      setResult(surah.content);
      return;
    }

    setLoading(true);
    const data = await getSurahDetails(surah.name);
    setResult(data);
    
    // Save to state for next time (Fast Load)
    const updatedSurahs = surahs.map(s => s.id === surah.id ? { ...s, content: data } : s);
    setSurahs(updatedSurahs);
    
    setLoading(false);
  };

  const handleSelectHadith = async (hadith: Hadith) => {
    setSelectedHadith(hadith);
    
    // If we already have content, use it (Fast Load)
    if (hadith.content) {
      setResult(hadith.content);
      return;
    }

    setLoading(true);
    const data = await getHadithDetails(hadith.category);
    setResult(data);
    
    // Save to state for next time (Fast Load)
    const updatedHadiths = hadiths.map(h => h.id === hadith.id ? { ...h, content: data } : h);
    setHadiths(updatedHadiths);
    
    setLoading(false);
  };

  const resetSelection = () => {
    setSelectedSurah(null);
    setSelectedHadith(null);
    setSelectedGojol(null);
    setResult(null);
  };

  const handleShare = async (text: string) => {
    if (!text) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedSurah?.name || selectedHadith?.category || selectedGojol?.title || 'Daily Muslim',
          text: text,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('কন্টেন্ট ক্লিপবোর্ডে কপি করা হয়েছে!');
    }
  };

  if (selectedSurah || selectedHadith || selectedGojol) {
    return (
      <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-right duration-300">
        {/* Full Screen Detail Header */}
        <div className="bg-emerald-600 text-white p-6 shadow-lg flex items-center gap-4">
          <button onClick={resetSelection} className="p-2 hover:bg-white/10 rounded-full transition-all">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1">
            <h2 className="text-lg font-black truncate">{selectedSurah?.name || selectedHadith?.category || selectedGojol?.title}</h2>
            <p className="text-[10px] opacity-80 font-bold uppercase tracking-widest">
              {selectedSurah ? `পবিত্র কুরআন (${selectedSurah.index})` : selectedHadith ? 'আল-হাদীস' : 'ইসলামিক গজল'}
            </p>
          </div>
          <div className="bg-white/20 p-2 rounded-xl flex items-center gap-2">
             <button 
               onClick={() => handleShare(result || selectedGojol?.lyrics || '')}
               className="hover:bg-white/20 p-1 rounded-lg transition-colors"
               title="Share"
             >
               <Share2 size={18} />
             </button>
             <div className="w-[1px] h-4 bg-white/20 mx-1"></div>
             {selectedSurah ? <ScrollText size={20} /> : selectedHadith ? <Quote size={20} /> : <Music size={20} />}
          </div>
        </div>

        {/* Full Page Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 leading-relaxed custom-scroll">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Loader2 className="animate-spin text-emerald-600" size={40} />
              <p className="text-slate-400 font-bold italic text-sm">তথ্য লোড হচ্ছে...</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
              <div className="prose prose-emerald max-w-none">
                {selectedHadith ? (
                  // Specialized rendering for Hadiths to allow individual sharing
                  (result || "হাদীসের তথ্য পাওয়া যায়নি।").split(/\n(?=\d+\.)/).map((hadithBlock, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-6 relative group">
                      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleShare(hadithBlock)}
                          className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"
                          title="Share this Hadith"
                        >
                          <Share2 size={16} />
                        </button>
                      </div>
                      {hadithBlock.split('\n').map((line, j) => {
                        const isArabic = /[\u0600-\u06FF]/.test(line);
                        return (
                          <p 
                            key={j} 
                            className={`${isArabic 
                              ? 'arabic text-right text-2xl md:text-3xl text-emerald-900 leading-[1.8] mt-4 mb-2 bg-emerald-50/30 p-3 rounded-xl' 
                              : 'text-slate-800 text-sm md:text-base leading-relaxed mb-2 font-medium'}`}
                          >
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  ))
                ) : (
                  // Standard rendering for Quran and Gojol
                  (result || selectedGojol?.lyrics || "তথ্য পাওয়া যায়নি।").split('\n').map((line, i) => {
                    const isArabic = /[\u0600-\u06FF]/.test(line);
                    return (
                      <p 
                        key={i} 
                        className={`${isArabic 
                          ? 'arabic text-right text-3xl md:text-4xl text-emerald-900 leading-[2] mt-6 mb-4 bg-emerald-50/50 p-4 rounded-2xl' 
                          : 'text-slate-800 text-base md:text-lg leading-relaxed mb-4 font-medium'}`}
                      >
                        {line}
                      </p>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <BookOpen className="text-emerald-600" size={24} />
          কুরআন ও গজল
        </h2>
        
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 overflow-x-auto no-scrollbar scroll-smooth">
          <button 
            onClick={() => setActiveTab('quran')}
            className={`flex-none px-6 py-2.5 rounded-xl text-[11px] font-black transition-all ${activeTab === 'quran' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
          >
            পবিত্র কুরআন
          </button>
          <button 
            onClick={() => setActiveTab('hadith')}
            className={`flex-none px-6 py-2.5 rounded-xl text-[11px] font-black transition-all ${activeTab === 'hadith' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
          >
            আল-হাদীস
          </button>
          <button 
            onClick={() => setActiveTab('gojol')}
            className={`flex-none px-6 py-2.5 rounded-xl text-[11px] font-black transition-all ${activeTab === 'gojol' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
          >
            ইসলামিক গজল
          </button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="খুঁজুন..."
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-6 pr-14 focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-medium text-sm"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-4 top-3 text-slate-300">
            <Search size={18} />
          </div>
        </div>
      </div>

      {/* List items with '10x2' thin style */}
      <div className="grid grid-cols-1 gap-1 px-1">
        {activeTab === 'quran' && filteredSurahs.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => handleSelectSurah(s)}
            className="group bg-white py-1.5 px-4 rounded-xl border border-slate-50 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-5 h-5 bg-emerald-50 rounded-md flex items-center justify-center text-emerald-600 font-black text-[8px] group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                {s.index}
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800 text-[11px] leading-none">{s.name}</p>
              </div>
            </div>
            <ChevronLeft className="text-slate-200 rotate-180 group-hover:text-emerald-500 transition-colors" size={12} />
          </button>
        ))}

        {activeTab === 'hadith' && filteredHadith.map((h, idx) => (
          <button
            key={h.id}
            onClick={() => handleSelectHadith(h)}
            className="group bg-white py-1.5 px-4 rounded-xl border border-slate-50 shadow-sm hover:border-amber-500 hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-5 h-5 bg-amber-50 rounded-md flex items-center justify-center text-amber-600 font-black text-[8px] group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Quote size={10} />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800 text-[11px] leading-none">{h.category}</p>
              </div>
            </div>
            <ChevronLeft className="text-slate-200 rotate-180 group-hover:text-amber-500 transition-colors" size={12} />
          </button>
        ))}

        {activeTab === 'gojol' && filteredGojols.map((g, idx) => (
          <button
            key={g.id}
            onClick={() => setSelectedGojol(g)}
            className="group bg-white py-1.5 px-4 rounded-xl border border-slate-50 shadow-sm hover:border-rose-500 hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-5 h-5 bg-rose-50 rounded-md flex items-center justify-center text-rose-600 font-black text-[8px] group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Music size={10} />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800 text-[11px] leading-none">{g.title}</p>
              </div>
            </div>
            <ChevronLeft className="text-slate-200 rotate-180 group-hover:text-rose-500 transition-colors" size={12} />
          </button>
        ))}

        {(activeTab === 'quran' ? filteredSurahs : activeTab === 'hadith' ? filteredHadith : filteredGojols).length === 0 && (
          <div className="text-center py-10 text-slate-400 text-[10px] font-bold italic">কোনো ফলাফল পাওয়া যায়নি।</div>
        )}
      </div>
    </div>
  );
};

export default QuranHadithView;
