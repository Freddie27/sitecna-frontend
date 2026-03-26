export interface Variable {
  _id: { $oid: string } | string
  nombre: string
  unidad: string
  tipo: string
  descripcion?: string
  puntoCritico?: number
  codigo: string
  plantaCodigo?: string
  creado: string
  actualizado: string
}