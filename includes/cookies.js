// ==================== BANNER DE COOKIES (GDPR) ====================
(function() {
    if (localStorage.getItem('cookies_aceptadas')) return;

    const style = document.createElement('style');
    style.textContent = `
        .cookies_banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(44, 62, 80, 0.97);
            backdrop-filter: blur(10px);
            color: white;
            padding: 2rem;
            z-index: 9999;
            animation: cookiesSlideUp 0.5s ease;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.2);
        }
        @keyframes cookiesSlideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }
        .cookies_contenido {
            max-width: 1100px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 2rem;
            flex-wrap: wrap;
        }
        .cookies_texto {
            flex: 1;
            min-width: 280px;
            font-size: 1.3rem;
            line-height: 1.6;
            font-family: 'Krub', sans-serif;
        }
        .cookies_texto a {
            color: #ff69b4;
            text-decoration: underline;
        }
        .cookies_acciones {
            display: flex;
            gap: 1rem;
            flex-shrink: 0;
        }
        .cookies_btn {
            padding: 0.8rem 2rem;
            border-radius: 8px;
            font-size: 1.3rem;
            font-family: 'Krub', sans-serif;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
        }
        .cookies_btn-aceptar {
            background: linear-gradient(135deg, #ff69b4, #ff1493);
            color: white;
            box-shadow: 0 2px 10px rgba(255,105,180,0.3);
        }
        .cookies_btn-aceptar:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(255,105,180,0.4);
        }
        .cookies_btn-rechazar {
            background: transparent;
            color: #ccc;
            border: 1px solid #555;
        }
        .cookies_btn-rechazar:hover {
            background: rgba(255,255,255,0.1);
            color: white;
        }
        @media (max-width: 600px) {
            .cookies_contenido { flex-direction: column; text-align: center; }
            .cookies_acciones { width: 100%; justify-content: center; }
        }
    `;
    document.head.appendChild(style);

    const banner = document.createElement('div');
    banner.className = 'cookies_banner';
    banner.innerHTML = `
        <div class="cookies_contenido">
            <div class="cookies_texto">
                Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación, gestionar tu sesión y analizar el uso de la web.
                Puedes obtener más información en nuestra <a href="/pages/terminos.html">política de cookies</a>.
            </div>
            <div class="cookies_acciones">
                <button class="cookies_btn cookies_btn-rechazar" id="cookies-rechazar">Solo necesarias</button>
                <button class="cookies_btn cookies_btn-aceptar" id="cookies-aceptar">Aceptar todas</button>
            </div>
        </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('cookies-aceptar').addEventListener('click', () => {
        localStorage.setItem('cookies_aceptadas', 'todas');
        banner.style.animation = 'cookiesSlideUp 0.3s ease reverse';
        setTimeout(() => banner.remove(), 300);
    });

    document.getElementById('cookies-rechazar').addEventListener('click', () => {
        localStorage.setItem('cookies_aceptadas', 'necesarias');
        banner.style.animation = 'cookiesSlideUp 0.3s ease reverse';
        setTimeout(() => banner.remove(), 300);
    });
})();
