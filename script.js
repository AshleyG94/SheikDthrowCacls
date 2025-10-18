let stage_buttons = document.querySelectorAll(".stage-img")
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
console.log("foo")

stage_buttons.forEach(button => {
    button.addEventListener('click',
        () => {
            stage_image.src = `stage_images/${button.dataset.stage}.png`
            stage_buttons.forEach(button => button.classList.remove('active'))
            button.classList.add('active')

            const image_height = stage_image.clientHeight
            const image_width = stage_image.clientWidth
            resize_canvas(image_height, image_width)
            
            
            //set current stage dimensions woo i made some changes
        });  
});

function ResizeCanvas(new_width, new_height){
    canvas.width = new_width
    canvas.height = new_height
}

function ClearCanvas(){
    const context = canvas.getContext('2d')
    context.clearRext(0,0,canvas.width, canvas.height)
}
function test(){
    console.log("button clicked")
}