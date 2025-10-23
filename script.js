let stage_buttons = document.querySelectorAll(".stage-btn")
let stage_image = document.querySelector("#stageBackground")
let canvas = document.querySelector("#canvasOverlay")
let percent_input = document.querySelector("#percentInput")
let run_btn = document.querySelector("#runBtn")
let current_stage = "bf"

console.log(stage_buttons)
console.log(stage_image)
console.log(canvas)
console.log(percent_input)
console.log(run_btn)

// Initialize canvas size when page loads
window.addEventListener('load', function() {
    const image_width = stage_image.clientWidth
    const image_height = stage_image.clientHeight
    ResizeCanvas(image_width, image_height)
})

stage_buttons.forEach(button => {
    button.addEventListener('click',
        () => {
            stage_image.src = `stage_images/${button.dataset.stage}.png`
            stage_buttons.forEach(button => button.classList.remove('active'))
            button.classList.add('active')

            // Wait for image to load before getting dimensions
            stage_image.onload = function() {
                const image_width = stage_image.clientWidth
                const image_height = stage_image.clientHeight
                ResizeCanvas(image_width, image_height)
            }
            
            //set current stage dimensions
        });  
});

function calculatePercents(){
    const new_percent = percent_input.value 
    test()
    console.log(new_percent)
}

function ResizeCanvas(new_width, new_height){
    canvas.width = new_width
    canvas.height = new_height
    console.log(`Canvas resized to: ${new_width}x${new_height}`)
}

function ClearCanvas(){
    const context = canvas.getContext('2d')
    context.clearRect(0,0,canvas.width, canvas.height)
}
function test(){
    const ctx = canvas.getContext('2d')
    console.log(`Canvas dimensions: ${canvas.width}x${canvas.height}`)
    
   
    ctx.fillStyle = "red";
    ctx.globalAlpha = 0.2;
    ctx.fillRect(0,0,200,200);
    ctx.globalAlpha = 1.0;
    // Add a circle in the center
   
    
    console.log("Drawing complete")
}