"use client"

import { useState } from "react"
import { generateQRCode } from "../actions/qrCodeActions"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Image from "next/image"

export default function QRCodeGenerator() {
    const [inputText, setInputText] = useState<string>("")
    const [qrCodeUrl, setQrCodeIrl] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (inputText) {
            setIsLoading(true)
            try {
                const qrCode = await generateQRCode(inputText)
                setQrCodeIrl(qrCode)
            } catch (error) {
                // Handle error if needed
            } finally {
                setIsLoading(false)
            }
        }
    }

    const handleDownload = () => {
        if (qrCodeUrl) {
            const link = document.createElement('a');
            link.href = qrCodeUrl;
            link.download = 'qrcode.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="w-full aspect-square bg-muted flex items-center justify-center mb-6 rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
              {isLoading ? (
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
              ) : qrCodeUrl ? (
                <Image
                  src={qrCodeUrl || "/placeholder.svg"}
                  alt="Generated QR Code"
                  width={300}
                  height={300}
                  className="animate-fade-in"
                />
              ) : (
                <div className="text-muted-foreground text-center">
                  <svg
                    className="w-12 h-12 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Enter text to generate QR code
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter text or URL"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full"
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Generate QR Code
              </Button>
            </form>
            {qrCodeUrl && (
              <Button onClick={handleDownload} className="w-full mt-4">
                Download QR Code
              </Button>
            )}
          </CardContent>
        </Card>
      )
    }
