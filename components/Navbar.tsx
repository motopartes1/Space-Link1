'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Inicio', href: '/public' },
        { name: 'Paquetes', href: '/public/packages' },
        { name: 'Cobertura', href: '/public/coverage' },
        { name: 'Contratar', href: '/public/contratar' },
        { name: 'Soporte', href: '/public/soporte' },
        { name: 'Seguimiento', href: '/public/seguimiento' },
    ];

    return (
        <nav className="bg-black shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/public" className="flex items-center space-x-3">
                            <img
                                src="/spacelink-logo.png"
                                alt="SpaceLink Telecomunicaciones"
                                className="h-16 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${pathname === item.href
                                    ? 'bg-accent text-white shadow-lg'
                                    : 'text-white hover:text-accent hover:bg-gray-800'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <Link href="/login" className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-dark transition-colors">
                            Acceder
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-white hover:text-accent p-2"
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-gray-900 border-t border-gray-800"
                >
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block px-4 py-3 rounded-lg font-medium ${pathname === item.href
                                    ? 'bg-accent text-white'
                                    : 'text-white hover:bg-gray-800'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className="block px-4 py-3 rounded-lg font-medium bg-accent text-white text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Acceder
                        </Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
