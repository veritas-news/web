import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const messagesDir = path.join(__dirname, '..', 'messages');
const enPath = path.join(messagesDir, 'en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const overrides = {
	zh: {
		meta_home_title: 'Veritas — 以冷静清晰的方式理解全球新闻',
		meta_home_description:
			'追踪突发新闻、专题深挖，以及多语言稳定性视角，结合精选信源与 AI 辅助简报。',
		meta_privacy_title: '隐私政策 — Veritas',
		meta_privacy_description: 'Veritas 如何依据 GDPR 与 CCPA 收集、使用并保护个人数据。',
		meta_terms_title: '服务条款 — Veritas',
		meta_terms_description: '使用 Veritas 移动应用及相关服务的规则。',
		meta_support_title: '支持 — Veritas',
		meta_support_description: '获取 Veritas 帮助：响应时间、联系渠道与常见问题。',
		meta_contact_title: '联系我们 — Veritas',
		meta_contact_description: '就合作、媒体或其他问题联系 Veritas 团队。',
		meta_cookie_title: 'Cookie 政策 — Veritas',
		meta_cookie_description: 'Veritas 在网站与应用界面如何使用 Cookie 及类似技术。',
		meta_deletion_title: '数据删除 — Veritas',
		meta_deletion_description: '如何删除 Veritas 账户及相关个人数据。',
		schema_app_description: '多语言全球新闻情报：时间线、专题、稳定性洞察与 AI 辅助分析。',
		nav_home: '首页',
		nav_privacy: '隐私',
		nav_terms: '条款',
		nav_support: '支持',
		nav_contact: '联系',
		nav_about: '关于',
		nav_cookie: 'Cookie',
		nav_deletion: '数据删除',
		nav_menu_open: '打开菜单',
		nav_menu_close: '关闭菜单',
		nav_brand_aria: 'Veritas 首页',
		hero_tagline: '跨越语言、地区与头条的清晰视角',
		hero_description:
			'Veritas 汇聚全球时间线、你关心的专题与稳定性背景，让你读到信号而非噪音。自定义语言、关注聚类，并探索基于真实报道的 AI 辅助简报。',
		hero_cta_ios: '下载 iOS 版',
		hero_cta_android: '在 Google Play 获取',
		hero_screenshot_alt: 'Veritas 应用界面，展示新闻时间线与专题洞察',
		features_title: '为关注世界的读者而打造',
		features_subtitle: 'Veritas 的一切设计都围绕快速浏览、可信信源与按需深入。',
		feature_timeline_title: '全球与个性化时间线',
		feature_timeline_desc: '浏览世界动态或定制信息流，含发布日期、摘要与清晰文章链接。',
		feature_topics_title: '你关注的专题',
		feature_topics_desc: '深入主题，查看描述、翻译与随新闻周期更新的支撑时间线。',
		feature_stability_title: '稳定性视角',
		feature_stability_desc: '查看风险与稳定性快照、地区分解、驱动因素与通俗解释。',
		feature_ai_title: 'AI 辅助简报',
		feature_ai_desc: '探索预测、专题分析与观察点，并查看与底层文章关联的信心提示。',
		feature_lang_title: '原生多语言',
		feature_lang_desc: '用你选择的语言阅读标签、专题与分析——基于全球化内容模型。',
		feature_account_title: '账户与偏好',
		feature_account_desc: '安全登录，调整通知、语言与专题，让应用贴合你的阅讯方式。',
		screenshots_title: '应用内一览',
		screenshots_subtitle: '快速了解手机上的 Veritas 体验。',
		screenshots_empty: '宣传截图即将上线——下载应用即可查看最新界面。',
		screenshots_alt_cluster: '截图：Veritas 文章聚类与阅读视图',
		screenshots_alt_stability: '截图：Veritas 稳定性总览',
		screenshots_alt_topics: '截图：Veritas 专题与关注',
		faq_title: '常见问题',
		faq_subtitle: 'Veritas 如何融入你的每日新闻习惯。',
		faq_sources_q: 'Veritas 的新闻来自哪里？',
		faq_sources_a:
			'Veritas 通过后端 API 聚合时间线与文章，收录已发布报道及标题、摘要、链接、语言与地区等元数据。我们展示出版方公开的内容；完整报道请以原媒体为准。',
		faq_personalize_q: '可以个性化内容吗？',
		faq_personalize_a:
			'可以。你可以关注专题、选择偏好语言，并获得融合稳定性背景与你关心故事的仪表盘。',
		faq_stability_q: '稳定性视图是什么？',
		faq_stability_a:
			'稳定性是基于模型分数与驱动因素的结构化快照，帮助你理解地区与主题压力，配合头条阅读；不能替代专业判断或应急指引。',
		faq_ai_q: 'AI 分析如何工作？',
		faq_ai_a:
			'启用后，AI 功能会综合多篇文章的模式，提供预测、专题展望与观察点。输出仅供参考，请与原始来源核对。',
		faq_account_q: '为什么需要账户？',
		faq_account_a:
			'账户用于通过 Veritas API 安全同步偏好、专题与令牌。视平台设置，部分内容可以访客浏览。',
		faq_privacy_q: '我的数据如何受到保护？',
		faq_privacy_a:
			'我们遵循数据最小化、安全传输、访问控制与保留限制，详见隐私政策。你可依法行使 GDPR 与 CCPA 权利。',
		cta_title: '立即下载 Veritas',
		cta_subtitle: '用你阅读的语言，掌握时间线、专题与稳定性背景。',
		footer_tagline: '全球新闻情报',
		footer_privacy: '隐私政策',
		footer_terms: '服务条款',
		footer_support: '支持',
		footer_contact: '联系',
		footer_about: '关于',
		footer_cookie: 'Cookie 政策',
		footer_deletion: '数据删除',
		footer_legal_note: '仅供信息参考——不构成财务、法律、医疗或应急建议。',
		footer_github_aria: 'GitHub（thinisde）',
		footer_x_aria: 'Veritas 在 X',
		footer_locale_links: '可用语言',
		language_switcher_label: '语言',
		legal_privacy_title: '隐私政策',
		legal_terms_title: '服务条款',
		legal_support_title: '支持',
		legal_contact_title: '联系',
		legal_cookie_title: 'Cookie 政策',
		legal_deletion_title: '数据删除说明',
		legal_privacy_effective: '生效日期：{date}',
		legal_privacy_intro:
			'本隐私政策说明 Veritas（“我们”）在你使用移动应用、网站及相关服务（统称“服务”）时如何处理个人数据。旨在满足 EEA 与英国 GDPR 的透明度要求，并在适用情况下提供 CCPA/CPRA 所需告知。',
		legal_privacy_controller:
			'数据控制者：Veritas Technologies Ltd.，联系邮箱 thinh@thinis.de。欧盟/英国用户亦可通过同一地址联系隐私与数据保护事宜。',
		legal_privacy_data_collect:
			'我们可能收集的个人数据类别包括：账户标识（邮箱或第三方主体 ID）、认证令牌、设备与应用诊断（崩溃日志、系统版本）、使用事件（浏览界面、功能开关）、语言与专题偏好，以及你发送给支持团队的内容。我们不出售 CPRA 定义下的个人信息。',
		legal_privacy_purposes:
			'我们使用这些数据来提供并保障服务、个性化内容、提升可靠性、遵守法律并与您沟通。AI 辅助功能依据基础设施提供商条款处理提示与文章元数据；在合同禁止的情况下，避免将您的消息用于训练公共模型。',
		legal_privacy_legal_basis:
			'GDPR 法律依据包括：履行合同（第6(1)(b)条）、欺诈防范与产品改进等正当利益（第6(1)(f)条），以及依法需同意时（第6(1)(a)条）。您可随时撤回同意，不影响撤回前的处理合法性。',
		legal_privacy_sharing:
			'我们会与托管基础设施、推送通知或以汇总形式提供分析的分处理者共享数据。最新名单可应要求提供。若发生合并，我们将要求继任方遵守本政策或通知您变更。',
		legal_privacy_retention:
			'账户数据在账户存续期间保留，注销后最多再保留 24 个月，法律要求更长期限的除外。日志可在安全备份中最多保留 90 天。汇总分析可以无法识别个人的形式长期保存。',
		legal_privacy_transfers:
			'若数据传输出 EEA，我们依赖标准合同条款或其他认可机制，并在需要时进行传输影响评估。',
		legal_privacy_rights:
			'你可依法行使访问、更正、删除、限制处理、可携带与反对等权利，并可向监管机构投诉。加州居民可请求披露、删除与更正，并选择退出出售/共享（我们不出售个人信息）。我们不会因行使权利而歧视。',
		legal_privacy_children:
			'服务不面向 16 岁以下儿童，我们亦不会故意收集其数据。若您认为未成年人提供了信息，请联系我们。',
		legal_privacy_updates:
			'我们可能更新本政策并公布新的生效日期。重大变更将在应用内或电子邮件中提示（如适用）。',
		legal_terms_effective: '生效日期：{date}',
		legal_terms_intro: '下载或使用 Veritas 即表示你同意本条款。若不同意，请勿使用服务。',
		legal_terms_license:
			'我们授予你个人、不可转让的许可，以遵守应用商店规则的方式使用应用。除文档接口外，不得逆向工程、抓取或滥用 API。',
		legal_terms_content:
			'新闻文章与图片归出版方所有。Veritas 仅出于信息目的展示元数据与链接。AI 生成摘要可能有误，请以原始来源为准。',
		legal_terms_disclaimer:
			'服务按“现状”提供。我们在法律允许范围内排除保证。除强制性法律另有规定外，我们对间接损害不承担责任。',
		legal_terms_law:
			'适用法律：德意志联邦共和国法律。管辖法院：Villingen-Schwenningen，Baden-Württemberg，Germany。若你为欧盟/英国消费者，你仍享有居住国的强制性保护。',
		legal_terms_contact: '条款相关问题：thinh@thinis.de。',
		legal_support_intro: '支持团队协助处理账户访问、应用商店账单问题以及 Veritas 内的技术故障。',
		legal_support_email_label: '邮箱',
		legal_support_hours: '我们通常在两个工作日内回复；复杂排查可能需要最多五个工作日。',
		legal_support_faq_link: '在首页查看常见问题',
		legal_contact_intro:
			'使用此表单将打开邮件客户端并填入预设正文。我们会阅读每封来信，但无法保证回复所有未经请求的信息。',
		legal_contact_name: '姓名',
		legal_contact_email: '电子邮箱',
		legal_contact_message: '留言',
		legal_contact_submit: '发送邮件',
		legal_contact_mailto_subject: 'Veritas 联系表单',
		legal_cookie_intro:
			'本政策说明 Veritas 网站资产上的 Cookie 及类似技术。移动应用可能使用本地存储与设备标识符，原则相同。',
		legal_cookie_table_category: '类别',
		legal_cookie_table_name: '名称 / 技术',
		legal_cookie_table_purpose: '目的',
		legal_cookie_table_lifespan: '期限',
		legal_cookie_row_necessary_cat: '严格必要',
		legal_cookie_row_prefs_cat: '偏好',
		legal_cookie_row_analytics_cat: '分析与性能',
		legal_cookie_row_necessary_purpose: '安全、登录状态、负载均衡',
		legal_cookie_row_necessary_lifespan: '会话，最长 12 个月',
		legal_cookie_row_prefs_purpose: '记住语言与显示偏好',
		legal_cookie_row_analytics_purpose: '汇总使用统计',
		legal_cookie_row_analytics_lifespan: '24 个月',
		legal_cookie_optout:
			'使用浏览器设置阻止 Cookie。若需关闭分析标识，请发邮件至 thinh@thinis.de 请求停用与您账户关联的标识符。',
		legal_deletion_intro:
			'你可按以下步骤删除 Veritas 账户及相关资料。法律要求保留的部分记录（如税务或反欺诈日志）可能仍会保留。',
		legal_deletion_step1: '在设备上打开 Veritas 并登录。',
		legal_deletion_step2: '前往 设置 → 账户（或同等入口）并选择删除账户。',
		legal_deletion_step3: '确认删除提示。您的会话令牌将被撤销。',
		legal_deletion_step4: '仅卸载应用不会删除云端数据——请务必使用应用内删除流程。',
		legal_deletion_step5:
			'若无法访问应用，请使用注册邮箱向 thinh@thinis.de 发送邮件，主题写“账户删除请求”。我们将在核实身份后 30 天内删除数据。',
		legal_back_home: '返回首页',
		page_privacy_h1: '隐私政策',
		page_terms_h1: '服务条款',
		page_support_h1: '支持',
		page_contact_h1: '联系我们',
		page_cookie_h1: 'Cookie 政策',
		page_deletion_h1: '删除您的数据',
		hello_world: '你好，来自中文的 {name}！'
	},
	de: {
		meta_home_title: 'Veritas — Globale News-Intelligenz für ein klares Weltbild',
		meta_home_description:
			'Verfolgen Sie Breaking News, Themenspezial und eine mehrsprachige Stabilitätslinse mit kuratierten Quellen und KI-gestützten Briefings.',
		meta_privacy_title: 'Datenschutz — Veritas',
		meta_privacy_description:
			'Wie Veritas personenbezogene Daten unter DSGVO und CCPA erhebt, nutzt und schützt.',
		meta_terms_title: 'Nutzungsbedingungen — Veritas',
		meta_terms_description: 'Regeln für die Nutzung der Veritas-App und zugehöriger Dienste.',
		meta_support_title: 'Support — Veritas',
		meta_support_description: 'Hilfe zu Veritas: Antwortzeiten, Kontaktwege und FAQs.',
		meta_contact_title: 'Kontakt — Veritas',
		meta_contact_description:
			'Erreichen Sie das Veritas-Team für Fragen, Partnerschaften oder Presse.',
		meta_cookie_title: 'Cookie-Richtlinie — Veritas',
		meta_cookie_description:
			'Wie Veritas Cookies und ähnliche Technologien auf Web und App-Oberflächen einsetzt.',
		meta_deletion_title: 'Datenlöschung — Veritas',
		meta_deletion_description:
			'So löschen Sie Ihr Veritas-Konto und zugehörige personenbezogene Daten.',
		schema_app_description:
			'Mehrsprachige globale News-Intelligenz mit Timelines, Themen, Stabilitätseinblicken und KI-gestützter Analyse.',
		nav_home: 'Start',
		nav_privacy: 'Datenschutz',
		nav_terms: 'AGB',
		nav_support: 'Support',
		nav_contact: 'Kontakt',
		nav_about: 'Über',
		nav_cookie: 'Cookies',
		nav_deletion: 'Datenlöschung',
		nav_menu_open: 'Menü öffnen',
		nav_menu_close: 'Menü schließen',
		nav_brand_aria: 'Veritas Startseite',
		hero_tagline: 'Klarheit über Sprachen, Regionen und Schlagzeilen hinweg',
		hero_description:
			'Veritas vereint globale Timelines, Ihre Themen und Stabilitätskontext, damit Sie das Signal lesen—not den Lärm. Sprachen personalisieren, Cluster folgen und KI-gestützte Briefings auf Basis echter Berichterstattung erkunden.',
		hero_cta_ios: 'Für iOS laden',
		hero_cta_android: 'Bei Google Play',
		hero_screenshot_alt: 'Veritas-Oberfläche mit News-Timelines und Themeninsights',
		features_title: 'Für Leserinnen und Leser, die die Welt beobachten',
		features_subtitle:
			'Alles in Veritas ist auf schnelles Scannen, verlässliche Quellen und Tiefe bei Bedarf ausgelegt.',
		feature_timeline_title: 'Globale und personalisierte Timelines',
		feature_timeline_desc:
			'Weltfeed oder maßgeschneiderter Stream mit Datum, Zusammenfassungen und klaren Artikellinks.',
		feature_topics_title: 'Themen, denen Sie folgen',
		feature_topics_desc:
			'Tiefer eintauchen mit Beschreibungen, Übersetzungen und unterstützenden Timelines im News-Zyklus.',
		feature_stability_title: 'Stabilitätslinse',
		feature_stability_desc:
			'Risiko- und Stabilitäts-Snapshots mit regionalen Aufschlüsselungen, Treibern und klaren Erklärungen.',
		feature_ai_title: 'KI-gestützte Briefings',
		feature_ai_desc:
			'Prognosen, Themenanalysen und Watchpoints mit Vertrauenshinweisen zu den zugrunde liegenden Artikeln.',
		feature_lang_title: 'Mehrsprachig von Grund auf',
		feature_lang_desc:
			'Labels, Themen und Analysen in Ihren Sprachen—auf einem global ausgerichteten Content-Modell.',
		feature_account_title: 'Konto und Einstellungen',
		feature_account_desc: 'Sicher anmelden, Benachrichtigungen, Sprachen und Themen abstimmen.',
		screenshots_title: 'In der App',
		screenshots_subtitle: 'Ein schneller Rundgang durch Veritas auf dem Smartphone.',
		screenshots_empty:
			'Marketing-Screenshots folgen—laden Sie die App für die aktuelle Oberfläche.',
		screenshots_alt_cluster: 'Screenshot: Artikelcluster und Leseansicht',
		screenshots_alt_stability: 'Screenshot: Stabilitätsübersicht',
		screenshots_alt_topics: 'Screenshot: Themen und Folgen',
		faq_title: 'Fragen und Antworten',
		faq_subtitle: 'Wie Veritas in Ihre News-Routine passt.',
		faq_sources_q: 'Woher bezieht Veritas Nachrichten?',
		faq_sources_a:
			'Veritas bündelt Timelines und Artikel über die Veritas-API mit Metadaten wie Titel, Zusammenfassung, Links, Sprachen und Regionen. Es gilt immer die Originalquelle.',
		faq_personalize_q: 'Kann ich personalisieren?',
		faq_personalize_a:
			'Ja. Themen folgen, Sprachen wählen und ein Dashboard mit Stabilitätskontext erhalten.',
		faq_stability_q: 'Was ist die Stabilitätsansicht?',
		faq_stability_a:
			'Stabilität ist ein strukturierter Snapshot aus modellierten Scores und Treibern—kein Ersatz für professionelles Urteil oder Notfallhinweise.',
		faq_ai_q: 'Wie funktioniert die KI-Analyse?',
		faq_ai_a:
			'Wenn aktiviert, synthetisiert die KI Muster über viele Artikel. Ausgaben sind informativ und sollten mit Primärquellen geprüft werden.',
		faq_account_q: 'Warum ein Konto?',
		faq_account_a:
			'Ein Konto synchronisiert Einstellungen, Themen und Tokens sicher mit der Veritas-API. Gastzugriff hängt von den Plattformregeln ab.',
		faq_privacy_q: 'Wie sind meine Daten geschützt?',
		faq_privacy_a:
			'Datenminimierung, sicherer Transport, Zugriffskontrollen und Aufbewahrungsgrenzen—siehe Datenschutzerklärung. GDPR- und CCPA-Rechte gelten.',
		cta_title: 'Veritas jetzt laden',
		cta_subtitle: 'Bleiben Sie informiert mit Timelines, Themen und Stabilitätskontext.',
		footer_tagline: 'Globale News-Intelligenz',
		footer_privacy: 'Datenschutz',
		footer_terms: 'AGB',
		footer_support: 'Support',
		footer_contact: 'Kontakt',
		footer_about: 'Über',
		footer_cookie: 'Cookie-Richtlinie',
		footer_deletion: 'Datenlöschung',
		footer_legal_note:
			'Nur zu Informationszwecken—keine Finanz-, Rechts-, Medizin- oder Notfallberatung.',
		footer_github_aria: 'GitHub (thinisde)',
		footer_x_aria: 'Veritas auf X',
		footer_locale_links: 'Verfügbare Sprachen',
		language_switcher_label: 'Sprache',
		legal_privacy_title: 'Datenschutzerklärung',
		legal_terms_title: 'Nutzungsbedingungen',
		legal_support_title: 'Support',
		legal_contact_title: 'Kontakt',
		legal_cookie_title: 'Cookie-Richtlinie',
		legal_deletion_title: 'Anleitung zur Datenlöschung',
		legal_privacy_effective: 'Gültig ab: {date}',
		legal_privacy_intro:
			'Diese Erklärung beschreibt, wie Veritas („wir“) personenbezogene Daten verarbeitet, wenn Sie unsere App, Website und Dienste nutzen. Sie dient der Transparenz nach DSGVO für EWR/UK und den Hinweisen nach CCPA/CPRA, soweit anwendbar.',
		legal_privacy_controller:
			'Verantwortlicher: Veritas Technologies Ltd., erreichbar unter thinh@thinis.de. Für EU/UK: Datenschutzanfragen ebenfalls an diese Adresse.',
		legal_privacy_data_collect:
			'Kategorien: Kontokennungen (E-Mail oder Provider-ID), Auth-Tokens, Geräte-/App-Diagnostik, Nutzungsereignisse, Sprach- und Themenpräferenzen, Support-Nachrichten. Wir verkaufen keine personenbezogenen Daten im Sinne der CPRA.',
		legal_privacy_purposes:
			'Wir nutzen Daten zur Erbringung und Absicherung der Dienste, Personalisierung, Zuverlässigkeit, Rechtscompliance und Kommunikation. KI-Funktionen verarbeiten Eingaben und Metadaten gemäß Anbieterverträgen.',
		legal_privacy_legal_basis:
			'Rechtsgrundlagen: Vertrag (Art. 6(1)(b) DSGVO), berechtigte Interessen wie Betrugsprävention (Art. 6(1)(f)), Einwilligung wo erforderlich (Art. 6(1)(a)).',
		legal_privacy_sharing:
			'Weitergabe an Subprozessoren für Hosting, Push oder aggregierte Analysen. Liste auf Anfrage.',
		legal_privacy_retention:
			'Kontodaten aktiv bis 24 Monate nach Schließung, sofern nicht längere Pflicht. Logs in Backups bis 90 Tage.',
		legal_privacy_transfers:
			'Bei Drittlandtransfer: Standardvertragsklauseln oder gleichwertige Mechanismen.',
		legal_privacy_rights:
			'Auskunft, Berichtigung, Löschung, Einschränkung, Datenportabilität, Widerspruch; Beschwerde bei Aufsichtsbehörde. Kalifornien: Offenlegung, Löschung, Korrektur.',
		legal_privacy_children: 'Nicht für unter 16-Jährige; keine wissentliche Erhebung.',
		legal_privacy_updates: 'Wir können diese Erklärung aktualisieren und das Datum anpassen.',
		legal_terms_effective: 'Gültig ab: {date}',
		legal_terms_intro: 'Mit Nutzung von Veritas akzeptieren Sie diese Bedingungen.',
		legal_terms_license:
			'Persönliche, nicht übertragbare Lizenz gemäß Store-Regeln. Kein Reverse Engineering oder API-Missbrauch.',
		legal_terms_content:
			'Inhalte gehören den Publishern. KI-Zusammenfassungen können fehlerhaft sein—Original prüfen.',
		legal_terms_disclaimer:
			'Dienste „wie besehen“. Haftungsausschluss im gesetzlich zulässigen Umfang.',
		legal_terms_law:
			'Anwendbares Recht: Recht der Bundesrepublik Deutschland. Gerichte: Villingen-Schwenningen, Baden-Württemberg, Deutschland. Wenn Sie Verbraucher in der EU/im Vereinigten Königreich sind, behalten Sie die zwingenden Schutzvorschriften Ihres Wohnsitzlandes.',
		legal_terms_contact: 'Fragen zu diesen Bedingungen: thinh@thinis.de.',
		legal_support_intro: 'Support bei Zugang, Store-Abrechnung und technischen Problemen.',
		legal_support_email_label: 'E-Mail',
		legal_support_hours: 'Typisch Antwort in zwei Werktagen, komplexe Fälle bis zu fünf.',
		legal_support_faq_link: 'FAQs auf der Startseite',
		legal_contact_intro:
			'Dieses Formular öffnet Ihr E-Mail-Programm. Wir lesen alle Nachrichten, garantieren aber nicht jede Antwort.',
		legal_contact_name: 'Name',
		legal_contact_email: 'E-Mail',
		legal_contact_message: 'Nachricht',
		legal_contact_submit: 'E-Mail senden',
		legal_contact_mailto_subject: 'Veritas Kontaktformular',
		legal_cookie_intro:
			'Cookies und ähnliche Technologien auf Veritas-Webangeboten; App-Storage nach gleichen Prinzipien.',
		legal_cookie_table_category: 'Kategorie',
		legal_cookie_table_name: 'Name / Technik',
		legal_cookie_table_purpose: 'Zweck',
		legal_cookie_table_lifespan: 'Laufzeit',
		legal_cookie_row_necessary_cat: 'Unbedingt erforderlich',
		legal_cookie_row_prefs_cat: 'Einstellungen',
		legal_cookie_row_analytics_cat: 'Analyse & Performance',
		legal_cookie_row_necessary_purpose: 'Sicherheit, Login, Lastverteilung',
		legal_cookie_row_necessary_lifespan: 'Session bis 12 Monate',
		legal_cookie_row_prefs_purpose: 'Sprache und Darstellung',
		legal_cookie_row_analytics_purpose: 'Aggregierte Nutzungsmessung',
		legal_cookie_row_analytics_lifespan: '24 Monate',
		legal_cookie_optout: 'Browser-Einstellungen nutzen; für Analyse thinh@thinis.de kontaktieren.',
		legal_deletion_intro: 'Konto und Profildaten löschen—Ausnahmen wo gesetzlich nötig.',
		legal_deletion_step1: 'App öffnen und anmelden.',
		legal_deletion_step2: 'Einstellungen → Konto → Konto löschen.',
		legal_deletion_step3: 'Bestätigen; Sitzungen werden widerrufen.',
		legal_deletion_step4: 'Deinstallieren allein löscht keine Cloud-Daten.',
		legal_deletion_step5:
			'Ohne App-Zugang: von registrierter Adresse an thinh@thinis.de mit Betreff „Account deletion request“—Löschung innerhalb von 30 Tagen nach Verifikation.',
		legal_back_home: 'Zur Startseite',
		page_privacy_h1: 'Datenschutz',
		page_terms_h1: 'Nutzungsbedingungen',
		page_support_h1: 'Support',
		page_contact_h1: 'Kontakt',
		page_cookie_h1: 'Cookie-Richtlinie',
		page_deletion_h1: 'Daten löschen',
		hello_world: 'Hallo, {name} aus de!'
	}
};

for (const loc of ['fr', 'ru', 'es', 'vi']) {
	const p = path.join(__dirname, 'overrides', `${loc}.json`);
	overrides[loc] = JSON.parse(fs.readFileSync(p, 'utf8'));
}

// For locales not fully translated in overrides, fall back to English except hello_world
const locales = ['zh', 'de', 'fr', 'ru', 'es', 'vi'];

for (const loc of locales) {
	const base = { ...en };
	const o = overrides[loc] || {};
	for (const k of Object.keys(base)) {
		if (k === '$schema') continue;
		if (o[k] !== undefined) base[k] = o[k];
	}
	const outPath = path.join(messagesDir, `${loc}.json`);
	fs.writeFileSync(outPath, JSON.stringify(base, null, '\t') + '\n', 'utf8');
	console.log('wrote', outPath);
}
