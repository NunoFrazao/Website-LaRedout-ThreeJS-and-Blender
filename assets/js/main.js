// Variaveis globais gerais
let meuCanvas = document.getElementById('meuCanvas')
let scene = new THREE.Scene()
scene.background = new THREE.Color("white")
let raycaster = new THREE.Raycaster()
let rato = new THREE.Vector2()
let relogio = new THREE.Clock()
let misturador = new THREE.AnimationMixer(scene)

// Contadores e arrays
let botoes = []
let contadorEsq = 0
let contadorDir = 0
let contadorCima = 0
let contadorBaixo = 0
let contadorTv = 0
let contadorLuzes = 0
let contadorTextura = 1

// Definir renderizador e camera
let camera = new THREE.PerspectiveCamera(70, 800 / 600, 0.1, 500)
camera.position.set(-5, 10, 15);
camera.lookAt(0, 0, 0)

// Divs e os seus limites
let model_div = document.getElementById("three_model")
let div_width = document.getElementById("three_model").clientWidth
let div_height = document.getElementById("three_model").clientHeight

let renderer = new THREE.WebGLRenderer({ canvas: meuCanvas })
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 4
renderer.setSize(div_width, div_height)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

let controlos = new THREE.OrbitControls(camera, renderer.domElement)

// Limitar os controlos do user
controlos.target.set(0, 0, 2)
controlos.maxDistance = 20
controlos.minDistance = 15
controlos.enablePan = false
controlos.maxPolarAngle = Math.PI / 2 - 0.1
controlos.minPolarAngle = Math.PI / 2 - 0.5

// Carregar o model
new THREE.GLTFLoader().load('assets/textures/TV10.gltf', function (gltf) {
    gltf.scene.traverse(function (x) {
        if (x instanceof THREE.Light) x.visible = false
    })
    scene.add(gltf.scene)

    // Variaveis para as animacoes
    abrir_porta_esq = THREE.AnimationClip.findByName(gltf.animations, 'abrir_porta_esq')
    abrir_porta_dir = THREE.AnimationClip.findByName(gltf.animations, 'abrir_porta_dir')
    abrir_gav_baixo = THREE.AnimationClip.findByName(gltf.animations, 'abrir_gav_baixo')
    abrir_gav_cima = THREE.AnimationClip.findByName(gltf.animations, 'abrir_gav_cima')
    aparecer_tv = THREE.AnimationClip.findByName(gltf.animations, 'aparecerTV')

    acao1 = misturador.clipAction(abrir_porta_esq)
    acao2 = misturador.clipAction(abrir_porta_dir)
    acao3 = misturador.clipAction(abrir_gav_cima)
    acao4 = misturador.clipAction(abrir_gav_baixo)
    acao5 = misturador.clipAction(aparecer_tv)

    // Array com os nomes dos elementos
    let arr = ['009_1', '015_1', '012_1', '017_1']

    scene.traverse((elemento) => {
        // Para cada elemento que contenha os nomes do array arr, insere no array dos botoes
        for (var i = 0; i < arr.length; i++) {
            if (elemento.name.includes(arr[i]))
                botoes.push(elemento)
        }
        if (elemento.name == 'TV')
            botoes.push(elemento)

        if (elemento.name.includes('rack')) {
            botoes.push(elemento)
            // Material por definicao
            default_material = elemento.material
        }
    });
})

// Inserir o canvas na div
model_div.append(meuCanvas);

// Carregar as animacoes
// Textura 2
var wood2 = new THREE.TextureLoader().load('assets/textures/wood2.png')
let materialWood2 = new THREE.MeshPhongMaterial({ map: wood2, side: THREE.DoubleSide })
// Textura 3
var wood3 = new THREE.TextureLoader().load('assets/textures/wood3.png')
let materialWood3 = new THREE.MeshPhongMaterial({ map: wood3, side: THREE.DoubleSide })

// Chama a funcao das luzes
let luzDir = addLights()

// Limites do canvas para click
window.onclick = (evento) => {
    var limites = evento.target.getBoundingClientRect()
    rato.x = (evento.clientX - limites.left) / parseInt(meuCanvas.style.width) * 2 - 1
    rato.y = -(evento.clientY - limites.top) / parseInt(meuCanvas.style.height) * 2 + 1
    pegarPrimeiro();
};

// Botoes elementos
document.getElementById("btn_porta_esquerda").addEventListener("click", portaEsquerda)
document.getElementById("btn_porta_direita").addEventListener("click", portaDireita)
document.getElementById("btn_gaveta_cima").addEventListener("click", gavetaCima)
document.getElementById("btn_gaveta_baixo").addEventListener("click", gavetaBaixo)
document.getElementById("btn_abrir_fechar").addEventListener("click", abrirFechar)
document.getElementById("btn_mudar_luzes").addEventListener("click", mudarLuzes)
document.getElementById("btn_tv").addEventListener("click", tv)
document.getElementById("btn_textura").addEventListener("click", () => {
    // On click muda a textura do movel
    if (contadorTextura == 0) {
        botoes[1].material = botoes[2].material = botoes[3].material = botoes[4].material = botoes[5].material = default_material
        contadorTextura = 1
    } else if (contadorTextura == 1) {
        botoes[1].material = botoes[2].material = botoes[3].material = botoes[4].material = botoes[5].material = materialWood2
        contadorTextura = 2
    } else if (contadorTextura == 2) {
        botoes[1].material = botoes[2].material = botoes[3].material = botoes[4].material = botoes[5].material = materialWood3
        contadorTextura = 0
    }
})
animate()

// ==================== FUNCOES ============================

function pegarPrimeiro() {
    raycaster.setFromCamera(rato, camera);
    let intersetados = raycaster.intersectObjects(botoes, true)
    if (intersetados.length > 0) {
        if (intersetados[0].object.name.includes('Cube009')) {
            tipoAnim(acao1)
            contadorEsq = animacoes(acao1, contadorEsq)
        }
        if (intersetados[0].object.name.includes('Cube015')) {
            tipoAnim(acao2)
            contadorDir = animacoes(acao2, contadorDir)
        }
        if (intersetados[0].object.name.includes('Cube012')) {
            tipoAnim(acao3)
            contadorCima = animacoes(acao3, contadorCima)
        }
        if (intersetados[0].object.name.includes('Cube017')) {
            tipoAnim(acao4)
            contadorBaixo = animacoes(acao4, contadorBaixo)
        }
    }
}

// Definicoes da animacao
function tipoAnim(acao) {
    acao.clampWhenFinished = true
    acao.setLoop(THREE.LoopOnce)
    acao.paused = false
}

// Funcao para cada animacao
function animacoes(acao, contador) {
    if (contador == 0) {
        acao.timeScale = 1
        acao.play()
        contador = 1
    } else {
        acao.timeScale = -1
        acao.play()
        contador = 0
    }
    return contador
}

function animate() {
    misturador.update(relogio.getDelta())
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

// Funcao das luzes
function addLights() {
    // Luz ambiente
    let lightAmb = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(lightAmb);

    // Luz direcional
    let lightDir = new THREE.DirectionalLight(0xE5E5DA, 1);
    lightDir.position.set(2, 8, 10)
    scene.add(lightDir);

    return lightDir
}

// Funcao mudar de luz
function mudarLuzes() {
    console.log(contadorLuzes)
    if (contadorLuzes == 0) {
        luzDir.color.setHex(0xFf9329)
        luzDir.intensity = 1
        contadorLuzes = 1
    } else if (contadorLuzes == 1) {
        luzDir.color.setHex(0x409cff)
        luzDir.intensity = 1
        contadorLuzes = 2
    } else if (contadorLuzes == 2) {
        luzDir.color.setHex(0xE5E5DA)
        luzDir.intensity = 1
        contadorLuzes = 0
    }
    console.log(contadorLuzes)
}

// Funcao da tv
function tv() {
    tipoAnim(acao5)
    contadorTv = animacoes(acao5, contadorTv)
}

// Funcoes das portas e gavetas
function portaEsquerda() {
    tipoAnim(acao1)
    contadorEsq = animacoes(acao1, contadorEsq)
}

function portaDireita() {
    tipoAnim(acao2)
    contadorDir = animacoes(acao2, contadorDir)
}

function gavetaCima() {
    tipoAnim(acao3)
    contadorCima = animacoes(acao3, contadorCima)
}

function gavetaBaixo() {
    tipoAnim(acao4)
    contadorBaixo = animacoes(acao4, contadorBaixo)
}

// Funcao abrir e fechar tudo
function abrirFechar() {

    let acoes = [acao1, acao2, acao3, acao4]
    let contadores = ["Esq", "Dir", "Cima", "Baixo"]

    if (contadorEsq == 0 || contadorDir == 0 || contadorCima == 0 || contadorBaixo == 0) {
        for (let i = 0; i < 4; i++) {
            tipoAnim(acoes[i])
            acoes[i].timeScale = 1
            acoes[i].play()
            let b = "contador" + contadores[i]
            b = 1
        }
        contadorEsq = contadorDir = contadorCima = contadorBaixo = 1
    } else {
        // Para cada direcao (esq, dir, cima, baixo)
        for (let i = 0; i < 4; i++) {
            tipoAnim(acoes[i])
            acoes[i].timeScale = -1
            acoes[i].play()
        }
        contadorEsq = contadorDir = contadorCima = contadorBaixo = 0
    }
}