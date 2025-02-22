import QRCodeGenerator from "./components/QRCodeGenerator"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-creamy">
      <h1 className="text-8xl font-milkyway mb-8 text-center z-index-1">QR Code Generator</h1>
      <QRCodeGenerator />
    </div>
  )
}