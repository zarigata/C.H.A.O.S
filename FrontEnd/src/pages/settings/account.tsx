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
 * ▄▀█ █▀▀ █▀▀ █▀█ █░█ █▄░█ ▀█▀   █▀ █▀▀ ▀█▀ ▀█▀ █ █▄░█ █▀▀ █▀   █▀█ ▄▀█ █▀▀ █▀▀
 * █▀█ █▄▄ █▄▄ █▄█ █▄█ █░▀█ ░█░   ▄█ ██▄ ░█░ ░█░ █ █░▀█ █▄█ ▄█   █▀▀ █▀█ █▄█ ██▄
 * 
 * [CODEX] Account Settings Page
 * 
 * This page allows users to manage their account information,
 * security settings, and connected devices with an MSN-inspired
 * interface and modern security practices.
 * 
 * Features:
 * - Profile information management
 * - Password and security settings
 * - Connected devices control
 * - Account deletion options
 */

import React, { useState } from 'react';
import Head from 'next/head';
import SettingsLayout from '@/components/settings/SettingsLayout';
import AccountSettings from '@/components/settings/AccountSettings';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

/**
 * [H4X] ACCOUNT SETTINGS PAGE
 * 
 * Page container for account settings management
 */
const AccountSettingsPage: React.FC = () => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  /**
   * [H4X] SAVE CHANGES HANDLER
   * 
   * Callback function to handle saving changes from child components
   */
  const handleSaveChanges = async () => {
    setIsSaving(true);
    
    try {
      // This would normally be the place to aggregate all settings changes
      // and submit them to the API, but since the actual changes happen
      // within the component, we're just simulating the save here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving account settings:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  /**
   * [H4X] CANCEL CHANGES HANDLER
   * 
   * Resets all unsaved changes
   */
  const handleCancelChanges = () => {
    setHasUnsavedChanges(false);
    // The actual reset happens in the child component
  };
  
  /**
   * [H4X] TRACK UNSAVED CHANGES
   * 
   * Callback function to track changes from child components
   */
  const trackChanges = (hasChanges: boolean) => {
    setHasUnsavedChanges(hasChanges);
  };
  
  return (
    <ProtectedRoute>
      <Head>
        <title>Account Settings | ChatEra</title>
        <meta name="description" content="Manage your ChatEra account settings and profile" />
      </Head>
      
      <SettingsLayout
        title="Account Settings"
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSaveChanges}
        onCancel={handleCancelChanges}
        currentSection="account"
      >
        <AccountSettings onSaveChanges={trackChanges} />
      </SettingsLayout>
    </ProtectedRoute>
  );
};

export default AccountSettingsPage;
