document.getElementById("footer-placeholder").innerHTML = `
    <footer class="footer">
        <div class="footer_contenido">
            <div class="footer_columna">
                <h4 class="footer_titulo">Enredados</h4>
                <p>Pulseras artesanales hechas con amor</p>
            </div>
            <div class="footer_columna">
                <h4 class="footer_titulo">Enlaces</h4>
                <a href="index.html">Tienda</a>
                <a href="/pages/nosotros.html">Nosotros</a>
                <a href="#contacto">Contacto</a>
            </div>
            <div class="footer_columna">
                <h4 class="footer_titulo">Síguenos</h4>
                <div class="footer_social">
                    <a href="https://www.instagram.com/enredados_pulseras/" aria-label="Instagram">Instagram</a>
                </div>
            </div>
        </div>
        <p class="footer_texto">Enredados - Todos los derechos Reservados ©</p>
    </footer>
`;
document.getElementById("year").textContent = new Date().getFullYear();
