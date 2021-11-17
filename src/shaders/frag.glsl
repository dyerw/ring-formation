varying vec3 vNormal;
varying vec3 vUv;
uniform vec3 uColor;

void main() {
   gl_FragColor = vec4(uColor * vNormal, 1.0); 
}