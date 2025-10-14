// FabricEditorModal.jsx
import React, { use, useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { useUser } from "./UserProvider";
import { Button } from "@mui/material";


export default function FabricEditorModal({ photo }) {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const {token} = useUser();
  const [image, setImage] = useState(null);
  const [clipRect,setClipRect] = useState(null);

  const openEditor = () => setIsOpen(true);
  const closeEditor = () => {
    setIsOpen(false)
    console.log("close editor");
};


  //加载图片到canvas上
async function loadImage(canvas) {
  try {
    const img = await fabric.FabricImage.fromURL(`${photo.url}?token=${token}`, {
      crossOrigin: "anonymous",
    });
    setImage(img);

    // 获取图片原始宽高
    const imgWidth = img.width;
    const imgHeight = img.height;

    // 计算最大允许尺寸（屏幕内）
    const maxWidth = window.innerWidth * 0.8;  // 弹窗最大宽度
    const maxHeight = window.innerHeight * 0.8; // 弹窗最大高度
    let scale = 1;

    if (imgWidth > maxWidth || imgHeight > maxHeight) {
      // 按比例缩放
      scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);

    }

    // 设置 Canvas 尺寸
    canvas.setWidth(imgWidth * scale);
    canvas.setHeight(imgHeight * scale);

    // 缩放图片并添加到 Canvas
    img.scale(scale);

    canvas.add(img);
        // 添加裁剪矩形
    const rect = new fabric.Rect({
        left: 0,
        top: 0,
        width: imgWidth * scale,
        height: imgHeight * scale,
        fill: "rgba(0,0,0,0.3)", // 半透明表示裁剪区域
        selectable: true,         // 可以拖动和缩放
        hasBorders: true,
        hasControls: true,
    });

    setClipRect(rect); // 保存裁剪矩形
    fabricRef.current.add(rect);       // 添加到 Canvas
    fabricRef.current.setActiveObject(rect); // 默认选中矩形


    return {width:imgWidth * scale, height:imgHeight * scale};
  } catch (err) {
    console.error("图片加载失败", err);
  }
}

// 处理裁剪按钮点击
const handleCrop = () => {
  if (!image || !clipRect || !fabricRef.current) return;

  const canvas = fabricRef.current;

  // 获取裁剪矩形位置和尺寸
  const left = clipRect.left;
  const top = clipRect.top;
  const width = clipRect.width * clipRect.scaleX;
  const height = clipRect.height * clipRect.scaleY;

  // 生成裁剪后的 DataURL
  const croppedDataUrl = canvas.toDataURL({
    format: "png",
    left,
    top,
    width,
    height,
  });
  // 下载裁剪后的图片(测试)
    const link = document.createElement('a');
    link.href = croppedDataUrl;
    link.download = "cropped.png";
    link.click();

};



  useEffect(() => {
    if (!isOpen) return;

    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "#fff",
    });

    loadImage(fabricRef.current);

    fabricRef.current.renderAll();
    return () => {
      fabricRef.current.dispose();
    };
  }, [isOpen]);

  return (
    <>
      <Button
       variant="contained" color="primary" sx={{mb:2}} onClick={openEditor}
      >
        打开编辑器
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-[90%] max-h-[90%]">
            <button
              onClick={closeEditor}
              className="absolute top-3 right-2 text-xl font-bold text-gray-700 hover:text-gray-900 z-50"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-2 text-center text-gray-700">图片编辑器</h2>
            <canvas
              ref={canvasRef}
              width={800} 
              height={600}
              className="border border-gray-300 block mx-auto"
            />
            <Button variant="contained" color="primary" onClick={handleCrop}>裁剪</Button>
          </div>
        </div>
      )}
    </>
  );
}
