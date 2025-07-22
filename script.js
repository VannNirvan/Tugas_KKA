// Chatbot UI & logic
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotMessages = document.getElementById('chatbot-messages');

function createChatBubble(message, sender = 'user') {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble ' + sender;
    bubble.textContent = message;
    bubble.style.margin = '8px 0';
    bubble.style.padding = '10px 16px';
    bubble.style.borderRadius = sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px';
    bubble.style.background = sender === 'user' ? '#e3eafc' : '#ffd700';
    bubble.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
    bubble.style.maxWidth = '80%';
    bubble.style.fontSize = '1rem';
    return bubble;
}

function createSendIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.innerHTML = '<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>';
    return svg;
}

function createChatInput() {
    const form = document.createElement('form');
    form.style.display = 'flex';
    form.style.gap = '8px';
    form.style.marginTop = 'auto';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Tulis pertanyaan...';
    input.required = true;
    input.style.flex = '1';
    input.style.padding = '10px';
    input.style.borderRadius = '8px';
    input.style.border = '1px solid #cfd8dc';
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Kirim';
    button.style.background = '#2a5298';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '8px';
    button.style.padding = '0 18px';
    button.style.fontWeight = '700';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.gap = '6px';
    // Tambahkan icon
    button.appendChild(createSendIcon());
    form.appendChild(input);
    form.appendChild(button);
    form.onsubmit = async (e) => {
        e.preventDefault();
        const userMsg = input.value.trim();
        if (!userMsg) return;
        chatbotMessages.appendChild(createChatBubble(userMsg, 'user'));
        input.value = '';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        // Show loading
        const loading = createChatBubble('Mengetik...', 'bot');
        chatbotMessages.appendChild(loading);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        // Dummy bot response
        setTimeout(() => {
            loading.remove();
            const dummyResponses = [
                'Terima kasih atas pertanyaannya! Kami siap membantu kebutuhan website dan hosting Anda.',
                'Silakan jelaskan kebutuhan website Anda, kami akan memberikan solusi terbaik.',
                'Untuk informasi harga, silakan cek bagian Paket Harga di atas.',
                'Kami menyediakan layanan pembuatan website profesional dan hosting cepat.',
                'Tim kami siap membantu konsultasi gratis. Hubungi kami melalui form kontak.',
                
            ];
            const response = dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
            chatbotMessages.appendChild(createChatBubble(response, 'bot'));
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 900);
    };
    return form;
}

// Inisialisasi chatbot UI
function initChatbot() {
    chatbotMessages.innerHTML = '';
    chatbotMessages.appendChild(createChatBubble('Halo! Saya asisten virtual WebPro.id. Ada yang bisa saya bantu?', 'bot'));
    // Form input sudah ada di bawah (di luar #chatbot-messages)
    if (!chatbotContainer.querySelector('form')) {
        chatbotContainer.appendChild(createChatInput());
    }
}

if (chatbotContainer && chatbotMessages) {
    initChatbot();
} 