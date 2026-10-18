import React from 'react';

const KITCHENS = [
  {
    name: 'Hajiya Amina',
    restaurant: 'Gidan Arewa',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=400&q=80', // Replace with a better portrait if available, but a food prep or warm portrait works. Let's use a nice chef portrait.
    portrait: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=400&q=80',
    story: "Bringing her grandmother's ancient Masa recipes from Kano to the modern tables of Kano. Every batch is fermented for 12 hours for that perfect fluffy center."
  },
  {
    name: 'Mallam Sani',
    restaurant: 'Kano Suya Palace',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80',
    portrait: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=400&q=80',
    story: "A third-generation Suya master. Sani's signature Yaji spice blend is a closely guarded family secret, roasted fresh over charcoal every single evening."
  }
];

export default function MeetTheKitchens() {
  return (
    <section className="py-20 px-6 lg:px-20 bg-[#fffdfb] border-t border-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4.5xl font-display font-black text-gray-950 tracking-tight">
            Meet the <span className="text-[#ca7d2d]">Kitchens</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
            Great food comes from great people. Discover the faces, stories, and heritage behind the most beloved Northern dishes on KanoEats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {KITCHENS.map((kitchen, idx) => (
            <div key={idx} className="group relative flex flex-col md:flex-row gap-6 items-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 shrink-0 relative rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500 z-10">
                <img 
                  src={kitchen.portrait} 
                  alt={kitchen.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#eddcd2] flex-1 relative md:-ml-12 md:pl-16 w-full group-hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-display font-black text-gray-900">{kitchen.name}</h3>
                <p className="text-[#ca7d2d] text-xs font-black uppercase tracking-wider mb-4">{kitchen.restaurant}</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  "{kitchen.story}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
