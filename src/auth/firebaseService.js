import { auth } from '../auth/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';

export const enableTestOtpMode = () => {
  if (auth && auth.settings) {
    try {
      auth.settings.appVerificationDisabledForTesting = true;
      console.log('🧪 OTP testing mode enabled (appVerificationDisabledForTesting = true)');
    } catch (err) {
      console.warn('⚠️ Failed to enable OTP testing mode:', err);
    }
  } else {
    console.warn('⚠️ auth.settings not available yet. OTP test mode not enabled.');
  }
};

/**
 * 🔐 Setup invisible reCAPTCHA verifier (required for phone OTP)
 */
export const setupRecaptcha = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const container = document.getElementById('recaptcha-container');
      if (!container) {
        console.warn('❌ reCAPTCHA container not ready yet.');
        return reject(new Error('reCAPTCHA container not found.'));
      }

      if (!window.recaptchaVerifier) {
        console.log('🔄 Initializing reCAPTCHA...');
        // Fixed: Pass auth as first parameter, then container ID, then options
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {
            size: 'invisible',
            callback: (response) => {
              console.log('✅ reCAPTCHA solved:', response);
            },
            'expired-callback': () => {
              console.warn('⚠️ reCAPTCHA expired.');
            },
          }
        );

        window.recaptchaVerifier.render().then((id) => {
          window.recaptchaWidgetId = id;
          console.log('✅ reCAPTCHA widget rendered:', id);
          resolve(window.recaptchaVerifier);
        }).catch((err) => {
          console.error('❌ reCAPTCHA render failed:', err);
          reject(err);
        });
      } else {
        resolve(window.recaptchaVerifier);
      }
    }, 0); // ⏳ Ensures DOM is ready
  });
};

/**
 * 👤 Send OTP to phone for registration (without creating email account yet)
 */
export const sendOtpForRegistration = async (phoneNumber) => {
  try {
    console.log('📱 Sending OTP for registration to:', phoneNumber);
    enableTestOtpMode(); // 🧪 Enable test mode for OTP
    const confirmationResult = await sendOtpToPhone(phoneNumber);
    window.confirmationResult = confirmationResult;
    console.log('📲 OTP sent successfully for registration.');
    return confirmationResult;
  } catch (err) {
    console.error('❌ Failed to send OTP for registration:', err);
    throw err;
  }
};

/**
 * 👤 Register user with email + password after OTP verification
 */
export const registerWithEmailAndPassword = async (email, password) => {
  try {
    console.log('🔐 Creating user account with email and password...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('✅ Email registration successful.');
    return userCredential;
  } catch (err) {
    console.error('❌ Email registration failed:', err);
    throw err;
  }
};

/**
 * 🔑 Login user with email and password
 */
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    console.log('🔑 Logging in user...');
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log('✅ Login successful.');
    return result;
  } catch (err) {
    console.error('❌ Login failed:', err);
    throw err;
  }
};

/**
 * 📲 Send OTP to phone number using Firebase + reCAPTCHA
 */
export const sendOtpToPhone = async (phoneNumber) => {
  try {
    const appVerifier = await setupRecaptcha(); // ✅ Await full verifier setup
    if (!appVerifier) throw new Error('❌ reCAPTCHA not initialized.');

    console.log('📤 Sending OTP to:', phoneNumber);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    console.log('✅ OTP sent successfully.');
    return confirmationResult;
  } catch (err) {
    console.error('❌ Failed to send OTP:', err);
    throw err;
  }
};
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();

/**
 * 🔐 Sign in using Google popup
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('✅ Google Sign-In successful:', user);
    return user;
  } catch (error) {
    console.error('❌ Google Sign-In failed:', error);
    throw error;
  }
};