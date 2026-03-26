export interface User {
    _id: string
    nombre: string
    rut?: string
    usuario: string
    correo: string
    direccion?: string
    telefono?: string
    roles: string[]
    clienteId: string
    activo: boolean
    creado: string
    actualizado: string
}