const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));



const data = [{
        name: 'Penggorok Daun',
        gejala: ['Daun menguning', 'Bintik putih pada tanaman', 'Adanya alur berliku bekas kotoran berwarna putih'],
        solusi: 'Penggunaan Fungisida: Penggunaan fungisida yang direkomendasikan dapat membantu mengendalikan pertumbuhan jamur penyebab penyakit. Pastikan untuk mengikuti petunjuk pemakaian dengan benar dan menggunakan fungisida yang sesuai untuk jenis penyakit yang dihadapi.',
        maxPoints: 3,
        point: []
    },
    {
        name: 'Thrips',
        gejala: ['Pucuk dan tunas-tunas samping berwarna keperak-perakan', 'Daun menguning', 'Serangan pada daun bagian bawah/seluruh daun'],
        solusi: 'Pengendalian Hama Secara Fisik: Gunakan alat seperti selang air dengan tekanan rendah untuk menyemprotkan air ke tanaman dan menghilangkan thrips secara fisik dari permukaan daun. Gunakan pula alat seperti lembaran warna biru atau kuning yang dilapisi lem untuk menarik thrips dan menangkap mereka.',
        maxPoints: 3,
        point: []
    },
    {
        name: 'Karat Putih',
        gejala: ['Serangan pada daun bagian bawah/seluruh daun', 'Daun kerdil', 'Daun cekung dan rapuh', 'Permukaan daun bagian bawah berbintik coklat'],
        solusi: 'Pemantauan Rutin: Lakukan pemantauan rutin terhadap tanaman untuk mendeteksi tanda-tanda awal infeksi karat putih. Dengan mengidentifikasi infeksi secara dini, Anda dapat mengambil tindakan lebih cepat untuk mengendalikan penyebaran penyakit.',
        maxPoints: 4,
        point: []
    },
    {
        name: 'Layu Fusarium',
        gejala: ['Bercak coklat pada daun', 'Pertumbuhan bagian atas tanaman terhambat atau mati', 'Daun layu dan gugur', 'Layu permanen', 'Tanaman membusuk atau mati'],
        solusi: 'Penggunaan Bibit Sehat: Pastikan bibit yang Anda gunakan untuk menanam krisan bebas dari infeksi Fusarium. Pilih bibit yang sehat dan berkualitas dari sumber yang terpercaya.',
        maxPoints: 5,
        point: []
    },
    {
        name: 'Ulat Tentara',
        gejala: ['Epidermis atau bagian atas daun rusak/transparan', 'Daun menguning', 'Tersisa hanya tulang daun pada tanaman', 'Hama memakan tunas dan bunga'],
        solusi: 'Penggunaan Pestisida: Penggunaan insektisida yang aman dan efektif dapat membantu mengendalikan populasi ulat tentara. Pastikan untuk mengikuti petunjuk penggunaan yang tertera pada label produk.',
        maxPoints: 4,
        point: []
    },
    {
        name: 'Tidak Ada Kecocokan Penyakit/Hama',
        gejala: ['Tidak ditemukan gejala yang spesisfik'],
        solusi: 'Silahkan datangi dokter tanaman terdekat',
        point: []
    }
]

function addPoint(sample) {
    data.map((item) => {
        if (item.name === sample) {
            item.point.push(true);
        }
    })
}

function notFound() {
    const point = data[5].point.length;
    if (point === 0) {
        const tempo = [];
        tempo.push(data[5]);
        return tempo;
    }
}

function p1() {
    const point = data[0].point.length;
    if (point === 3) {
        const tempo = [];
        tempo.push(data[0]);
        return tempo;
    } else {
        return notFound();
    }
}

function p2() {
    const point = data[1].point.length;
    if (point === 3) {
        const tempo = [];
        tempo.push(data[1]);
        return tempo;
    } else {
        return notFound();
    }
}

function p3() {
    const point = data[2].point.length;
    if (point === 4) {
        const tempo = [];
        tempo.push(data[2])
        return tempo;
    } else {
        return notFound();
    }
}

function p4() {
    const point = data[3].point.length;
    if (point === 5) {
        const tempo = [];
        tempo.push(data[3])
        return tempo;
    } else {
        return notFound();
    }
}

function p5() {
    const point = data[4].point.length;
    if (point === 4) {
        const tempo = [];
        tempo.push(data[4])
        return tempo;
    } else {
        return notFound();
    }
}

const hasil = () => {
    let refilters = (samples) => {
        const results = [];
        samples.filter((items) => {
            if (items.point.length >= items.maxPoints) {
                results.push(items);
            }
        })
        return results;
    };

    const filters = data.filter((item) => {
        if (item.point.length >= 3) {
            return item.name;
        }
    });
    if (filters.length === 1) {
        for (const filter of filters) {
            switch (filter.name) {
                case 'Penggorok Daun':
                    return p1();
                    break;
                case 'Thrips':
                    return p2();
                    break;
                case 'Karat Putih':
                    return p3();
                    break;
                case 'Layu Fusarium':
                    return p4();
                    break;
                case 'Ulat Tentara':
                    return p5();
                    break;
            }
        }
    } else if (filters.length > 1) {
        return refilters(filters);
    } else {
        return notFound();
    }
}

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/gejala', (req, res) => {
   
    res.render('form/index', {
        data
    });
})

app.post('/gejala', (req, res) => {
    const {
        g1,
        g2,
        g3,
        g4,
        g5,
        g6,
        g7,
        g8,
        g9,
        g10,
        g11,
        g12,
        g13,
        g14,
        g15,
        g16
    } = req.body;
    if (g1 === 'y') {
        addPoint('Penggorok Daun')
        addPoint('Thrips')
        addPoint('Ulat Tentara');
        if (g2 === 'y' && g3 === 'y') {
            addPoint('Penggorok Daun');
            addPoint('Penggorok Daun')
            if (g4 === 'y' && g5 === 'y' && g6 === 'y' && g7 === 'y' && g8 === 'y' && g9 === 'y' && g10 === 'y' && g11 === 'y' && g12 === 'y' && g13 === 'y' && g14 === 'y' && g15 === 'y' && g15 === 'y' && g16 === 'y') {
                addPoint('Thrips');
                addPoint('Thrips');
                addPoint('Karat Putih');
                addPoint('Karat Putih');
                addPoint('Karat Putih');
                addPoint('Karat Putih');
                addPoint('Layu Fusarium');
                addPoint('Layu Fusarium');
                addPoint('Layu Fusarium');
                addPoint('Layu Fusarium');
                addPoint('Layu Fusarium');
                addPoint('Ulat Tentara');
                addPoint('Ulat Tentara');
                addPoint('Ulat Tentara');
            }
        } else if (g4 === 'y' && g5 === 'y') {
            addPoint('Thrips');
            addPoint('Thrips')
        } else if (g14 === 'y' && g15 === 'y' && g16 === 'y') {
            addPoint('Ulat Tentara');
            addPoint('Ulat Tentara');
            addPoint('Ulat Tentara');
        }
    } else if (g5 === 'y') {
        addPoint('Karat Putih');
        if (g6 === 'y' && g7 === 'y' && g8 === 'y') {
            addPoint('Karat Putih');
            addPoint('Karat Putih');
            addPoint('Karat Putih');
        }
    } else if (g9 === 'y') {
        addPoint('Layu Fusarium');
        if (g10 === 'y' && g11 === 'y' && g12 === 'y' && g13 === 'y') {
            addPoint('Layu Fusarium');
            addPoint('Layu Fusarium');
            addPoint('Layu Fusarium');
            addPoint('Layu Fusarium');
        }
    }
    res.redirect('/hasil');
});

app.get('/hasil', (req, res) => {
    const results = hasil();
    res.render('diagnosa/index', {
        results
    });
    data.map((item) => {
        item.point.length = 0;
    })
})


app.listen(port, () => {
    console.log(`listening on port ${port}`);
})