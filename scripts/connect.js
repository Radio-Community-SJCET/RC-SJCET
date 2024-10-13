document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader");

    function hideLoader() {
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.5s ease-out";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
    setTimeout(hideLoader, 3000);
});

function goBack() {
    window.history.back();
}