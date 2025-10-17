"""
analisis_productos.py
----------------------------------------
Script que lee un archivo CSV con información de productos
y calcula:
 - Promedio de precios
 - Producto con mayor stock
 - Total de productos
Autor: Dinámica Coffee
"""

import csv

# Ruta del archivo CSV
CSV_PATH = "productos_1000.csv"

# Variables acumuladoras
total_productos = 0
suma_precios = 0
producto_mayor_stock = None
max_stock = -1

try:
    with open(CSV_PATH, mode="r", encoding="utf-8") as archivo:
        lector = csv.DictReader(archivo)

        for fila in lector:
            total_productos += 1

            # Convierte precio y stock a valores numéricos
            precio = float(fila["precio"])
            stock = int(fila["stock"])
            suma_precios += precio

            # Determina si este producto tiene el mayor stock
            if stock > max_stock:
                max_stock = stock
                producto_mayor_stock = fila["nombre"]

    # Calcular el promedio de precios
    promedio_precios = suma_precios / total_productos if total_productos > 0 else 0

    # Mostrar resultados
    print("📦 RESULTADOS DEL ANÁLISIS DE PRODUCTOS")
    print("---------------------------------------")
    print(f"🔹 Total de productos: {total_productos}")
    print(f"💲 Promedio de precios: ${promedio_precios:,.2f}")
    print(f"📈 Producto con mayor stock: {producto_mayor_stock} ({max_stock} unidades)")

except FileNotFoundError:
    print(f"❌ Error: No se encontró el archivo {CSV_PATH}.")
except KeyError as e:
    print(f"❌ Error: Falta la columna {e} en el CSV.")
except ValueError:
    print("❌ Error: Datos numéricos inválidos en el archivo CSV.")
except Exception as e:
    print(f"⚠️ Error inesperado: {e}")
