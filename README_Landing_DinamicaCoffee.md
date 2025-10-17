# Proyecto: Landing Dinámica Coffee

Landing page desarrollada como parte de una **prueba técnica Fullstack**, con validaciones front-end, conexión backend PHP, integración con base de datos MySQL y análisis de datos en Python.

---

## Estructura del Proyecto

```
/landing/
│
├── index.html              # Página principal (HTML semántico)
├── /assets/                # Recursos estáticos (logo, imágenes de productos)
│     └── logo.svg
├── /js/
│     └── app.js            # Validaciones y envío de formulario
├── /css/
│     └── style.css         # Estilos con variables y layout responsive
├── /api/
│     └── registro.php      # Backend PHP con conexión PDO a MySQL
└── /data/
      └── productos_1000.csv # Datos para análisis con Python
```

---

## FASE 1 – Instalación y Configuración del Entorno

### 🔧 Requisitos previos
- **Windows 10/11**
- **PHP 8.2+** → [Descargar PHP](https://windows.php.net/download)
- **MySQL + MySQL Workbench**
- **VS Code** con extensiones:
  - *PHP IntelliSense*
  - *Prettier – Code formatter*
  - *Python*
  - *GitHub Copilot* (opcional, para prompts IA)
- **Postman** (para probar el backend)

---

## FASE 2 – Configuración del Servidor Local

1. Abre una terminal dentro de la carpeta `/landing`.
2. Ejecuta el servidor embebido de PHP:

   ```bash
   php -S localhost:8000
   ```

3. Abre el navegador en:
   [http://localhost:8000](http://localhost:8000)

---

## FASE 3 – Base de Datos

### 1️ Crear la base de datos en MySQL Workbench

```sql
CREATE DATABASE dinamica_coffee;
USE dinamica_coffee;
```

### 2️ Crear tabla `usuarios`

```sql
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  correo VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 3️ Cargar datos de prueba
```sql
INSERT INTO usuarios (nombre, correo, password_hash, fecha_nacimiento)
SELECT
  CONCAT('Usuario ', n) AS nombre,
  CONCAT('usuario', n, '@ejemplo.com') AS correo,
  SHA2(CONCAT('Password!', n), 256) AS password_hash,
  DATE_ADD('1980-01-01', INTERVAL FLOOR(1 + (RAND() * 8000)) DAY) AS fecha_nacimiento
FROM (
  SELECT @row := @row + 1 AS n
  FROM information_schema.tables t1,
       information_schema.tables t2,
       (SELECT @row := 0) init
  LIMIT 100
) x;
```

---

## FASE 4 – Frontend (HTML, CSS y JS)

### Elementos Clave
- **HTML5 Semántico**: `header`, `main`, `section`, `footer`.
- **CSS Variables y Grid Layout** para una presentación moderna.
- **JS Validaciones**:
  - Email válido.
  - Contraseña ≥ 8 caracteres (2 mayúsculas, 1 número, 1 símbolo).
  - Fecha de nacimiento → mayor de 17 años.

### Productos
- Módulo de galería tipo *grid* con imágenes dinámicas desde `/assets`.
- Efecto *collapse* con descripción de producto.

---

## FASE 5 – Backend (PHP + PDO)

1. Archivo `/api/registro.php`:
   - Recibe datos vía **POST** (JSON).
   - Sanitiza con `htmlspecialchars()`.
   - Encripta contraseña con `password_hash()`.
   - Inserta en MySQL mediante **PDO**.
   - Devuelve una respuesta **JSON estructurada**.

2. Ejemplo de prueba con **Postman**:

   ```json
   POST http://localhost:8000/api/registro.php
   Content-Type: application/json

   {
     "nombre": "Juan Pérez",
     "correo": "juan.perez@example.com",
     "password": "PruebaAA!23",
     "fecha": "1990-05-20"
   }
   ```

   **Respuesta esperada:**
   ```json
   {
     "status": "success",
     "message": "Usuario registrado exitosamente."
   }
   ```

---

## FASE 6 – SQL Consultas

| Nº | Descripción | Consulta |
|----|--------------|-----------|
| 1️⃣ | Usuarios registrados últimos 30 días | `SELECT * FROM usuarios WHERE fecha_registro >= DATE_SUB(NOW(), INTERVAL 30 DAY);` |
| 2️⃣ | Contar usuarios con correo Gmail | `SELECT COUNT(*) FROM usuarios WHERE correo LIKE '%@gmail.com';` |
| 3️⃣ | Actualizar usuario con id=10 | `UPDATE usuarios SET nombre='Usuario Actualizado' WHERE id=10;` |
| 4️⃣ | Eliminar usuario con id=15 | `DELETE FROM usuarios WHERE id=15;` |

---

## FASE 7 – Python (Análisis de Datos)

### Script: `analisis_productos.py`
- Lee el archivo `productos_1000.csv`.
- Calcula:
  - Promedio de precios.
  - Producto con mayor stock.
  - Total de productos.
- Incluye manejo de errores (`FileNotFound`, `KeyError`, `ValueError`).
- Salida formateada con texto claro y emojis.

**Ejecución:**
```bash
python analisis_productos.py
```

---

## FASE 8 – Documentación y Evidencia

### Archivos generados
- `IA_Prompts.md` → Prompts utilizados en Copilot y ChatGPT.  
- `Seccion3_SQL_Scripts.md` → Scripts SQL usados en la base de datos.

---

## FASE 9 – Buenas Prácticas Aplicadas

| Área | Práctica |
|------|-----------|
| **HTML** | Estructura semántica, etiquetas accesibles. |
| **CSS** | Variables, flex/grid layout, responsive design. |
| **JS** | Validación client-side modular y clara. |
| **PHP** | Conexión PDO, prepared statements, sanitización, JSON limpio. |
| **SQL** | Filtros seguros, alias, actualización controlada. |
| **Python** | Manejo de excepciones, claridad y formato legible. |

---

## Ejecución General

1. Inicia servidor local:  
   ```bash
   php -S localhost:8000
   ```
2. Abre [http://localhost:8000](http://localhost:8000).
3. Realiza pruebas del formulario (ver Network y consola).
4. Valida conexión en **MySQL Workbench**.
5. Ejecuta script Python (`analisis_productos.py`).

---

## Autor
**Desarrollado por:** *David Aarón Velásquez Zanunzini*  
**Rol:** Fullstack Developer  
**Tecnologías:** HTML5, CSS3, JS, PHP, MySQL, Python  
**Herramientas:** VS Code, Postman, Copilot, DBeaver

---

© 2025 Dinámica Coffee – Proyecto para  prueba técnica.
