// Menyimpan data lokasi terakhir di memori server
let lokasiTerakhir = {
  lat: "Belum ada data",
  lng: "Belum ada data",
  waktu: "-"
};

export default function handler(req, res) {
  // 1. JIKA APLIKASI SKETCHWARE NGIRIM DATA (POST)
  if (req.method === 'POST') {
    const { lat, lng } = req.body;
    
    // Simpan ke memori
    lokasiTerakhir = {
      lat: lat || "0",
      lng: lng || "0",
      waktu: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
    };

    console.log(`Data Masuk: Lat ${lat}, Lng ${lng}`);

    return res.status(200).json({ 
      status: "success", 
      message: "Lokasi berhasil masuk ke website admin!" 
    });
  } 
  
  // 2. JIKA WEBSITE ADMIN MINTA DATA (GET)
  else if (req.method === 'GET') {
    return res.status(200).json(lokasiTerakhir);
  } 
  
  // Metode lain ditolak
  else {
    return res.status(405).json({ error: "Metode tidak diizinkan" });
  }
}
