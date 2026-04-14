/**
 * useSystemStatus.ts
 *
 * Composable que expone el estado del sistema IoT para navbar, footer y menú.
 * Actualmente usa datos mock. Para conectar al backend real:
 *   1. Reemplaza fetchStatus() con tu llamada a la API / WebSocket
 *   2. Llama a refresh() desde tu store de socket cuando llegue un evento
 *   3. O usa un intervalo con onMounted + clearInterval en onUnmounted
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface SystemStatus {
  devices: {
    total: number
    online: number
    offline: number
    warning: number
  }
  alerts: {
    critical: number
    warning: number
    info: number
  }
  dashboards: {
    total: number
    active: number
  }
  maintenance: {
    pending: number
    scheduled: number
  }
  reports: {
    today: number
    lastHour: number
  }
  users: {
    total: number
    activeSessions: number
  }
  connection: {
    latencyMs: number
    isConnected: boolean
    lastSyncLabel: string   // ej: "hace 12s"
  }
}

// ─── Mock — reemplazar con fetch / socket real ────────────────────────────────

async function fetchStatus(): Promise<SystemStatus> {
  // TODO: return await $fetch('/api/system/status')
  return {
    devices:     { total: 24, online: 22, offline: 2, warning: 1 },
    alerts:      { critical: 2, warning: 3, info: 5 },
    dashboards:  { total: 4, active: 3 },
    maintenance: { pending: 1, scheduled: 2 },
    reports:     { today: 12, lastHour: 2 },
    users:       { total: 8, activeSessions: 3 },
    connection:  { latencyMs: 8, isConnected: true, lastSyncLabel: 'hace 12s' },
  }
}

// ─── Composable ───────────────────────────────────────────────────────────────

export function useSystemStatus() {
  const status = ref<SystemStatus | null>(null)
  let interval: ReturnType<typeof setInterval> | null = null

  const refresh = async () => {
    status.value = await fetchStatus()
  }

  onMounted(async () => {
    await refresh()
    // Refresca cada 30 segundos; ajusta o elimina según tu arquitectura de socket
    interval = setInterval(refresh, 30_000)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  // ── Dispositivos ──────────────────────────────────────────────────────────
  const devicesTotal   = computed(() => status.value?.devices.total   ?? 0)
  const devicesOnline  = computed(() => status.value?.devices.online  ?? 0)
  const devicesOffline = computed(() => status.value?.devices.offline ?? 0)
  const devicesWarning = computed(() => status.value?.devices.warning ?? 0)

  // ── Alertas ───────────────────────────────────────────────────────────────
  const criticalAlerts = computed(() => status.value?.alerts.critical ?? 0)
  const warningAlerts  = computed(() => status.value?.alerts.warning  ?? 0)
  const infoAlerts     = computed(() => status.value?.alerts.info     ?? 0)
  const activeAlerts   = computed(() => criticalAlerts.value + warningAlerts.value + infoAlerts.value)

  // ── Dashboards ────────────────────────────────────────────────────────────
  const totalDashboards  = computed(() => status.value?.dashboards.total  ?? 0)
  const activeDashboards = computed(() => status.value?.dashboards.active ?? 0)

  // ── Mantenimiento ─────────────────────────────────────────────────────────
  const pendingMaintenance   = computed(() => status.value?.maintenance.pending   ?? 0)
  const scheduledMaintenance = computed(() => status.value?.maintenance.scheduled ?? 0)

  // ── Reportes ──────────────────────────────────────────────────────────────
  const reportsToday    = computed(() => status.value?.reports.today    ?? 0)
  const reportsLastHour = computed(() => status.value?.reports.lastHour ?? 0)

  // ── Usuarios ──────────────────────────────────────────────────────────────
  const activeSessions = computed(() => status.value?.users.activeSessions ?? 0)
  const totalUsers     = computed(() => status.value?.users.total          ?? 0)

  // ── Conexión ──────────────────────────────────────────────────────────────
  const latency     = computed(() => status.value?.connection.latencyMs     ?? 0)
  const isConnected = computed(() => status.value?.connection.isConnected   ?? false)
  const lastSync    = computed(() => status.value?.connection.lastSyncLabel ?? '—')

  return {
    // Dispositivos
    devicesTotal, devicesOnline, devicesOffline, devicesWarning,
    // Alertas
    criticalAlerts, warningAlerts, infoAlerts, activeAlerts,
    // Dashboards
    totalDashboards, activeDashboards,
    // Mantenimiento
    pendingMaintenance, scheduledMaintenance,
    // Reportes
    reportsToday, reportsLastHour,
    // Usuarios
    activeSessions, totalUsers,
    // Conexión
    latency, isConnected, lastSync,
    // Control
    refresh,
  }
}