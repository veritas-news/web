import { browser } from '$app/environment';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyA36aV64M4s-gUg_r2e7GN0ceg6DSPhoKk',
	authDomain: 'veritas-24f6d.firebaseapp.com',
	projectId: 'veritas-24f6d',
	appId: '1:465757056:web:040d0aa2c2563cc519d765',
	messagingSenderId: '465757056'
};

export const firebaseApp = browser ? (getApps()[0] ?? initializeApp(firebaseConfig)) : null;

export const firebaseAuth = browser && firebaseApp ? getAuth(firebaseApp) : null;
