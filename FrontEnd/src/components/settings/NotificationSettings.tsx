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
 * █▄░█ █▀█ ▀█▀ █ █▀▀ █ █▀▀ ▄▀█ ▀█▀ █ █▀█ █▄░█   █▀ █▀▀ ▀█▀ ▀█▀ █ █▄░█ █▀▀ █▀
 * █░▀█ █▄█ ░█░ █ █▀░ █ █▄▄ █▀█ ░█░ █ █▄█ █░▀█   ▄█ ██▄ ░█░ ░█░ █ █░▀█ █▄█ ▄█
 * 
 * [CODEX] Notification Settings Component
 * 
 * This component allows users to customize their notification preferences
 * for the ChatEra application, including sound alerts, desktop notifications,
 * and Do Not Disturb scheduling.
 * 
 * Features:
 * - Global notification toggle
 * - Sound notification options
 * - Message preview settings
 * - Notification scheduling
 * - Per-contact notification rules
 * - Cross-platform support (Windows/Linux)
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  BellOff, 
  Volume2, 
  VolumeX,
  Clock,
  Eye,
  EyeOff,
  Users,
  Calendar,
  Plus,
  Trash2,
  Check,
  Info
} from 'lucide-react';
import { useTauri } from '@/lib/tauri';

interface NotificationSettingsProps {
  onSaveChanges: (hasChanges: boolean) => void;
}

/**
 * [H4X] NOTIFICATION SETTINGS COMPONENT
 * 
 * Component for customizing notification preferences
 */
const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onSaveChanges }) => {
  const { isDesktop } = useTauri();
  
  // Form state
  const [settings, setSettings] = useState({
    enableNotifications: true,
    sounds: {
      enabled: true,
      messageSound: 'msn-message',
      loginSound: 'msn-login',
      logoutSound: 'msn-logout',
      volume: 75,
      customSounds: false
    },
    desktopNotifications: isDesktop,
    browserNotifications: !isDesktop,
    previewMessages: true,
    showSenderInfo: true,
    doNotDisturb: {
      enabled: false,
      scheduled: false,
      startTime: '22:00',
      endTime: '08:00',
      days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    },
    mutedContacts: [] as string[]
  });
  
  // Track unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Mock contacts for the UI (in a real app, these would come from an API)
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Alice Smith', avatar: '/avatars/default-1.png' },
    { id: '2', name: 'Bob Johnson', avatar: '/avatars/default-2.png' },
    { id: '3', name: 'Carol Williams', avatar: '/avatars/default-3.png' },
    { id: '4', name: 'Dave Brown', avatar: '/avatars/default-4.png' }
  ]);
  
  // Notification sound options
  const soundOptions = [
    { id: 'msn-message', name: 'MSN Message', preview: '/sounds/msn-message.mp3' },
    { id: 'msn-login', name: 'MSN Login', preview: '/sounds/msn-login.mp3' },
    { id: 'msn-logout', name: 'MSN Logout', preview: '/sounds/msn-logout.mp3' },
    { id: 'msn-nudge', name: 'MSN Nudge', preview: '/sounds/msn-nudge.mp3' },
    { id: 'msn-typing', name: 'MSN Typing', preview: '/sounds/msn-typing.mp3' },
    { id: 'custom', name: 'Custom Sound', preview: '' }
  ];
  
  // Notify parent component about unsaved changes
  useEffect(() => {
    onSaveChanges(hasUnsavedChanges);
  }, [hasUnsavedChanges, onSaveChanges]);
  
  /**
   * [H4X] Form change handlers
   */
  const handleSettingChange = (
    key: string, 
    value: any
  ) => {
    // Handle nested settings
    const keys = key.split('.');
    
    if (keys.length === 1) {
      setSettings(prev => ({ ...prev, [key]: value }));
    } else if (keys.length === 2) {
      const [parent, child] = keys;
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    }
    
    setHasUnsavedChanges(true);
  };
  
  /**
   * [H4X] Play sound preview
   */
  const playSound = (soundUrl: string) => {
    if (!soundUrl) return;
    
    const audio = new Audio(soundUrl);
    audio.volume = settings.sounds.volume / 100;
    audio.play();
  };
  
  /**
   * [H4X] Contact muting functions
   */
  const toggleMuteContact = (contactId: string) => {
    if (settings.mutedContacts.includes(contactId)) {
      // Unmute
      setSettings(prev => ({
        ...prev,
        mutedContacts: prev.mutedContacts.filter(id => id !== contactId)
      }));
    } else {
      // Mute
      setSettings(prev => ({
        ...prev,
        mutedContacts: [...prev.mutedContacts, contactId]
      }));
    }
    
    setHasUnsavedChanges(true);
  };
  
  /**
   * [H4X] DND scheduling functions
   */
  const handleDayToggle = (day: string) => {
    const days = settings.doNotDisturb.days;
    
    if (days.includes(day)) {
      // Remove day
      handleSettingChange('doNotDisturb.days', days.filter(d => d !== day));
    } else {
      // Add day
      handleSettingChange('doNotDisturb.days', [...days, day]);
    }
  };
  
  /**
   * [H4X] Request notification permissions
   */
  const requestPermissions = async () => {
    if (!isDesktop && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        handleSettingChange('browserNotifications', true);
      } else {
        // If denied, disable notifications
        handleSettingChange('browserNotifications', false);
      }
    }
  };
  
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
      
      {/* Global notification toggle */}
      <div className="flex items-center justify-between p-4 bg-msn-gray-50 dark:bg-msn-gray-800 rounded-lg border border-msn-gray-200 dark:border-msn-gray-700">
        <div className="flex items-center">
          {settings.enableNotifications ? (
            <Bell className="h-6 w-6 text-msn-blue mr-3" />
          ) : (
            <BellOff className="h-6 w-6 text-msn-gray-400 mr-3" />
          )}
          <div>
            <h3 className="font-medium">Notifications</h3>
            <p className="text-sm text-msn-gray-600 dark:text-msn-gray-400">
              {settings.enableNotifications 
                ? 'You will receive notifications for messages and activity' 
                : 'All notifications are currently disabled'}
            </p>
          </div>
        </div>
        <div className="relative inline-block w-12 align-middle select-none">
          <input
            type="checkbox"
            name="enableNotifications"
            id="enableNotifications"
            checked={settings.enableNotifications}
            onChange={() => handleSettingChange('enableNotifications', !settings.enableNotifications)}
            className="sr-only"
          />
          <div className="block h-7 rounded-full bg-msn-gray-300 dark:bg-msn-gray-700 cursor-pointer"></div>
          <div
            className={`absolute left-0 top-0 mt-1 ml-1 h-5 w-5 rounded-full transition-transform duration-200 ease-in-out ${
              settings.enableNotifications
                ? 'transform translate-x-5 bg-msn-blue'
                : 'bg-white'
            }`}
          ></div>
        </div>
      </div>
      
      {/* Notification settings sections - only shown if notifications are enabled */}
      {settings.enableNotifications && (
        <>
          {/* Sound settings */}
          <div className="pt-4 border-t border-msn-gray-200 dark:border-msn-gray-700 space-y-4">
            <h3 className="text-lg font-medium mb-2">Sound Notifications</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <span className="mr-2">Enable notification sounds</span>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      name="soundEnabled"
                      id="soundEnabled"
                      checked={settings.sounds.enabled}
                      onChange={() => handleSettingChange('sounds.enabled', !settings.sounds.enabled)}
                      className="sr-only"
                    />
                    <div className="block h-6 rounded-full bg-msn-gray-300 dark:bg-msn-gray-700 cursor-pointer"></div>
                    <div
                      className={`absolute left-0 top-0 mt-1 ml-1 h-4 w-4 rounded-full transition-transform duration-200 ease-in-out ${
                        settings.sounds.enabled
                          ? 'transform translate-x-4 bg-msn-blue'
                          : 'bg-white'
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
              
              {/* Sound selection - only shown if sounds are enabled */}
              {settings.sounds.enabled && (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Message Sound</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {soundOptions.map(sound => (
                        <button
                          key={sound.id}
                          type="button"
                          className={`flex items-center justify-between px-3 py-2 rounded-md text-sm ${
                            settings.sounds.messageSound === sound.id
                              ? 'bg-msn-blue text-white'
                              : 'bg-msn-gray-100 dark:bg-msn-gray-700 text-msn-gray-800 dark:text-msn-gray-200'
                          }`}
                          onClick={() => {
                            handleSettingChange('sounds.messageSound', sound.id);
                            if (sound.preview) playSound(sound.preview);
                          }}
                        >
                          <span>{sound.name}</span>
                          {sound.preview && (
                            <Volume2 
                              size={16} 
                              className="ml-2 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                playSound(sound.preview);
                              }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Volume</label>
                    <div className="flex items-center space-x-2">
                      <VolumeX size={16} className="text-msn-gray-500" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.sounds.volume}
                        onChange={(e) => handleSettingChange('sounds.volume', parseInt(e.target.value))}
                        className="w-full h-2 bg-msn-gray-200 dark:bg-msn-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <Volume2 size={16} className="text-msn-gray-500" />
                      <span className="w-8 text-sm text-msn-gray-500">
                        {settings.sounds.volume}%
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Desktop/Browser notification settings */}
          <div className="pt-4 border-t border-msn-gray-200 dark:border-msn-gray-700 space-y-4">
            <h3 className="text-lg font-medium mb-2">
              {isDesktop ? 'Desktop Notifications' : 'Browser Notifications'}
            </h3>
            
            <div className="space-y-4">
              {isDesktop ? (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <span className="mr-2">Show desktop notifications</span>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="desktopNotifications"
                        id="desktopNotifications"
                        checked={settings.desktopNotifications}
                        onChange={() => handleSettingChange('desktopNotifications', !settings.desktopNotifications)}
                        className="sr-only"
                      />
                      <div className="block h-6 rounded-full bg-msn-gray-300 dark:bg-msn-gray-700 cursor-pointer"></div>
                      <div
                        className={`absolute left-0 top-0 mt-1 ml-1 h-4 w-4 rounded-full transition-transform duration-200 ease-in-out ${
                          settings.desktopNotifications
                            ? 'transform translate-x-4 bg-msn-blue'
                            : 'bg-white'
                        }`}
                      ></div>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <label className="flex items-center">
                      <span className="mr-2">Show browser notifications</span>
                    </label>
                    <p className="text-sm text-msn-gray-600 dark:text-msn-gray-400 mt-1">
                      You may need to grant permission in your browser
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="relative inline-block w-10 align-middle select-none mr-2">
                      <input
                        type="checkbox"
                        name="browserNotifications"
                        id="browserNotifications"
                        checked={settings.browserNotifications}
                        onChange={() => {
                          if (!settings.browserNotifications) {
                            requestPermissions();
                          } else {
                            handleSettingChange('browserNotifications', false);
                          }
                        }}
                        className="sr-only"
                      />
                      <div className="block h-6 rounded-full bg-msn-gray-300 dark:bg-msn-gray-700 cursor-pointer"></div>
                      <div
                        className={`absolute left-0 top-0 mt-1 ml-1 h-4 w-4 rounded-full transition-transform duration-200 ease-in-out ${
                          settings.browserNotifications
                            ? 'transform translate-x-4 bg-msn-blue'
                            : 'bg-white'
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <span className="mr-2">Show message previews</span>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      name="previewMessages"
                      id="previewMessages"
                      checked={settings.previewMessages}
                      onChange={() => handleSettingChange('previewMessages', !settings.previewMessages)}
                      className="sr-only"
                    />
                    <div className="block h-6 rounded-full bg-msn-gray-300 dark:bg-msn-gray-700 cursor-pointer"></div>
                    <div
                      className={`absolute left-0 top-0 mt-1 ml-1 h-4 w-4 rounded-full transition-transform duration-200 ease-in-out ${
                        settings.previewMessages
                          ? 'transform translate-x-4 bg-msn-blue'
                          : 'bg-white'
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Do Not Disturb settings */}
          <div className="pt-4 border-t border-msn-gray-200 dark:border-msn-gray-700 space-y-4">
            <h3 className="text-lg font-medium mb-2">Do Not Disturb</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="flex items-center">
                    <span className="mr-2">Do Not Disturb mode</span>
                  </label>
                  <p className="text-sm text-msn-gray-600 dark:text-msn-gray-400 mt-1">
                    Mute all notifications while active
                  </p>
                </div>
                
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    name="dndEnabled"
                    id="dndEnabled"
                    checked={settings.doNotDisturb.enabled}
                    onChange={() => handleSettingChange('doNotDisturb.enabled', !settings.doNotDisturb.enabled)}
                    className="sr-only"
                  />
                  <div className="block h-6 rounded-full bg-msn-gray-300 dark:bg-msn-gray-700 cursor-pointer"></div>
                  <div
                    className={`absolute left-0 top-0 mt-1 ml-1 h-4 w-4 rounded-full transition-transform duration-200 ease-in-out ${
                      settings.doNotDisturb.enabled
                        ? 'transform translate-x-4 bg-msn-blue'
                        : 'bg-white'
                    }`}
                  ></div>
                </div>
              </div>
              
              {/* Scheduled DND */}
              <div className="flex items-center justify-between pl-4 border-l-2 border-msn-gray-200 dark:border-msn-gray-700">
                <div>
                  <label className="flex items-center">
                    <span className="mr-2">Schedule Do Not Disturb</span>
                  </label>
                  <p className="text-sm text-msn-gray-600 dark:text-msn-gray-400 mt-1">
                    Automatically enable at specific times
                  </p>
                </div>
                
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    name="dndScheduled"
                    id="dndScheduled"
                    checked={settings.doNotDisturb.scheduled}
                    onChange={() => handleSettingChange('doNotDisturb.scheduled', !settings.doNotDisturb.scheduled)}
                    className="sr-only"
                    disabled={!settings.doNotDisturb.enabled}
                  />
                  <div className={`block h-6 rounded-full ${
                    settings.doNotDisturb.enabled 
                      ? 'bg-msn-gray-300 dark:bg-msn-gray-700 cursor-pointer' 
                      : 'bg-msn-gray-200 dark:bg-msn-gray-800 cursor-not-allowed'
                  }`}></div>
                  <div
                    className={`absolute left-0 top-0 mt-1 ml-1 h-4 w-4 rounded-full transition-transform duration-200 ease-in-out ${
                      settings.doNotDisturb.scheduled && settings.doNotDisturb.enabled
                        ? 'transform translate-x-4 bg-msn-blue'
                        : 'bg-white'
                    }`}
                  ></div>
                </div>
              </div>
              
              {/* DND Schedule settings */}
              {settings.doNotDisturb.enabled && settings.doNotDisturb.scheduled && (
                <div className="pl-4 space-y-4 border-l-2 border-msn-gray-200 dark:border-msn-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Start Time</label>
                      <input
                        type="time"
                        value={settings.doNotDisturb.startTime}
                        onChange={(e) => handleSettingChange('doNotDisturb.startTime', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-msn-gray-700 border border-msn-gray-300 dark:border-msn-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-msn-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">End Time</label>
                      <input
                        type="time"
                        value={settings.doNotDisturb.endTime}
                        onChange={(e) => handleSettingChange('doNotDisturb.endTime', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-msn-gray-700 border border-msn-gray-300 dark:border-msn-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-msn-blue"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Active Days</label>
                    <div className="flex flex-wrap gap-2">
                      {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                        <button
                          key={day}
                          type="button"
                          className={`px-2 py-1.5 rounded-md text-xs ${
                            settings.doNotDisturb.days.includes(day)
                              ? 'bg-msn-blue text-white'
                              : 'bg-msn-gray-100 dark:bg-msn-gray-700 text-msn-gray-800 dark:text-msn-gray-200'
                          }`}
                          onClick={() => handleDayToggle(day)}
                        >
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Per-contact notification settings */}
          <div className="pt-4 border-t border-msn-gray-200 dark:border-msn-gray-700">
            <h3 className="text-lg font-medium mb-2">Contact Exceptions</h3>
            <p className="text-sm text-msn-gray-600 dark:text-msn-gray-400 mb-4">
              Customize notification settings for specific contacts
            </p>
            
            <div className="space-y-2">
              {contacts.map(contact => (
                <div 
                  key={contact.id}
                  className="flex items-center justify-between p-3 border border-msn-gray-200 dark:border-msn-gray-700 rounded-md"
                >
                  <div className="flex items-center">
                    <img 
                      src={contact.avatar} 
                      alt={contact.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span>{contact.name}</span>
                  </div>
                  
                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-md text-xs flex items-center ${
                      settings.mutedContacts.includes(contact.id)
                        ? 'bg-msn-red text-white'
                        : 'bg-msn-gray-100 dark:bg-msn-gray-700 text-msn-gray-800 dark:text-msn-gray-200'
                    }`}
                    onClick={() => toggleMuteContact(contact.id)}
                  >
                    {settings.mutedContacts.includes(contact.id) ? (
                      <>
                        <BellOff size={14} className="mr-1.5" />
                        Muted
                      </>
                    ) : (
                      <>
                        <Bell size={14} className="mr-1.5" />
                        Notify
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationSettings;
