// FabricEditorModal.jsx
import React, { use, useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { useUser } from "./UserProvider";
import { Button, Stack, IconButton, Tooltip , Slider } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CropIcon from "@mui/icons-material/Crop";
import CloseIcon from "@mui/icons-material/Close";



export default function FabricEditorModal({ photo }) {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const {token} = useUser();
  const [image, setImage] = useState(null);
  const [clipRect,setClipRect] = useState(null);
  const [chooseTool,setChooseTool] = useState(null);
  const [hueValue, setHueValue] = useState(1);


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
    img.set({
      selectable: false, // 不可选中
    })
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
        lockRotation: true
    });

    setClipRect(rect); // 保存裁剪矩形
    return {width:imgWidth * scale, height:imgHeight * scale};
  } catch (err) {
    console.error("图片加载失败", err);
  }
}

// 处理裁剪按钮点击
const handleCrop = (ret) => {


  if (!image || !clipRect || !fabricRef.current) return;

  if(!(chooseTool === "crop")){
    fabricRef.current.add(clipRect);       // 添加到 Canvas
    fabricRef.current.setActiveObject(clipRect); // 默认选中矩形
  }else{
    fabricRef.current.remove(clipRect); // 删除矩形
  }
  fabricRef.current.renderAll();
  if(ret)return;

  // 获取裁剪矩形位置和尺寸
  const left = clipRect.left;
  const top = clipRect.top;
  const width = clipRect.width * clipRect.scaleX;
  const height = clipRect.height * clipRect.scaleY;

  // 生成裁剪后的 DataURL
  const croppedDataUrl = fabricRef.current.toDataURL({
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

    console.log("confirm")

};

// 假设 image 是 fabric.FabricImage 实例
function handleHueChange(value) {
  if (!image) return;

  const filter = new fabric.filters.HueRotation({
    rotation: value
  });

  image.filters.pop();
  image.filters.push(filter);
  // 应用滤镜
  image.applyFilters();
  // 重新渲染画布
  fabricRef.current.renderAll();
}




const handleConfirmTool = ()=>{
  switch(chooseTool){
    case "crop":
      setChooseTool(null);
      handleCrop(false);
      break;
    default:
      break;
  }
}




  useEffect(() => {
    if (!isOpen) return;

    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "#fff",
    });

    loadImage(fabricRef.current);

    fabricRef.current.renderAll();
    return () => {
      fabricRef.current.dispose();
      setChooseTool(null);
      setHueValue(1);
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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 ">
          <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-[90%] max-h-[90%]">
            <Button></Button>

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
          {/* 顶部小浮动工具条 */}
          <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg rounded-lg p-2 flex gap-2">
            <Tooltip title="裁剪">
              <IconButton
                color={chooseTool === "crop" ? "primary" : "default"}
                onClick={() => {
                  setChooseTool(chooseTool === "crop" ? null : "crop");
                  handleCrop(true);
                }}
              >
                <CropIcon />
              </IconButton>
            </Tooltip>

              {/* 色调滑块 */}
              <div className="flex items-center gap-2">
                <Slider
                  min={0}
                  max={2}
                  step={0.01}
                  value={hueValue}
                  sx={{ width: 100 }} // 控制滑块长度
                  onChange={(e, val) => {
                    setHueValue(val);
                    console.log(Math.abs(val-2)-1);
                    handleHueChange(Math.abs(val-2)-1);
                  }}
                />
              </div>


            <Tooltip title="确认">
              <span>
                <IconButton
                  color="success"
                  disabled={chooseTool === null}
                  onClick={handleConfirmTool}
                >
                  <CheckIcon />
                </IconButton>
              </span>
            </Tooltip>


          </div>





          </div>
        </div>
      )}
    </>
  );
}
