// Carrusel Automático y Manual
class Carrusel {
    constructor() {
        this.slides = document.querySelectorAll('.carrusel_slide');
        this.indicadores = document.querySelectorAll('.indicador');
        this.miniaturas = document.querySelectorAll('.miniatura');
        this.btnPrev = document.querySelector('.carrusel_btn-prev');
        this.btnNext = document.querySelector('.carrusel_btn-next');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000; // 4 segundos

        this.init();
    }

    init() {
        // Eventos de botones
        this.btnPrev.addEventListener('click', () => this.prevSlide());
        this.btnNext.addEventListener('click', () => this.nextSlide());

        // Eventos de indicadores
        this.indicadores.forEach((indicador, index) => {
            indicador.addEventListener('click', () => this.goToSlide(index));
        });

        // Eventos de miniaturas
        this.miniaturas.forEach((miniatura, index) => {
            miniatura.addEventListener('click', () => this.goToSlide(index));
        });

        // Iniciar autoplay
        this.startAutoPlay();

        // Pausar autoplay al hover
        const carrusel = document.querySelector('.carrusel');
        carrusel.addEventListener('mouseenter', () => this.stopAutoPlay());
        carrusel.addEventListener('mouseleave', () => this.startAutoPlay());

        // Soporte para swipe en móvil
        this.addSwipeSupport();
    }

    goToSlide(index) {
        // Remover clase active de todos
        this.slides[this.currentSlide].classList.remove('active');
        this.indicadores[this.currentSlide].classList.remove('active');
        this.miniaturas[this.currentSlide].classList.remove('active');

        // Agregar clase active al nuevo slide
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        this.indicadores[this.currentSlide].classList.add('active');
        this.miniaturas[this.currentSlide].classList.add('active');

        // Reiniciar autoplay
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    addSwipeSupport() {
        const carrusel = document.querySelector('.carrusel');
        let startX = 0;
        let endX = 0;

        carrusel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carrusel.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        carrusel.addEventListener('touchend', () => {
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Mínimo 50px de desplazamiento
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
}

// Selector de Colores
class ColorSelector {
    constructor() {
        this.colores = document.querySelectorAll('.color_opcion');
        this.colorSeleccionado = document.querySelector('.color_seleccionado strong');
        
        this.init();
    }

    init() {
        this.colores.forEach(color => {
            color.addEventListener('click', () => {
                // Remover active de todos
                this.colores.forEach(c => c.classList.remove('active'));
                
                // Agregar active al seleccionado
                color.classList.add('active');
                
                // Actualizar texto
                const nombreColor = color.dataset.color;
                this.colorSeleccionado.textContent = nombreColor;
            });
        });
    }
}

// Selector de Cantidad
class CantidadSelector {
    constructor() {
        this.input = document.getElementById('cantidad');
        this.btnIncrementar = document.getElementById('incrementar');
        this.btnDecrementar = document.getElementById('decrementar');
        this.min = parseInt(this.input.min);
        this.max = parseInt(this.input.max);

        this.init();
    }

    init() {
        this.btnIncrementar.addEventListener('click', () => {
            let valor = parseInt(this.input.value);
            if (valor < this.max) {
                this.input.value = valor + 1;
            }
        });

        this.btnDecrementar.addEventListener('click', () => {
            let valor = parseInt(this.input.value);
            if (valor > this.min) {
                this.input.value = valor - 1;
            }
        });
    }
}

// Botón Agregar al Carrito
class CarritoManager {
    constructor() {
        this.btnAgregar = document.querySelector('.btn_agregar_carrito');
        this.carritoCount = document.querySelector('.carrito_cantidad');
        
        this.init();
    }

    init() {
        this.btnAgregar.addEventListener('click', () => {
            // Obtener datos del producto
            const producto = {
                nombre: document.querySelector('.producto_titulo').textContent,
                precio: document.querySelector('.producto_precio_detalle').textContent,
                color: document.querySelector('.color_seleccionado strong').textContent,
                cantidad: parseInt(document.getElementById('cantidad').value)
            };

            // Animación del botón
            this.btnAgregar.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.btnAgregar.style.transform = 'scale(1)';
            }, 150);

            // Actualizar contador del carrito
            let currentCount = parseInt(this.carritoCount.textContent);
            this.carritoCount.textContent = currentCount + producto.cantidad;

            // Animación del contador
            this.carritoCount.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.carritoCount.style.transform = 'scale(1)';
            }, 300);

            // Mostrar mensaje (opcional)
            console.log('Producto agregado:', producto);
            
            // Aquí puedes agregar código para guardar en localStorage o enviar al backend
        });
    }
}

// Botón Favorito
class FavoritoManager {
    constructor() {
        this.btnFavorito = document.querySelector('.btn_favorito');
        this.isFavorito = false;
        
        this.init();
    }

    init() {
        this.btnFavorito.addEventListener('click', () => {
            this.isFavorito = !this.isFavorito;
            
            const svg = this.btnFavorito.querySelector('svg');
            
            if (this.isFavorito) {
                svg.style.fill = 'var(--secundario)';
                this.btnFavorito.style.background = 'var(--acentoClaro)';
                this.btnFavorito.style.borderColor = 'var(--secundario)';
            } else {
                svg.style.fill = 'none';
                this.btnFavorito.style.background = 'var(--blanco)';
                this.btnFavorito.style.borderColor = 'var(--grisClaro)';
            }

            // Animación
            this.btnFavorito.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.btnFavorito.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Carrusel();
    new ColorSelector();
    new CantidadSelector();
    new CarritoManager();
    new FavoritoManager();
});