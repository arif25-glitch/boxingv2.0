export default function ConfirmDelete({ itemName, detail, onCancel, onConfirm }) {
  return <div role="alertdialog" aria-label={`Hapus ${itemName}`} className="flex flex-wrap items-center justify-between gap-4 border border-rose-500/30 bg-rose-500/[0.08] p-4">
    <p className="text-sm text-white/80"><strong className="text-white">Hapus {itemName}?</strong> {detail}</p>
    <div className="flex gap-2"><button type="button" onClick={onCancel} className="min-h-10 border border-white/20 px-4 text-xs font-bold text-white/70">Batal</button><button type="button" onClick={onConfirm} className="min-h-10 bg-rose-600 px-4 text-xs font-bold text-white">Hapus</button></div>
  </div>
}
