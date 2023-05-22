//더미데이터로 진행하면 CORS정책으로 인해 오류 뜨지만 백엔드와 연결하여 이미지 링크를 받아오면 마음껏 수정하고 연결할 수 있기 때문에 정상 작동함
const convertImageToCircle = async (imageUrl) => {
    return new Promise((resolve) => {
        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const imageSize = 100; // 이미지 크기 (너무 크면 성능 저하됨)
            const borderWidth = 5; // 테두리 두께

            canvas.width = imageSize + borderWidth * 2;
            canvas.height = imageSize + borderWidth * 2;

            context.beginPath();
            context.arc(
                imageSize / 2 + borderWidth,
                imageSize / 2 + borderWidth,
                imageSize / 2,
                0,
                2 * Math.PI
            );
            context.closePath();
            context.clip();

            context.lineWidth = borderWidth;
            context.strokeStyle = "yellow";
            context.stroke();

            context.drawImage(
                image,
                borderWidth,
                borderWidth,
                imageSize,
                imageSize
            );

            const markerImageUrl = canvas.toDataURL();
            resolve(markerImageUrl);
        };

        image.src = imageUrl;
    });
};

export { convertImageToCircle };
