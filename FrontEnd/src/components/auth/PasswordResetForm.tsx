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
 * █▀█ ▄▀█ █▀ █▀ █░█░█ █▀█ █▀█ █▀▄   █▀█ █▀▀ █▀ █▀▀ ▀█▀
 * █▀▀ █▀█ ▄█ ▄█ ▀▄▀▄▀ █▄█ █▀▄ █▄▀   █▀▄ ██▄ ▄█ ██▄ ░█░
 * 
 * [CODEX] Password Reset Form Component
 * 
 * This component handles the secure password recovery flow,
 * allowing users to request a reset link and set a new password.
 * 
 * Features:
 * - Multi-step recovery process
 * - Email verification with secure token handling
 * - Password strength validation
 * - Cross-platform compatibility for web and desktop
 * - Success/error state management
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  KeyRound, 
  AlertCircle, 
  Mail,
  ArrowLeft,
  Shield,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useTauri } from '@/lib/tauri';

interface PasswordResetFormProps {
  token?: string; // Will be provided if in reset confirmation step
  email?: string; // Will be provided if in reset confirmation step
}

// Steps in the password reset flow
type ResetStep = 'request' | 'confirmation' | 'success';

/**
 * [H4X] PASSWORD RESET FORM
 *
 * Multi-step form for secure password recovery
 */
const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ 
  token,
  email: initialEmail
}) => {
  const router = useRouter();
  const { requestPasswordReset, confirmPasswordReset, error: authError } = useAuth();
  const { isDesktop } = useTauri();
  
  // Determine initial step based on props
  const initialStep: ResetStep = token ? 'confirmation' : 'request';
  
  // Form state
  const [step, setStep] = useState<ResetStep>(initialStep);
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Validation state
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  
  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState<
    'weak' | 'medium' | 'strong' | 'very-strong' | null
  >(null);
  
  // Clear errors when inputs change
  useEffect(() => {
    if (email) setEmailError(null);
    if (password) setPasswordError(null);
    if (confirmPassword) setConfirmPasswordError(null);
    if (email || password || confirmPassword) setError(null);
  }, [email, password, confirmPassword]);
  
  // Set error from auth provider
  useEffect(() => {
    if (authError) {
      setError(authError);
      setLoading(false);
    }
  }, [authError]);
  
  /**
   * [H4X] PASSWORD STRENGTH CALCULATOR
   * 
   * Evaluates and categorizes password security level
   */
  useEffect(() => {
    if (!password) {
      setPasswordStrength(null);
      return;
    }
    
    // Check password strength
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const isLongEnough = password.length >= 8;
    
    const strength = [hasLowercase, hasUppercase, hasNumber, hasSpecialChar, isLongEnough]
      .filter(Boolean).length;
    
    if (strength <= 2) {
      setPasswordStrength('weak');
    } else if (strength === 3) {
      setPasswordStrength('medium');
    } else if (strength === 4) {
      setPasswordStrength('strong');
    } else {
      setPasswordStrength('very-strong');
    }
  }, [password]);
  
  /**
   * [H4X] PASSWORD STRENGTH INDICATOR
   * 
   * Visual indicator for password security level
   */
  const renderPasswordStrength = () => {
    if (!passwordStrength) return null;
    
    const getColorClass = () => {
      switch (passwordStrength) {
        case 'weak':
          return 'bg-msn-red';
        case 'medium':
          return 'bg-msn-orange';
        case 'strong':
          return 'bg-msn-green';
        case 'very-strong':
          return 'bg-msn-blue';
        default:
          return 'bg-msn-gray-300';
      }
    };
    
    const getWidthClass = () => {
      switch (passwordStrength) {
        case 'weak':
          return 'w-1/4';
        case 'medium':
          return 'w-2/4';
        case 'strong':
          return 'w-3/4';
        case 'very-strong':
          return 'w-full';
        default:
          return 'w-0';
      }
    };
    
    const getMessage = () => {
      switch (passwordStrength) {
        case 'weak':
          return 'Weak password';
        case 'medium':
          return 'Medium strength';
        case 'strong':
          return 'Strong password';
        case 'very-strong':
          return 'Very strong password';
        default:
          return '';
      }
    };
    
    return (
      <div className="mt-1">
        <div className="h-1.5 w-full bg-msn-gray-200 dark:bg-msn-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getColorClass()} ${getWidthClass()} transition-all duration-300`}
          ></div>
        </div>
        <p className={`text-xs mt-1 ${getColorClass().replace('bg-', 'text-')}`}>
          {getMessage()}
        </p>
      </div>
    );
  };
  
  /**
   * [H4X] STEP VALIDATORS
   * 
   * Validate form inputs for each step
   */
  const validateRequestStep = (): boolean => {
    let isValid = true;
    
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    
    return isValid;
  };
  
  const validateConfirmationStep = (): boolean => {
    let isValid = true;
    
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else if (passwordStrength === 'weak') {
      setPasswordError('Please use a stronger password');
      isValid = false;
    }
    
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }
    
    return isValid;
  };
  
  /**
   * [H4X] FORM HANDLERS
   * 
   * Process form submissions for each step
   */
  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRequestStep()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // await requestPasswordReset(email.trim());
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - show confirmation message
      setLoading(false);
      setStep('success');
    } catch (err) {
      setLoading(false);
      setError('Failed to send reset link. Please try again.');
    }
  };
  
  const handleConfirmationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateConfirmationStep()) return;
    if (!token) {
      setError('Missing reset token. Please try again.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // await confirmPasswordReset({
      //   token,
      //   password
      // });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - redirect to login
      setLoading(false);
      router.push('/auth/login?resetSuccess=true');
    } catch (err) {
      setLoading(false);
      setError('Failed to reset password. The link may be expired or invalid.');
    }
  };
  
  /**
   * [H4X] STEP CONTENT RENDERERS
   * 
   * Render form content for each step
   */
  const renderRequestStep = () => (
    <form onSubmit={handleRequestSubmit} className="space-y-4">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-msn-gray-700 dark:text-msn-gray-300 mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className={`
            w-full px-3 py-2 rounded-md 
            bg-white dark:bg-msn-gray-700 
            border ${emailError ? 'border-msn-red' : 'border-msn-gray-300 dark:border-msn-gray-600'} 
            focus:outline-none focus:ring-2 focus:ring-msn-blue
          `}
          placeholder="Enter your account email"
        />
        {emailError && (
          <p className="mt-1 text-sm text-msn-red">{emailError}</p>
        )}
        <p className="mt-1 text-xs text-msn-gray-500 dark:text-msn-gray-400">
          We'll send a password reset link to this email
        </p>
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`
          w-full px-4 py-2 rounded-md flex items-center justify-center
          text-white font-medium
          ${loading 
            ? 'bg-msn-gray-400 cursor-not-allowed' 
            : 'bg-msn-blue hover:bg-msn-blue-dark'}
          transition-colors duration-200
        `}
      >
        {loading ? (
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
        ) : (
          <Mail size={18} className="mr-2" />
        )}
        {loading ? 'Sending reset link...' : 'Send reset link'}
      </button>
      
      {/* Back to Login Link */}
      <div className="text-center mt-4">
        <Link 
          href="/auth/login" 
          className="text-msn-blue font-medium hover:text-msn-blue-dark dark:hover:text-msn-blue-light flex items-center justify-center"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to login
        </Link>
      </div>
    </form>
  );
  
  const renderConfirmationStep = () => (
    <form onSubmit={handleConfirmationSubmit} className="space-y-4">
      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-msn-gray-700 dark:text-msn-gray-300 mb-1">
          New Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className={`
              w-full px-3 py-2 rounded-md 
              bg-white dark:bg-msn-gray-700 
              border ${passwordError ? 'border-msn-red' : 'border-msn-gray-300 dark:border-msn-gray-600'} 
              focus:outline-none focus:ring-2 focus:ring-msn-blue
              pr-10
            `}
            placeholder="Create a secure password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-msn-gray-500"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {passwordError && (
          <p className="mt-1 text-sm text-msn-red">{passwordError}</p>
        )}
        {password && !passwordError && renderPasswordStrength()}
      </div>
      
      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-msn-gray-700 dark:text-msn-gray-300 mb-1">
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          className={`
            w-full px-3 py-2 rounded-md 
            bg-white dark:bg-msn-gray-700 
            border ${confirmPasswordError ? 'border-msn-red' : 'border-msn-gray-300 dark:border-msn-gray-600'} 
            focus:outline-none focus:ring-2 focus:ring-msn-blue
          `}
          placeholder="Confirm your new password"
        />
        {confirmPasswordError && (
          <p className="mt-1 text-sm text-msn-red">{confirmPasswordError}</p>
        )}
      </div>
      
      {/* Security Notice */}
      <div className="p-3 bg-msn-blue-light text-msn-blue-dark rounded-md flex items-start text-sm">
        <Shield size={16} className="mr-2 flex-shrink-0 mt-0.5" />
        <span>
          Choose a strong, unique password that you don't use for other accounts.
        </span>
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`
          w-full px-4 py-2 rounded-md flex items-center justify-center
          text-white font-medium
          ${loading 
            ? 'bg-msn-gray-400 cursor-not-allowed' 
            : 'bg-msn-blue hover:bg-msn-blue-dark'}
          transition-colors duration-200
        `}
      >
        {loading ? (
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
        ) : (
          <KeyRound size={18} className="mr-2" />
        )}
        {loading ? 'Resetting password...' : 'Reset password'}
      </button>
      
      {/* Back to Login Link */}
      <div className="text-center mt-4">
        <Link 
          href="/auth/login" 
          className="text-msn-blue font-medium hover:text-msn-blue-dark dark:hover:text-msn-blue-light flex items-center justify-center"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to login
        </Link>
      </div>
    </form>
  );
  
  const renderSuccessStep = () => (
    <div className="space-y-4 text-center">
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-msn-green-light flex items-center justify-center">
          <CheckCircle size={32} className="text-msn-green" />
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-msn-gray-900 dark:text-white">
        Reset link sent!
      </h3>
      
      <p className="text-msn-gray-600 dark:text-msn-gray-400">
        We've sent a password reset link to <strong>{email}</strong>. 
        Please check your inbox and spam folders.
      </p>
      
      <p className="text-msn-gray-500 dark:text-msn-gray-400 text-sm">
        The link will expire in 1 hour for security reasons.
      </p>
      
      <div className="pt-4">
        <Link 
          href="/auth/login" 
          className="px-4 py-2 rounded-md bg-msn-blue text-white font-medium hover:bg-msn-blue-dark inline-flex items-center"
        >
          <ArrowLeft size={16} className="mr-1" />
          Return to login
        </Link>
      </div>
    </div>
  );
  
  /**
   * [H4X] MAIN RENDERER
   * 
   * Determine which step to show based on current state
   */
  const renderStepContent = () => {
    // Show global error at the top of any step
    const errorMessage = error && (
      <motion.div 
        className="p-3 bg-msn-red-light text-msn-red-dark rounded-md flex items-center text-sm mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <AlertCircle size={16} className="mr-2 flex-shrink-0" />
        <span>{error}</span>
      </motion.div>
    );
    
    switch (step) {
      case 'request':
        return (
          <>
            {errorMessage}
            {renderRequestStep()}
          </>
        );
      case 'confirmation':
        return (
          <>
            {errorMessage}
            {renderConfirmationStep()}
          </>
        );
      case 'success':
        return renderSuccessStep();
      default:
        return null;
    }
  };
  
  return (
    <div>
      {renderStepContent()}
    </div>
  );
};

export default PasswordResetForm;
