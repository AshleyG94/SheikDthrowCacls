import { get_array_for_percent, MixupResult, MIXUP_COLOURS } from './sheikcalc.js';

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
                ClearCanvas()
                ResizeCanvas(image_width, image_height)
            }
            
            //set current stage dimensions
        });  
});
run_btn.addEventListener('click', calculatePercents);

function calculatePercents(){
    const new_percent = Number(percent_input.value) 
    test(new_percent)
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
function test(new_percent){
    const ctx = canvas.getContext('2d')
    ClearCanvas()
    console.log(`Canvas dimensions: ${canvas.width}x${canvas.height}`)
    
    
    const stage_start = [-85.5657, 0];
    const stage_end   = [ 85.5657, 0];

  
    const results = get_array_for_percent(
        new_percent,
      stage_start,
      stage_end
    );

    const stage_start_x = -85.5657;
    const stage_end_x   =  85.5657;
    const stage_width = stage_end_x - stage_start_x;
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;

    // Width of each rectangle based on number of results
    const rectWidth = canvasWidth / results.length;

    results.forEach((current, i) => {
        // Map starting_pos_x to canvas coordinate
        const canvasX = (i * rectWidth); // Using index ensures rectangles cover entire canvas
        const color = MIXUP_COLOURS[current.result] || "#3b6e5d";
        console.log(current.result)
        console.log(MIXUP_COLOURS[current.result])

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.5; // Make sure colors are fully opaque
        ctx.fillRect(canvasX, 0, rectWidth, canvasHeight);
    });
  
    console.log(results);

    
    console.log("Drawing complete")
}