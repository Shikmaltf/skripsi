

document.getElementById('formArtikel').onsubmit = function(e) {
  e.preventDefault();
  const judul = document.getElementById('judul').value;
  const isi = document.getElementById('isi').value;
  const gambarInput = document.getElementById('gambar');
  let gambar = "";

  if (gambarInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      gambar = evt.target.result;
      simpanArtikel(judul, isi, gambar);
    };
    reader.readAsDataURL(gambarInput.files[0]);
  } else {
    simpanArtikel(judul, isi, gambar);
  }
};

function simpanArtikel(judul, isi, gambar) {
  let artikel = JSON.parse(localStorage.getItem('artikel') || '[]');
  artikel.push({ judul, isi, gambar, tanggal: new Date().toISOString() });
  localStorage.setItem('artikel', JSON.stringify(artikel));
  document.getElementById('pesan').innerHTML = '<div class="alert alert-success">Artikel berhasil diupload!</div>';
  document.getElementById('formArtikel').reset();
}

// Fungsi untuk render daftar artikel di halaman admin
function renderDaftarArtikelAdmin() {
  let artikel = JSON.parse(localStorage.getItem('artikel') || '[]');
  let container = document.getElementById('daftarArtikelAdmin');
  if (!container) return;
  container.innerHTML = '';
  artikel.forEach((a, index) => {
    container.innerHTML += `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${a.judul}</h5>
          <p class="card-text">${a.isi}</p>
          <p class="text-muted"><small>${new Date(a.tanggal).toLocaleString()}</small></p>
          <button class="btn btn-danger" onclick="hapusArtikel(${index})">Hapus</button>
        </div>
      </div>
    `;
  });
}

// Fungsi untuk menghapus artikel
function hapusArtikel(index) {
  let artikel = JSON.parse(localStorage.getItem('artikel') || '[]');
  artikel.splice(index, 1);
  localStorage.setItem('artikel', JSON.stringify(artikel));
  document.getElementById('pesan').innerHTML = '<div class="alert alert-success">Artikel berhasil dihapus!</div>';
  renderDaftarArtikelAdmin(); // refresh daftar artikel admin
}

// Inisialisasi fungsi render ketika halaman admin dimuat
document.addEventListener('DOMContentLoaded', function() {
  renderDaftarArtikelAdmin();
  
  document.getElementById('formArtikel').onsubmit = function(e) {
    e.preventDefault();
    const judul = document.getElementById('judul').value;
    const isi = document.getElementById('isi').value;
    const gambarInput = document.getElementById('gambar');
    let gambar = "";
    if (gambarInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        gambar = evt.target.result;
        simpanArtikel(judul, isi, gambar);
      };
      reader.readAsDataURL(gambarInput.files[0]);
    } else {
      simpanArtikel(judul, isi, gambar);
    }
  };
});

//coba navbar interaktif

document.addEventListener("DOMContentLoaded", function () {
  var header = document.getElementById("header");
  var navcontent = document.getElementById("nav-content");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      header.classList.add("bg-white", "shadow");
      header.classList.remove("navbar-dark", "bg-dark");
      header.classList.add("navbar-light");
      navcontent.classList.add("bg-white");
      navcontent.classList.remove("bg-dark");
    } else {
      header.classList.remove("bg-white", "shadow", "navbar-light");
      header.classList.add("navbar-dark", "bg-dark");
      navcontent.classList.remove("bg-white");
      navcontent.classList.add("bg-dark");
    }
  });
});
