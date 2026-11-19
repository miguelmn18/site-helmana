
document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const animateIfAllowed = (element, keyframes, options = {}) => {
    if (!element || prefersReducedMotion || !element.animate) return;

    element.animate(keyframes, {
      duration: 450,
      easing: "cubic-bezier(.22, 1, .36, 1)",
      ...options
    });
  };

  // =========================================
  // NAVEGAÇÃO MOBILE
  // =========================================
  const menuMobile = document.getElementById("menu-mobile");

  const scrollToTarget = (target) => {
    if (!target) return;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
  };

  if (menuMobile) {
    menuMobile.addEventListener("change", (event) => {
      const destino = event.target.value;

      if (destino && destino.startsWith("#")) {
        scrollToTarget(document.querySelector(destino));
      }

      menuMobile.selectedIndex = 0;
    });
  }

  // =========================================
  // ROLAGEM SUAVE DOS LINKS INTERNOS
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");

      if (!id || id === "#") return;

      const alvo = document.querySelector(id);

      if (!alvo) return;

      event.preventDefault();
      scrollToTarget(alvo);

      // Fecha/retorna o menu mobile após a seleção.
      if (menuMobile) {
        menuMobile.selectedIndex = 0;
      }
    });
  });

  // =========================================
  // REVELAÇÃO DOS ELEMENTOS COM ENTRADA EM CASCATA
  // =========================================
  const elementosRevelar = document.querySelectorAll(
    [
      ".card",
      ".specialties-heading",
      ".specialty-card",
      ".lista-capacitacoes li",
      ".contador-item",
      ".address-card",
      ".location-photo",
      ".map-frame",
      ".ebook-content",
      ".site-budget-content"
    ].join(", ")
  );

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observadorRevelacao = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const elemento = entry.target;
          const grupo = elemento.parentElement;

          const irmaos = grupo
            ? Array.from(grupo.children).filter((item) =>
                item.matches(
                  ".card, .specialty-card, .lista-capacitacoes li, .contador-item"
                )
              )
            : [];

          const indice = Math.max(0, irmaos.indexOf(elemento));

          elemento.classList.add("reveal-on-scroll");

          elemento.style.transitionDelay =
            `${Math.min(indice * 90, 450)}ms`;

          requestAnimationFrame(() => {
            elemento.classList.add("is-visible");
          });

          observer.unobserve(elemento);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    elementosRevelar.forEach((elemento) => {
      elemento.classList.add("reveal-on-scroll");
      observadorRevelacao.observe(elemento);
    });
  } else {
    elementosRevelar.forEach((elemento) => {
      elemento.classList.add("is-visible");
    });
  }

  // =========================================
  // ANIMAÇÃO SUAVE NAS IMAGENS
  // =========================================
  document.querySelectorAll("img").forEach((imagem) => {
    const revelarImagem = () => {
      imagem.classList.add("image-loaded");

      animateIfAllowed(
        imagem,
        [
          {
            opacity: 0.72,
            transform: "scale(1.015)"
          },
          {
            opacity: 1,
            transform: "scale(1)"
          }
        ],
        {
          duration: 650
        }
      );
    };

    if (imagem.complete && imagem.naturalWidth > 0) {
      revelarImagem();
    } else {
      imagem.addEventListener("load", revelarImagem, {
        once: true
      });
    }
  });

  // =========================================
  // MICROINTERAÇÕES DOS CARDS
  // =========================================
  document
    .querySelectorAll(".card, .specialty-card, .contador-item")
    .forEach((card) => {
      card.addEventListener("pointerenter", () => {
        if (prefersReducedMotion || !card.animate) return;

        card.animate(
          [
            {
              transform: "translateY(0) scale(1)"
            },
            {
              transform: "translateY(-4px) scale(1.008)"
            }
          ],
          {
            duration: 220,
            easing: "ease-out",
            fill: "forwards"
          }
        );
      });

      card.addEventListener("pointerleave", () => {
        if (prefersReducedMotion || !card.animate) return;

        card.animate(
          [
            {
              transform: "translateY(-4px) scale(1.008)"
            },
            {
              transform: "translateY(0) scale(1)"
            }
          ],
          {
            duration: 260,
            easing: "ease-out",
            fill: "forwards"
          }
        );
      });
    });

  // =========================================
  // BARRA DE PROGRESSO DA PÁGINA
  // =========================================
  const progressBar = document.createElement("div");

  progressBar.setAttribute("aria-hidden", "true");

  Object.assign(progressBar.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "0%",
    height: "3px",
    zIndex: "2000",
    pointerEvents: "none",
    background: "linear-gradient(90deg, #77a881, #8B1E2F)",
    transformOrigin: "left center",
    transition: prefersReducedMotion
      ? "none"
      : "width 100ms linear"
  });

  document.body.appendChild(progressBar);

  // =========================================
  // BOTÃO VOLTAR AO TOPO
  // =========================================
  const voltarTopo = document.createElement("button");

  voltarTopo.type = "button";
  voltarTopo.className = "voltar-topo";
  voltarTopo.setAttribute("aria-label", "Voltar ao topo");

  voltarTopo.innerHTML =
    '<i class="fas fa-arrow-up" aria-hidden="true"></i>';

  Object.assign(voltarTopo.style, {
    position: "fixed",
    right: "24px",
    bottom: "112px",
    width: "46px",
    height: "46px",
    border: "0",
    borderRadius: "50%",
    background: "#8B1E2F",
    color: "#fff",
    boxShadow: "0 5px 18px rgba(47, 54, 49, .2)",
    cursor: "pointer",
    zIndex: "999",
    opacity: "0",
    visibility: "hidden",
    transform: "translateY(12px)",
    transition: prefersReducedMotion
      ? "none"
      : "opacity .25s ease, transform .25s ease, visibility .25s ease"
  });

  document.body.appendChild(voltarTopo);

  voltarTopo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });

  // =========================================
  // CABEÇALHO E PROGRESSO DURANTE A ROLAGEM
  // =========================================
  const header = document.querySelector("header");

  let scrollTicking = false;

  const atualizarRolagem = () => {
    const scrollTop =
      window.scrollY || document.documentElement.scrollTop;

    const alturaRolavel =
      document.documentElement.scrollHeight - window.innerHeight;

    const progresso =
      alturaRolavel > 0
        ? (scrollTop / alturaRolavel) * 100
        : 0;

    progressBar.style.width =
      `${Math.min(100, Math.max(0, progresso))}%`;

    // Exibe ou oculta o botão de voltar ao topo.
    if (scrollTop > 320) {
      voltarTopo.style.opacity = "1";
      voltarTopo.style.visibility = "visible";
      voltarTopo.style.transform = "translateY(0)";
    } else {
      voltarTopo.style.opacity = "0";
      voltarTopo.style.visibility = "hidden";
      voltarTopo.style.transform = "translateY(12px)";
    }

    // Adiciona sombra ao cabeçalho durante a rolagem.
    if (header) {
      header.style.boxShadow =
        scrollTop > 20
          ? "0 5px 22px rgba(47, 54, 49, .12)"
          : "0 2px 10px rgba(74, 93, 78, .08)";
    }

    scrollTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(atualizarRolagem);
        scrollTicking = true;
      }
    },
    {
      passive: true
    }
  );

  atualizarRolagem();

  // =========================================
  // DESTAQUE DO ITEM DE MENU DA SEÇÃO VISÍVEL
  // =========================================
  const secoes = document.querySelectorAll(
    "main section[id], body > section[id], section[id]"
  );

  const linksMenu = document.querySelectorAll(
    'nav a[href^="#"]'
  );

  if ("IntersectionObserver" in window && secoes.length) {
    const observadorSecoes = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          linksMenu.forEach((link) => {
            const ativo =
              link.getAttribute("href") === `#${entry.target.id}`;

            if (ativo) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    secoes.forEach((secao) => {
      observadorSecoes.observe(secao);
    });
  }

  // =========================================
  // BOTÃO DE DOWNLOAD DO E-BOOK
  // =========================================
  const btnDownload = document.getElementById("btn-download");

  if (btnDownload) {
    btnDownload.addEventListener("click", () => {
      const textoOriginal = btnDownload.innerHTML;

      btnDownload.classList.add("download-started");

      btnDownload.setAttribute(
        "aria-label",
        "Download do e-book iniciado"
      );

      btnDownload.innerHTML =
        '<i class="fas fa-check" aria-hidden="true"></i> Preparando seu e-book…';

      animateIfAllowed(
        btnDownload,
        [
          {
            transform: "scale(1)"
          },
          {
            transform: "scale(1.045)"
          },
          {
            transform: "scale(1)"
          }
        ],
        {
          duration: 420
        }
      );

      window.setTimeout(() => {
        btnDownload.innerHTML = textoOriginal;
        btnDownload.classList.remove("download-started");
        btnDownload.removeAttribute("aria-label");
      }, 2200);
    });
  }

  // =========================================
  // ANIMAÇÃO DE ATENÇÃO DISCRETA NO WHATSAPP
  // =========================================
  const whatsappButtons = document.querySelectorAll(
    ".btn-whatsapp, .botao-whatsapp, .site-budget-button"
  );

  whatsappButtons.forEach((botao) => {
    botao.addEventListener("pointerenter", () => {
      animateIfAllowed(
        botao,
        [
          {
            transform: "translateY(0) scale(1)"
          },
          {
            transform: "translateY(-2px) scale(1.035)"
          },
          {
            transform: "translateY(0) scale(1)"
          }
        ],
        {
          duration: 360
        }
      );
    });
  });

  // =========================================
  // ATUALIZAÇÃO AUTOMÁTICA DO ANO NO RODAPÉ
  // =========================================
  const copyright = document.querySelector(".doctor-footer p");

  if (copyright) {
    copyright.innerHTML = copyright.innerHTML.replace(
      /©\s*\d{4}/,
      `© ${new Date().getFullYear()}`
    );
  }
});
/* =========================================
   MENU RESPONSIVO — HELMANA MACÊDO
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const navigation = document.getElementById("primary-navigation");

  if (!toggle || !navigation) return;

  const navLinks = navigation.querySelectorAll("a");

  function openMenu() {
    navigation.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu de navegação");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    navigation.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu de navegação");
    document.body.classList.remove("menu-open");
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fecha o menu ao selecionar uma seção.
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fecha ao pressionar ESC.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });

  // Fecha ao clicar fora do cabeçalho.
  document.addEventListener("click", (event) => {
    if (
      !navigation.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Evita que o menu permaneça aberto ao voltar para desktop.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });
});

