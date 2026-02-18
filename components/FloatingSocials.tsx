import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Music2 } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const FloatingSocials: React.FC = () => {
  const [links, setLinks] = useState<any>(SOCIAL_LINKS);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data?.socials) setLinks(data.socials);
      })
      .catch(err => console.error(err));
  }, []);

  const socials = [
    {
      id: 'instagram',
      icon: <Instagram size={20} />,
      href: links.instagram,
      label: 'Instagram',
      color: 'hover:text-[#E4405F]'
    },
    {
      id: 'tiktok',
      icon: <Music2 size={20} />,
      href: links.tiktok,
      label: 'TikTok',
      color: 'hover:text-[#000000]'
    },
    {
      id: 'facebook',
      icon: <Facebook size={20} />,
      href: links.facebook,
      label: 'Facebook',
      color: 'hover:text-[#1877F2]'
    }
  ];

  return (
    <div className="fixed left-6 bottom-10 z-50 flex flex-col space-y-4 hidden md:flex">
      {socials.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative bg-white text-[#56b4bd] p-4 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border border-gray-50 shadow-[0_10px_30px_rgba(86,180,189,0.1)] ${social.color}`}
          aria-label={social.label}
        >
          {social.icon}
          {/* Tooltip */}
          <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-[#1a1a1a] text-white px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            {social.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default FloatingSocials;