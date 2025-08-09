const gallery = document.getElementById('gallery');
const form = document.getElementById('memoryForm');
const imgFileInput = document.getElementById('imgFile');

function createMemoryItem(imgUrl, description, index) {
    const col = document.createElement('div');
    col.className = 'col-md-6';

    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = imgUrl;
    img.className = 'card-img-top';
    img.alt = 'Ảnh kỷ niệm';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const p = document.createElement('p');
    p.className = 'card-text';
    p.textContent = description;

    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Xoá';
    btnDelete.className = 'btn btn-danger btn-sm mt-2';

    btnDelete.addEventListener('click', () => {
        gallery.removeChild(col);
        removeMemory(index);
        reloadGallery();
    });

    cardBody.appendChild(p);
    cardBody.appendChild(btnDelete);

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);

    return col;
}

function loadMemories() {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    return memories;
}

function saveMemories(memories) {
    localStorage.setItem('memories', JSON.stringify(memories));
}

function reloadGallery() {
    gallery.innerHTML = '';
    const memories = loadMemories();
    memories.forEach((mem, idx) => {
        const item = createMemoryItem(mem.imgUrl, mem.description, idx);
        gallery.appendChild(item);
    });
}

function removeMemory(index) {
    const memories = loadMemories();
    memories.splice(index, 1);
    saveMemories(memories);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const file = imgFileInput.files[0];
    const description = form.description.value.trim();

    if (!file) {
        alert('Bạn cần chọn 1 ảnh!');
        return;
    }
    if (!description) {
        alert('Bạn cần nhập kỷ niệm!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const base64img = event.target.result; // base64 string

        const memories = loadMemories();
        memories.push({ imgUrl: base64img, description });
        saveMemories(memories);
        reloadGallery();
        form.reset();
    };
    reader.readAsDataURL(file);
});

// Load bộ nhớ lúc đầu
reloadGallery();
