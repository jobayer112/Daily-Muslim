
import React from 'react';
import { DhikrTask, RewardItem, PrayerTimes } from './types';

export const INITIAL_DHIKR_TASKS: DhikrTask[] = [
  { id: '1', title: 'দূরূদ ইব্রাহিম', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', target: 100, count: 0, completed: false, points: 10 },
  { id: '2', title: 'সুবহানআল্লাহ', arabic: 'سُبْحَانَ اللَّهِ', target: 100, count: 0, completed: false, points: 10 },
  { id: '3', title: 'আলহামদুলিল্লাহ', arabic: 'الْحَمْدُ لِلَّهِ', target: 100, count: 0, completed: false, points: 10 },
  { id: '4', title: 'আল্লাহু আকবার', arabic: 'اللَّهُ أَكْبَرُ', target: 100, count: 0, completed: false, points: 10 },
  { id: '5', title: 'আসতাগফিরুল্লাহ', arabic: 'أَسْتَغْفِرُ اللَّهَ', target: 100, count: 0, completed: false, points: 10 },
];

export const REWARDS: RewardItem[] = [
  { id: 'r1', name: 'টুপি (White Premium Kufi)', pointsRequired: 5000, image: 'https://images.unsplash.com/photo-1627731742460-318e8df63810?q=80&w=600&auto=format&fit=crop' },
  { id: 'r2', name: 'পাঞ্জাবি (Elite Designer Panjabi)', pointsRequired: 20000, image: 'https://images.unsplash.com/photo-1597933534024-16492d60bc0c?q=80&w=600&auto=format&fit=crop' },
  { id: 'r3', name: 'কুরআন শরীফ (Luxury Binding)', pointsRequired: 50000, image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&auto=format&fit=crop' },
  { id: 'r4', name: 'হাদীস বই (Complete Collection)', pointsRequired: 30000, image: 'https://images.unsplash.com/photo-1584281723351-93108c48491c?q=80&w=600&auto=format&fit=crop' },
];

export const INITIAL_PRAYER_TIMES: PrayerTimes = {
  fajr: '04:45 AM',
  dhuhr: '12:15 PM',
  asr: '03:45 PM',
  maghrib: '06:12 PM',
  isha: '07:30 PM',
  sahari: '04:35 AM',
  iftar: '06:12 PM',
};

export const PAYMENT_NUMBERS = {
  bkash: '01832313998',
  nagad: '01317832848'
};

export const INITIAL_SURAHS = [ 
  "Al-Fatiha", "Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Ma'idah", "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha", "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara", "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajdah", "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqi'ah", "Al-Hadid", "Al-Mujadilah", "Al-Hashr", "Al-Mumtahanah", "As-Saff", "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij", "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyamah", "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "Abasa", "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiyah", "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Layl", "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-'Alaq", "Al-Qadr", "Al-Bayyinah", "Az-Zalzalah", "Al-'Adiyat", "Al-Qari'ah", "At-Takathur", "Al-'Asr", "Al-Humazah", "Al-Fil", "Quraysh", "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas" 
];

export const INITIAL_HADITH_CATEGORIES = [ 
  "ঈমান", "সালাত", "যাকাত", "সাওম", "হজ্জ", "আখলাক", "বিবাহ", "জিহাদ", "রিযিক", "কিয়ামত", "জান্নাত", "জাহান্নাম", "পিতা-মাতা", "সবর", "তাকওয়া" 
];
