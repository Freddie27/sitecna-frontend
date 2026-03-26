export interface Widget {
  _id: string
  tipoWidget: WidgetType
  plantaId: string | { $oid: string }
  variableIds: (string | { $oid: string })[]
  icono?: string
  colorFuente?: string
  creado: string
  actualizado: string
}

export enum WidgetType {
  GraficoLinea = 'graficoLinea',
  GraficoBarras = 'graficoBarras',
  Indicador = 'indicador',
  MedidorCircular = 'medidorCircular',
}