"use client";

import ShaderBackground from "@/components/ShaderBackground";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";

export default function ClientBackgrounds() {
  return (
    <>
      <ShaderBackground palette="carbon" intensity={0.25} scale={1.15} />
      <NeuralNetworkBackground palette="techBlue" />
    </>
  );
}
