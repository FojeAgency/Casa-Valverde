document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.getElementsByClassName("close")[0];
    const prevBtn = document.getElementsByClassName("prev")[0];
    const nextBtn = document.getElementsByClassName("next")[0];
    const gallery = document.querySelector(".gallery");
    const images = document.querySelectorAll(".gallery-item img");
    let currentIndex = 0;

    function openModal(index) {
        modal.style.display = "flex";
        modalImg.src = images[index].src;
        currentIndex = index;
    }

    function closeModal() {
        modal.style.display = "none";
    }

    images.forEach((img, index) => {
        img.addEventListener("click", function() {
            openModal(index);
        });
    });

    closeBtn.addEventListener("click", closeModal);

    prevBtn.addEventListener("click", function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        modalImg.src = images[currentIndex].src;
    });

    nextBtn.addEventListener("click", function() {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        modalImg.src = images[currentIndex].src;
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    window.addEventListener("keydown", function(event) {
        if (modal.style.display === "flex") {
            if (event.key === "ArrowLeft") {
                prevBtn.click();
            } else if (event.key === "ArrowRight") {
                nextBtn.click();
            } else if (event.key === "Escape") {
                closeModal();
            }
        }
    });

    // Make the gallery endless
    function cloneItems() {
        const items = Array.from(gallery.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            gallery.appendChild(clone);
        });
    }

    cloneItems();

    gallery.addEventListener('scroll', () => {
        const scrollWidth = gallery.scrollWidth;
        const clientWidth = gallery.clientWidth;
        const scrollLeft = gallery.scrollLeft;

        if (scrollLeft === 0) {
            gallery.scrollLeft = scrollWidth - clientWidth * 2;
        } else if (scrollLeft + clientWidth >= scrollWidth) {
            gallery.scrollLeft = clientWidth;
        }
    });

    gallery.scrollLeft = gallery.clientWidth;

    // Function to smoothly scroll the gallery to the right
    function autoScroll() {
        gallery.scrollBy({ left: 1, behavior: 'smooth' });
    }

    // Set an interval for the auto scrolling
    setInterval(autoScroll, 50); // Adjust the speed by changing the interval time

    // Add event listeners to stop auto scroll on manual scroll and restart it after some time
    let isAutoScrolling = true;
    let autoScrollTimeout;

    gallery.addEventListener('scroll', () => {
        if (isAutoScrolling) {
            clearTimeout(autoScrollTimeout);
            isAutoScrolling = false;
        }
        autoScrollTimeout = setTimeout(() => {
            isAutoScrolling = true;
        }, 3000); // Restart auto scrolling after 3 seconds of no manual scroll
    });
});

