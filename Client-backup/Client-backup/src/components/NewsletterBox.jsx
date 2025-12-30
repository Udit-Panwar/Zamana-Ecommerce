import React, { useState } from 'react'   // change by me

const NewsletterBox = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 3000);
    }

    return (
        <div className='relative w-full py-16 px-6 overflow-hidden'>
            {/* Gradient background */}
            <div className='absolute inset-0 bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950'></div>

            {/* Animated blobs */}
            <div className='absolute top-10 -left-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen opacity-15 blur-3xl animate-pulse'></div>
            <div className='absolute -bottom-10 right-10 w-64 h-64 bg-pink-600 rounded-full mix-blend-screen opacity-15 blur-3xl animate-pulse' style={{ animationDelay: '2s' }}></div>

            {/* Grid overlay */}
            <div className='absolute inset-0 opacity-5' style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
            }}></div>

            {/* Content Container */}
            <div className='relative max-w-2xl mx-auto'>
                {/* Top badge */}
                <div className='flex justify-center mb-6'>
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/40 rounded-full'>
                        <div className='w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse'></div>
                        <span className='text-xs text-purple-300 font-semibold uppercase tracking-wider'>Special Offer</span>
                    </div>
                </div>

                {/* Main content box */}
                <div className='relative'>
                    {/* Glowing border */}
                    <div className='absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 blur-xl p-0.5'></div>

                    {/* Inner content */}
                    <div className='relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8'>
                        {/* Decorative corner */}
                        <div className='absolute top-4 right-4 w-12 h-12 border-2 border-purple-400/30 rounded-lg'></div>

                        {/* Heading */}
                        <h2 className='text-3xl font-black mb-2 bg-gradient-to-r from-purple-300 via-white to-pink-300 bg-clip-text text-transparent'>
                            Get Exclusive Deals
                        </h2>

                        {/* Subtitle */}
                        <p className='text-sm text-white/70 mb-6'>
                            Join our community and unlock 20% off your first order plus early access to new collections.
                        </p>

                        {/* Success message */}
                        {isSubmitted && (
                            <div className='mb-4 p-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/50 rounded-lg text-center animate-in'>
                                <span className='text-emerald-300 text-sm font-semibold'>✓ Welcome aboard! Check your email.</span>
                            </div>
                        )}

                        {/* Input section */}
                        <div className='relative mb-4 group'>
                            {/* Input wrapper */}
                            <div className='flex gap-2 bg-white/5 border border-white/15 rounded-xl p-0.5 hover:border-white/30 transition-all duration-300'>
                                {/* Icon */}
                                <div className='flex items-center pl-3'>
                                    <svg className='w-4 h-4 text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                    </svg>
                                </div>

                                {/* Input */}
                                <input
                                    className='flex-1 bg-transparent outline-none text-white placeholder:text-white/40 py-2.5 text-sm'
                                    type='email'
                                    placeholder='your@email.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                {/* Button */}
                                <button
                                    onClick={onSubmitHandler}
                                    className='px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/40 mr-0.5'
                                >
                                    JOIN
                                </button>
                            </div>
                        </div>

                        {/* Trust line */}
                        <div className='flex items-center justify-center gap-1 text-xs text-white/60'>
                            <svg className='w-3.5 h-3.5 text-purple-400' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>100% privacy guaranteed • Unsubscribe anytime</span>
                        </div>

                        {/* Bottom decorative line */}
                        <div className='absolute bottom-4 left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent'></div>
                    </div>
                </div>

                {/* Quick stats */}
                <div className='mt-8 flex justify-center gap-6 text-center'>
                    <div>
                        <div className='text-lg font-bold text-purple-300'>30K+</div>
                        <div className='text-xs text-white/50'>Subscribers</div>
                    </div>
                    <div className='w-px h-8 bg-white/10'></div>
                    <div>
                        <div className='text-lg font-bold text-pink-300'>20%</div>
                        <div className='text-xs text-white/50'>First Order</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsletterBox