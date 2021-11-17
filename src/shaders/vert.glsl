varying vec3 vUv;
varying vec3 vNormal;

void main() {
    vUv = position;
    vNormal = normal;
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
}