export interface Activity {
  id: string;
  title: string;
  date: string;
  categories: string[];
  desc: string;
  content?: string;
  image: string;
}

export const activities: Activity[] = [
  {
    id: "kampanye-sosial-peduli-lingkungan",
    title: "Kampanye Sosial: Peduli Lingkungan",
    date: "12 Mei 2024",
    categories: ["Sosial", "Lingkungan"],
    desc: "Inisiatif kolektif yang dirancang untuk meningkatkan kesadaran komunitas terhadap pentingnya menjaga dan melestarikan lingkungan sekitar demi masa depan.",
    content: "Kegiatan Kampanye Sosial: Peduli Lingkungan merupakan salah satu agenda tahunan Sentra Kreasi. Dalam kegiatan ini, kami mengajak seluruh lapisan masyarakat untuk lebih peduli terhadap ekosistem lokal. Program ini meliputi pembersihan area sungai, penanaman bibit pohon, dan edukasi door-to-door mengenai pengelolaan sampah rumah tangga.\n\nKami percaya bahwa perubahan besar dimulai dari langkah-langkah kecil di lingkungan terdekat kita. Melalui kolaborasi dengan berbagai penggerak komunitas lainnya, keberlanjutan lingkungan di Kabupaten Bandung dapat terus terjaga.",
    image: "https://images.ctfassets.net/cdbs9kaqj6a1/7KINuiGFNua4fQ3EDLGvrn/b014c73b724a39021970c76f344a4b5b/peduli_sosial.jpg",
  },
  {
    id: "sharing-session-cerita-inspiratif",
    title: "Sharing Session: Cerita Inspiratif",
    date: "20 Mei 2024",
    categories: ["Edukasi", "Inspirasi"],
    desc: "Pertemuan anggota komunitas dengan tokoh-tokoh inspiratif yang telah berhasil menghadapi tantangan di industri kreatif digital.",
    content: "Sharing Session ini menghadirkan para praktisi dan pengusaha sukses dari industri kreatif digital untuk membagikan pengalaman nyata mereka. Peserta mendapatkan wawasan berharga mengenai bagaimana membangun karir dan bisnis di tengah persaingan yang ketat.\n\nKegiatan ini tidak hanya sekadar mendengarkan cerita, tetapi juga memberikan ruang bagi para pemuda untuk bertanya langsung dan berdiskusi mengenai strategi pengembangan diri. Harapannya, setiap peserta pulang dengan semangat baru dan ide-ide segar untuk eksekusi ke depannya.",
    image: "https://images.ctfassets.net/cdbs9kaqj6a1/2ruTDR36NcQ9pWyouyxiHJ/131247a716b316e041dd7c35a6991215/sharing_session_after_after_after.jpeg",
  },
  {
    id: "program-kolaborasi-generasi-muda",
    title: "Program Kolaborasi Generasi Muda",
    date: "05 Juni 2024",
    categories: ["Komunitas", "Pemuda", "Kreatif"],
    desc: "Melibatkan kaum muda dalam proyek-proyek kreatif and sosial yang memberikan dampak positif bagi pertumbuhan ekonomi komunitas.",
    content: "Kolaborasi adalah kunci di era digital. Program ini menyatukan berbagai talenta muda—mulai dari desainer, penulis, hingga pengembang teknologi—untuk mengerjakan proyek nyata yang bermanfaat bagi UMKM lokal.\n\nDalam beberapa bulan terakhir, tim kolaborasi telah berhasil membantu digitalisasi puluhan unit usaha kecil di sekitar wilayah Pameungpeuk. Hasilnya, para pengusaha tersebut kini memiliki jangkauan pasar yang lebih luas dan profesionalisme yang meningkat secara visual.",
    image: "https://images.ctfassets.net/cdbs9kaqj6a1/DzegwJLLJ6X61Lc89mHZ1/b7be5f59f7221b9dd65e8edae637b58f/program_kolaborasi.jpg",
  },
  {
    id: "bootcamp-keterampilan-komunitas",
    title: "Bootcamp Keterampilan Komunitas",
    date: "15 Juni 2024",
    categories: ["Workshop", "Teknologi", "Karir"],
    desc: "Program pelatihan intensif untuk memberdayakan anggota komunitas melalui pengembangan keterampilan praktis yang relevan.",
    content: "Bootcamp ini intensif selama 3 hari penuh, di mana peserta diajarkan fundamental teknis yang dibutuhkan pasar saat ini. Mulai dari penggunaan tools modern hingga soft skills seperti manajemen proyek.\n\nMentor-mentor berpengalaman mendampingi setiap langkah pembelajaran, memastikan setiap peserta dapat mengikuti materi meski dari latar belakang yang berbeda. Di akhir sesi, setiap tim mempresentasikan hasil kerja mereka (capstone project) di hadapan para panelis dari industri terkait.",
    image: "https://images.ctfassets.net/cdbs9kaqj6a1/3K0LgJGI1hdKf0WcyYr49q/f6a40f8f2c1ddbe2db7ab8fa9736b067/Leadership-Bootcamp-14-1024x575.jpg",
  }
];
