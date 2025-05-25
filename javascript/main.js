// produkModal
document.querySelectorAll('.btnDetail').forEach(item => {
    item.addEventListener('click', (e) => {
        let parent = e.target.closest('.card');
        let gambar = parent.querySelector('.card-img-top').src;
        let harga = parent.querySelector('.harga').innerHTML;
        let judul = parent.querySelector('.card-title').innerHTML;
        let deskripsi = parent.querySelector('.deskripsi').getAttribute('data-full');

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

// galeriModal (statis)
document.querySelectorAll('.btnLihatDetail').forEach(item => {
    item.addEventListener('click', (e) => {
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

        var bsModal = new bootstrap.Modal(galeriModal);
        bsModal.show();
    });
});

// modal edukasi
const edukasiModal = document.getElementById('edukasiModal');
const edukasiIframe = edukasiModal.querySelector('#edukasiVideo');

document.querySelectorAll('.btnPelajari').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const videoUrl = item.getAttribute('data-video');
        edukasiIframe.src = videoUrl;

        var bsModal = new bootstrap.Modal(edukasiModal);
        bsModal.show();
    });
});

// Kosongkan video saat modal edukasi ditutup
edukasiModal.addEventListener('hidden.bs.modal', function () {
    edukasiIframe.src = '';
});

// Cegah backdrop error
document.addEventListener('hidden.bs.modal', function () {
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    document.body.classList.remove('modal-open');
    document.body.style = ''; // reset overflow hidden
});

// truncate function
function truncateText(text, wordLimit) {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
}

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
  inisialisasiBtnLihatDetail();
}

function inisialisasiBtnLihatDetail() {
  document.querySelectorAll('.btnLihatDetail').forEach(item => {
    item.onclick = function(e) {
      let parent = e.target.closest('.card');
      let gambar = parent.querySelector('.card-img-top')?.src || '';
      let judul = parent.querySelector('.card-title')?.innerHTML || '';
      let deskripsi = parent.querySelector('.deskripsi')?.getAttribute('data-full') || '';

      let galeriModal = document.getElementById('galeriModal');
      galeriModal.querySelector('.modalTitle').innerHTML = judul;
      let image = document.createElement('img');
      image.src = gambar;
      image.classList.add('w-100');
      galeriModal.querySelector('.modalImage').innerHTML = '';
      galeriModal.querySelector('.modalImage').appendChild(image);
      galeriModal.querySelector('.modalDeskripsi').innerHTML = deskripsi;

      var bsModal = new bootstrap.Modal(galeriModal);
      bsModal.show();
    };
  });
}

document.addEventListener("DOMContentLoaded", function () {
  tampilkanArtikel();
  
  document.querySelectorAll('.deskripsi').forEach(function (el) {
    if (!el.getAttribute('data-full')) {
      el.setAttribute('data-full', el.textContent.trim());
      el.innerHTML = truncateText(el.textContent.trim(), 15);
    }
  });
});

//coba navbar interaktif
