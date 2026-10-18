import Avatar from '../Avatar';

const KITCHENS = [
  {
    name: 'Hajiya Amina',
    restaurant: 'Gidan Arewa',
    story: "Bringing her grandmother's ancient Masa recipes from Kano to the modern tables of Kano. Every batch is fermented for 12 hours for that perfect fluffy center."
  },
  {
    name: 'Mallam Sani',
    restaurant: 'Kano Suya Palace',
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
                <Avatar name={kitchen.name} className="w-full h-full" />
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
