export interface Article {
  id: string;
  title: string;
  date: string;
  categories: string[];
  image: string;
  excerpt: string;
  content: string;
}

export const articles: Article[] = [
  {
    id: "membangun-personal-branding",
    title: "Membangun Personal Branding bagi Pemuda Desa di Era Digital",
    date: "12 April 2024",
    categories: ["Edukasi", "Pemuda"],
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1964&auto=format&fit=crop",
    excerpt: "Bagaimana cara memanfaatkan media sosial untuk membangun profil profesional tanpa harus keluar dari desa dengan memanfaatkan konektivitas digital yang kini semakin merata.",
    content: "Di era digital yang semakin pesat, peluang untuk membangun karier tidak lagi terbatas oleh sekat-sekat geografis. Para pemuda yang tinggal di desa kini memiliki akses yang sama ke audiens global berkat internet. Namun, tantangan terbesarnya adalah bagaimana menonjolkan diri di tengah persaingan yang begitu luas.\n\n### Mengapa Personal Branding Penting?\n\nPersonal branding bukan sekadar memiliki akun media sosial. Ini adalah tentang bagaimana Anda dilihat oleh orang lain, apa keahlian Anda, dan nilai apa yang Anda tawarkan. Bagi pemuda desa, personal branding yang kuat dapat membuka pintu untuk pekerjaan remote, projek freelance, atau bahkan membangun bisnis digital sendiri.\n\n### Langkah Awal Memulai\n\n1. **Identifikasi Keunikan**: Apa keahlian Anda? Apakah Anda pandai menulis, mendesain, atau menguasai teknik pertanian modern?\n2. **Pilih Platform yang Tepat**: LinkedIn untuk profil profesional, Instagram atau TikTok untuk portofolio visual.\n3. **Konsisten Berbagi Nilai**: Mulailah berbagi pengetahuan atau tutorial yang relevan dengan bidang Anda.\n\nDengan personal branding, pemuda desa tidak lagi dipandang hanya sebagai pekerja kasar, melainkan sebagai talenta digital yang kompetitif dan berwawasan luas."
  },
  {
    id: "strategi-umkm-lokal",
    title: "Strategi UMKM Lokal Menembus Pasar Internasional Lewat Marketplace",
    date: "08 April 2024",
    categories: ["Bisnis", "Marketplace"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Kisah sukses produk kerajinan tangan dari Kampung Digital yang kini dipesan hingga ke Eropa melalui optimalisasi platform e-commerce global.",
    content: "Globalisasi pasar melalui internet memberikan nafas baru bagi pelaku UMKM di pelosok negeri. Produk-produk unik dari daerah kini bisa bersanding dengan brand internasional di etalase digital e-commerce global.\n\n### Tantangan Ekspor Digital\n\nMeskipun aksesnya mudah, ada beberapa hambatan yang sering dihadapi UMKM: standar kualitas internasional, logistik pengiriman luar negeri, dan bahasa komunikasi dengan calon pembeli.\n\n### Tips Menuju Pasar Global\n\n* **Foto Produk Berkualitas**: Gunakan teknik fotografi yang menonjolkan detail dan kualitas bahan.\n* **Optimasi Kata Kunci**: Gunakan deskripsi produk dalam bahasa Inggris yang ramah mesin pencari (SEO).\n* **Gunakan Layanan Agregator**: Banyak layanan yang membantu UMKM dalam hal kurasi dan manajemen logistik lintas negara.\n\nKisah sukses dari Kampung Digital membuktikan bahwa dengan ketekunan dalam belajar platform digital, batas wilayah tidak lagi menjadi penghalang bagi produk lokal untuk mendunia."
  },
  {
    id: "workshop-iot-pertanian",
    title: "Workshop IoT: Mengotomasi Sistem Pengairan Sawah Secara Cerdas",
    date: "01 April 2024",
    categories: ["Teknologi", "Pertanian"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    excerpt: "Inovasi terbaru dari Sentra Kreasi untuk membantu petani meningkatkan efisiensi penggunaan air melalui sensor kelembaban tanah berbasis AI.",
    content: "Sentra Kreasi baru saja menyelesaikan seri workshop perdana mengenai penerapan Internet of Things (IoT) di sektor pertanian. Fokus utamanya adalah pembuatan prototipe sistem irigasi otomatis yang dapat dikendalikan melalui smartphone.\n\n### Bagaimana Cara Kerjanya?\n\nSistem ini terdiri dari sensor kelembaban tanah yang ditanam di beberapa titik lahan. Sensor ini mengirimkan data secara real-time ke modul mikrokontroler yang terhubung ke internet. Jika kelembaban tanah turun di bawah ambang batas yang ditentukan, pompa air akan menyala secara otomatis.\n\n### Dampak bagi Petani\n\n* **Penghematan Air**: Air hanya diberikan saat benar-benar dibutuhkan oleh tanaman.\n* **Efisiensi Waktu**: Petani tidak perlu lagi ke sawah di tengah malam hanya untuk mengatur aliran air.\n* **Peningkatan Hasil**: Kondisi tanah yang selalu optimal memastikan pertumbuhan padi yang lebih baik.\n\nTeknologi tidak harus mahal. Workshop ini mengajarkan bagaimana merakit perangkat IoT dengan biaya terjangkau menggunakan komponen sumber terbuka (open source)."
  },
  {
    id: "pemanfaatan-ai-analisis-tanah",
    title: "Pemanfaatan AI untuk Analisis Tanah Pertanian di Desa",
    date: "25 Maret 2024",
    categories: ["Teknologi", "Inovasi"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2032&auto=format&fit=crop",
    excerpt: "Bagaimana algoritma machine learning dapat membantu petani menentukan waktu tanam yang tepat berdasarkan analisis historis cuaca dan nutrisi tanah.",
    content: "Artificial Intelligence (AI) seringkali terdengar seperti sesuatu yang hanya ada di laboratorium canggih. Namun, Sentra Kreasi berupaya membawa kecanggihan ini langsung ke tangan para petani kita.\n\n### Analisis Prediktif\n\nDengan memadukan data historis cuaca selama 10 tahun terakhir dengan data nutrisi tanah dari sampel fisik, algoritma AI kami dapat memprediksi risiko gagal panen karena pola cuaca yang tidak menentu. Hal ini memungkinkan petani untuk memitigasi risiko sejak dini.\n\n### Rekomendasi Pemupukan\n\nAI juga memberikan rekomendasi presisi mengenai jenis dan dosis pupuk yang dibutuhkan. Dengan begitu, penggunaan pupuk menjadi lebih efisien dan ramah lingkungan karena tidak ada sisa bahan kimia yang terbuang sia-sia.\n\n### Masa Depan Pertanian\n\nMasa depan pertanian Indonesia ada di integrasi antara kearifan lokal petani dengan ketajaman analisis teknologi modern."
  },
  {
    id: "pengembangan-aplikasi-desa",
    title: "Membangun Ekosistem Aplikasi Desa yang Inklusif",
    date: "15 Maret 2024",
    categories: ["Teknologi", "Layanan Publik"],
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Langkah-langkah strategis dalam mendesain aplikasi layanan masyarakat yang mudah digunakan oleh seluruh lapisan warga desa.",
    content: "Membangun digitalisasi desa bukan hanya soal kecanggihan teknologi, tapi soal kegunaan bagi semua orang...\n\n### Inklusivitas adalah Kunci\n\nBanyak aplikasi desa gagal karena terlalu rumit bagi lansia atau warga yang kurang familier dengan smartphone. Kami fokus pada antarmuka yang sangat sederhana.\n\n### Fitur Utama\n\n1. Layanan Surat Mandiri\n2. Pelaporan Infrastruktur\n3. Pasar Digital RT/RW"
  },
  {
    id: "pelatihan-coding-anak",
    title: "Program Coding for Kids: Menanamkan Logika Sejak Dini",
    date: "10 Maret 2024",
    categories: ["Edukasi", "Pemuda"],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop",
    excerpt: "Antusiasme anak-anak Kampung Digital dalam mempelajari dasar pemrograman visual menggunakan Scratch.",
    content: "Belajar coding adalah belajar berpikir. Melalui program ini, kami ingin anak-anak tidak hanya menjadi konsumen teknologi, tapi juga pencipta..."
  },
  {
    id: "keamanan-data-ukm",
    title: "Pentingnya Keamanan Data bagi Pelaku UKM Digital",
    date: "05 Maret 2024",
    categories: ["Bisnis", "Keamanan"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Tips praktis melindungi data transaksi dan pelanggan agar bisnis UKM terhindar dari serangan siber.",
    content: "Di dunia digital, data adalah aset yang paling berharga. Banyak UKM yang mengabaikan aspek keamanan ini sehingga berisiko kehilangan modal..."
  },
  {
    id: "literasi-keuangan-digital",
    title: "Literasi Keuangan: Mengelola Modal Bisnis di Fintech",
    date: "01 Maret 2024",
    categories: ["Bisnis", "Edukasi"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    excerpt: "Cara bijak memanfaatkan platform pendanaan digital untuk mengembangkan usaha mikro tanpa terjebak pinjaman ilegal.",
    content: "Fintech menawarkan kemudahan, namun tanpa literasi yang cukup, bisa menjadi bumerang. Kami berbagi tips cara memilih platform yang legal dan aman..."
  }
];
