'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated, checkAuth, logout } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        console.log('[Dashboard] Component mounted, checking auth...');
        
        const performAuthCheck = async () => {
            setIsChecking(true);
            await checkAuth();
            setIsChecking(false);
        };
        
        performAuthCheck();
    }, [checkAuth]);

    useEffect(() => {
        console.log('[Dashboard] Auth state changed:', { 
            isAuthenticated, 
            isChecking,
            hasUser: !!user 
        });
        
        // Only redirect if auth check is complete and user is not authenticated
        if (!isChecking && !isAuthenticated) {
            console.log('[Dashboard] Auth check complete, not authenticated, redirecting...');
            router.push('/login');
        }
    }, [isAuthenticated, isChecking, router, user]);

    // Show loading while checking auth
    if (isChecking) {
        return (
            <div className="min-h-screen w-full bg-black flex items-center justify-center">
                <div className="text-white text-xl">Verifying authentication...</div>
            </div>
        );
    }

    // Show loading if not authenticated (before redirect)
    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-screen w-full bg-black flex items-center justify-center">
                <div className="text-white text-xl">Redirecting to login...</div>
            </div>
        );
    }

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <div className="min-h-screen w-full bg-black">
            <div className="w-full p-8">
                {/* Header with Logout */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white font-bagos">
                        DASHBOARD
                    </h1>
                    <Button 
                        label="LOGOUT" 
                        type="button"
                        size="medium"
                        onClick={handleLogout}
                    />
                </div>

                {/* User Info Card */}
                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg mb-6 border border-zinc-800">
                    <h2 className="text-xl font-semibold text-white mb-4 font-bagos">
                        WELCOME, {user.name.toUpperCase()}!
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-primary-700 font-medium">EMAIL:</span>
                            <span className="text-gray-300">{user.email}</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-800">
                    <p className="text-gray-300">
                        Welcome to your dashboard! You are successfully authenticated.
                    </p>
                </div>
            </div>
        </div>
    );
}