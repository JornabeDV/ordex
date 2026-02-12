# 🐳 Docker Development Setup - Ordex

Esta configuración de Docker está optimizada para facilitar el desarrollo local de la aplicación Ordex.

## 🚀 Inicio Rápido

### Prerrequisitos
- Docker Desktop instalado y ejecutándose
- Docker Compose v2.0+

### Comandos Principales

```bash
# Iniciar el entorno de desarrollo
pnpm run docker:dev

# Iniciar con rebuild (si cambiaste dependencias)
pnpm run docker:dev:build

# Ver logs en tiempo real
pnpm run docker:dev:logs

# Acceder al shell del contenedor
pnpm run docker:dev:shell

# Verificar estado de los contenedores
pnpm run docker:status

# Reiniciar solo la aplicación
pnpm run docker:restart

# Detener el entorno
pnpm run docker:down

# Limpiar completamente (elimina volúmenes)
pnpm run docker:clean
```

## 📁 Estructura de Archivos Docker

```
├── Dockerfile              # Imagen de producción
├── Dockerfile.dev          # Imagen optimizada para desarrollo
├── docker-compose.yml      # Configuración principal
├── docker-compose.override.yml  # Configuraciones locales
└── .dockerignore          # Archivos a ignorar en el build
```

## 🔧 Configuración

### Variables de Entorno

El archivo `docker-compose.override.yml` permite personalizar variables de entorno localmente:

```yaml
environment:
  - NEXT_PUBLIC_APP_URL=http://localhost:3000
  - DEBUG=*
```

### Volúmenes

- **Hot Reload**: El código fuente se monta para cambios en tiempo real
- **Dependencias**: `node_modules` se excluye para evitar conflictos
- **Build Cache**: `.next` se excluye para evitar problemas de cache

### Health Check

El contenedor incluye un health check que verifica que la aplicación esté respondiendo correctamente.

## 🛠️ Desarrollo

### Hot Reload
Los cambios en el código se reflejan automáticamente sin necesidad de rebuild.

### Debugging
- Accede al shell: `pnpm run docker:dev:shell`
- Ver logs: `pnpm run docker:dev:logs`
- Reiniciar: `pnpm run docker:restart`

### Dependencias
Si agregas nuevas dependencias:
1. Actualiza `package.json` o `pnpm-lock.yaml`
2. Ejecuta `pnpm run docker:dev:build` para rebuild

## 🔍 Troubleshooting

### Puerto en uso
```bash
# Verificar qué está usando el puerto 3000
lsof -i :3000

# Cambiar puerto en docker-compose.yml
ports:
  - '3001:3000'  # Cambiar 3000 por 3001
```

### Problemas de permisos
```bash
# En Linux/Mac, asegurar permisos correctos
sudo chown -R $USER:$USER .
```

### Limpiar cache
```bash
# Limpiar completamente
pnpm run docker:clean

# Rebuild desde cero
pnpm run docker:dev:build
```

## 📊 Monitoreo

### Estado de los contenedores
```bash
pnpm run docker:status
```

### Logs detallados
```bash
pnpm run docker:dev:logs
```

### Health check
```bash
docker-compose ps
```

## 🎯 Mejores Prácticas

1. **Usa los scripts de package.json** en lugar de comandos docker directos
2. **Mantén el código sincronizado** - los cambios se reflejan automáticamente
3. **Reinicia solo cuando sea necesario** - usa `docker:restart` en lugar de rebuild completo
4. **Monitorea los logs** para detectar problemas temprano
5. **Limpia regularmente** con `docker:clean` para liberar espacio

## 🔗 URLs

- **Aplicación**: http://localhost:3000
- **Health Check**: http://localhost:3000 (verifica automáticamente)

---