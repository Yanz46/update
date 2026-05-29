export default function handler(req, res) {
  // Hanya menerima metode POST dari Sketchware
  if (req.method === 'POST') {
    
    // Menangkap data lat dan lng yang dikirim Sketchware
    const { lat, lng } = req.body;

    // Menampilkan data di log Vercel (bisa lo cek di dashboard Vercel)
    console.log(`LOG ADMIN -> Lat: ${lat}, Lng: ${lng}`);

    // Mengembalikan respon format JSON ke Sketchware
    return res.status(200).json({ 
      status: "success", 
      message: "Lokasi berhasil diterima server!",
      latitude: lat,
      longitude: lng
    });

  } else {
    // Jika diakses langsung lewat browser (GET), munculkan error
    return res.status(405).json({ error: "Metode tidak diizinkan" });
  }
}
