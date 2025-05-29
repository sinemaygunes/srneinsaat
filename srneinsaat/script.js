document.addEventListener("DOMContentLoaded", function () {
    // Menü aç/kapat (mobil)
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("active");
        });
    }

    // Otomatik textarea yüksekliği
    const ta = document.querySelector('.form-panel textarea');
    if (ta) {
        const fit = el => {
            el.style.height = 'auto';
            el.style.height = el.scrollHeight + 'px';
        };
        ta.addEventListener('input', () => fit(ta));
        fit(ta); // Sayfa yüklendiğinde çalıştır
    }

    // Form gönderimi ve kullanıcıya mesaj gösterimi
    const form = document.getElementById("iletisimForm");
    const mesajAlani = document.getElementById("formMesaj");

    if (form && mesajAlani) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(form);

            fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    form.reset();
                    mesajAlani.textContent = "Formunuz başarıyla gönderilmiştir.";
                    mesajAlani.classList.remove("error");
                    mesajAlani.classList.add("success");
                    mesajAlani.style.display = "block";
                } else {
                    mesajAlani.textContent = "Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.";
                    mesajAlani.classList.remove("success");
                    mesajAlani.classList.add("error");
                    mesajAlani.style.display = "block";
                }

                setTimeout(() => {
                    mesajAlani.style.display = "none";
                }, 5000);
            }).catch(() => {
                mesajAlani.textContent = "Bağlantı hatası oluştu. Lütfen tekrar deneyin.";
                mesajAlani.classList.remove("success");
                mesajAlani.classList.add("error");
                mesajAlani.style.display = "block";

                setTimeout(() => {
                    mesajAlani.style.display = "none";
                }, 5000);
            });
        });
    }

    document.querySelectorAll('.service-item').forEach(card => {
        const isTouchDevice = 'ontouchstart' in window;

        if (isTouchDevice) {
            let lastTap = 0;

            card.addEventListener('touchend', function (e) {
                const currentTime = new Date().getTime();
                const tapLength = currentTime - lastTap;
                lastTap = currentTime;

                if (tapLength < 400 && tapLength > 0) {
                    // ikinci dokunuş
                    card.classList.remove('open');
                } else {
                    // diğerlerini kapat
                    document.querySelectorAll('.service-item').forEach(c => c.classList.remove('open'));
                    card.classList.add('open');
                }

                e.preventDefault();
            });
        } else {
            // masaüstü için hover etkisi
            card.addEventListener('mouseenter', function () {
                document.querySelectorAll('.service-item').forEach(c => {
                    if (c !== card) c.classList.remove('open');
                });
                card.classList.add('open');
            });

            card.addEventListener('mouseleave', function () {
                card.classList.remove('open');
            });
        }
    });
    // Sıkça Sorulan Sorular (FAQ) bölümü aç/kapat
    window.toggleFaq = function (el) {
        const parent = el.closest('.faq-item');
        parent.classList.toggle('active');
        const icon = el.querySelector('.faq-icon');
        icon.textContent = parent.classList.contains('active') ? '−' : '+';
    };
});
