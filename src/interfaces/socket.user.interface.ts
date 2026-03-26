export interface ServerToClientEvents {
  userLoggedIn: (data: { userId: string | null }) => void;  // Aceptamos null si userId puede ser nulo
  userLoggedOut: (data: { userId: string }) => void;  // Suponemos que siempre se recibe un string para logged out
  connect_error: (err: Error) => void;
  disconnect: (reason: string) => void;
  "new-data": (data: any) => void;  // Nota las comillas para permitir el guion
}

export interface ClientToServerEvents {
  // Si tu cliente emite eventos al servidor, los defines aquí
  // Actualmente está vacío
}