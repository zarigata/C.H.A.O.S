// =================================================================
// ██████╗██╗  ██╗ █████╗ ████████╗███████╗██████╗  █████╗ 
// ██╔════╝██║  ██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██╔══██╗
// ██║     ███████║███████║   ██║   █████╗  ██████╔╝███████║
// ██║     ██╔══██║██╔══██║   ██║   ██╔══╝  ██╔══██╗██╔══██║
// ╚██████╗██║  ██║██║  ██║   ██║   ███████╗██║  ██║██║  ██║
//  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
// GENERATED BY CLAUDE: ChatEra v1.0 – 2025-05-13
// =================================================================

/**
 * █▀ █▀▀ ▀█▀ ▀█▀ █ █▄░█ █▀▀ █▀   █▀█ ▄▀█ █▀▀ █▀▀
 * ▄█ ██▄ ░█░ ░█░ █ █░▀█ █▄█ ▄█   █▀▀ █▀█ █▄█ ██▄
 * 
 * [CODEX] Settings Main Page
 * 
 * This is the main entry point for the ChatEra settings interface,
 * providing access to all user configurable options. It redirects
 * to the default "account" section on initial load.
 * 
 * Features:
 * - MSN-inspired settings interface
 * - Comprehensive user preferences management
 * - Cross-platform support (Windows/Linux)
 * - Responsive design for all screen sizes
 */

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SettingsLayout from '@/components/settings/SettingsLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

/**
 * [H4X] SETTINGS INDEX PAGE
 * 
 * Main settings page that redirects to the account section by default
 */
const SettingsPage: React.FC = () => {
  const router = useRouter();
  
  // Redirect to account settings by default
  useEffect(() => {
    if (router.pathname === '/settings') {
      router.replace('/settings/account');
    }
  }, [router]);
  
  return (
    <ProtectedRoute>
      <Head>
        <title>Settings | ChatEra</title>
        <meta name="description" content="Configure your ChatEra preferences and account settings" />
      </Head>
      
      <SettingsLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-pulse mb-4">
              <div className="h-16 w-16 bg-gradient-to-r from-msn-blue to-msn-blue-light rounded-full mx-auto flex items-center justify-center">
                <span className="text-white text-lg font-bold">CE</span>
              </div>
            </div>
            <h2 className="text-lg font-medium text-msn-gray-600 dark:text-msn-gray-400">
              Loading settings...
            </h2>
            <p className="text-sm text-msn-gray-500 dark:text-msn-gray-500 mt-2">
              Please select a category from the sidebar
            </p>
          </div>
        </div>
      </SettingsLayout>
    </ProtectedRoute>
  );
};

export default SettingsPage;
