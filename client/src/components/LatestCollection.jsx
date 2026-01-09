import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'

const LatestCollection = () => {
    const { products, currency } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        if (products && products.length > 0) {
            setLatestProducts(products.slice(0, 10));
        }
    }, [products]);

    return (
        <div className='relative w-full bg-black overflow-hidden' style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>
            {/* Animated background with tech aesthetic */}
            <div className='absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black'></div>

            {/* Animated tech lines */}
            <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent'></div>

            {/* Floating neon elements */}
            <div className='absolute top-20 right-1/3 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse'></div>
            <div className='absolute -bottom-20 left-1/4 w-96 h-96 bg-gradient-to-tr from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1.5s' }}></div>

            {/* Scanline effect */}
            <div className='absolute inset-0 opacity-5 pointer-events-none' style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px)'
            }}></div>

            {/* Header Section */}
            <div className='relative px-6 md:px-12 lg:px-24 py-24'>
                <div className='max-w-4xl mx-auto'>
                    {/* Top accent */}
                    <div className='flex items-center gap-3 mb-8'>
                        <div className='w-8 h-px bg-gradient-to-r from-cyan-500 to-transparent'></div>
                        <span className='text-cyan-400 text-xs font-bold uppercase tracking-[3px] letter-spacing'>[ Featured Collection ]</span>
                        <div className='w-8 h-px bg-gradient-to-l from-cyan-500 to-transparent'></div>
                    </div>

                    {/* Main title with italic serif */}
                    <h2 className='text-6xl md:text-8xl font-black text-white mb-6' style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', letterSpacing: '2px' }}>
                        <span className='bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-400 bg-clip-text text-transparent'>LATEST</span>
                    </h2>
                    <h3 className='text-5xl md:text-7xl font-black text-white mb-8' style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', letterSpacing: '2px' }}>
                        <span className='text-white/80'>COLLECTIONS</span>
                    </h3>

                    {/* Decorative line with dots */}
                    <div className='flex items-center gap-2 mb-8'>
                        <div className='flex-1 h-px bg-gradient-to-r from-cyan-500 via-orange-500 to-transparent'></div>
                        <div className='w-2 h-2 bg-cyan-500 rounded-full'></div>
                        <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                        <div className='w-2 h-2 bg-pink-500 rounded-full'></div>
                    </div>

                    {/* Description */}
                    <p className='text-white/70 text-base md:text-lg max-w-2xl' style={{ fontFamily: 'Courier New, monospace', letterSpacing: '0.5px' }}>
                        &gt; Discover premium fashion curated for the modern aesthetic. Limited edition pieces that define your style.
                    </p>
                </div>
            </div>

            {/* Control Bar */}
            <div className='relative px-6 md:px-12 lg:px-24 py-8 border-y border-cyan-500/30'>
                <div className='flex justify-between items-center'>
                    <span className='text-cyan-400 text-sm font-mono'>[ ITEMS: {latestProducts.length} ]</span>
                    {/* <div className='flex gap-4'>
                        <button className='border border-cyan-500/50 text-cyan-400 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500/10 transition-all duration-300'>
                            SORT
                        </button>
                        <button className='border border-orange-500/50 text-orange-400 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-orange-500/10 transition-all duration-300'>
                            FILTER
                        </button>
                    </div> */}
                </div>
            </div>

            {/* Products Grid */}
            <div className='relative px-6 md:px-12 lg:px-24 py-16'>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                    {
                        latestProducts.map((item, idx) => (
                            <div
                                key={item._id}
                                className='group relative'
                                onMouseEnter={() => setHoveredId(item._id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both` }}
                            >
                                <style>{`
@keyframes fadeInUp {
                                        from {
        opacity: 0;
        transform: translateY(20px);
    }
                                        to {
        opacity: 1;
        transform: translateY(0);
    }
}
`}</style>

                                {/* Neon border */}
                                <div className='absolute -inset-0.5 bg-gradient-to-br from-cyan-500 via-orange-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm'></div>

                                {/* Card */}
                                <div className='relative bg-slate-950 border border-white/10 rounded-lg overflow-hidden transition-all duration-500 group-hover:border-white/30'>
                                    {/* Image section */}
                                    <div className='relative overflow-hidden bg-black aspect-square'>
                                        <img
                                            src={Array.isArray(item.images) ? item.images[0] : item.image}
                                            alt={item.name}
                                            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110'
                                        />

                                        {/* Tech corner overlay */}
                                        <div className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                        <div className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity'></div>

                                        {/* Dark overlay */}
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                                        {/* Item number */}
                                        <div className='absolute top-2 right-2 text-cyan-400 text-xs font-mono opacity-50 group-hover:opacity-100 transition-opacity'>
                                            #{String(item._id).slice(-4)}
                                        </div>
                                    </div>

                                    {/* Info Section */}
                                    <div className='p-4'>
                                        {/* Name */}
                                        <h4 className='text-white font-bold text-sm mb-1 group-hover:text-cyan-400 transition-colors' style={{ fontFamily: 'Trebuchet MS, sans-serif', letterSpacing: '0.5px' }}>
                                            {item.name.toUpperCase()}
                                        </h4>

                                        {/* Price and button */}
                                        <div className='flex justify-between items-center mt-3'>
                                            <span className='text-orange-400 font-black text-lg' style={{ fontFamily: 'Courier New, monospace' }}>
                                                {currency} {item.price}
                                            </span>
                                            {/* <button className='w-8 h-8 border border-cyan-500/50 text-cyan-400 flex items-center justify-center text-xs hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 relative group/btn'>
                                                <svg className='w-4 h-4 group-hover/btn:rotate-90 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                                                </svg>
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Bottom CTA */}
            <div className='relative px-6 md:px-12 lg:px-24 py-16 text-center border-t border-cyan-500/30'>
                {/* <div className='inline-flex gap-2 mb-6'>
                    <div className='w-2 h-2 bg-cyan-500 rounded-full animate-pulse'></div>
                    <div className='w-2 h-2 bg-orange-500 rounded-full animate-pulse' style={{ animationDelay: '0.3s' }}></div>
                    <div className='w-2 h-2 bg-pink-500 rounded-full animate-pulse' style={{ animationDelay: '0.6s' }}></div>
                </div> */}

                {/* <button className='relative group px-10 py-4 bg-gradient-to-r from-cyan-500 via-orange-500 to-pink-500 text-black font-black text-lg uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50' style={{ fontFamily: 'Trebuchet MS, sans-serif', letterSpacing: '2px' }}>
                    <div className='absolute inset-0 bg-gradient-to-r from-cyan-600 via-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                    <span className='relative'>EXPLORE MORE</span>
                </button> */}
            </div>
        </div>
    )
}

export default LatestCollection;
