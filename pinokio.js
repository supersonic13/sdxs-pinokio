const path = require('path')
module.exports = {
  version: "1.2",
  title: "SDXS",
  description: "SDXS: Real-Time One-Step Latent Diffusion Models with Image Conditions. https://github.com/halr9000/sdxs",
  icon: "icon.png",
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app", "env")
    // let running = await kernel.running(__dirname, "start.js")
    if (installing) {
      return [{
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
        let memory = {
          start_default: kernel.memory.local[path.resolve(__dirname, "start.js")],
          start_sketch: kernel.memory.local[path.resolve(__dirname, "start_sketch.js")],
          start_anime: kernel.memory.local[path.resolve(__dirname, "start_anime.js")]
        }
        
        let default_running = kernel.running(__dirname, "start.json")
        let sketch_running = kernel.running(__dirname, "start_sketch.js")
        let anime_running = kernel.running(__dirname, "start_anime.js")
        let running = default_running || sketch_running || anime_running
        let arr
        if (running){
          arr = [
            { icon: "fa-solid fa-terminal", text: "Terminal", href: (default_running ? "start.js" : sketch_running ? "start_sketch.js" : "start_anime.js") }
          ]
          if (memory.start_default && memory.start_default.url) {
            arr.push({ icon: "fa-solid fa-rocket", text: "Web UI", href: memory.start_default.url })
          } else if (memory.start_sketch && memory.start_sketch.url) {
            arr.push({ icon: "fa-solid fa-rocket", text: "Web UI", href: memory.start_sketch.url })
          } else if (memory.start_anime && memory.start_anime.url) {
            arr.push({ icon: "fa-solid fa-rocket", text: "Web UI", href: memory.start_anime.url })
          }
        } else {
          arr = [
            { icon: "fa-solid fa-power-off", text: "Start default", href: "start.js" },
            { icon: "fa-solid fa-power-off", text: "Start Sketch", href: "start_sketch.js", },
            { icon: "fa-solid fa-power-off", text: "Start Anime", href: "start_anime.js", }
          ]
        }
        arr = arr.concat([
          {
            icon: "fa-solid fa-rotate", text: "Update", href: "update.json"
          }, {
            icon: "fa-solid fa-plug", text: "Reinstall", href: "install.json"
          }, {
            icon: "fa-solid fa-circle-xmark", text: "Reset", href: "reset.json", confirm: "Are you sure you wish to reset the app?"
          }
        ])
        return arr
    } else {
      return [
        { icon: "fa-solid fa-plug", text: "Install", href: "install.json" },
        { icon: "fa-solid fa-rotate", text: "Update", href: "update.json" }
      ]
    }
  }
}
