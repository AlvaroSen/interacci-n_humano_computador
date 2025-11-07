/**
 * Carga el sidebar.html y lo inyecta en el placeholder de la página.
 * Luego, establece el elemento de menú activo automáticamente.
 */
function loadSidebar() {
    // 1. Obtener la ruta del archivo actual (por ejemplo, "index.html" o "nueva_solicitud.html")
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf('/') + 1);

    // 2. Realizar la solicitud para obtener el contenido de sidebar.html
    fetch('sidebar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar sidebar.html');
            }
            return response.text();
        })
        .then(data => {
            // 3. Inyectar el contenido en el placeholder
            const placeholder = document.getElementById('sidebar-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
                
                // 4. Marcar el elemento activo
                const sidebar = placeholder.querySelector('.sidebar');
                if (sidebar) {
                    const activeItem = sidebar.querySelector(`li[data-filename="${currentPage}"]`);
                    if (activeItem) {
                        activeItem.classList.add('active-item');
                    }
                }
            }
        })
        .catch(error => {
            console.error('No se pudo cargar el sidebar. Asegúrate de que estás ejecutando esto en un servidor local para evitar errores CORS.', error);
            // Mostrar un mensaje de error si no carga
            const placeholder = document.getElementById('sidebar-placeholder');
            if (placeholder) {
                 placeholder.innerHTML = '<p style="color: red; padding: 20px;">Error al cargar la navegación. Ejecuta en un servidor local.</p>';
            }
        });
}

// Llamar a la función al cargar la página
window.onload = loadSidebar;