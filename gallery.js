// Photo Modal Functionality
let modal = null;
let modalImg = null;
let modalCaption = null;
let modalDownload = null;
let slideIndex = 1;
let photoLinks = [];
let photoDetails = [];

// Initialize the photo arrays from items in the gallery
function initializeGallery() {
    // Get the modal element
    modal = document.getElementById('photoModal');
    
    // Only run if we're on an album page with photo items
    if (!document.querySelector('.photo-item') || !modal) {
        return;
    }
    
    // Initialize modal elements
    modalImg = document.getElementById('modalImg');
    modalCaption = document.getElementById('modalCaption');
    modalDownload = document.getElementById('modalDownload');
    
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const title = item.querySelector('h4').textContent;
        const date = item.querySelector('p').textContent;
        const downloadLink = item.querySelector('.download-btn').getAttribute('href');
        const fileName = item.querySelector('.download-btn').getAttribute('download');
        
        photoLinks.push(img.getAttribute('src'));
        photoDetails.push({
            title: title,
            date: date,
            download: downloadLink,
            fileName: fileName
        });
    });
}

// Open the modal
function openModal() {
    if (!modal) return;
    
    if (photoLinks.length === 0) {
        initializeGallery();
    }
    
    modal.style.display = 'block';
}

// Close the modal
function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
}

// Change the current slide
function currentSlide(n) {
    if (!modal) return;
    showSlide(slideIndex = n);
}

// Navigate between slides
function moveSlide(n) {
    if (!modal) return;
    showSlide(slideIndex += n);
}

// Show the current slide
function showSlide(n) {
    if (!modalImg || !modalCaption || !modalDownload) return;
    
    // Handle index bounds
    if (n > photoLinks.length) {
        slideIndex = 1;
    } else if (n < 1) {
        slideIndex = photoLinks.length;
    }
    
    // Update the modal content
    modalImg.src = photoLinks[slideIndex - 1];
    modalCaption.textContent = photoDetails[slideIndex - 1].title + ' - ' + photoDetails[slideIndex - 1].date;
    modalDownload.href = photoDetails[slideIndex - 1].download;
    modalDownload.setAttribute('download', photoDetails[slideIndex - 1].fileName);
}

// Initialize event listeners for modal
function initializeModalListeners() {
    if (!modal) return;
    
    // Close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation for modal
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            if (event.key === 'ArrowLeft') {
                moveSlide(-1);
            } else if (event.key === 'ArrowRight') {
                moveSlide(1);
            } else if (event.key === 'Escape') {
                closeModal();
            }
        }
    });
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on an album page with photos
    if (document.querySelector('.photo-item')) {
        initializeGallery();
        initializeModalListeners();
    }
});
