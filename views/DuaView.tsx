
import React from 'react';
import { Dua } from '../types';
import { Heart, ChevronLeft, Share2 } from 'lucide-react';

interface DuaViewProps {
  duas: Dua[];
}

const DuaView: React.FC<DuaViewProps> = ({ duas }) => {
  const handleShare = async (dua: Dua) => {
    const text = `${dua.title}\n\n${dua.arabic}\n\nউচ্চারণ: ${dua.pronunciation}\nঅর্থ: ${dua.meaning}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: dua.title,
          text: text,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('দোয়া ক্লিপবোর্ডে কপি করা হয়েছে!');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
        <Heart className="text-rose-500 fill-rose-500" size={24} />
        প্রয়োজনীয় দোয়া সমূহ
      </h2>
      
      <div className="space-y-4">
        {duas.map((dua) => (
          <div key={dua.id} className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 space-y-4 relative group">
            <div className="flex justify-between items-start border-b pb-2">
              <h3 className="text-lg font-bold text-emerald-600">{dua.title}</h3>
              <button 
                onClick={() => handleShare(dua)}
                className="text-slate-400 hover:text-emerald-600 transition-colors p-1"
                title="Share"
              >
                <Share2 size={18} />
              </button>
            </div>
            <p className="arabic text-2xl font-bold text-right text-slate-800 leading-[1.8]">{dua.arabic}</p>
            <div className="space-y-2 pt-2">
              <p className="text-sm font-bold text-slate-700">উচ্চারণ: <span className="font-medium text-slate-600">{dua.pronunciation}</span></p>
              <p className="text-sm font-bold text-slate-700">অর্থ: <span className="font-medium text-slate-600 italic">"{dua.meaning}"</span></p>
            </div>
          </div>
        ))}
        {duas.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200 text-slate-400">
            কোনো দোয়া যুক্ত করা হয়নি।
          </div>
        )}
      </div>
    </div>
  );
};

export default DuaView;
