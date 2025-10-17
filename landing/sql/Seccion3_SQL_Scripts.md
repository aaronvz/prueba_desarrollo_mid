# FASE 6 – Sección 3: SQL

## Objetivo
Ejecutar operaciones SQL sobre la tabla `usuarios` utilizando consultas de selección, conteo, actualización y eliminación.

---

## Estructura de la tabla `usuarios`

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

---

## Script de carga de datos iniciales

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

## Consultas SQL solicitadas

### Usuarios registrados en los últimos 30 días

```sql
SELECT *
FROM usuarios
WHERE fecha_registro >= DATE_SUB(NOW(), INTERVAL 30 DAY);
```

### Contar usuarios con correo `@gmail.com`

```sql
SELECT COUNT(*) AS total_gmail
FROM usuarios
WHERE correo LIKE '%@gmail.com';
```

### Actualizar nombre de usuario con `id = 10`

```sql
UPDATE usuarios
SET nombre = 'Usuario Actualizado'
WHERE id = 10;
```

### Eliminar usuario con `id = 15`

```sql
DELETE FROM usuarios
WHERE id = 15;
```