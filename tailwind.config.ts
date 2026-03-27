import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,ts,svelte}'],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				veritas: {
					crimson: '#d7263d',
					flame: '#f46036',
					indigo: '#2e294e',
					verdigris: '#1b998b',
					yellowGreen: '#c5d86d',
					accent: '#1b998b',
					primary: '#2e294e',
					danger: '#d7263d',
					warning: '#f46036',
					success: '#c5d86d',
					'accent-p3': 'color(display-p3 0.106 0.6 0.545)'
				},
				ink: {
					DEFAULT: '#201b2b',
					dark: '#f2ece3'
				},
				'muted-ink': {
					DEFAULT: '#5f5966',
					dark: '#c7c0b7'
				},
				paper: {
					DEFAULT: '#f5efe5',
					dark: '#19171f'
				},
				'paper-lifted': {
					DEFAULT: '#fcf8f1',
					dark: '#221f28'
				},
				canvas: {
					top: {
						DEFAULT: '#f0e7da',
						dark: '#14121a'
					},
					bottom: {
						DEFAULT: '#e7ded3',
						dark: '#0f0d14'
					}
				},
				line: {
					DEFAULT: '#d5cabd',
					dark: '#373440'
				}
			},
			fontFamily: {
				display: ['Georgia', 'ui-serif', 'serif'],
				rounded: ['ui-rounded', 'system-ui', 'sans-serif']
			},
			fontSize: {
				eyebrow: [
					'11px',
					{
						lineHeight: '1rem',
						letterSpacing: '0.15em',
						fontWeight: '700'
					}
				],
				'title-sm': ['26px', { lineHeight: '1.2' }],
				'title-md': ['30px', { lineHeight: '1.2' }],
				'title-lg': ['34px', { lineHeight: '1.15' }],
				badge: ['12px', { lineHeight: '1.25' }]
			},
			spacing: {
				18: '4.5rem',
				22: '5.5rem',
				7.5: '1.875rem'
			},
			borderRadius: {
				panel: '28px',
				'panel-sm': '20px'
			},
			boxShadow: {
				panel: '0 12px 18px -3px rgb(0 0 0 / 0.07)',
				'panel-dark': '0 12px 18px -3px rgb(0 0 0 / 0.26)',
				'glow-accent': '0 0 80px 40px rgb(27 153 139 / 0.12)',
				'glow-accent-dark': '0 0 80px 40px rgb(27 153 139 / 0.18)',
				'glow-flame': '0 0 70px 36px rgb(244 96 54 / 0.08)',
				'glow-flame-dark': '0 0 70px 36px rgb(244 96 54 / 0.12)'
			},
			keyframes: {
				'veritas-gradient': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.92' }
				},
				'veritas-float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-6px)' }
				}
			},
			animation: {
				'veritas-gradient': 'veritas-gradient 14s ease-in-out infinite',
				'veritas-float': 'veritas-float 7s ease-in-out infinite'
			}
		}
	}
} satisfies Config;
