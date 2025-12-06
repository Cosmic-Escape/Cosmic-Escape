'use client';

import { useEffect, useRef } from 'react';

interface ShaderBackgroundProps {
  palette?: 'carbon' | 'neon' | 'ocean' | 'sunset';
  intensity?: number;
  scale?: number;
}

export default function ShaderBackground({
  palette = 'carbon',
  intensity = 0.25,
  scale = 1.15,
}: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      // Fallback: CSS gradient
      canvas.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
      return;
    }

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();

    const vertexShaderSource = `
      attribute vec4 position;
      void main() {
        gl_Position = position;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform float time;
      uniform float intensity;
      uniform float scale;
      uniform vec2 resolution;
      uniform vec3 color1;
      uniform vec3 color2;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0,0.0));
        float c = random(i + vec2(0.0,1.0));
        float d = random(i + vec2(1.0,1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / resolution.xy;
        st *= scale;

        float n = noise(st + time * 0.1);
        float n2 = noise(st * 2.0 - time * 0.05);
        float pattern = n * n2;
        pattern = sin(pattern * 3.14159 + time) * 0.5 + 0.5;

        vec3 col = mix(color1, color2, pattern);
        float alpha = intensity * pattern;

        gl_FragColor = vec4(col, alpha);
      }
    `;

    const compileShader = (source: string, type: number): WebGLShader => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error('Unable to create shader');
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error('Shader compile failed: ' + info);
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    if (!program) throw new Error('Failed to create WebGL program');
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      throw new Error('Program link failed: ' + info);
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) throw new Error('Failed to create buffer');
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, 'time')!;
    const intensityLocation = gl.getUniformLocation(program, 'intensity')!;
    const scaleLocation = gl.getUniformLocation(program, 'scale')!;
    const resolutionLocation = gl.getUniformLocation(program, 'resolution')!;
    const color1Location = gl.getUniformLocation(program, 'color1')!;
    const color2Location = gl.getUniformLocation(program, 'color2')!;

    const palettes: Record<string, [number, number, number, number, number, number]> = {
      carbon: [0.05, 0.05, 0.2, 0.1, 0.1, 0.3],
      neon: [1.0, 0.0, 1.0, 0.0, 1.0, 1.0],
      ocean: [0.0, 0.3, 0.8, 0.2, 0.5, 1.0],
      sunset: [1.0, 0.4, 0.0, 1.0, 0.8, 0.2],
    };
    const [r1, g1, b1, r2, g2, b2] = palettes[palette];

    const startTime = Date.now();

    const render = () => {
      if (!canvas) return;
      const elapsed = (Date.now() - startTime) / 1000;

      gl.uniform1f(timeLocation, elapsed);
      gl.uniform1f(intensityLocation, intensity);
      gl.uniform1f(scaleLocation, scale);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform3f(color1Location, r1, g1, b1);
      gl.uniform3f(color2Location, r2, g2, b2);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [palette, intensity, scale]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-40 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
