import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'

function App() {
  return (
    <main className="w-full min-h-svh px-4 sm:px-8 lg:px-12 xl:px-16 py-10 space-y-10">

      {/* ── Header ── */}
      <section className="space-y-2">
        <h1 className="text-4xl font-black uppercase tracking-tight text-foreground">
          Boxing v2.0
        </h1>
        <p className="text-muted-foreground">
          Sistem manajemen boxing club — modular UI berbasis shadcn/ui
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge>shadcn/ui</Badge>
          <Badge variant="secondary">React 19</Badge>
          <Badge variant="outline">Tailwind v4</Badge>
        </div>
      </section>

      <Separator />

      {/* ── Button Showcase ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Button Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <Separator />

      {/* ── Card Showcase ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Card Component</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Aktif</CardTitle>
              <CardDescription>Total anggota terdaftar bulan ini</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-primary">128</p>
            </CardContent>
            <CardFooter>
              <Badge variant="secondary">+12 minggu ini</Badge>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sesi Latihan</CardTitle>
              <CardDescription>Total sesi yang dijadwalkan</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-primary">36</p>
            </CardContent>
            <CardFooter>
              <Badge>Aktif</Badge>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pelatih</CardTitle>
              <CardDescription>Instruktur bersertifikat</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-primary">8</p>
            </CardContent>
            <CardFooter>
              <Badge variant="outline">On Duty</Badge>
            </CardFooter>
          </Card>
        </div>
      </section>

      <Separator />

      {/* ── Input Showcase ── */}
      <section className="space-y-3 max-w-md">
        <h2 className="text-xl font-bold">Input Component</h2>
        <Input type="text" placeholder="Cari nama member..." />
        <Input type="email" placeholder="Email pelatih..." />
        <Button className="w-full">Cari</Button>
      </section>

    </main>
  )
}

export default App
