"use server"

import QRCode from "qrcode"

export async function generateQRCode(text: string): Promise<string> {
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(text, {
            errorCorrectionLevel: "H",
            margin: 1,
            width: 300,
        })
        return qrCodeDataUrl
    } catch (error) {
        console.error("Error generating QR code:", error)
        throw new Error("Failed to generate QR code")
    }
}
