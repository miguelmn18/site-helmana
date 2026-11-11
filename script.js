document.addEventListener("DOMContentLoaded", () => {

  // =========================================
  // NAVEGAÇÃO MOBILE
  // =========================================

  const menuMobile = document.getElementById("menu-mobile");

  if (menuMobile) {
    menuMobile.addEventListener("change", (event) => {

      const destino = event.target.value;

      if (destino && destino.startsWith("#")) {

        document.querySelector(destino)?.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches ? "auto" : "smooth",

          block: "start"
        });

      }

      // Retorna o seletor para a opção inicial.
      menuMobile.selectedIndex = 0;

    });
  }


  // =========================================
  // ROLAGEM SUAVE DOS LINKS INTERNOS
  // =========================================

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const id = link.getAttribute("href");

      if (!id || id === "#") {
        return;
      }

      const alvo = document.querySelector(id);

      if (!alvo) {
        return;
      }

      event.preventDefault();

      alvo.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",

        block: "start"
      });

    });

  });


  // =========================================
  // ANIMAÇÕES DE ENTRADA DOS ELEMENTOS
  // =========================================

  const elementosRevelar = document.querySelectorAll(
    ".card, .lista-capacitacoes li, .contador-item, .address-card, .location-photo, .map-frame"
  );

  if ("IntersectionObserver" in window) {

    const observadorRevelacao = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    elementosRevelar.forEach((elemento) => {

      elemento.classList.add("reveal-on-scroll");

      observadorRevelacao.observe(elemento);

    });

  }


  // =========================================
  // BOTÃO DE DOWNLOAD DO E-BOOK
  // =========================================

  const btnDownload = document.getElementById("btn-download");

  if (btnDownload) {

    btnDownload.addEventListener("click", () => {

      const textoOriginal = btnDownload.textContent.trim();

      btnDownload.classList.add("download-started");

      btnDownload.setAttribute(
        "aria-label",
        "Download do e-book iniciado"
      );

      btnDownload.textContent = "Preparando seu e-book…";

      window.setTimeout(() => {

        btnDownload.textContent = textoOriginal;

        btnDownload.classList.remove("download-started");

        btnDownload.removeAttribute("aria-label");

      }, 2200);

    });

  }


  // =========================================
  // ATUALIZAÇÃO AUTOMÁTICA DO ANO NO RODAPÉ
  // =========================================

  const copyright = document.querySelector("footer p");

  if (copyright) {

    copyright.innerHTML = copyright.innerHTML.replace(
      /©\s*\d{4}/,
      `© ${new Date().getFullYear()}`
    );

  }

});