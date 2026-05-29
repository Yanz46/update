import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Jalur file lokasi.json di server
  const filePath = path.join(process.cwd(), 'lokasi.json');

  // 1. JIKA APLIKASI SKETCHWARE NGIRIM DATA (POST)
  if (req.method === 'POST') {
    const { lat, lng } = req.body;

    const dataBaru = {
      lat: lat || "0",
      lng: lng || "0",
      waktu: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
    };

    console.log(`Lokasi masuk: ${lat}, ${lng}`);

    // Catatan: Karena Vercel read-only untuk jangka panjang, trik ini 
    // akan mengembalikan data sukses ke aplikasi, tapi jika ingin permanen antar-server
    // taruh file json statis ini bisa dibaca lewat GET di bawah.
    return res.status(200).json({ 
      status: "success", 
      message: "Data diproses!" 
    });
  } 

  // 2. JIKA WEBSITE ADMIN MINTA DATA (GET)
  else if (req.method === 'GET') {
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      return res.status(200).json(JSON.parse(fileData));
    } catch (error) {
      return res.status(200).json({ lat: "Belum ada data", lng: "Belum ada data", waktu: "-" });
    }
  } 

  else {
    return res.status(405).json({ error: "Metode salah" });
  }
}
