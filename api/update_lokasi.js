// Memori sementara di server (hanya bertahan selama server bangun)
let tempData = null;
let subscribers = [];

export default function handler(req, res) {
  // Pengaturan CORS agar tidak diblokir Android/Browser
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 1. JIKA APLIKASI SKETCHWARE KIRIM DATA (POST)
  if (req.method === 'POST') {
    const { lat, lng } = req.body;
    
    if (lat && lng) {
      tempData = {
        lat: lat,
        lng: lng,
        waktu: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
      };

      // Kirim data langsung ke semua browser yang lagi buka web admin saat ini
      while (subscribers.length > 0) {
        const callback = subscribers.shift();
        callback(tempData);
      }
    }

    return res.status(200).json({ status: "success", message: "Terpancar!" });
  } 

  // 2. JIKA WEBSITE ADMIN MINTA DATA (GET)
  if (req.method === 'GET') {
    // Jika server baru bangun dan ada data instan, langsung kirim
    if (tempData) {
      const data = tempData;
      tempData = null; // Reset setelah diambil
      return res.status(200).json(data);
    }

    // Jika belum ada data dari HP, tahan koneksi web admin selama 10 detik (Long Polling)
    const s = setTimeout(() => {
      const index = subscribers.indexOf(callback);
      if (index > -1) subscribers.splice(index, 1);
      res.status(200).json({ timeout: true });
    }, 10000);

    const callback = (data) => {
      clearTimeout(s);
      res.status(200).json(data);
    };

    subscribers.push(callback);
    return;
  }

  return res.status(405).json({ error: "Method not allowed" });
}
