<template>
    <div class="modalCntr">
    <div class="modalBg"></div>
        <div class="modalBody">
            <div class="loaderImage loader-theme"></div>
        </div>
    </div>
</template>

<script>
</script>

<style lang="scss">
.modalCntr {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 15;
}
.modalBg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    top: 0;
    left: 0;
    z-index: 10;
}
.modalBody {
    position: absolute;
    z-index: 15;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    .loaderImage {
        width: 30px;
        height: 30px;
        background-size: cover;
        background-repeat: no-repeat;
        -webkit-animation: spin 2s linear infinite;
        -moz-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
    }
}

@-moz-keyframes spin {
    100% {
        -moz-transform: rotate(360deg);
    }
}
@-webkit-keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
