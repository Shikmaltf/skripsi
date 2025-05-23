//produkModal
document.querySelectorAll('.btnDetail').forEach(item => {
    item.addEventListener('click', (e) => {
        let parent = e.target.closest('.card');
        let gambar = parent.querySelector('.card-img-top').src;
        let harga = parent.querySelector('.harga').innerHTML;
        let judul = parent.querySelector('.card-title').innerHTML;
        let deskripsi = parent.querySelector('.deskripsi').innerHTML;

        let produkModal = document.getElementById('produkModal');
        produkModal.querySelector('.modalTitle').innerHTML = judul;
        let image = document.createElement('img');
        image.src = gambar;
        image.classList.add('w-100');
        produkModal.querySelector('.modalImage').innerHTML = '';
        produkModal.querySelector('.modalImage').appendChild(image);
        produkModal.querySelector('.modalDeskripsi').innerHTML = deskripsi;
        produkModal.querySelector('.modalHarga').innerHTML = harga;

        const nohp = '6288210397399';
        let pesan = `https://api.whatsapp.com/send?phone=${nohp}&text=Halo, saya mau pesan produk ini ${judul}`;
        produkModal.querySelector('.btnBeli').href = pesan;

        // Ambil link dari data-link tombol Detail
        let linkPenggunaan = e.target.getAttribute('data-link');
        let btnPenggunaan = produkModal.querySelector('.btnLihatPenggunaan');
        if (btnPenggunaan && linkPenggunaan) {
            btnPenggunaan.onclick = function() {
                window.open(linkPenggunaan, '_blank');
            };
        }

        var bsModal = new bootstrap.Modal(produkModal);
        bsModal.show();
    });
});


// galeriModal
document.querySelectorAll('.btnLihatDetail').forEach(item => {
    item.addEventListener('click', (e) => {
        let parent = e.target.closest('.card');

        let gambar = parent.querySelector('.card-img-top').src;
        let judul = parent.querySelector('.card-title').innerHTML;
        let deskripsi = parent.querySelector('.deskripsi').innerHTML;

        // Isi konten modal galeri
        let galeriModal = document.getElementById('galeriModal');
        galeriModal.querySelector('.modalTitle').innerHTML = judul;
        let image = document.createElement('img');
        image.src = gambar;
        image.classList.add('w-100');
        galeriModal.querySelector('.modalImage').innerHTML = '';
        galeriModal.querySelector('.modalImage').appendChild(image);
        galeriModal.querySelector('.modalDeskripsi').innerHTML = deskripsi;

        // Tampilkan modal galeri secara langsung
        var bsModal = new bootstrap.Modal(galeriModal);
        bsModal.show();
    });
});


// modal edukasi
document.querySelectorAll('.btnPelajari').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const videoUrl = item.getAttribute('data-video');
        const modal = document.getElementById('edukasiModal');
        const iframe = modal.querySelector('#edukasiVideo');
        iframe.src = videoUrl;

        var bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        // Bersihkan video saat modal ditutup
        modal.addEventListener('hidden.bs.modal', function () {
            iframe.src = "www.youtube.com/embed/gVuMNSCgFDA?si=qVl-4ielaj29Ouit";
        }, { once: true });
    });
});

// deskripsi di card galeri
function truncateText(text, wordLimit) {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
}

document.addEventListener("DOMContentLoaded", function() {
  // Untuk card dinamis (yang diupload) sudah diproses di fungsi tampilkanArtikel()
  tampilkanArtikel();

  // Proses semua card statis, misalnya yang sudah ada di index.html
  document.querySelectorAll('.deskripsi').forEach(function(el) {
    // Pastikan menggunakan truncateText sesuai kebutuhan (15 kata)
    el.innerHTML = truncateText(el.innerHTML, 15);
  });
});


function tampilkanArtikel() {
  let artikel = JSON.parse(localStorage.getItem('artikel') || '[]');
  let container = document.getElementById('daftarArtikel');
  if (!container) return;
  container.innerHTML = '';
  artikel.reverse().forEach(a => {
    container.innerHTML += `
      <div class="col-md-4 mb-5">
        <div class="card crop-img">
          ${a.gambar ? `<img src="${a.gambar}" class="card-img-top" alt="Gambar Artikel">` : ''}
          <div class="card-body">
            <h5 class="card-title">${a.judul}</h5>
            <p class="deskripsi" data-full="${a.isi}">${truncateText(a.isi, 15)}</p>
            <p class="text-muted" style="font-size:12px">${new Date(a.tanggal).toLocaleString()}</p>
            <a class="btn btn-sm btn-primary d-block btnLihatDetail">Lihat Detail</a>
          </div>
        </div>
      </div>
    `;
  });
  inisialisasiBtnLihatDetail(); // <-- tambahkan ini
}
window.addEventListener('DOMContentLoaded', tampilkanArtikel);

function inisialisasiBtnLihatDetail() {
  document.querySelectorAll('.btnLihatDetail').forEach(item => {
    item.onclick = function(e) {
      let parent = e.target.closest('.card');
      let gambar = parent.querySelector('.card-img-top').src;
      let judul = parent.querySelector('.card-title').innerHTML;
      let deskripsi = parent.querySelector('.deskripsi').getAttribute('data-full');

      let galeriModal = document.getElementById('galeriModal');
      galeriModal.querySelector('.modalTitle').innerHTML = judul;
      let image = document.createElement('img');
      image.src = gambar;
      image.classList.add('w-100');
      galeriModal.querySelector('.modalImage').innerHTML = '';
      galeriModal.querySelector('.modalImage').appendChild(image);
      galeriModal.querySelector('.modalDeskripsi').innerHTML = deskripsi;

      
    };
  });
}
