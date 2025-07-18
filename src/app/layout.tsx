import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Pokédex Profesional",
  description: "Buscador de Pokémon con Next.js y Material UI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <main className="app-container">{children}</main>
      </body>
    </html>
  )
}
