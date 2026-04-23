import { browser } from '$app/environment';
import { firebaseAuth } from '$lib/config/firebase';
import {
	FirebaseError
} from 'firebase/app';
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	OAuthProvider,
	signInWithPopup,
	signOut as fbSignOut,
	type User
} from 'firebase/auth';
import { postIdentityLink } from '$lib/api/identity';
import { getOrCreateDeviceKey } from '$lib/identity/storage';
import { ensureAnonymousSession, resetSessionCache } from '$lib/identity/session';

function describeAuthError(e: unknown, fallback: string): string {
	if (e instanceof FirebaseError) {
		const code = e.code ?? '';
		switch (code) {
			case 'auth/popup-blocked':
				return 'Popup blocked by browser. Allow popups and retry.';
			case 'auth/popup-closed-by-user':
			case 'auth/cancelled-popup-request':
				return 'Sign-in window was closed before completion.';
			case 'auth/operation-not-allowed':
				return 'Provider not enabled in Firebase console.';
			case 'auth/unauthorized-domain':
				return 'This domain is not authorized. Add it in Firebase Auth settings.';
			case 'auth/internal-error':
				return 'Provider rejected the request (check Apple Services ID / return URL).';
			case 'auth/invalid-credential':
				return 'Apple credential invalid (nonce / key mismatch).';
			case 'auth/account-exists-with-different-credential':
				return 'An account already exists with the same email but different sign-in method.';
			case 'auth/network-request-failed':
				return 'Network request failed. Check connection.';
			case 'auth/user-disabled':
				return 'This account has been disabled.';
			case 'auth/user-not-found':
			case 'auth/wrong-password':
				return 'Email or password is incorrect.';
			case 'auth/email-already-in-use':
				return 'That email is already registered. Try signing in.';
			case 'auth/weak-password':
				return 'Password is too weak. Use at least 8 characters.';
			case 'auth/invalid-email':
				return 'Email address is not valid.';
			default:
				return `${fallback} [${code || 'auth/unknown'}]`;
		}
	}
	if (e instanceof Error && e.message) return e.message;
	return fallback;
}

class AuthState {
	user = $state<User | null>(null);
	userId = $state('');
	loading = $state(true);
	error = $state('');

	constructor() {
		if (!browser || !firebaseAuth) {
			this.loading = false;
			return;
		}
		onAuthStateChanged(firebaseAuth, async (fbUser) => {
			this.user = fbUser;
			this.error = '';
			if (fbUser) {
				try {
					const idToken = await fbUser.getIdToken();
					const deviceKey = getOrCreateDeviceKey();
					const res = await postIdentityLink(fetch, { deviceKey, platform: 'web' }, idToken);
					this.userId = res.userId;
				} catch (e) {
					this.error = e instanceof Error ? e.message : 'Link failed';
					this.userId = await ensureAnonymousSession();
				}
			} else {
				this.userId = await ensureAnonymousSession();
			}
			this.loading = false;
		});
	}

	get isAuthenticated(): boolean {
		return this.user !== null;
	}

	get displayEmail(): string {
		return this.user?.email ?? '';
	}

	async signInWithEmail(email: string, password: string): Promise<void> {
		if (!firebaseAuth) throw new Error('Firebase not initialized');
		this.error = '';
		try {
			await signInWithEmailAndPassword(firebaseAuth, email, password);
		} catch (e) {
			this.error = describeAuthError(e, 'Sign in failed');
			throw e;
		}
	}

	async signUpWithEmail(email: string, password: string): Promise<void> {
		if (!firebaseAuth) throw new Error('Firebase not initialized');
		this.error = '';
		try {
			await createUserWithEmailAndPassword(firebaseAuth, email, password);
		} catch (e) {
			this.error = describeAuthError(e, 'Sign up failed');
			throw e;
		}
	}

	async signInWithGoogle(): Promise<void> {
		if (!firebaseAuth) throw new Error('Firebase not initialized');
		this.error = '';
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(firebaseAuth, provider);
		} catch (e) {
			this.error = describeAuthError(e, 'Google sign in failed');
			throw e;
		}
	}

	async signInWithApple(): Promise<void> {
		if (!firebaseAuth) throw new Error('Firebase not initialized');
		this.error = '';
		try {
			const provider = new OAuthProvider('apple.com');
			provider.addScope('email');
			provider.addScope('name');
			await signInWithPopup(firebaseAuth, provider);
		} catch (e) {
			this.error = describeAuthError(e, 'Apple sign in failed');
			throw e;
		}
	}

	async signOut(): Promise<void> {
		if (!firebaseAuth) return;
		await fbSignOut(firebaseAuth);
		resetSessionCache();
		this.userId = await ensureAnonymousSession();
	}

	async getIdToken(): Promise<string | null> {
		if (!this.user) return null;
		return this.user.getIdToken();
	}
}

export const authState = new AuthState();
