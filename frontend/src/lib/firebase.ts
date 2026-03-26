import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASfXT9Ze-kdiLj4fBsQg7Wqocbx0yMc8Y",
  authDomain: "onvex-marketplace.firebaseapp.com",
  projectId: "onvex-marketplace",
  storageBucket: "onvex-marketplace.firebasestorage.app",
  messagingSenderId: "645165785047",
  appId: "1:645165785047:web:bb6c5cbc27fd7d8d5d7592"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Login com Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return { 
      success: true, 
      user: {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      } 
    };
  } catch (error) {
    console.error('Erro no login com Google:', error);
    return { success: false, error: error.message };
  }
};

// Login com Email/Senha
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    return { 
      success: true, 
      user: {
        id: user.uid,
        name: user.displayName || email.split('@')[0],
        email: user.email
      } 
    };
  } catch (error: any) {
    let message = 'Erro ao fazer login';
    if (error.code === 'auth/user-not-found') message = 'Usuário não encontrado';
    if (error.code === 'auth/wrong-password') message = 'Senha incorreta';
    if (error.code === 'auth/invalid-email') message = 'E-mail inválido';
    return { success: false, error: message };
  }
};

// Registrar com Email/Senha
export const signUpWithEmail = async (email: string, password: string, name: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    return { 
      success: true, 
      user: {
        id: user.uid,
        name: name,
        email: user.email
      } 
    };
  } catch (error: any) {
    let message = 'Erro ao criar conta';
    if (error.code === 'auth/email-already-in-use') message = 'E-mail já cadastrado';
    if (error.code === 'auth/weak-password') message = 'Senha muito fraca (mínimo 6 caracteres)';
    return { success: false, error: message };
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao sair' };
  }
};

// Verificar usuário atual
export const getCurrentUser = () => {
  return auth.currentUser;
};
